import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  // Buscar
  search(type: 'users' | 'medics' | 'hospitals', word: string) {
    const url = `${base_url}/search/collection/${type}/${word}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return this.transformUser(resp.result);
          default:
            return [];
        }
      })
    );
  }
}
