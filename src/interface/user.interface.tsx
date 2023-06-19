import { ActionTypeEnum, IAction } from "./action.interface";

export interface IUser {
  email: string;
  credits: Record<ActionTypeEnum, number>;
  queue: IAction[];
  createdAt?: Date;
  updatedAt?: Date;
  lastActionDeletedAt?: Date;
}
