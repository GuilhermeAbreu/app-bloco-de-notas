import { Column, EntityName } from '@guilhermeabreudev/capacitor-orm-sqlite';
import { NoteImplement, NotePartial } from '../shared/interfaces/note.interface';

@EntityName('notes')
export class Note implements NoteImplement {

  @Column({ primaryKey: true })
  public id!: number;

  @Column()
  public title!: string;

  @Column()
  public description: string = '';

  @Column()
  public imagePath!: string;

  @Column()
  public notifyAt!: string;

  constructor(note?: NotePartial) {
    this.id = note?.id ?? this.id;
    this.title = note?.title ?? this.title;
    this.description = note?.description ?? this.description;
    this.imagePath = note?.imagePath ?? this.imagePath;
    this.notifyAt = note?.notifyAt ?? this.notifyAt;
  }

}
