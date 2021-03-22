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
import java.io.File;
import java.io.IOException;

@Component
public class DatabaseLoader implements CommandLineRunner {
    final Logger logger = LoggerFactory.getLogger(DatabaseLoader.class);

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public void run(String ... strings) throws Exception{
        logger.info("Start Databaseloader");
        File dir = new File("Pictures/Raw");
        File[] files = dir.listFiles();
        for(int i = 0; i < files.length; i++){
            if(files[i].getName().equals("Rawxt.txt"))continue;
            createThumbnail(files[i]);
            String description = getDescription(files[i].getName());
            Image imageToLoad = new Image(
                    description,
                    "Pictures/Thumb/"+files[i].getName(),
                    "Pictures/Raw/"+files[i].getName());
            this.imageRepository.save(imageToLoad);
        }
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