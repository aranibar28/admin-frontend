import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login.form.interface';
import { RegisterForm } from '../interfaces/register.form.interface';

const base_url = environment.base_url;
const google_id = environment.google_id;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
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
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          token: token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        catchError((error) => of(false))
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
}
