import { ActionTypeEnum, IAction } from "./action.interface";

export interface IUser {
  _id: string;
  email: string;
  credits: Record<ActionTypeEnum, number>;
  queue: IAction[];
  createdAt?: Date;
  updatedAt?: Date;
  lastActionDeletedAt?: Date;
}
