type ResizeImageFunction = (
  file: File,
  maxWidth: number,
  maxHeight: number,
) => Promise<File>;

export const resizeImage: ResizeImageFunction = (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // Init canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Scale the image to fit within the max width/height
      let { width, height } = img;
      if (width > height && maxWidth < width) {
        height *= maxWidth / width;
        width = maxWidth;
      } else if (maxHeight < height) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      // Draw image on canvas
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      // Convert canvas to JPG image file
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, ".jpg"),
              { type: "image/jpeg" },
            );
            resolve(resizedFile);
          } else {
            reject(new Error("Error resizing image"));
          }
        },
        "image/jpeg",
        0.9,
      );
    };

    img.onerror = () => {
      reject(new Error("Error loading image"));
    };
  });
};
