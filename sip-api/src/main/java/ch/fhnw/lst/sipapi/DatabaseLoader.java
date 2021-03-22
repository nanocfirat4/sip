package ch.fhnw.lst.sipapi;

import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Component
public class DatabaseLoader implements CommandLineRunner {
    @Autowired
    private ImageRepository imageRepository;

    @Override
    public void run(String ... strings) throws Exception{
        File dir = new File("Pictures/Raw");
        File[] files = dir.listFiles();
        for(int i = 0; i < files.length; i++){
            createThumbnail(files[i]);

            Image imageToLoad = new Image(
                    ("Betelgeuse"+i),
                    "Pictures/Thumb/"+files[i].getName(),
                    files[i].getAbsolutePath()
            );
            this.imageRepository.save(imageToLoad);
        }
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