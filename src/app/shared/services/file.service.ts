import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

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

  async saveFile(content: string, extension: string = ''): Promise<{
    path: string;
    fileName: string;
    content: string;
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

      await Filesystem.writeFile({
        path,
        data: content,
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });

      return {
        path,
        fileName,
        content
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

    return result.uri;
  }
}
