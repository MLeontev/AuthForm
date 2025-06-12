import './SocialButton.css';

interface SocialButtonProps {
  text: string;
  onClick?: () => void;
}

const SocialButton = ({ text, onClick }: SocialButtonProps) => {
  return (
    <button type="button" className="social-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default SocialButton;
