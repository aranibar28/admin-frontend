import { environment } from '../../environments/environment';

const base_url = environment.base_url;

interface _HospitalUser {
  _id: string;
  name: string;
  image?: string;
}

export class Hospital {
  constructor(
    public name: string,
    public _id?: string,
    public image?: string,
    public user?: _HospitalUser
  ) {}
}
