import './Dialog.css';
import { useEffect, useState } from 'react';

type DialogProps = {
  isOpen: boolean;
  buttonLabel: string;
  onClickButton?: () => void;
};

export function Dialog({ isOpen: open, buttonLabel, onClickButton }: DialogProps) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const closeDialog = () => {
    setIsOpen(false);
    onClickButton?.();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="dialog__overlay">
      <div className="dialog__content">
        <h2>You Win!!</h2>
        <button onClick={closeDialog}>{buttonLabel}</button>
      </div>
    </div>
  );
}

export default Dialog;
