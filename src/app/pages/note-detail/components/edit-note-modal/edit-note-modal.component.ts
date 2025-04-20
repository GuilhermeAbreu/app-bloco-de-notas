import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calendarOutline, camera, cameraOutline, close, closeCircle, documentTextOutline, image, imagesOutline, pencilOutline, saveOutline } from 'ionicons/icons';
import { NoteRepositoryService } from 'src/app/repositories/note.repository.service';
import { DateTimeModalComponent } from 'src/app/shared/components/date-time-modal/date-time-modal.component';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { Note, NoteUpdate } from '../../../../shared/interfaces/note.interface';

@Component({
  standalone: true,
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class EditNoteModalComponent implements OnInit {
  @Input() note!: Note;

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    notifyAt: [''],
  });

  imagePath: string | null = null;
  dataHoraSelecionada: Date | null = null;
  private imageChanged = false;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private photo: PhotoService,
    private noteRepository: NoteRepositoryService
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
    });
  }

  ngOnInit() {
    if (!this.note) {
      this.note = {
        id: 0,
        title: '',
        description: null,
        imagePath: null,
        notifyAt: null
      };
    }
    this.form.patchValue({
      title: this.note.title,
      description: this.note.description,
      notifyAt: this.note.notifyAt?.toISOString()
    });
    this.imagePath = this.note.imagePath;
    this.dataHoraSelecionada = this.note.notifyAt ? new Date(this.note.notifyAt) : null;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'action-sheet-custom',
      buttons: [
        {
          text: 'Tirar Foto',
          icon: 'camera',
          handler: () => {
            this.photo.takePhoto().then((photo) => {
              if (photo) {
                this.imagePath = photo;
                this.imageChanged = true;
              }
            });
          }
        },
        {
          text: 'Escolher da Galeria',
          icon: 'image',
          handler: () => {
            this.photo.pickPhoto().then((photo) => {
              if (photo) {
                this.imagePath = photo;
                this.imageChanged = true;
              }
            });
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

  async abrirSeletorDataHora() {
    const modal = await this.modalCtrl.create({
      component: DateTimeModalComponent,
      breakpoints: [0, 0.4],
      initialBreakpoint: 0.4
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.form.patchValue({ notifyAt: data });
    }
  }

  removeReminder() {
    this.form.patchValue({ notifyAt: null });
  }

  removeImage() {
    this.imagePath = null;
    this.imageChanged = true;
  }

  async save() {
    const formValue = this.form.value;
    const updatedNote: NoteUpdate = {
      title: formValue.title!,
      description: formValue.description ?? null,
      notifyAt: formValue.notifyAt ? new Date(formValue.notifyAt) : null,
      image: this.imageChanged ? this.imagePath : null,
      imagePath: this.imagePath
    };

    const note = await this.noteRepository.update(updatedNote, this.note.id);
    await this.modalCtrl.dismiss(note);
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
