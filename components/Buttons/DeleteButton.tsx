import React from 'react';
import { Trash } from 'lucide-react';

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button
      className="text-red-500 hover:text-red-700"
      onClick={onClick}
    >
      <Trash />
    </button>
  );
};

export default DeleteButton;