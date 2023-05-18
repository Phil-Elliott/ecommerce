import React, { ReactNode } from "react";

type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  type = "button",
  ariaLabel,
}) => (
  <button
    onClick={onClick}
    className={`${className}`}
    type={type}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default Button;
