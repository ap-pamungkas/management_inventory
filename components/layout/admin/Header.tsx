import { Menu } from "lucide-react";

interface HeaderProps {
  onToggle: () => void;
  isOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggle, isOpen }) => {
  return (
    <div className="header bg-white shadow-sm p-2">
      <button className="openbtn" onClick={onToggle}>
        <Menu />
      </button>
    </div>
  );
};

export default Header;
