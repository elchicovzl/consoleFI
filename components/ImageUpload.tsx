'use client';

import { CldUploadWidget, CldImage } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

const uploadPreset = "wudsun8m";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget 
      onUpload={handleUpload} 
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus
              size={50}
            />
            <div className="font-semibold text-lg">
              Click para subir archivo
            </div>
            {value && (
              <div className="
              absolute inset-0 w-full h-full">
                <CldImage
                  fill 
                  style={{ objectFit: 'cover' }} 
                  src={value} 
                  alt="House"
                  overlays={[{"url":"https://static.wixstatic.com/media/222189_a2e1ead1a33543388c69e4104374aa44~mv2.png/v1/fill/w_511,h_319,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/222189_a2e1ead1a33543388c69e4104374aa44~mv2.png"}]}
                />
              </div>
            )}
          </div>
        ) 
    }}
    </CldUploadWidget>
  );
}

export default ImageUpload;