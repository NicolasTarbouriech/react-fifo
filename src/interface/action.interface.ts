export enum ActionTypeEnum {
  A = "A",
  B = "B",
  C = "C",
}

export const actionTypeEnum = Object.values(ActionTypeEnum);
export type ActionTypes = (typeof actionTypeEnum)[number];

export interface IAction {
  type: ActionTypes;
  credits: number;
  createdAt?: Date;
  updatedAt?: Date;
  owner: string;
}

export interface PropsActions {
  actions: IAction[]
}
