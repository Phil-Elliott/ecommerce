import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "danger";
  handleClick: () => void;
  space?: boolean;
  disabled?: boolean;
  widthFull?: boolean;
};

const Button = ({
  children,
  variant,
  handleClick,
  space,
  disabled,
  widthFull,
}: ButtonProps) => {
  return (
    <button
      //   className={`${styles[variant]}`}
      onClick={() => handleClick()}
      style={{
        marginRight: space ? "1rem" : "0",
        width: widthFull ? "100%" : "auto",
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
