import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class DatabaseLoader{
    static final Logger logger = LoggerFactory.getLogger(DatabaseLoader.class);

    public static String API_HTTP = "http://localhost/api";
    public static String ORTHANC_HTTP = "http://localhost/orthanc";
    public static String REACT_PATH = "sip-react/public/";

    public static void main(String[] args) throws IOException, InterruptedException {
        logger.info("Databaseloader started");
        while(true){
            List<String> loadedPics = getListPicturesFromPacs();
            List<String> allPics = getListPicturesFromPacs();
            for (String pacsid :allPics) {
                if(!loadedPics.contains(pacsid)){
                    String pathToRawJpgs = REACT_PATH +"/Pictures/Raw/" + pacsid + ".jpg";
                    saveImage(ORTHANC_HTTP +"/instances/"+pacsid+"/preview",pathToRawJpgs);
                    createThumbnail(new File(pathToRawJpgs));
                    String description = getDescription(pacsid);
                    String thumbnail = "Pictures/Thumb/"+ pacsid + ".jpg";
                    String pacs_id = ORTHANC_HTTP+"/instances/"+pacsid+"/preview";
                    boolean worked = savePictureInDatabase(description,thumbnail,pacs_id);
                    if(worked){
                        loadedPics.add(pacs_id);
                    }
                }
            }
        }
    }

    private static boolean savePictureInDatabase(String description, String thumbnail, String pacs_id) throws IOException, InterruptedException {
        boolean worked = false;

        String postEndpoint = API_HTTP;

        String inputJson = "{\n" +
                "  \"description\": \""+description+"\",\n" +
                "  \"thumbnail\": \""+thumbnail+"\",\n" +
                "  \"pacs_id\": \""+pacs_id+"\"\n" +
                "}";

        var request = HttpRequest.newBuilder()
                .uri(URI.create(postEndpoint))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(inputJson))
                .build();

        var client = HttpClient.newHttpClient();

        var response = client.send(request, HttpResponse.BodyHandlers.ofString());

        logger.info(String.valueOf(response.statusCode()));
        logger.info(response.body());

        if(response.statusCode()==200){
            worked =true;
        }

        return worked;
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
        logger.info(response);
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

        logger.info("Send 'HTTP GET' request to : " + url);

        int responseCode = connection.getResponseCode();
        logger.info("Response Code from PACS : " + responseCode);

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
            System.out.println("IO exception occurred while trying to read image.");
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
            ImageIO.write(thumbnailBufferedImage, "JPG", new File(REACT_PATH +"/Pictures/Thumb/"+file.getName()));
        }
        catch (IOException ioe) {
            System.out.println("Error writing image to file");
            throw ioe;
        }
    }
}
