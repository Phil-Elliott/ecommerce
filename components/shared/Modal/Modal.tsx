import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

type ModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  classAddOn?: string;
  closeRef?: React.RefObject<HTMLButtonElement>;
  onClick?: () => void;
};

const Modal = ({
  trigger,
  children,
  classAddOn,
  closeRef,
  onClick,
}: ModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={`text-blue-500 ${classAddOn}`}>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Content className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-6">
          {children}
          <Dialog.Close
            className="absolute top-0 right-0 p-3"
            ref={closeRef}
            onClick={onClick}
          >
            <Cross2Icon />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
