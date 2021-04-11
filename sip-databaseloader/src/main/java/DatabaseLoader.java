import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.Time;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static java.lang.Thread.sleep;


public class DatabaseLoader{
    static final Logger logger = LoggerFactory.getLogger(DatabaseLoader.class);

    public static String AUTH_HTTP = "http://192.168.0.30/auth/realms/FHNW-LST-MI/protocol/openid-connect/token";
    public static String API_HTTP = "http://192.168.0.30/api/image";
    public static String ORTHANC_HTTP = "http://192.168.0.30/orthanc";
    public static String REACT_PATH = "/home/marc/sip2021-01-sth/sip-react/public/Pictures/";
    public static LocalDateTime lastAccessToken = LocalDateTime.now().minusMinutes(5);
    public static String access_token = "";

    public static void main(String[] args) throws IOException, InterruptedException {
        logger.info("Databaseloader started");
        while(true){
            logger.info("check if there are new images in PACS");
            List<String> loadedPics = new ArrayList<>();
            List<String> allPics = getListPicturesFromPacs();
            for (String pacsid :allPics) {
                if(!loadedPics.contains(pacsid)){
                    String pathToRawJpgs = REACT_PATH +"/Raw/" + pacsid + ".jpg";
                    saveImage(ORTHANC_HTTP +"/instances/"+pacsid+"/preview",pathToRawJpgs);
                    createThumbnail(new File(pathToRawJpgs));
                    String description = getDescription(pacsid);
                    String thumbnail = "/Thumb/"+ pacsid + ".jpg";
                    String pacs_id = pacsid;
                    logger.trace("Got all information from "+pacsid+" : "+description);
                    boolean worked = savePictureInDatabase(description,thumbnail,pacs_id);
                    if(worked){
                        loadedPics.add(pacs_id);
                        logger.info(pacsid+" loaded to Database");
                    }else logger.error(pacsid+" NOT loaded to Database");
                }
            }
            logger.info("wait one hour...");
            sleep((long) // Reload Pictures all 2 Minutes
                2 *     // Minutes
                60 *    // Seconds to Minute
                1000);  // Milliseconds to Seconds
        }
    }

    private static boolean savePictureInDatabase(String description, String thumbnail, String pacs_id) throws IOException, InterruptedException {
        boolean worked = false;
        String postEndpoint = API_HTTP;

        if(lastAccessToken.isBefore(LocalDateTime.now().minusMinutes(3))){
            access_token = getAccessToken();
            lastAccessToken = LocalDateTime.now();
        }

/*      POST http://localhost/api/image
        Content-Type: application/json
        Authorization: Bearer {{access_token}}
*/
        String inputJson = "{\n" +
                "  \"description\": \""+description+"\",\n" +
                "  \"thumbnail\": \""+thumbnail+"\",\n" +
                "  \"pacs_id\": \""+pacs_id+"\"\n" +
                "}";

        var request = HttpRequest.newBuilder()
                .uri(URI.create(postEndpoint))
                .header("Content-Type", "application/json")
                .header("Authorization"," Bearer "+access_token)
                .POST(HttpRequest.BodyPublishers.ofString(inputJson))
                .build();

        var client = HttpClient.newHttpClient();

        var response = client.send(request, HttpResponse.BodyHandlers.ofString());

        logger.trace("RESPONSE FROM API : "+response.statusCode());
        logger.trace("RESPONSE FROM API : "+response.body());

        if(response.statusCode()==200){
            worked =true;
        }

        return worked;
    }

    private static String getAccessToken() throws IOException, InterruptedException {
        String access_token ="";
        String postEndpoint = AUTH_HTTP;
        String inputX_WWW_FORM_URLENCODED = "client_id=web-app&username=user&password=$!pU53r&grant_type=password";

/*      POST http://localhost/auth/realms/FHNW-LST-MI/protocol/openid-connect/token
        Content-Type: application/x-www-form-urlencoded
        Accept-Type: application/json

        client_id=web-app&username=user&password=$!pU53r&grant_type=password*/

        var request = HttpRequest.newBuilder()
                .uri(URI.create(postEndpoint))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Accept-Type","application/json")
                .POST(HttpRequest.BodyPublishers.ofString(inputX_WWW_FORM_URLENCODED))
                .build();

        var client = HttpClient.newHttpClient();
        var response = client.send(request, HttpResponse.BodyHandlers.ofString());

        logger.trace("RESPONSE FROM AUTH : "+response.statusCode());
        logger.trace("RESPONSE FROM AUTH : "+response.body());

        if(response.statusCode()==200){
            Object file = JSONValue.parse(response.body());

            // In java JSONObject is used to create JSON object
            JSONObject jsonObjectdecode = (JSONObject)file;

            // Converting into Java Data type
            // format From Json is the step of Decoding.
            access_token = (String)jsonObjectdecode.get("access_token");
        }
        return access_token;
    }


