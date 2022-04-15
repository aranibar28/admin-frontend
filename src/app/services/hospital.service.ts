import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { token: this.token },
    };
  }

  // Cargar Hospitales
  getHospitals() {
    const url = `${base_url}/hospitals`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: any) => resp.hospitals));
  }

  // Cargar Hospital
  createHospital(name: string) {
    const url = `${base_url}/hospitals`;
    return this.http.post(url, { name }, this.headers);
  }

  // Actualizar Hospital
  updateHospital(_id: string, name: string) {
    const url = `${base_url}/hospitals/${_id}`;
    return this.http.put(url, { name }, this.headers);
  }

  // Borrar Hospital
  deleteHospital(_id: string) {
    const url = `${base_url}/hospitals/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
