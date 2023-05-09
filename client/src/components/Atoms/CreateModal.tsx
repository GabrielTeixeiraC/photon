import {useState} from 'react';
import { Button, Error, Input } from ".";
import CloseIcon from '@mui/icons-material/Close';
import CategoryIcon from '@mui/icons-material/Category';
import { uploadPicture } from '../../services/picture';

interface CreateModalProps {
  setDisplayCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateModal({setDisplayCreate, setRender}: CreateModalProps) {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!file) {
      setError('No file selected');
      setLoading(false);
      return;
    }

    try {
      await uploadPicture(file, category);
      setDisplayCreate(false);
    } catch (error) {
      console.error('Error uploading picture:', error);
      setError('Error uploading picture');
    } finally {
      setRender(true);
      setFile(null);
      setLoading(false);
    }
  }

  return (
    <div className='modal-create'>
      <div className='modal-body'>
        <div className='modal-header'>
          <CloseIcon onClick={() => {setDisplayCreate(false)}}></CloseIcon>
        </div>
        <div className="modal-container">
          <h4> Upload a picture</h4>
          <form onSubmit={handleSubmit}>
            <Input type="text" placeholder="Category (Optional)" loading={loading} setValue={setCategory} value={category} Icon={CategoryIcon} />
            <input type="file" accept='.png, .jpg, .jpeg' onChange={(e) => {setFile(e.target.files![0]); setError('')}} />
            {error && <Error error={error} />}
            <Button loading={loading} buttonText='Upload' />
          </form>
        </div>
      </div>
    </div>
  );
}