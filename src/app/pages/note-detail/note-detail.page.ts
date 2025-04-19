// src/app/pages/note-detail/note-detail.page.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { NoteRepositoryService } from 'src/app/repositories/note.repository.service';
import { Note } from 'src/app/shared/interfaces/note.interface';
import { PhotoService } from 'src/app/shared/services/photo.service';


@Component({
  standalone: true,
  selector: 'app-note-detail',
  imports: [CommonModule, IonicModule],
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  note?: Note;

  constructor(
    private route: ActivatedRoute,
    private photo: PhotoService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private noteRepository: NoteRepositoryService
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const note = await this.noteRepository.findById(id);

    if (!note) {
      this.navCtrl.back();
      return;
    }

    this.note = note;

    if (this.note?.imagePath) {
      this.note.imagePath = this.note.imagePath.replace('file://', '');
    }
  }

  async deleteNote() {
    const alert = await this.alertCtrl.create({
      header: 'Excluir',
      message: 'Deseja excluir esta nota?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: async () => {
            await this.noteRepository.delete(this.note!.id!);
            this.navCtrl.back();
          },
        },
      ],
    });

    await alert.present();
  }
}
