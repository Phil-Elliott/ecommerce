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
          className="flex flex-col space-y-2 p-4 items-end font-normal bg-white shadow-sm rounded-md z-10 bg-white cursor-default"
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Popup;
