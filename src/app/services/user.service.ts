import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login.form.interface';
import { RegisterForm } from '../interfaces/register.form.interface';
import { listUser } from '../interfaces/users.interface';
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

  get headers() {
    return {
      headers: { token: this.token },
    };
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
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);
  }

  // Actualizar Rol Usuario
  updateRole(user: User) {
    //data = { ...data, role: this.user.role };
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }

  // Cargar Usuarios
  getUsers(from: number = 0) {
    const url = `${base_url}/users?from=${from}`;
    return this.http.get<listUser>(url, this.headers).pipe(
      map((resp) => {
        const users = resp.users.map(
          (user) =>
            new User(
              user.name,
              user.email,
              '',
              user.image,
              user.google,
              user.role,
              user.uid
            )
        );
        return { total: resp.total, users };
      })
    );
  }

  // Eliminar Usuarios
  deleteUser(user: User) {
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete<listUser>(url, this.headers);
  }
}
