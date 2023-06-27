import { formatDate } from "../util/date.util";
import { PropsActions } from "../interface/action.interface";

export function ActionsList(props: PropsActions) {
  return (
    <ul>
      {props.actions.map((action, index) => (
        <li key={index}>{action.type}, Created At: {formatDate(action.createdAt)}</li>
      ))}
    </ul>
  );
}
