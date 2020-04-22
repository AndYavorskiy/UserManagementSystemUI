import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entityStatus'
})
export class EntityStatusPipe implements PipeTransform {

  transform(value: boolean) {
    return value ? 'Active' : 'Inactive';
  }
}
