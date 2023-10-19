import React, { useState, useCallback } from "react";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

import {
  makeDeleteRequest,
  makeUploadRequest,
} from "@/cloudinary/cloudinaryHelper";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface ImageUploadMultipleProps {
    onChange: (value: any) => void;
    value: any;
}

const ImageUploadMultiple: React.FC<ImageUploadMultipleProps> = ({
    onChange,
    value
}) => {

    const [files, setFiles] = useState(value);

    const handleUpload = useCallback((result: any) => {
        if (value != undefined) {
            value.push(result.url)
            onChange(value);
        }else {
            onChange([result.url]);
        }
        
      }, [onChange, value]);

      const handleUploadRevert = useCallback(() => {
        
      }, [onChange, value]);
    

    const revert = (token:string, successCallback: any, errorCallback: any) => {
        makeDeleteRequest({
          token,
          successCallback,
          errorCallback,
          handleUploadRevert
        });
    };

    const process = (
        fieldName: string,
        file: any,
        metadata: any,
        load: any,
        error: any,
        progress: any,
        abort: any,
        transfer: any,
        options: any
    ) => {
        const abortRequest = makeUploadRequest({
            file,
            fieldName,
            successCallback: load,
            errorCallback: error,
            progressCallback: progress,
            handleUpload: handleUpload
        });
      
        return {
            abort: () => {
              abortRequest();
              abort();
            },
        };
    };

    return (
        <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
            <FilePond
                files={files}
                acceptedFileTypes="image/*"
                onupdatefiles={setFiles}
                allowMultiple={true}
                server={{ process, revert }}
                name="file"
                labelIdle='Arrastra y suelta tus archivos o <span class="filepond--label-action">Navegar tu directorio</span>'
                allowRevert={false}
            />
        </div>
    )
}

export default ImageUploadMultiple;