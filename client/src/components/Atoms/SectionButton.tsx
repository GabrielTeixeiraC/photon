import { Link } from "react-router-dom";
import './SectionButton.css';

interface SectionButtonProps {
  text: string;
  link: string;
  selected: string;
  handleClick: (text: string) => void;
}

export function SectionButton({text, link, selected, handleClick}: SectionButtonProps) {
  return (
    <Link to={link} className="section-button" onClick={() => handleClick(text)} >
      <h3 className={text === selected ? 'selected' : ''}>{text}</h3>
    </Link>
  );
}