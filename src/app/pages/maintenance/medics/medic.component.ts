import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';

// Modelos y Servicios
import { Medic } from 'src/app/models/medic';
import { Hospital } from 'src/app/models/hospital';
import { MedicService } from 'src/app/services/medic.service';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
})
export class MedicComponent implements OnInit {
  public medicForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public medicSelected: Medic | undefined;
  public hospitalSelected: Hospital | undefined;

  constructor(
    private fb: FormBuilder,
    private medicService: MedicService,
    private hospitalService: HospitalService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.getMedic(id));

    this.medicForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.getHospitals();

    this.medicForm.get('hospital')?.valueChanges.subscribe((id) => {
      this.hospitalSelected = this.hospitals.find(
        (hospital) => hospital._id === id
      );
    });
  }

  // Obtener Médicos
  getMedic(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.medicService
      .getMedicById(id)
      .pipe(delay(100))
      .subscribe((medic) => {
        if (!medic) {
          this.router.navigateByUrl(`/dashboard/medicos`);
        } else {
          const { name, hospital } = medic;
          this.medicSelected = medic;
          this.medicForm.setValue({ name, hospital: hospital!._id });
        }
      });
  }

  // Obtener Hospitales
  getHospitals() {
    this.hospitalService.getHospitals().subscribe((hospitals: Hospital[]) => {
      this.hospitals = hospitals;
    });
  }

  // Guardar Médico
  saveMedic() {
    const { name } = this.medicForm.value;
    if (this.medicSelected) {
      // Actualizar Médico
      const data = { ...this.medicForm.value, _id: this.medicSelected._id };
      this.medicService.updateMedic(data).subscribe((resp) => {
        console.log(resp);
        Swal.fire('Actualizar', `${name} actualizado correctamente`, 'success');
      });
    } else {
      // Crear Médico
      this.medicService
        .createMedic(this.medicForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${name} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medicos/${resp.medic._id}`);
        });
    }
  }
}
