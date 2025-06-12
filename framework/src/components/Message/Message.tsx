import './Message.css';

interface MessageProps {
  text: string;
  type: 'error' | 'success';
}

function Message({ text, type }: MessageProps) {
  return <p className={`message ${type}`}>{text}</p>;
}

export default Message;
