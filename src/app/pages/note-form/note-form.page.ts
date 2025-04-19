import { addIcons } from 'ionicons';
// src/app/pages/note-form/note-form.page.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionSheetController, IonicModule, ModalController, NavController } from '@ionic/angular';
import { calendarOutline, camera, cameraOutline, close, closeCircle, documentTextOutline, image, imagesOutline, pencilOutline, saveOutline } from 'ionicons/icons';
import { NoteRepositoryService } from 'src/app/repositories/note.repository.service';
import { DateTimeModalComponent } from 'src/app/shared/components/date-time-modal/date-time-modal.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  standalone: true,
  selector: 'app-note-form',
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './note-form.page.html',
  styleUrls: ['./note-form.page.scss'],
})
export class NoteFormPage {
  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    notifyAt: [''],
  });

  imagePath: string | null = null;
  dataHoraSelecionada: Date | null = null;

  constructor(
    private fb: FormBuilder,
    private noteRepository: NoteRepositoryService,
    private photo: PhotoService,
    private notification: NotificationService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {
    addIcons({
      pencilOutline,
      documentTextOutline,
      calendarOutline,
      cameraOutline,
      imagesOutline,
      closeCircle,
      saveOutline,
      camera,
      image,
      close
    })
  }

  async saveNote() {
    const formValue = this.form.value;

    if (!formValue.title) {
      return;
    }

    const noteData = {
      title: formValue.title,
      description: formValue.description ??  null,
      notifyAt: formValue.notifyAt ?? null,
      image: this.imagePath ?? null,
    };

    await this.noteRepository.save(noteData);

    this.navCtrl.back();
  }


  async takePhoto() {
    this.imagePath = await this.photo.takePhoto();
  }

  async pickPhoto() {
    this.imagePath = await this.photo.pickPhoto();
  }

  removeImage() {
    this.imagePath = null;
  }

  async abrirSeletorDataHora() {
    const modal = await this.modalCtrl.create({
      component: DateTimeModalComponent,
      cssClass: 'data-hora-modal'
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      this.dataHoraSelecionada = new Date(data);
      this.form.patchValue({
        notifyAt: this.dataHoraSelecionada?.toISOString() ?? null
      });
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.pickPhoto();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
}
