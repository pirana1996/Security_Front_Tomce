import {Book} from "./book.model";
import {Author} from "./author.model";
export class BookDetails {

  constructor(
    public id : number,
    public book : Book,
    public description : string
  ) {}
}
