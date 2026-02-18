import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, href }) => {
  const isActive = usePathname() === href;
  return (
    <Link
      className={`nav flex items-center gap-2 ${isActive ? "active" : ""}`}
      href={href}
    >
      {icon}
      {label}
    </Link>
  );
};

export default MenuItem;
