import { Injectable } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {

  constructor() {}

  public async disableOverlay(): Promise<void> {
    await StatusBar.setOverlaysWebView({ overlay: false });
    await StatusBar.show();
  }

  public async overlay(): Promise<void> {
    await StatusBar.setOverlaysWebView({ overlay: true });
    await StatusBar.show();
  }

}
