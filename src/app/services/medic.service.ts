import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medic } from '../models/medic';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MedicService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { token: this.token },
    };
  }

  // Cargar Médicos
  getMedics() {
    const url = `${base_url}/medics`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(map((resp: { ok: boolean; medics: Medic[] }) => resp.medics));
  }

  // Cargar Médico por ID
  getMedicById(id: string) {
    const url = `${base_url}/medics/${id}`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(map((resp: { ok: boolean; medic: Medic }) => resp.medic));
  }

  // Cargar Médico
  createMedic(medic: Medic) {
    const url = `${base_url}/medics`;
    return this.http.post(url, medic, this.headers);
  }

  // Actualizar Médico
  updateMedic(medic: Medic) {
    const url = `${base_url}/medics/${medic._id}`;
    return this.http.put(url, medic, this.headers);
  }

  // Borrar Médico
  deleteMedic(_id: string) {
    const url = `${base_url}/medics/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