    public static void saveImage(String imageUrl, String destinationFile) throws IOException {
        URL url = new URL(imageUrl);
        InputStream is = url.openStream();
        OutputStream os = new FileOutputStream(destinationFile);
        byte[] b = new byte[2048];
        int length;
        while ((length = is.read(b)) != -1) {
            os.write(b, 0, length);
        }
        is.close();
        os.close();
    }

    private static List<String> getListPicturesFromPacs() throws IOException {
        String url = ORTHANC_HTTP +"/instances";
        String response = getRequest(url);
        logger.trace("ORTHANC get list instances RESPONSE: "+response);
        String str = response;
        assert str != null;
        str = str.substring(1, str.length() - 1); // remove []
        String[] strl = str.split(","); // make single
        List<String> al;
        al = Arrays.asList(strl);
        List<String> listPics = new ArrayList<>(); //final list empty
        for(String s: al){
            s = s.trim(); //remove empty spaces
            s = s.substring(1, s.length() - 1); //remove""
            listPics.add(s);
        }
        return listPics;
    }


    private static String getRequest(String url) throws IOException {
        Authenticator.setDefault (new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication ("orthanc", "g04D!c0m#orT(h)anks".toCharArray());
            }
        });
                URL urlObj = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) urlObj.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("User-Agent", "Mozilla/5.0");

        logger.trace("Send 'HTTP GET' request to : " + url);

        int responseCode = connection.getResponseCode();
        logger.trace("Response Code from PACS : " + responseCode);

        if (responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader inputReader = new BufferedReader(
                    new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();

            while ((inputLine = inputReader.readLine()) != null) {
                response.append(inputLine);
            }
            inputReader.close();

            return response.toString();
        }
        return null;
    }


    private static String getDescription(String name) throws IOException {
        logger.trace("get descriptions from pic of XML");
        return getRequest( ORTHANC_HTTP +"/instances/"+name+"/content/0020-4000");
    }

    private static void createThumbnail(File file) throws IOException {
        BufferedImage originalBufferedImage;
        try {
            originalBufferedImage = ImageIO.read(file);
        }
        catch(IOException ioe) {
            logger.error("IO exception occurred while trying to read image.");
            throw ioe;
        }
        int thumbnailWidth = 150;

        int widthToScale, heightToScale;
        if (originalBufferedImage.getWidth() > originalBufferedImage.getHeight()) {

            heightToScale = (int)(1.1 * thumbnailWidth);
            widthToScale = (int)((heightToScale * 1.0) / originalBufferedImage.getHeight()
                    * originalBufferedImage.getWidth());

        } else {
            widthToScale = (int)(1.1 * thumbnailWidth);
            heightToScale = (int)((widthToScale * 1.0) / originalBufferedImage.getWidth()
                    * originalBufferedImage.getHeight());
        }
        BufferedImage resizedImage = new BufferedImage(widthToScale,
                heightToScale, originalBufferedImage.getType());
        Graphics2D g = resizedImage.createGraphics();

        g.setComposite(AlphaComposite.Src);
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        g.drawImage(originalBufferedImage, 0, 0, widthToScale, heightToScale, null);
        g.dispose();

        int x = (resizedImage.getWidth() - thumbnailWidth) / 2;
        int y = (resizedImage.getHeight() - thumbnailWidth) / 2;

        if (x < 0 || y < 0) {
            throw new IllegalArgumentException("Width of new thumbnail is bigger than original image");
        }

        BufferedImage thumbnailBufferedImage = resizedImage.getSubimage(x, y, thumbnailWidth, thumbnailWidth);

        try {
            ImageIO.write(thumbnailBufferedImage, "JPG", new File(REACT_PATH +"/Thumb/"+file.getName()));
        }
        catch (IOException ioe) {
            logger.error("Error writing image to file");
            throw ioe;
        }
    }
}
