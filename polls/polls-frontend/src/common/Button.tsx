import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}

function Button({ children, className, type, onClick }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex text-blue-500 text center p-2 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
