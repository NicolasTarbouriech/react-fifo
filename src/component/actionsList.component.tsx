import { formatDate } from "../util/date.util";
import { IAction } from "../interface/action.interface";

export function ActionsList(props: { actions: IAction[] }) {
  return (
    <ul>
      {props.actions.map((action, index) => (
        <li key={index}>{action.type}, Created At: {formatDate(action.createdAt)}</li>
      ))}
    </ul>
  );
}
