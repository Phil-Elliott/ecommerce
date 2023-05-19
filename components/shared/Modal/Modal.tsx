import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

type ModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

const Modal = ({ trigger, children }: ModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-blue-500">{trigger}</Dialog.Trigger>
      <Dialog.Overlay className="fixed inset-0 bg-red opacity-30 z-50" />
      <Dialog.Content className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4">
        {children}
        <Dialog.Close className="absolute top-0 right-0 p-3">
          {/* <Cross2Icon /> */}
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
