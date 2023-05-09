import MUIButton from '@mui/material/Button';

interface ButtonProps {
  loading?: boolean;
  buttonText: string;
}

const buttonStyle = {
  backgroundColor: 'white',
  color: 'black',
  width: '12em',
  borderRadius: '2em',
  fontWeight: 'bold',
  border: '1px solid #C8C9CF',
  '&:hover': {
    border: '1px solid #7a7a7a',
  }
};

export function Button({ loading, buttonText} : ButtonProps) {
  return(
    <div className="form-button">
      <MUIButton type='submit' variant="outlined" disabled={loading} sx={buttonStyle}>{!loading ? buttonText : 'Loading...' }</MUIButton>
    </div>
)};