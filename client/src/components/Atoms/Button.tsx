import MUIButton from '@mui/material/Button';

interface ButtonProps {
  handleSubmit: () => void;
  loading?: boolean;
  buttonText: string;
}

const buttonStyle = {
  backgroundColor: 'white',
  color: 'black',
  width: '12em',
  borderRadius: '2em',
  fontWeight: 'bold'
};

export function Button({handleSubmit, loading, buttonText} : ButtonProps) {
  return(
    <div className="login-button">
      <MUIButton variant="outlined" onClick={handleSubmit} disabled={loading} sx={buttonStyle}>{!loading ? buttonText : 'Carregando...' }</MUIButton>
    </div>
)};