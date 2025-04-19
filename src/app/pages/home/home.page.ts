// src/app/pages/home/home.page.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { NoteRepositoryService } from 'src/app/repositories/note.repository.service';
import { Note } from 'src/app/shared/interfaces/note.interface';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notes: Note[] = [];

  constructor(
    private noteRepository: NoteRepositoryService,
    private file: FileService,
    private router: Router
  ) {
    addIcons({add})
  }

  async ngOnInit() {
    await this.loadNotes();
  }

  ionViewWillEnter() {
    this.loadNotes();
  }

  async loadNotes() {
    this.notes = await this.noteRepository.findAll();

    for (const note of this.notes) {
      if (note.imagePath) {
        note.imagePath = await this.file.getFilePath(note.imagePath);
      }
    }
  }

  openNote(id: number) {
    this.router.navigate(['/nota', id]);
  }

  addNote() {
    this.router.navigate(['/nova-nota']);
  }
}
