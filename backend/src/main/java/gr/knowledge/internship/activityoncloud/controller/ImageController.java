package gr.knowledge.internship.activityoncloud.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/image")
@Log4j2
public class ImageController {

	@PostMapping("/upload")
	public void uploadImage(@RequestParam("image") MultipartFile image) {
		try {
			byte[] bytes = image.getBytes();
			Path path = Paths.get("../frontend/public/Photos", image.getOriginalFilename()).toAbsolutePath();
			log.debug(path);
			Files.write(path, bytes);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
