import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { DatabaseService } from './shared/services/database.service';
import { FileService } from './shared/services/file.service';
import { SplashScreenService } from './shared/services/splash-screen.service';
import { StatusBarService } from './shared/services/status-bar.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private dbService: DatabaseService,
    private fileService: FileService,
    private splashScreenService: SplashScreenService,
    private platform: Platform,
    private statusBarService: StatusBarService
  ) {
    this.fileService.validatePermissions();
    this.statusBarService.overlay()
  }

  async ngOnInit() {
    await SplashScreen.hide()
    await this.splashScreenService.show();
    await this.dbService.initMigration();
    await this.platform.ready();
    setTimeout(() => {
      this.splashScreenService.hide();
    }, 3000);
  }

}

