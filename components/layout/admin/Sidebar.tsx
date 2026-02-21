import { Box, Boxes, House } from "lucide-react";
import MenuItem from "@/components/ui/MenuItem";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className="sidebar" style={{ width: isOpen ? "250px" : "0" }}>
      <div className="flex items-center justify-between px-4 py-4 mb-2">
        <h1 className="text-2xl font-bold text-white font-size-2xl">MANTRI</h1>
      </div>
      <MenuItem icon={<House />} label="Dashboard" href="/admin" />
      <MenuItem icon={<Box />} label="Items" href="/admin/items" />
      <MenuItem icon={<Boxes />} label="Rack" href="/admin/rack" />
    </div>
  );
};

export default Sidebar;
