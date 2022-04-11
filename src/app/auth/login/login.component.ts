import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  public expression: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.pattern(this.expression)]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  // Iniciar Sesión
  login() {
    this.userService.login(this.loginForm.value).subscribe({
      next: () => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }

  // Rederizar el botón de Google
  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  // Iniciar Sesión
  async startApp() {
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  // Capturar el evento y enviar la respuesta
  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token).subscribe((resp) => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
