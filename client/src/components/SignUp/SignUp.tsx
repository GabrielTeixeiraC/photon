import { Link, useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useState } from 'react';
import { Error, Input, Button } from '../Atoms';
import { signup } from '../../services/authenticate';
import '../Form.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      throw err;
    }).then(() => {
      navigate('/');
    });
  }

  return(
    <div className="form-wrapper">
      <h1>photon</h1>
      <h2>Fotos para todos.</h2>
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Nome" loading={loading} setValue={setName} value={name} Icon={AccountCircleOutlinedIcon} />
        <Input type="text" placeholder="Email" loading={loading} setValue={setEmail} value={email} Icon={EmailOutlinedIcon} />
        <Input type="password" placeholder="Senha" loading={loading} setValue={setPassword} value={password} Icon={HttpsOutlinedIcon} />
        <Input type="password" placeholder="Confirmar senha" loading={loading} setValue={setConfirmPassword} value={confirmPassword} Icon={HttpsOutlinedIcon} />
        <Button loading={loading} buttonText='Cadastrar'/>
      </form>
      {error ? <Error error={error} /> : null}  
      <h4>JÁ TEM UMA CONTA? <Link to='/'>ENTRAR</Link></h4>
    </div>
  );
}