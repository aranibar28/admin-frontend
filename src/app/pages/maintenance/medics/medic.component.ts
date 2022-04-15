import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital';
import { Medic } from 'src/app/models/medic';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicService } from 'src/app/services/medic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: [],
})
export class MedicComponent implements OnInit {
  public medicForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public medicSelected: Medic | undefined;
  public hospitalSelected: Hospital | undefined;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicService: MedicService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

  getMedic(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.medicService.getMedicById(id).subscribe((medic) => {
      console.log(medic);
      this.medicSelected = medic;
    });
  }

  getHospitals() {
    this.hospitalService.getHospitals().subscribe((hospitals: Hospital[]) => {
      this.hospitals = hospitals;
    });
  }

  saveMedic() {
    const { name } = this.medicForm.value;
    this.medicService
      .createMedic(this.medicForm.value)
      .subscribe((resp: any) => {
        Swal.fire('Creado', `${name} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medicos/${resp.medic._id}`);
      });
  }
}
