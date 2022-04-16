import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital';
import { Medic } from '../models/medic';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { token: this.token },
    };
  }

  // Instanciar el arreglo Usuarios del objeto Resultados
  private transformUser(result: any[]): User[] {
    return result.map(user => new User(user.name, user.email, '', user.image, user.google, user.role, user.uid ));
  }

  // Instanciar el arreglo Hospitales del objeto Resultados
  private transformHospital(result: any[]): Hospital[] {
    return result;
  }

  // Instanciar el arreglo Medicos del objeto Resultados
  private transformMedic(result: any[]): Medic[] {
    return result;
  }

  globalSearch(term: string){
    const url = `${base_url}/search/${term}`;
    return this.http.get(url, this.headers)
  }

  // Buscar
  search(type: 'users' | 'medics' | 'hospitals', word: string) {
    const url = `${base_url}/search/collection/${type}/${word}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return this.transformUser(resp.result);
          case 'hospitals':
            return this.transformHospital(resp.result);
          case 'medics':
            return this.transformMedic(resp.result);
          default:
            return [];
        }
      })
    );
  }
}
