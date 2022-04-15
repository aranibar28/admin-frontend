import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(image: string, type: 'users' | 'medics' | 'hospitals'): string {
    if (image) {
      return `${base_url}/upload/${type}/${image}`;
    } else if (!image) {
      return `${base_url}/upload/${type}/no-img.png`;
    } else if (image.includes('https')) {
      return image;
    } else {
      return `${base_url}/upload/${type}/no-img.png`;
    }
  }
}
