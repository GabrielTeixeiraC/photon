import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Link } from "react-router-dom";
import "./ListItem.css";

interface ListItemProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName: string;}
  text: string;
  link: string;
}

export function ListItem({ Icon, text, link }: ListItemProps) {
  return (
    <Link to={link} className="list-item">
      <Icon sx={{alignSelf: 'center'}} className="list-icon"/>
      <p className="list-text">{text}</p>
    </Link>
  );
}