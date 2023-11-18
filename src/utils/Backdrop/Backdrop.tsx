import "./Backdrop.scss";
interface BackdropProps {
  onClose: () => void;
}

export const Backdrop = ({ onClose }: BackdropProps) => {
  return <div className="backdrop" onClick={onClose}></div>;
};
