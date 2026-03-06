interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  type,
  disabled,
  icon,
}) => {
  return (
    <button
      type={type}
      className={`cursor-pointer text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2.5 font-semibold transition-all duration-200 active:scale-[0.98] hover:scale-[1.02] hover:shadow-lg ${className} ${disabled ? "opacity-50 cursor-not-allowed grayscale" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
