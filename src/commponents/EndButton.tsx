import React from "react";

interface EndButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const EndButton: React.FC<EndButtonProps> = ({ onClick, disabled }) => {
  const handleFinishTest = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleClick = () => {
    handleFinishTest();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="bg-red-500 text-white px-4 py-2 mt-4"
    >
      End test
    </button>
  );
};

export default EndButton;
