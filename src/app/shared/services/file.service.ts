import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { FileUtil } from '../utils/file.util';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  public async validatePermissions(): Promise<void> {
    const  permission = await Filesystem.requestPermissions();
    if (permission.publicStorage === 'denied') {
      throw new Error('Permissão para acessar o diretório não concedida');
    }
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async saveFile(content: string | Blob, extension: string = ''): Promise<{
    path: string;
    fileName: string;
    uri: string;
    url: string;
  }> {
    try {
      const fileName = `${this.generateUUID()}${extension}`;
      const path = `note/${fileName}`;

      try {
        await Filesystem.mkdir({
          path: 'note',
          directory: Directory.Data,
          recursive: true,
        });
      } catch (error) {
        if (!(error instanceof Error) || !error.message.includes('exists')) {
          throw error;
        }
      }

      let data: string;
      if (content instanceof Blob) {
        data = await FileUtil.blobToBase64(content);
      } else {
        data = content.split(',')[1] || content;
      }

      const {uri} = await Filesystem.writeFile({
        path,
        data,
        directory: Directory.Data,
      });

      return {
        path,
        fileName,
        uri,
        url: Capacitor.convertFileSrc(uri)
      };

    } catch (error) {
      console.error('Erro ao salvar arquivo:', error);
      throw error;
    }
  }

  async readFile(path: string): Promise<string> {
    try {
      const result = await Filesystem.readFile({
        path,
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });

      return result.data.toString();
    } catch (error) {
      console.error('Erro ao ler arquivo:', error);
      throw error;
    }
  }

  async deleteFile(path: string): Promise<void> {
    try {
      await Filesystem.deleteFile({
        path,
        directory: Directory.Data
      });
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
      throw error;
    }
  }

  public async getFilePath(fileName: string): Promise<string> {
    const result = await Filesystem.getUri({
      path: fileName,
      directory: Directory.Data
    });

    return Capacitor.convertFileSrc(result.uri);
  }
}
