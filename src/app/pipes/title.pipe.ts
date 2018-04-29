import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let result = value;
    if (value.length > 16) {
      result = value.substr(0, 15) + "...";
    }
    return  result;
  }

}
