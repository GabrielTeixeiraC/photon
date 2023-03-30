import Button from '@mui/material/Button';
import InputText from './InputText';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import './LoginPage.css';

const buttonStyle = {
  backgroundColor: 'white', 
  color: 'black', 
  width: '12em', 
  borderRadius: '2em', 
  fontWeight: 'bold'
}; 

export default function LoginPage() {
  return(
    <div className="login-wrapper">
        <h1>photon</h1>
        <h2>Fotos para todos.</h2>
        <div className="text-input">
            <InputText label="Email" type="text"/>
            <div className="input-icon"><EmailOutlinedIcon sx={{alignSelf: 'center'}}/></div>
        </div>
        <div className="text-input">
            <InputText label="Senha" type="password"/>
            <div className="input-icon"><HttpsOutlinedIcon sx={{alignSelf: 'center'}}/></div>
        </div>
        <div className="login-button">
            <Button variant="outlined" sx={buttonStyle} >Entrar</Button>
        </div>
        <h4>NÃO TEM UMA CONTA? <a href='/'>INSCREVA-SE</a></h4>
    </div>
  );
}