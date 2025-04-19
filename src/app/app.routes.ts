import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'nova-nota',
    loadComponent: () =>
      import('./pages/note-form/note-form.page').then((m) => m.NoteFormPage),
  },
  {
    path: 'nota/:id',
    loadComponent: () =>
      import('./pages/note-detail/note-detail.page').then((m) => m.NoteDetailPage),
  },
];
