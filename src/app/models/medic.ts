import { environment } from '../../environments/environment';
import { Hospital } from './hospital';

const base_url = environment.base_url;

interface _MedicUser {
  _id: string;
  name: string;
  image?: string;
}

export class Medic {
  constructor(
    public name: string,
    public _id?: string,
    public image?: string,
    public user?: _MedicUser,
    public hospital?: Hospital
  ) {}
}
