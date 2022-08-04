import { AppConstant } from '@/app.constant';
import Axios, { AxiosResponse } from 'axios';


export class UploaderApiClient {
  static uploadUserAvatar = async (id: string, files: any)=> {
    return await Axios.post(
      `${AppConstant.ROOT_URL_UPLOADER}/mobile/fileUpload/avatar/${id}`,
      files,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  };

  static uploadFile = async (
    file: File,
    dto: {
      createThumbnail?: any;
      featureName?: any;
      id?: any;
    }
  ) => {
    const bodyFormData = new FormData();
    bodyFormData.append('files', file);

    if (dto.createThumbnail) {
      bodyFormData.append('createThumbnail', dto.createThumbnail);
    }

    if (dto.featureName) {
      bodyFormData.append('featureName', dto.featureName);
    }

    if (dto.id) {
      bodyFormData.append('id', dto.id);
    }
    
    let resource = `${AppConstant.ROOT_URL_UPLOADER}/fileupload/document-receipt`;
    if (file.type.includes('video')) {
      bodyFormData.append('typeValidate', 'video');
      resource = `${AppConstant.ROOT_URL_UPLOADER}/fileupload`;
    }

    return await Axios.post(
      resource,
      bodyFormData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }
  
}