import { IUser } from "./user.interface";

export enum ActionTypeEnum {
  A = "A",
  B = "B",
  C = "C",
}

export const actionTypeEnum = Object.values(ActionTypeEnum);
export type ActionTypes = (typeof actionTypeEnum)[number];

export interface IAction {
  type: ActionTypes;
  credits: Number;
  createdAt?: Date;
  updatedAt?: Date;
  owner: IUser;
}

export interface IActionType {
  type: string,
  createdAt: string
}

