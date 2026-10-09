import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  danger = true,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="flex items-start gap-4">
        <div className="shrink-0 p-3 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base font-semibold text-brand-900 dark:text-white">{title}</h4>
          <p className="mt-1.5 text-sm text-brand-600 dark:text-brand-300">{message}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-brand-100 dark:border-brand-800">
        <Button variant="secondary" size="sm" onClick={onClose}>
          {cancelText}
        </Button>
        <Button
          variant={danger ? 'danger' : 'primary'}
          size="sm"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
