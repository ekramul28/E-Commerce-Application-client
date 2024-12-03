import React, { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`active:scale-95 duration-300 bg-black ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
