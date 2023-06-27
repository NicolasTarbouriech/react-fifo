import { formatDate } from "../util/date.util";
import { PropsActions } from "../interface/action.interface";
import { List, ListItem } from "@mui/material";

export function ActionsList(props: PropsActions) {
  return (
    <List>
      {props.actions.map((action, index) => (
        <ListItem key={index}>{action.type}, Created At: {formatDate(action.createdAt)}</ListItem>
      ))}
    </List>
  );
}
