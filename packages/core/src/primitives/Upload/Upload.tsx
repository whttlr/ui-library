import * as React from 'react';
import { Upload as UploadIcon, File, X, CheckCircle, AlertCircle, FileCode, Image } from 'lucide-react';
import { Button } from '../Button/Button';
import {
  tokens,
  getUploadDropzoneStyles,
  getUploadIconStyles,
  getUploadTitleStyles,
  getUploadDescriptionStyles,
  getUploadFileItemStyles,
  getUploadFileInfoStyles,
  getUploadFileNameStyles,
  getUploadFileSizeStyles,
  getUploadProgressBarStyles,
  getUploadProgressBarColor,
  getUploadStatusIconColor,
  getUploadInfoTextStyles,
} from '../../utils/tokens';

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'success' | 'error' | 'pending';
  error?: string;
}

export interface UploadProps {
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  onFileSelect?: (files: FileList) => void;
  onFileRemove?: (fileId: string) => void;
  files?: UploadFile[];
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'compact' | 'cnc';
}

export const Upload = React.forwardRef<HTMLDivElement, UploadProps>(({
  multiple = false,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  onFileSelect,
  onFileRemove,
  files = [],
  disabled = false,
  className,
  style,
  variant = 'default',
}, ref) => {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image size={16} />;
    if (fileType.includes('text/') || fileType.includes('code')) return <FileCode size={16} />;
    return <File size={16} />;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      onFileSelect?.(droppedFiles);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      onFileSelect?.(selectedFiles);
    }
    // Reset input value to allow selecting same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    ...style,
  };

  const dropzoneStyle = getUploadDropzoneStyles(isDragOver, disabled, variant);

  const iconStyle = getUploadIconStyles(isDragOver, variant);

  const titleStyle = getUploadTitleStyles(variant);

  const descriptionStyle = getUploadDescriptionStyles(variant);

  const fileListStyle: React.CSSProperties = {
    marginTop: files.length > 0 ? tokens.spacing.lg : 0,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.sm,
  };

  const fileItemStyle = getUploadFileItemStyles();

  const fileInfoStyle = getUploadFileInfoStyles();

  const fileNameStyle = getUploadFileNameStyles();

  const fileSizeStyle = getUploadFileSizeStyles();

  const progressBarStyle = getUploadProgressBarStyles();

  // Use token-based progress bar colors
  const getProgressBarColor = getUploadProgressBarColor;

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'success': return <CheckCircle size={16} style={{ color: getUploadStatusIconColor('success') }} />;
      case 'error': return <AlertCircle size={16} style={{ color: getUploadStatusIconColor('error') }} />;
      default: return null;
    }
  };

  return (
    <div ref={ref} style={containerStyle} className={className}>
      <div
        style={dropzoneStyle}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <UploadIcon style={iconStyle} />
        <h3 style={titleStyle}>
          {variant === 'cnc' ? 'Upload CNC Files' : 'Upload Files'}
        </h3>
        <p style={descriptionStyle}>
          {variant === 'compact' 
            ? 'Click or drag files here'
            : isDragOver 
              ? 'Drop files here'
              : 'Click to browse or drag and drop files here'
          }
        </p>
        {variant !== 'compact' && (
          <div style={getUploadInfoTextStyles()}>
            {accept && <p style={{ margin: '0 0 0.25rem 0' }}>Accepted formats: {accept}</p>}
            <p style={{ margin: 0 }}>
              Maximum file size: {formatFileSize(maxSize)}
              {multiple && ` • Maximum ${maxFiles} files`}
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      {files.length > 0 && (
        <div style={fileListStyle}>
          {files.map((file) => (
            <div key={file.id} style={fileItemStyle}>
              <div style={fileInfoStyle}>
                <div style={{ color: tokens.colors.text.disabled }}>
                  {getFileIcon(file.type)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={fileNameStyle}>{file.name}</div>
                  <div style={fileSizeStyle}>{formatFileSize(file.size)}</div>
                  {file.status === 'uploading' && (
                    <div style={progressBarStyle}>
                      <div
                        style={{
                          width: `${file.progress}%`,
                          height: '100%',
                          backgroundColor: getProgressBarColor(file.status),
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                  )}
                  {file.error && (
                    <div style={{ fontSize: Array.isArray(tokens.text.size.xs) ? tokens.text.size.xs[0] : tokens.text.size.xs, color: tokens.colors.status.error, marginTop: tokens.spacing.xs }}>
                      {file.error}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {getStatusIcon(file.status)}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileRemove?.(file.id);
                  }}
                  style={{ width: '1.5rem', height: '1.5rem', padding: 0 }}
                >
                  <X size={12} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

Upload.displayName = 'Upload';