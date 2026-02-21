"use client";
import { useState } from "react";
import Header from "./admin/Header";
import Sidebar from "./admin/Sidebar";
interface AdminLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} />
      <div className={`main ${isOpen ? "ml-[250px]" : "ml-0"}`}>
        <Header onToggle={handleToggle} isOpen={isOpen} />

        <div className="content p-4">
          <div className="container  px-4  py-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
