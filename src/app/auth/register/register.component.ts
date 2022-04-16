import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  public expression: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(this.expression)]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      terms: [false, [Validators.required]],
    },
    {
      validators: this.samePassword('password', 'password2'),
    }
  );

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar POST
    this.userService.createUser(this.registerForm.value).subscribe({
      next: async () => {
        await Swal.fire('Bienvenido', 'Usuario Creado', 'success');
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }

  invalidFied(data: string): boolean {
    if (this.registerForm.get(data)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  invalidPassword() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  samePassword(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Controll = formGroup.get(pass1);
      const pass2Controll = formGroup.get(pass2);

      if (pass1Controll?.value === pass2Controll?.value) {
        pass2Controll?.setErrors(null);
      } else {
        pass2Controll?.setErrors({ noEsIgual: true });
      }
    };
  }

  acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }
}
