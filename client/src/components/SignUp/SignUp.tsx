import { Link, useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useState } from 'react';
import { Error, Input, Button } from '../Atoms';
import { signup } from '../../services/authenticate';
import './SignUp.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  async function handleSubmit() {
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Senhas não conferem');
      setLoading(false);
      return;
    }

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      setError('Preencha todos os campos');
      setLoading(false);
      return; 
    }

    await signup(name, email, password).catch((err) => {
      setError(err);
      setLoading(false);
    }).then(() => {
      navigate('/');
    });
  }

  return(
    <div className="login-wrapper">
      <h1>photon</h1>
      <h2>Fotos para todos.</h2>
      <form>
        <Input type="text" placeholder="Nome" setValue={setName} value={name} Icon={AccountCircleOutlinedIcon} />
        <Input type="text" placeholder="Email" setValue={setEmail} value={email} Icon={EmailOutlinedIcon} />
        <Input type="password" placeholder="Senha" setValue={setPassword} value={password} Icon={HttpsOutlinedIcon} />
        <Input type="password" placeholder="Confirmar senha" setValue={setConfirmPassword} value={confirmPassword} Icon={HttpsOutlinedIcon} />
        <Button handleSubmit={handleSubmit} loading={loading} buttonText='Cadastrar'/>
      </form>
      {error ? <Error error={error} /> : null}  
      <h4>JÁ TEM UMA CONTA? <Link to='/'>ENTRAR</Link></h4>
    </div>
  );
}