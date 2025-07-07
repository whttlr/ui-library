import * as React from 'react';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { 
  tokens, 
  getModalSizeStyles, 
  getModalBaseStyles, 
  getModalOverlayStyles, 
  getModalHeaderStyles, 
  getModalContentStyles 
} from '../../utils/tokens';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const getSizeStyles = (): React.CSSProperties => {
    return getModalSizeStyles(size);
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      style={{
        ...getModalOverlayStyles(),
        animation: 'modalOverlayFadeIn 0.15s ease-out',
      }}
      onClick={handleOverlayClick}
    >
      <div
        className={className}
        style={{
          ...getModalBaseStyles(),
          maxHeight: size === 'full' ? '95%' : '90vh',
          animation: 'modalContentSlideIn 0.2s ease-out',
          ...getSizeStyles(),
        }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            style={{
              ...getModalHeaderStyles(),
            }}
          >
            {title && (
              <h3
                style={{
                  margin: 0,
                  fontSize: tokens.text.size.lg,
                  fontWeight: tokens.text.weight.semibold,
                  color: tokens.colors.text.primary,
                }}
              >
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: tokens.colors.text.secondary,
                  cursor: 'pointer',
                  padding: tokens.spacing.xs,
                  borderRadius: tokens.radius.sm,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: tokens.transition.default,
                  marginLeft: 'auto',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = tokens.colors.text.primary;
                  e.currentTarget.style.backgroundColor = tokens.colors.interactive.hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = tokens.colors.text.secondary;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div
          style={{
            ...getModalContentStyles(),
          }}
        >
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes modalOverlayFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalContentSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Confirmation Dialog Component
export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const confirmButtonStyle: React.CSSProperties = {
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    borderRadius: tokens.radius.md,
    border: 'none',
    fontSize: tokens.text.size.sm,
    fontWeight: tokens.text.weight.medium,
    cursor: 'pointer',
    transition: tokens.transition.default,
    ...(variant === 'danger'
      ? {
          backgroundColor: tokens.colors.status.error,
          color: tokens.colors.text.primary,
        }
      : {
          backgroundColor: tokens.colors.primary.main,
          color: tokens.colors.text.primary,
        }),
  };

  const cancelButtonStyle: React.CSSProperties = {
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border.primary}`,
    backgroundColor: 'transparent',
    color: tokens.colors.text.primary,
    fontSize: tokens.text.size.sm,
    fontWeight: tokens.text.weight.medium,
    cursor: 'pointer',
    transition: tokens.transition.default,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ margin: 0, lineHeight: 1.5, color: tokens.colors.text.secondary }}>
          {message}
        </p>
      </div>
      <div style={{ display: 'flex', gap: tokens.spacing.sm, justifyContent: 'flex-end' }}>
        <button
          onClick={onClose}
          style={cancelButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = tokens.colors.interactive.hover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          style={confirmButtonStyle}
          onMouseEnter={(e) => {
            if (variant === 'danger') {
              e.currentTarget.style.backgroundColor = tokens.colors.status.error;
            } else {
              e.currentTarget.style.backgroundColor = tokens.colors.primary.hover;
            }
          }}
          onMouseLeave={(e) => {
            if (variant === 'danger') {
              e.currentTarget.style.backgroundColor = tokens.colors.status.error;
            } else {
              e.currentTarget.style.backgroundColor = tokens.colors.primary.main;
            }
          }}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};