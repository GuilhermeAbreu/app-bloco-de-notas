import { Injectable } from '@angular/core';
import { DatabaseConnectionOrmSQlite, QueryBuildOrmSQlite } from '@guilhermeabreudev/capacitor-orm-sqlite';
import { Note } from '../model/note.model';
import { NotesSave } from '../shared/interfaces/note.interface';
import { FileService } from '../shared/services/file.service';
import { NotificationService } from '../shared/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class NoteRepositoryService {

  constructor(
    private fileService: FileService,
    private notification: NotificationService
  ) {

  }

  public async save(noteSave: NotesSave) {

    const note = new Note(
      {
        title: noteSave.title,
        description: noteSave.description,
        notifyAt: noteSave.notifyAt,
      }
    );

    try {

      if (noteSave.image) {
       const {path} = await this.fileService.saveFile(noteSave.image, '.jpeg');
       note.imagePath = path;
      }

      DatabaseConnectionOrmSQlite.beginTransaction();

      const result = await DatabaseConnectionOrmSQlite.query(
        new QueryBuildOrmSQlite(Note)
          .insert(note)
      );

      if (note.notifyAt) {
        await this.notification.scheduleNotification(
          'Lembrete',
          `Nota: ${note.title}`,
          note.notifyAt
        );
      }

      DatabaseConnectionOrmSQlite.commitTransaction();
      return result;

    } catch (error) {

      if (note.imagePath) {
        await this.fileService.deleteFile(note.imagePath);
      }

      console.error(error);
      DatabaseConnectionOrmSQlite.rollbackTransaction();
      throw error;
    }
  }

  public async findAll(): Promise<Note[]> {
    const notes = await DatabaseConnectionOrmSQlite.query(
      new QueryBuildOrmSQlite(Note)
        .getQuery()
    );

    return notes.map((note) => new Note(note)) ?? [];
  }

  public async findById(id: number): Promise<Note | null> {
    const note = await DatabaseConnectionOrmSQlite.query(
      new QueryBuildOrmSQlite(Note)
        .where('id', id)
        .getQuery()
    );

    return note[0] ?? null;
  }

  public async delete(id: number) {
    return await DatabaseConnectionOrmSQlite.query(
      new QueryBuildOrmSQlite(Note)
        .where('id', id)
        .delete()
    );
  }

}

