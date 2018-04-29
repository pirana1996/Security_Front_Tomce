import { Pipe, PipeTransform } from '@angular/core';
import {Author } from "../models/author.model";
@Pipe({
  name: 'array'
})
export class ArrayPipe implements PipeTransform {

  transform(authors : Author[]): Author[] {
    for(var i=0; i<authors.length; i++) {
      if(i != authors.length - 1 && i == 0) {
        authors[i].name = authors[i].name  + ", ";
      }
    }
    if (authors.length > 2)
      authors[1].name = authors[1].name + "...";
    return authors.slice(0, 2);
  }

}
