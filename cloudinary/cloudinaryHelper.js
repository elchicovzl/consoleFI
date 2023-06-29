import { cloudName, uploadPreset, apiKey, apiSecret } from "./cloudinaryConfig";
import crypto from "crypto";
import axios from 'axios';

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`;

export const makeUploadRequest = ({
  file,
  fieldName,
  progressCallback,
  successCallback,
  errorCallback,
  handleUpload
}) => {

  const url = `${baseUrl}/image/upload`;

  const formData = new FormData();
  formData.append(fieldName, file);
  formData.append("upload_preset", uploadPreset);

  const request = new XMLHttpRequest();
  request.open("POST", url);

  request.upload.onprogress = (e) => {
    progressCallback(e.lengthComputable, e.loaded, e.total);
  };

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      const { delete_token: deleteToken } = JSON.parse(request.response);

      successCallback(deleteToken);
      handleUpload(JSON.parse(request.response));
    } else {
      errorCallback(request.responseText);
    }
  };

  request.send(formData);
  
  return () => {
    request.abort();
  };
};

export const makeDeleteRequest = ({
  token,
  successCallback,
  errorCallback,
  handleUploadRevert
}) => {

  const url = `${baseUrl}/delete_by_token`;

  const request = new XMLHttpRequest();
  request.open("POST", url);

  request.setRequestHeader("Content-Type", "application/json");

  request.onload = (res) => {
    if (request.status >= 200 && request.status < 300) {
      successCallback();
      handleUploadRevert();
    } else {
      errorCallback(request.responseText);
    }
  };
  request.send(JSON.stringify({ token }));
};

export const destroyImageRequest = async ({
  img,
  successCallback,
  errorCallback,
}) => {
  const timestamp = Math.round((new Date).getTime()/1000);
  const url = `${baseUrl}/image/destroy`;

  const publicId = getPublicIdFromUrl(img);
  const signature = generateSHA1(generateSignature(publicId));

  try {

    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });

    successCallback();

  } catch (error) {
    console.error(error);
    errorCallback();
  }
}

const generateSignature = (publicId) => {
  const timestamp = Math.round((new Date).getTime()/1000);
	return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

const generateSHA1 = (data) => {

  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
}

const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;

const getPublicIdFromUrl = (url) => {

  const match = url.match(regex);
  return match ? match[1] : null;
};
