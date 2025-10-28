import * as React from 'react';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import {
  getDrawerBaseStyles,
  getDrawerOverlayStyles,
  getDrawerSizeStyles,
  getDrawerPositionStyles,
  getDrawerHeaderStyles,
  getDrawerTitleStyles,
  getDrawerCloseButtonStyles,
  getDrawerContentStyles,
  getNotificationTypeColor,
  getNotificationItemStyles,
  getNotificationTextStyles,
  tokens,
} from '../../utils/tokens';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  pushContent?: boolean; // When true, drawer pushes content instead of overlaying
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  pushContent = false,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Only lock body scroll for overlay mode
    if (!pushContent) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (!pushContent) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, closeOnEscape, onClose, pushContent]);

  if (!isOpen) return null;

  const getDrawerStyles = (): React.CSSProperties => {
    const sizeValue = getDrawerSizeStyles(size);
    const baseStyles = getDrawerBaseStyles();
    const positionStyles = getDrawerPositionStyles(position, sizeValue);

    // For pushContent mode, adjust positioning
    if (pushContent) {
      return {
        ...baseStyles,
        ...positionStyles,
        position: 'relative',
        zIndex: 1,
        height: '100vh',
        boxShadow: 'none',
        borderLeft: position === 'right' ? `1px solid ${tokens.colors.border.default}` : undefined,
        borderRight: position === 'left' ? `1px solid ${tokens.colors.border.default}` : undefined,
      };
    }

    return {
      ...baseStyles,
      ...positionStyles,
    };
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Only render overlay in overlay mode */}
      {!pushContent && (
        <div
          style={getDrawerOverlayStyles()}
          onClick={handleOverlayClick}
        />
      )}

      <div
        className={className}
        style={getDrawerStyles()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div style={getDrawerHeaderStyles()}>
            {title && (
              <h3 style={getDrawerTitleStyles()}>
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                style={getDrawerCloseButtonStyles()}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = tokens.colors.text.primary;
                  e.currentTarget.style.backgroundColor = tokens.colors.interactive.hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = tokens.colors.text.disabled;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div style={getDrawerContentStyles()}>
          {children}
        </div>
      </div>

      <style>{`
        @keyframes drawerOverlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes drawerSlideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        @keyframes drawerSlideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        @keyframes drawerSlideInTop {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }

        @keyframes drawerSlideInBottom {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

// Notification Drawer Component
export interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    timestamp: Date;
    read?: boolean;
  }>;
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onClearAll,
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info': return '🔵';
      case 'warning': return '🟡';
      case 'error': return '🔴';
      case 'success': return '🟢';
      default: return '📋';
    }
  };

  // Use token-based notification colors
  const getNotificationColor = getNotificationTypeColor;

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Notifications"
      position="right"
      size="md"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Header Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm, color: tokens.colors.text.disabled }}>
            {notifications.length} notifications
          </span>
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              style={{
                background: 'none',
                border: 'none',
                color: tokens.colors.primary.main,
                cursor: 'pointer',
                fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm,
                textDecoration: 'underline',
              }}
            >
              Clear all
            </button>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: `${tokens.spacing['2xl']}`,
            color: tokens.colors.text.disabled,
            fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm
          }}>
            No notifications
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => onMarkAsRead?.(notification.id)}
                style={getNotificationItemStyles(!!notification.read, notification.type)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = tokens.colors.interactive.hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = notification.read 
                    ? tokens.colors.bg.secondary
                    : tokens.colors.bg.tertiary;
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: tokens.spacing.md }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ 
                      margin: `0 0 ${tokens.spacing.xs} 0`, 
                      fontSize: Array.isArray(tokens.text.size.sm) ? tokens.text.size.sm[0] : tokens.text.size.sm, 
                      fontWeight: tokens.text.weight.semibold,
                      ...getNotificationTextStyles(!!notification.read)
                    }}>
                      {notification.title}
                    </h4>
                    <p style={{ 
                      margin: `0 0 ${tokens.spacing.sm} 0`, 
                      fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs, 
                      lineHeight: 1.4,
                      color: tokens.colors.text.disabled
                    }}>
                      {notification.message}
                    </p>
                    <span style={{ 
                      fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs, 
                      color: tokens.colors.text.disabled
                    }}>
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                  {!notification.read && (
                    <div style={{
                      width: tokens.spacing.xs,
                      height: tokens.spacing.xs,
                      borderRadius: '50%',
                      backgroundColor: getNotificationColor(notification.type),
                      flexShrink: 0,
                      marginTop: tokens.spacing.xs,
                    }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  );
};