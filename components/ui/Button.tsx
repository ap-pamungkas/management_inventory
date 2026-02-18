interface ButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
}


const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
    return (
        <button
            className={` cursor-pointer text-white px-4 py-2 rounded ${className}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}


export default Button;