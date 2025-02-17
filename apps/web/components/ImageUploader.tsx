import { ImageUploaderCallback, ImageState } from "@/types/global";
import { resizeImage } from "@/utils/imageUtils";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export default function ImageUploader({
  callback,
  placeholder,
}: {
  callback: (value: ImageUploaderCallback) => void;
  placeholder: string;
}) {
  const [image, setImage] = useState<ImageState>({ name: "", data: "" });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    if (file) {
      const fileToUpload = await resizeImage(file, 1000, 1000);

      const reader = new FileReader();
      reader.onload = async () => {
        setImage({ name: file.name, data: reader.result });
        callback({
          name: fileToUpload.name,
          data: reader.result as string,
          size: fileToUpload.size,
        });
      };
      reader.readAsDataURL(fileToUpload);
    }

    fileInput.value = "";
  };

  return (
    <div>
      <Image
        className="mx-auto cursor-pointer border shadow rounded-lg"
        src={image?.data ? (image?.data as string) : placeholder}
        alt="placeholder image"
        height={60}
        width={375}
        priority
        onClick={() => fileInputRef.current?.click()}
      />
      <input
        className="hidden"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      {image?.name && (
        <span className="text-sm w-full text-center inline-block">
          {image.name}
        </span>
      )}
    </div>
  );
}
