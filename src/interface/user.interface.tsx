import { ActionTypeEnum, IAction } from "./action.interface";

export interface IUser extends Document {
  email: string;
  credits: Record<ActionTypeEnum, number>;
  queue: IAction[];
  createdAt?: Date;
  updatedAt?: Date;
  lastActionDeletedAt?: Date;
}
