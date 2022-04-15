import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Modelos y Servicios
import { Medic } from 'src/app/models/medic';
import { MedicService } from 'src/app/services/medic.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
})
export class MedicsComponent implements OnInit, OnDestroy {
  constructor(
    private medicService: MedicService,
    private modalImageService: ModalImageService,
    private searchService: SearchService
  ) {}

  public medics: Medic[] = [];
  public loading: boolean = true;
  public imgSubs!: Subscription;

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getMedics();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(1000))
      .subscribe(() => this.getMedics());
  }

  // Buscar el término en la lista de usuarios
  search(words: string) {
    if (words.length === 0) {
      return this.getMedics();
    }
    return this.searchService
      .search('medics', words)
      .subscribe((result: Medic[]) => {
        this.medics = result;
      });
  }

  // Obtener Médicos
  getMedics() {
    this.loading = true;
    this.medicService.getMedics().subscribe((medics) => {
      this.loading = false;
      this.medics = medics;
    });
  }

  // Eliminar Médico
  deleteMedic(medic: Medic) {
    Swal.fire({
      title: '¿Borrar Médico?',
      text: `Esta a punto de eliminar a ${medic.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicService.deleteMedic(medic._id!).subscribe(() => {
          this.getMedics();
          Swal.fire(
            'Eliminado!',
            `El Médico ${medic.name} fue eliminado`,
            'success'
          );
        });
      }
    });
  }

  // Actualizar Médico
  updateImageModal(medic: Medic) {
    this.modalImageService.openModal('medics', medic._id!, medic.image);
  }

}
