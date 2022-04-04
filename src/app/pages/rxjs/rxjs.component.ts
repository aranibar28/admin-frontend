import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent {
  constructor() {
    const obs$0 = new Observable((observer) => {
      let i = -1;
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          observer.error('llego al error');
        }
      }, 1000);
    }).subscribe({
      next: (valor) => console.log('Subs', valor),
      error: (error) => console.warn('Error', error),
      complete: () => console.info('Obs terminado'),
    });
  }
}
