import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login.form.interface';
import { RegisterForm } from '../interfaces/register.form.interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;
const google_id = environment.google_id;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  public user!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  // Inicializar Google
  googleInit() {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: google_id,
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  // Cerrar Sesión
  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  // Renovar Token
  validateToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          token: this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, name, role, image = '', uid } = resp.userDB;
          this.user = new User(name, email, '', image, google, role, uid);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  // Crear Usuario
  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users/`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  // Actualizar Usuario
  updateUser(data: { email: string; name: string; role?: string }) {
    data = { ...data, role: this.user.role };
    return this.http.put(`${base_url}/users/${this.uid}`, data, {
      headers: {
        token: this.token,
      },
    });
  }
}
