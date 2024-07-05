import { ObjectId } from 'typeorm';

export interface IModifyAuthRequest extends Request {
  userID?: ObjectId;
  [keys: string]: any;
}
