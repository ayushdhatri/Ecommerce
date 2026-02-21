package com.ecommerce.project.service.ImageStorage;

import com.ecommerce.project.payload.ImageUploadDTO;
import com.ecommerce.project.payload.StoredImage;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

public class MultipartUploadStrategy implements ImageStorageStrategy {

    @Override
    public StoredImage uploadImage(ImageUploadDTO request) throws IOException {

        // 1️⃣ Original file extension
        String originalFileName = request.getFile().getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));

        // 2️⃣ Generate unique filename
        String fileName = UUID.randomUUID() + extension;

        // 3️⃣ Ensure directory exists
        Path uploadDir = Paths.get(request.getPath());
        Files.createDirectories(uploadDir);

        // 4️⃣ Full file path
        Path filePath = uploadDir.resolve(fileName);

        // 5️⃣ Copy file (overwrite allowed)
        Files.copy(
                request.getFile().getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
        );

        // 6️⃣ Return stored image info
        StoredImage storedImage = new StoredImage();
        storedImage.setFileName(fileName);
        storedImage.setFilePath(fileName);

        return storedImage;
    }
}