import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ConfirmDialog } from './Modal';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Badge } from '../Badge/Badge';
import { Progress } from '../Progress/Progress';
import { Settings, AlertTriangle, CheckCircle, Info, Trash2, Save, Upload } from 'lucide-react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal and dialog components for displaying overlay content, forms, and confirmations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size variant',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close modal when clicking overlay',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close modal when pressing Escape',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Modal Stories
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Basic Modal"
        >
          <p style={{ margin: '0 0 1rem 0', lineHeight: 1.6 }}>
            This is a basic modal with default settings. It includes a title,
            close button, and can be closed by clicking the overlay or pressing Escape.
          </p>
          <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
            Modal content can include any React elements and will scroll if needed.
          </p>
        </Modal>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Button size="sm" onClick={() => setActiveModal('sm')}>Small</Button>
        <Button size="sm" onClick={() => setActiveModal('md')}>Medium</Button>
        <Button size="sm" onClick={() => setActiveModal('lg')}>Large</Button>
        <Button size="sm" onClick={() => setActiveModal('xl')}>Extra Large</Button>
        <Button size="sm" onClick={() => setActiveModal('full')}>Full Screen</Button>
        
        {['sm', 'md', 'lg', 'xl', 'full'].map((size) => (
          <Modal
            key={size}
            isOpen={activeModal === size}
            onClose={() => setActiveModal(null)}
            title={`${size.toUpperCase()} Modal`}
            size={size as any}
          >
            <p style={{ margin: '0 0 1rem 0' }}>
              This is a <strong>{size}</strong> sized modal.
            </p>
            <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)' }}>
              Modal sizes help accommodate different content requirements.
            </p>
          </Modal>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal size variants from small to full screen.',
      },
    },
  },
};

export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Form submitted!');
      setIsOpen(false);
    };

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button onClick={() => setIsOpen(true)}>
          <Settings size={16} />
          Open Form
        </Button>
        
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Contact Form"
          size="md"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              required
            />
            
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              required
            />
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Enter your message"
                required
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid hsl(240, 3.7%, 15.9%)',
                  backgroundColor: '#18181a',
                  color: 'hsl(0, 0%, 98%)',
                  fontSize: '0.875rem',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.2s ease-in-out',
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Save size={16} />
                Submit
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal containing a form with validation and submission handling.',
      },
    },
  },
};

export const ConfirmationDialogs: Story = {
  render: () => {
    const [activeDialog, setActiveDialog] = useState<string | null>(null);

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Button onClick={() => setActiveDialog('save')}>
          <CheckCircle size={16} />
          Save Changes
        </Button>
        <Button variant="secondary" onClick={() => setActiveDialog('info')}>
          <Info size={16} />
          Show Info
        </Button>
        <Button variant="destructive" onClick={() => setActiveDialog('delete')}>
          <Trash2 size={16} />
          Delete Item
        </Button>
        
        <ConfirmDialog
          isOpen={activeDialog === 'save'}
          onClose={() => setActiveDialog(null)}
          onConfirm={() => alert('Changes saved!')}
          title="Save Changes"
          message="Are you sure you want to save these changes? This action cannot be undone."
          confirmText="Save"
          cancelText="Cancel"
        />
        
        <ConfirmDialog
          isOpen={activeDialog === 'info'}
          onClose={() => setActiveDialog(null)}
          onConfirm={() => alert('Confirmed!')}
          title="Information"
          message="This is an informational dialog. Click confirm to acknowledge."
          confirmText="OK"
          cancelText="Close"
        />
        
        <ConfirmDialog
          isOpen={activeDialog === 'delete'}
          onClose={() => setActiveDialog(null)}
          onConfirm={() => alert('Item deleted!')}
          title="Delete Item"
          message="Are you sure you want to delete this item? This action cannot be undone and all associated data will be permanently removed."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Confirmation dialogs for save, info, and destructive actions.',
      },
    },
  },
};

