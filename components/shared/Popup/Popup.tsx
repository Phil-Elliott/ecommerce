import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

type PopupProps = {
  children: React.ReactNode;
  close: (value: boolean) => void | (() => void);
  ignoreRef?: React.RefObject<HTMLElement>;
};

const Popup = ({ children, close, ignoreRef }: PopupProps) => {
  const ref = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ignoreRef?.current?.contains(event.target as Node)) {
      return;
    }
    close(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      ref={ref}
      className="absolute shadow-sm rounded-md z-10 bg-white cursor-default right-0 top-10"
    >
      {children}
    </div>
  );
};

export default Popup;
