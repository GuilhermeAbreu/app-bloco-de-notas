export interface NoteParams {
  id: number;
  title: string;
  description: string | null;
  imagePath: string | null;
  notifyAt: Date | null;
}

export abstract class NoteImplement implements NoteParams {
  abstract id: number;
  abstract title: string;
  abstract description: string | null;
  abstract imagePath: string | null;
  abstract notifyAt: Date | null;
}

export type Note = NoteImplement;
export type Notes = Note[];

export type NotesSave =  {
  title: string;
  description: string | null;
  image: string | null;
  notifyAt: Date | null;
}
export type NotePartial = Partial<Note>;
export type NoteUpdate = {
  title: string;
  description: string | null;
  image: string | null;
  notifyAt: Date | null;
}