export const CNCJobModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [jobProgress, setJobProgress] = useState(65);
    const [jobData] = useState({
      name: 'Aluminum Bracket v2.1',
      material: 'AL-6061',
      dimensions: '150 x 100 x 25mm',
      toolCount: 3,
      estimatedTime: '2h 45m',
      remainingTime: '58m 23s',
    });

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button onClick={() => setIsOpen(true)}>
          <Upload size={16} />
          View Job Status
        </Button>
        
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="CNC Job Status"
          size="lg"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Job Information</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>Job Name:</span>
                  <p style={{ margin: '0.25rem 0 0 0', fontFamily: 'JetBrains Mono, monospace' }}>{jobData.name}</p>
                </div>
                <div>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>Material:</span>
                  <p style={{ margin: '0.25rem 0 0 0', fontFamily: 'JetBrains Mono, monospace' }}>{jobData.material}</p>
                </div>
                <div>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>Dimensions:</span>
                  <p style={{ margin: '0.25rem 0 0 0', fontFamily: 'JetBrains Mono, monospace' }}>{jobData.dimensions}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Progress</h4>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem' }}>Overall Progress</span>
                  <span style={{ fontSize: '0.875rem', fontFamily: 'JetBrains Mono, monospace' }}>{jobProgress}%</span>
                </div>
                <Progress value={jobProgress} variant="primary" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>Estimated Time:</span>
                  <p style={{ margin: '0.25rem 0 0 0', fontFamily: 'JetBrains Mono, monospace' }}>{jobData.estimatedTime}</p>
                </div>
                <div>
                  <span style={{ color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem' }}>Remaining:</span>
                  <p style={{ margin: '0.25rem 0 0 0', fontFamily: 'JetBrains Mono, monospace' }}>{jobData.remainingTime}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Current Status</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Badge variant="success">Running</Badge>
              <span style={{ fontSize: '0.875rem' }}>Operation 2 of 3: Rough Cut</span>
            </div>
            <p style={{ margin: 0, color: 'hsl(240, 5%, 64.9%)', fontSize: '0.875rem', lineHeight: 1.5 }}>
              Currently executing rough cutting operation with 6.35mm end mill.
              Tool change to finishing tool will occur automatically at 85% completion.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button variant="destructive">
              <AlertTriangle size={16} />
              Emergency Stop
            </Button>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC job status modal with progress tracking, job information, and machine controls.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [modalConfig, setModalConfig] = useState({
      isOpen: false,
      size: 'md' as const,
      showCloseButton: true,
      closeOnOverlayClick: true,
      closeOnEscape: true,
    });

    const openModal = () => {
      setModalConfig(prev => ({ ...prev, isOpen: true }));
    };

    const closeModal = () => {
      setModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        color: 'hsl(0, 0%, 98%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        <div style={{ 
          padding: '1.5rem',
          backgroundColor: 'hsl(240, 3.7%, 15.9%)',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>Modal Configuration</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                Size
              </label>
              <select
                value={modalConfig.size}
                onChange={(e) => setModalConfig(prev => ({ ...prev, size: e.target.value as any }))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid hsl(240, 3.7%, 15.9%)',
                  backgroundColor: '#18181a',
                  color: 'hsl(0, 0%, 98%)',
                  fontSize: '0.875rem'
                }}
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
                <option value="full">Full Screen</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={modalConfig.showCloseButton}
                  onChange={(e) => setModalConfig(prev => ({ ...prev, showCloseButton: e.target.checked }))}
                />
                Show close button
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={modalConfig.closeOnOverlayClick}
                  onChange={(e) => setModalConfig(prev => ({ ...prev, closeOnOverlayClick: e.target.checked }))}
                />
                Close on overlay click
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={modalConfig.closeOnEscape}
                  onChange={(e) => setModalConfig(prev => ({ ...prev, closeOnEscape: e.target.checked }))}
                />
                Close on Escape key
              </label>
            </div>
          </div>
        </div>
        
        <Button onClick={openModal}>Open Configured Modal</Button>
        
        <Modal
          isOpen={modalConfig.isOpen}
          onClose={closeModal}
          title="Interactive Modal Demo"
          size={modalConfig.size}
          showCloseButton={modalConfig.showCloseButton}
          closeOnOverlayClick={modalConfig.closeOnOverlayClick}
          closeOnEscape={modalConfig.closeOnEscape}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              This modal demonstrates the interactive configuration options.
            </p>
            
            <div style={{ 
              padding: '1rem',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}>
              <strong>Current Settings:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem' }}>
                <li>Size: {modalConfig.size}</li>
                <li>Show close button: {modalConfig.showCloseButton ? 'Yes' : 'No'}</li>
                <li>Close on overlay click: {modalConfig.closeOnOverlayClick ? 'Yes' : 'No'}</li>
                <li>Close on Escape: {modalConfig.closeOnEscape ? 'Yes' : 'No'}</li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <Button onClick={closeModal}>Close Modal</Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration of modal configuration options and behaviors.',
      },
    },
  },
};