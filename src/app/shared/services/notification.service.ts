// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {
    this.requestPermission();
  }

  private async requestPermission() {
    const { display } = await LocalNotifications.requestPermissions();
    if (display === 'denied') {
      console.warn('Permissão para notificações não concedida');
    }
  }

  async scheduleNotification(title: string, body: string, datetime: string) {
    const triggerDate = new Date(datetime);

    console.log(triggerDate);

    const options: ScheduleOptions = {
      notifications: [
        {
          id: Math.ceil(Math.random() * 100),
          title,
          body,
          schedule: { at: (triggerDate )},
          channelId: 'default',
          ongoing: false,
        },
      ],
    };

    await LocalNotifications.schedule(options);
  }
}
