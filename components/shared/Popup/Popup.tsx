import React from "react";
import * as Popover from "@radix-ui/react-popover";

type PopupProps = {
  header: React.ReactNode;
  children: React.ReactNode;
};

const Popup = ({ header, children }: PopupProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger className="">{header}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          className="space-y-2 p-0 font-normal bg-white shadow-lg rounded-md z-40 bg-white cursor-default"
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Popup;
