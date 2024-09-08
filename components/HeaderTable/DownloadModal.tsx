import React from 'react';
import Modal from 'react-modal';
import { Button } from "@/components/ui/button";
import { z } from 'zod';

interface DownloadModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleDownloadPDF: (days: number) => void;
}

const customStyles = {
  content: {
    width: '600px',
    height: '300px',
    margin: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
};

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onRequestClose, handleDownloadPDF }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Select Reporting Period"
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="flex flex-col gap-4  h-full items-center justify-center">
        <h2 className="text-center font-bold">Select Reporting Period</h2>
        <div className="flex flex-row gap-2 justify-center">
          <Button onClick={() => handleDownloadPDF(7)}>Last Week</Button>
          <Button onClick={() => handleDownloadPDF(15)}>Last 15 Days</Button>
          <Button onClick={() => handleDownloadPDF(30)}>Last 30 Days</Button>
        </div>
        <Button onClick={onRequestClose} className="mt-4">Cancel</Button>
      </div>
    </Modal>
  );
};

export default DownloadModal;