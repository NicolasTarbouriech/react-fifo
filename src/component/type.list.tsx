import { formatDate } from "../util/date.util";

export function ActionTypeList(props: { actions: { type: string, createdAt: string }[] }) {
  return (
    <ul>
      {props.actions.map((action, index) => (
        <li key={index}>{action.type}, Created At: {formatDate(action.createdAt)}</li>
      ))}
    </ul>
  );
}
