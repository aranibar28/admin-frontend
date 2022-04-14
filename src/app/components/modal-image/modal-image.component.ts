import { Component } from '@angular/core';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { UploadsService } from 'src/app/services/uploads.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss'],
})
export class ModalImageComponent {
  public photo!: File;
  public imgTemp: any;

  constructor(
    public modalImageService: ModalImageService,
    private uploadService: UploadsService
  ) {}

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
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
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.uploadService
      .updatePhoto(this.photo, type, id)
      .then((image) => {
        Swal.fire('Guardado', 'Imagen actualizada', 'success');
        this.modalImageService.newImage.emit(image)
        this.closeModal();
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
