import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import './Login.css';

const buttonStyle = {
  backgroundColor: 'white', 
  color: 'black', 
  width: '12em', 
  borderRadius: '2em', 
  fontWeight: 'bold'
}; 

export default function Login() {
  return(
    <div className="login-wrapper">
      <h1>photon</h1>
      <h2>Fotos para todos.</h2>
      <div className="text-input">
        <input type="text" placeholder="Email" className="input-text"/>
        <div className="input-icon"><EmailOutlinedIcon sx={{alignSelf: 'center'}}/></div>
      </div>
      <div className="text-input">
        <input type="password" placeholder="Senha" className="input-text"/>
        <div className="input-icon"><HttpsOutlinedIcon sx={{alignSelf: 'center'}}/></div>
      </div>
      <div className="login-button">
        <Button variant="outlined" sx={buttonStyle}>Entrar</Button>
      </div>
      <h4>NÃO TEM UMA CONTA? <Link to='/signup'>INSCREVA-SE</Link></h4>
    </div>
  );
}