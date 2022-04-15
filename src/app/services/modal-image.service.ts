import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  constructor() {}
  private _hiddenModal: boolean = true;
  public type!: 'users' | 'medics' | 'hospitals';
  public id!: string;
  public image?: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get showModal() {
    return this._hiddenModal;
  }

  openModal(
    type: 'users' | 'medics' | 'hospitals',
    id: string,
    image: string = 'no-img.png'
  ) {
    this._hiddenModal = false;
    this.type = type;
    this.id = id;

    if (image.includes('https')) {
      this.image = image;
    } else {
      this.image = `${base_url}/upload/${type}/${image}`;
    }
  }

  closeModal() {
    this._hiddenModal = true;
  }
}

//http://localhost:3000/api/upload/users/69a3d015-fcf7-427d-b775-cefb46eb200a.jpg
