import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonicModule, ModalController, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { alarmOutline, closeOutline, createOutline, notificationsOutline, trashOutline } from 'ionicons/icons';
import { NoteRepositoryService } from 'src/app/repositories/note.repository.service';
import { Note } from 'src/app/shared/interfaces/note.interface';
import { FileService } from 'src/app/shared/services/file.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { EditNoteModalComponent } from './components/edit-note-modal/edit-note-modal.component';

@Component({
  standalone: true,
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class NoteDetailPage implements OnInit {
  note?: Note;

  constructor(
    private route: ActivatedRoute,
    private photo: PhotoService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private noteRepository: NoteRepositoryService,
    private fileService: FileService
  ) {
    addIcons({
      notificationsOutline,
      createOutline,
      trashOutline,
      closeOutline,
      alarmOutline
    })
  }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const note = await this.noteRepository.findById(id);

    if (!note) {
      this.navCtrl.back();
      return;
    }

    this.note = note;
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

  async editNote() {
    if (!this.note) return;

    const modal = await this.modalCtrl.create({
      component: EditNoteModalComponent,
      componentProps: {
        note: { ...this.note }
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.note = data;
    }
  }

}
