import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withPreloading } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DatabaseConnectionOrmSQlite } from '@guilhermeabreudev/capacitor-orm-sqlite';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const sQLiteConnection = new SQLiteConnection(CapacitorSQLite);
new DatabaseConnectionOrmSQlite(
  sQLiteConnection,
  'blocodenotas',
  false,
  'no-encryption',
  1,
  false,
  true
);
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
