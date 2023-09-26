import React from "react";
import * as Popover from "@radix-ui/react-popover";

type PopupProps = {
  header: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
};

const Popup = ({ header, children, onClick }: PopupProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className="">{header}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          className="space-y-2 p-0 font-normal bg-white shadow-lg rounded-sm z-40 bg-white cursor-default"
        >
          <button
            onClick={() => {
              onClick && onClick();
              setOpen(false); // Close the popup when the button is clicked
            }}
          >
            {children}
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Popup;
