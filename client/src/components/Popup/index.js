import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

function Popup() {
  const [content, setContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [padding, setPadding] = useState(null);
  const [size, setSize] = useState('lg');

  useEffect(() => {
    window.popup = (title, cont, options = {}) => {
      setContent({ title, content: cont });
      setPadding(options.noPadding);
      setSize(options.size ?? 'sm');
      setIsOpen(true);
    };
    window.closePopup = () => {
      setIsOpen(false);
    };
  }, []);

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={size}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {
          content && content.title && (
            <DialogTitle
              style={{ padding: padding ? '0px' : undefined }}
            >
              {content.title}
            </DialogTitle>
          )
        }
        <DialogContent
          style={{ padding: padding ? '0px' : undefined }}
        >
          <div>
            {content && content.content}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Popup;
