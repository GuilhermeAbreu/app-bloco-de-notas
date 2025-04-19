import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { DateUtil } from '../../utils/date.util';

@Component({
  selector: 'app-date-time-modal',
  standalone: true,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Selecionar Data e Hora</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cancelar()">
            <ion-icon name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-datetime
        [preferWheel]="true"
        [showDefaultButtons]="true"
        presentation="date-time"
        locale="pt-BR"
        displayFormat="DD/MM/YYYY HH:mm"
        (ionChange)="dataHoraSelecionada($event)"
        cancelText="Cancelar"
        doneText="Confirmar"
        [min]="dataMinima"
      >
      </ion-datetime>
    </ion-content>
  `,
  imports: [
    IonicModule
  ]
})
export class DateTimeModalComponent implements OnInit {

  dataMinima: String = DateUtil.toISOString(new Date());

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {}

  cancelar() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  dataHoraSelecionada(event: any) {
    const valor = event.detail.value;
    return this.modalCtrl.dismiss(valor, 'confirm');
  }
}
