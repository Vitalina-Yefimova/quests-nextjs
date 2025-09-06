'use client';

import CustomCursorWrapper from "@/components/generics/customCursor/CustomCursorWrapper";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = "button",
  disabled,
}) => {
  return (
    <CustomCursorWrapper>
      <button 
        className={`${className}`} 
        onClick={onClick} 
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </CustomCursorWrapper>
  );
};

export default Button;
