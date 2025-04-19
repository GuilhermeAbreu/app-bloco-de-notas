// src/app/pages/home/home.page.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, alarmOutline } from 'ionicons/icons';
import { NoteRepositoryService } from 'src/app/repositories/note.repository.service';
import { Note } from 'src/app/shared/interfaces/note.interface';
import { FileService } from 'src/app/shared/services/file.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
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
    private router: Router,
    private notificationService: NotificationService
  ) {
    addIcons({add, alarmOutline})
  }

  async ngOnInit() {
    await this.loadNotes();
  }

  ionViewWillEnter() {
    this.loadNotes();
  }

  async loadNotes() {
    this.notes = await this.noteRepository.findAll();
  }

  openNote(id: number) {
    this.router.navigate(['/nota', id]);
  }

  addNote() {
    this.router.navigate(['/nova-nota']);
  }

  async scheduleNotification() {
    await this.notificationService.scheduleNotification({
      title: 'Teste',
      body: 'Teste',
      datetime: new Date(Date.now() + 1000 * 3).toISOString(),
    });
  }
}
