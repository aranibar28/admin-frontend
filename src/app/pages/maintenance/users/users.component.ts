import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public imgSubs!: Subscription;
  public from: number = 0;
  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private modalImageService: ModalImageService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getUsers();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(1000))
      .subscribe(() => this.getUsers());
  }

  // Obtener lista de Usuarios
  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  deleteUser(user: User) {
    // Evitar eliminar el mismo usuario
    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }
    // Eliminar usuario
    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de eliminar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe(() => {
          this.getUsers();
          Swal.fire(
            'Eliminado!',
            `El usuario ${user.name} fue eliminado`,
            'success'
          );
        });
      }
    });
    return true;
  }

  // Cambiar Rol mediante el select
  changeRole(user: User) {
    this.userService.updateRole(user).subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El rol ha sido actualizado.',
        showConfirmButton: false,
        timer: 1000,
      });
    });
  }

  // Cambiar paginación
  changePagination(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
      return;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }
    this.getUsers();
  }

  // Buscar el término en la lista de usuarios
  search(words: string) {
    if (words.length === 0) {
      return (this.users = this.usersTemp);
    }
    return this.searchService.search('users', words).subscribe((result) => {
      this.users = result;
    });
  }

  // Abrir el modal y mostrar la imagen actual
  openModal(user: User) {
    this.modalImageService.openModal('users', user.uid!, user.image);
  }
}
