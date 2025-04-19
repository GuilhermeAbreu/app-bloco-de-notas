import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { DateUtil } from '../../utils/date.util';

@Component({
  selector: 'app-date-time-modal',
  standalone: true,
  styleUrls: ['./date-time-modal.component.scss'],
  templateUrl: './date-time-modal.component.html',
  imports: [
    IonicModule
  ]
})
export class DateTimeModalComponent implements OnInit {

  public dataMinima: String = DateUtil.toISOString(new Date());

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
