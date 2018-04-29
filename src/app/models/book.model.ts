import {User} from "./user.model";
import {Author} from "./author.model";
import {BookDetails} from "./bookDetails.model";
export class Book {

  constructor(
  ){};
  public id : number;
  public name : string;
  public user :User;
  public bookDetails : BookDetails;
  public authors : Author[]
}
