import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

import { UploadsService } from 'src/app/services/uploads.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  public profileForm!: FormGroup;
  public user: User;
  public photo!: File;
  public imgTemp: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private uploadService: UploadsService
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }
  
  // Actualizar Datos
  updateProfile() {
    this.userService.updateUser(this.profileForm.value).subscribe({
      next: () => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
        Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }

  // Seleccionar Imagen
  uploadImage(event: any) {
    const file = event.target.files[0];
    this.photo = file;
    if (!file) {
      return (this.imgTemp = null); // Reiniciar la imagen
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgTemp = reader.result;
    };
    return true;
  }

  // Actualizar Imagen
  updateImage() {
    this.uploadService
      .updatePhoto(this.photo, 'users', this.user.uid!)
      .then((img) => {
        this.user.image = img;
        Swal.fire('Guardado', 'Imagen actualizada', 'success');
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
