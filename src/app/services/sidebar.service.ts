import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  /* menu: any[] = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/' },
        { title: 'Progress', url: 'progress' },
        { title: 'Gráficas', url: 'graphics' },
        { title: 'Promesas', url: 'promises' },
        { title: 'Rxjs', url: 'rxjs' },
      ],
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', url: 'usuarios' },
        { title: 'Médicos', url: 'medicos' },
        { title: 'Hospitales', url: 'hospitales' },
      ],
    },
  ]; */

  public menu = [];

  getMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
  }
}
