import { Component } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DatabaseConnectionOrmSQlite } from '@guilhermeabreudev/capacitor-orm-sqlite';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DatabaseService } from './shared/services/database.service';
import { FileService } from './shared/services/file.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private dbService: DatabaseService, private fileService: FileService) {
    new DatabaseConnectionOrmSQlite(
      new SQLiteConnection(CapacitorSQLite),
      'blocodenotas',
      false,
      'no-encryption',
      1,
      false,
      true
    );
    this.dbService.initMigration();
    this.fileService.validatePermissions();
  }
}

