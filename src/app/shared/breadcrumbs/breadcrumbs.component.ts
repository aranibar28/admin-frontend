import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnDestroy {
  public title: string = '';
  public titleSubs$!: Subscription;

  // Asignamos una constante de Suscripción para la función y nos suscribimos
  constructor(private router: Router) {
    this.titleSubs$ = this.getArgumentsRoute().subscribe(({ title }) => {
      this.title = title;
      document.title = `AdminPro - ${title}`;
    });
  }

  // Destruir la suscripción para una mejor optimización
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getArgumentsRoute() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd), // Filtrar por instancia ActivationEnd, retorna 2
      filter((event: any) => event.snapshot.firstChild === null), // Filtrar por firstChild nulo
      map((event: ActivationEnd) => event.snapshot.data) // Mapear el titulo
    );
  }
}
