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

  async scheduleNotification(options: {
    title: string;
    body: string;
    datetime: string;
    urlImage: string;
  }) {
    const triggerDate = new Date(options.datetime);

    const scheduleOptions: ScheduleOptions = {

      notifications: [
        {
          id: Math.ceil(Math.random() * 100),
          title: options.title,
          body: options.body,
          schedule: { at: (triggerDate )},
          channelId: 'default',
          ongoing: false,
          attachments: [
            {
                url: options.urlImage,
                id: options.urlImage,
            }
          ]
        },
      ],
    };

    await LocalNotifications.schedule(scheduleOptions);
  }
}
