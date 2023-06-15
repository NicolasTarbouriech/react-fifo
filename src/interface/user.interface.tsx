import { IAction } from "./action.interface";

export interface IUser extends Document {
  email: string;
  credits: {
    [key: string]: number;
  };
  queue: IAction[];
  createdAt?: Date;
  updatedAt?: Date;
  lastActionDeletedAt?: Date;
}
