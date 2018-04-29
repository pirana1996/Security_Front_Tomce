import {User} from "./user.model";
import {Book} from "./book.model";
export class TradeRequest {
  constructor(
    public id : number,
    public user : User,
    public givenBook : Book,
    public takenBook: Book){};
}
