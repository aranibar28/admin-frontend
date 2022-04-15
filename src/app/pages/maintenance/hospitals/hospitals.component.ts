import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss'],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchService: SearchService
  ) {}

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public imgSubs!: Subscription;

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getHospitals();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(1000))
      .subscribe(() => this.getHospitals());
  }

  // Buscar el término en la lista de usuarios
  search(words: string) {
    if (words.length === 0) {
      return this.getHospitals();
    }
    return this.searchService.search('hospitals', words).subscribe((result:Hospital[]) => {
      this.hospitals = result;
    });
  }

  getHospitals() {
    this.loading = true;
    this.hospitalService.getHospitals().subscribe((hospitals) => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }

  saveHospital(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital._id!, hospital.name)
      .subscribe(() => {
        Swal.fire('Guardar', hospital.name, 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id!).subscribe(() => {
      this.getHospitals();
      Swal.fire('Eliminado', hospital.name, 'success');
    });
  }

  async createHospitalModal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    });

    if (value!.trim().length > 0) {
      this.hospitalService
        .createHospital(value!)
        .subscribe((resp: any) => this.hospitals.push(resp.hospital));
    }
  }

  updateImageModal(hospital: Hospital) {
    this.modalImageService.openModal(
      'hospitals',
      hospital._id!,
      hospital.image
    );
  }
}
