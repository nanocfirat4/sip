package ch.fhnw.lst.sipapi;

import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.repository.ImageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.imageio.ImageIO;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {
    final Logger logger = LoggerFactory.getLogger(DatabaseLoader.class);



    @Autowired
    private ImageRepository imageRepository;

    @Override
    public void run(String ... strings) throws Exception{
        logger.info("Start Databaseloader");
        List<String> pics = getListPicturesFromPacs();
        if(pics != null)
            for (String pacsid :pics) {

                saveImage("http://localhost:8042/instances/"+pacsid+"/preview","Pictures/Raw/"+pacsid+".jpeg");

                createThumbnail(new File("Pictures/Raw/" + pacsid + ".jpeg"));
                String description = getDescription(files[i].getName());
                Image imageToLoad = new Image(description,
                        "Pictures/Thumb/"+files[i].getName(),
                        "Pictures/Raw/"+files[i].getName());
                this.imageRepository.save(imageToLoad);
        }
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

    private List<String> getListPicturesFromPacs() throws IOException {
        String url = "http://localhost:8042/instances";
        String response = getRequest(url);
        logger.info(response);
        String str = response;
        str = str.substring(1, str.length() - 1); // remove []
        String strl[] = str.split(","); // make single
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


    private String getRequest(String url) throws IOException {
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

        Integer responseCode = connection.getResponseCode();
        logger.info("Response Code from PACS : " + responseCode);

        if (responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader inputReader = new BufferedReader(
                    new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = inputReader.readLine()) != null) {
                response.append(inputLine);
            }
            inputReader.close();

            return response.toString();
        }
        return null;
    }


    private String getDescription(String name) throws ParserConfigurationException, IOException, SAXException {
        logger.trace("get descriptions from pic of XML");
        File xmlFile = new File("Pictures/allImageMetadata.xml");
        DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
        Document document = documentBuilder.parse(xmlFile);
        NodeList nodeList = document.getElementsByTagName("image");
        for(int x=0,size= nodeList.getLength(); x<size; x++) {
            String actualName = nodeList.item(x).getAttributes().getNamedItem("src").getNodeValue();
            if(actualName.equals(name)){
                Element node = (Element) nodeList.item(x);
                String description = node.getElementsByTagName("description").item(0).getTextContent();
                logger.trace("Found description: "+description);
                return description;
            }
        }
        return "No description";
    }

    private void createThumbnail(File file) throws IOException {
        BufferedImage originalBufferedImage = null;
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
            ImageIO.write(thumbnailBufferedImage, "JPG", new File("Pictures/Thumb/"+file.getName()));
        }
        catch (IOException ioe) {
            System.out.println("Error writing image to file");
            throw ioe;
        }
    }
}