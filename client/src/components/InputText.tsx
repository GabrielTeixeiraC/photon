import './InputText.css'

interface UInput{ 
    label?: string;
    type?: string;
    withoutIcon?: boolean;
    disabled?: boolean;
}

export default function InputText({label, type, withoutIcon = false, disabled = false}: UInput){
  return(
    <>
      {
        !withoutIcon ? (
          <input type={type} placeholder={label} className="input-text"/>


        ) : (
          <input type={type} placeholder={label} disabled={disabled} className="input-text"/>
        )
      }
    </>
  );
}