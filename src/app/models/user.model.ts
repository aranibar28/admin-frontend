import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public image?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {}

  get imageUrl() {
    if (this.image?.includes('https')) {
      return this.image;
    }

    if (this.image) {
      return `${base_url}/upload/users/${this.image}`;
    } else {
      return 'https://cdn-icons-png.flaticon.com/512/219/219983.png';
    }
  }
}
