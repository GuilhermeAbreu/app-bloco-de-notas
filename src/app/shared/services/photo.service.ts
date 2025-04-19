// src/app/services/photo.service.ts
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  async takePhoto(): Promise<string | null> {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 80,
      });

      if (!photo.base64String) {
        return null;
      }

      return 'data:image/jpeg;base64,'+photo.base64String;

    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      return null;
    }
  }

  async pickPhoto(): Promise<string | null> {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
        quality: 80,
      });

      if (!photo.base64String) {
        return null;
      }

      return 'data:image/jpeg;base64,'+photo.base64String;
    } catch (error) {
      console.error('Erro ao escolher foto:', error);
      return null;
    }
  }

}
