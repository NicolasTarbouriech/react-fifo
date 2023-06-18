import { formatDate } from "../util/date.util";
import { IActionType } from "../interface/action.interface";

export function ActionTypeList(props: { actions: IActionType[] }) {
  return (
    <ul>
      {props.actions.map((action, index) => (
        <li key={index}>{action.type}, Created At: {formatDate(action.createdAt)}</li>
      ))}
    </ul>
  );
}
