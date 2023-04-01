import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import './Input.css';

interface InputProps {
  type: string;
  placeholder: string;
  setValue: (value: string) => void;
  value: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName: string;}
}

export function Input({type, placeholder, setValue, value, Icon} : InputProps) {
  return(
    <div className="text-input">
      <input type={type} placeholder={placeholder} onChange={(e)=>setValue(e.target.value)} value={value} className="input-text"/>
      <div className="input-icon"><Icon sx={{alignSelf: 'center'}}/></div>
    </div>
  );
}