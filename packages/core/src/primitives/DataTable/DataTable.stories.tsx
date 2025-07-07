import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataTable, DataTableColumn } from './DataTable';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Edit, Trash2, Eye, Play, Square, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof DataTable> = {
  title: 'Components/Data Table',
  component: DataTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Advanced data table with sorting, filtering, pagination, and row selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    sortable: {
      control: 'boolean',
      description: 'Enable column sorting',
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row selection',
    },
    pagination: {
      control: 'boolean',
      description: 'Enable pagination',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleUsers = [
  { id: 1, name: 'John Smith', role: 'Operator', status: 'active', shift: 'Day', experience: 5, lastLogin: '2024-03-15 08:30' },
  { id: 2, name: 'Sarah Johnson', role: 'Supervisor', status: 'active', shift: 'Day', experience: 8, lastLogin: '2024-03-15 07:45' },
  { id: 3, name: 'Mike Davis', role: 'Operator', status: 'offline', shift: 'Night', experience: 3, lastLogin: '2024-03-14 23:15' },
  { id: 4, name: 'Lisa Chen', role: 'Engineer', status: 'active', shift: 'Day', experience: 12, lastLogin: '2024-03-15 09:20' },
  { id: 5, name: 'David Wilson', role: 'Operator', status: 'break', shift: 'Day', experience: 2, lastLogin: '2024-03-15 08:00' },
  { id: 6, name: 'Emily Brown', role: 'Supervisor', status: 'active', shift: 'Evening', experience: 6, lastLogin: '2024-03-14 16:30' },
  { id: 7, name: 'Tom Garcia', role: 'Operator', status: 'offline', shift: 'Night', experience: 4, lastLogin: '2024-03-14 22:45' },
  { id: 8, name: 'Anna Martinez', role: 'Engineer', status: 'active', shift: 'Day', experience: 10, lastLogin: '2024-03-15 07:30' },
];

const machineJobs = [
  { id: 'JOB001', name: 'Aluminum Bracket v2.1', machine: 'Haas VF-3', status: 'running', progress: 67, startTime: '2024-03-15 08:00', estimatedTime: '2h 45m', operator: 'John Smith' },
  { id: 'JOB002', name: 'Steel Plate Assembly', machine: 'Mazak i-400', status: 'queued', progress: 0, startTime: '', estimatedTime: '1h 30m', operator: 'Sarah Johnson' },
  { id: 'JOB003', name: 'Titanium Component', machine: 'DMG Mori DMU 50', status: 'completed', progress: 100, startTime: '2024-03-15 06:00', estimatedTime: '3h 15m', operator: 'Mike Davis' },
  { id: 'JOB004', name: 'Precision Gear', machine: 'Okuma LB3000', status: 'error', progress: 34, startTime: '2024-03-15 07:30', estimatedTime: '4h 00m', operator: 'David Wilson' },
  { id: 'JOB005', name: 'Copper Heat Sink', machine: 'Haas VF-2', status: 'paused', progress: 45, startTime: '2024-03-15 09:00', estimatedTime: '2h 20m', operator: 'Emily Brown' },
];

// Basic Data Table
export const BasicTable: Story = {
  render: () => {
    const columns: DataTableColumn[] = [
      { key: 'id', header: 'ID', width: '80px' },
      { key: 'name', header: 'Name' },
      { key: 'role', header: 'Role' },
      { 
        key: 'status', 
        header: 'Status',
        render: (value) => {
          const variant = value === 'active' ? 'bright-success' : value === 'offline' ? 'bright-danger' : 'bright-warning';
          return <Badge variant={variant} showIndicator pulse={value === 'active'}>{value}</Badge>;
        }
      },
      { key: 'shift', header: 'Shift' },
      { key: 'experience', header: 'Experience (years)', align: 'right' },
    ];

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1000px'
      }}>
        <DataTable columns={columns} data={sampleUsers} />
      </div>
    );
  },
};

// CNC Job Management Table
export const CNCJobTable: Story = {
  render: () => {
    const [selectedJobs, setSelectedJobs] = useState<any[]>([]);

    const columns: DataTableColumn[] = [
      { key: 'id', header: 'Job ID', width: '100px' },
      { key: 'name', header: 'Job Name' },
      { key: 'machine', header: 'Machine' },
      { 
        key: 'status', 
        header: 'Status',
        render: (value) => {
          const config = {
            running: { variant: 'bright-success' as const, pulse: true },
            queued: { variant: 'bright-secondary' as const, pulse: false },
            completed: { variant: 'bright-info' as const, pulse: false },
            error: { variant: 'bright-danger' as const, pulse: true },
            paused: { variant: 'bright-warning' as const, pulse: true },
          };
          const { variant, pulse } = config[value as keyof typeof config] || config.queued;
          
          return <Badge variant={variant} showIndicator pulse={pulse}>{value}</Badge>;
        }
      },
      { 
        key: 'progress', 
        header: 'Progress',
        align: 'center',
        render: (value) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '60px',
              height: '6px',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${value}%`,
                height: '100%',
                backgroundColor: value === 100 ? 'hsl(142, 76%, 36%)' : 
                                value === 0 ? 'hsl(240, 5%, 64.9%)' : 'hsl(262, 83%, 58%)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
              {value}%
            </span>
          </div>
        )
      },
      { key: 'estimatedTime', header: 'Est. Time', align: 'center' },
      { key: 'operator', header: 'Operator' },
    ];

    const handleJobAction = (action: string, job: any) => {
      console.log(`${action} job:`, job);
    };

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
            CNC Job Management
          </h3>
          {selectedJobs.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
                {selectedJobs.length} job(s) selected
              </span>
              <Button size="sm" variant="secondary">
                <Play size={14} />
                Start Selected
              </Button>
              <Button size="sm" variant="secondary">
                <Square size={14} />
                Pause Selected
              </Button>
            </div>
          )}
        </div>
        
        <DataTable 
          columns={columns} 
          data={machineJobs}
          selectable
          onRowSelect={setSelectedJobs}
          onRowClick={(job) => console.log('Job clicked:', job)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'CNC job management table with status indicators, progress bars, and bulk actions.',
      },
    },
  },
};

// Machine Monitoring Table
export const MachineMonitoringTable: Story = {
  render: () => {
    const machineData = [
      { 
        id: 'M001', 
        name: 'Haas VF-3', 
        status: 'running', 
        currentJob: 'Aluminum Bracket v2.1',
        position: { x: 125.456, y: 67.234, z: -10.125 },
        spindleSpeed: 12000,
        feedRate: 1500,
        toolLife: 78,
        lastMaintenance: '2024-02-15',
        operator: 'John Smith'
      },
      { 
        id: 'M002', 
        name: 'Mazak i-400', 
        status: 'idle', 
        currentJob: '',
        position: { x: 0, y: 0, z: 0 },
        spindleSpeed: 0,
        feedRate: 0,
        toolLife: 92,
        lastMaintenance: '2024-03-01',
        operator: 'Sarah Johnson'
      },
      { 
        id: 'M003', 
        name: 'DMG Mori DMU 50', 
        status: 'maintenance', 
        currentJob: '',
        position: { x: 200.123, y: 150.567, z: 25.890 },
        spindleSpeed: 0,
        feedRate: 0,
        toolLife: 23,
        lastMaintenance: '2024-01-20',
        operator: 'Mike Davis'
      },
    ];

    const columns: DataTableColumn[] = [
      { key: 'id', header: 'Machine ID', width: '100px' },
      { key: 'name', header: 'Machine Name' },
      { 
        key: 'status', 
        header: 'Status',
        render: (value) => {
          const variants = {
            running: 'success' as const,
            idle: 'secondary' as const,
            maintenance: 'warning' as const,
            error: 'destructive' as const,
          };
          return <Badge variant={variants[value as keyof typeof variants]}>{value}</Badge>;
        }
      },
      { key: 'currentJob', header: 'Current Job' },
      { 
        key: 'position', 
        header: 'Position (mm)',
        render: (position) => (
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
            X: {position.x.toFixed(3)}<br/>
            Y: {position.y.toFixed(3)}<br/>
            Z: {position.z.toFixed(3)}
          </div>
        )
      },
      { 
        key: 'spindleSpeed', 
        header: 'Spindle (RPM)',
        align: 'right',
        render: (value) => (
          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {value.toLocaleString()}
          </span>
        )
      },
      { 
        key: 'feedRate', 
        header: 'Feed Rate',
        align: 'right',
        render: (value) => (
          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {value.toLocaleString()} mm/min
          </span>
        )
      },
      { 
        key: 'toolLife', 
        header: 'Tool Life',
        align: 'center',
        render: (value) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '40px',
              height: '6px',
              backgroundColor: 'hsl(240, 3.7%, 15.9%)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${value}%`,
                height: '100%',
                backgroundColor: value > 50 ? 'hsl(142, 76%, 36%)' : 
                                value > 25 ? 'hsl(48, 96%, 53%)' : 'hsl(0, 84.2%, 60.2%)',
              }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
              {value}%
            </span>
          </div>
        )
      },
      { key: 'operator', header: 'Operator' },
    ];

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1400px'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Machine Monitoring Dashboard
        </h3>
        
        <DataTable 
          columns={columns} 
          data={machineData}
          pagination={false}
          onRowClick={(machine) => console.log('Machine selected:', machine)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-time machine monitoring table with position data, speeds, and tool life indicators.',
      },
    },
  },
};

// Tool Inventory Table
export const ToolInventoryTable: Story = {
  render: () => {
    const toolData = [
      { id: 'T001', name: '6.35mm End Mill', type: 'End Mill', material: 'Carbide', diameter: 6.35, length: 50, stock: 12, minStock: 5, cost: 45.99, supplier: 'Kennametal' },
      { id: 'T002', name: '3.175mm Ball Nose', type: 'Ball Nose', material: 'Carbide', diameter: 3.175, length: 38, stock: 8, minStock: 3, cost: 52.50, supplier: 'Sandvik' },
      { id: 'T003', name: '12.7mm Face Mill', type: 'Face Mill', material: 'Carbide', diameter: 12.7, length: 75, stock: 3, minStock: 2, cost: 125.00, supplier: 'Iscar' },
      { id: 'T004', name: '1.6mm Drill Bit', type: 'Drill', material: 'HSS', diameter: 1.6, length: 43, stock: 25, minStock: 10, cost: 8.75, supplier: 'Dormer' },
      { id: 'T005', name: '8mm Reamer', type: 'Reamer', material: 'HSS', diameter: 8.0, length: 85, stock: 1, minStock: 2, cost: 67.25, supplier: 'Guhring' },
    ];

    const columns: DataTableColumn[] = [
      { key: 'id', header: 'Tool ID', width: '80px' },
      { key: 'name', header: 'Tool Name' },
      { key: 'type', header: 'Type' },
      { key: 'material', header: 'Material', width: '100px' },
      { 
        key: 'diameter', 
        header: 'Diameter',
        align: 'right',
        render: (value) => (
          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {value} mm
          </span>
        )
      },
      { 
        key: 'stock', 
        header: 'Stock',
        align: 'center',
        render: (value, row) => {
          const isLow = value <= row.minStock;
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <span style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                color: isLow ? 'hsl(0, 84.2%, 60.2%)' : 'hsl(0, 0%, 98%)'
              }}>
                {value}
              </span>
              {isLow && <Badge variant="destructive" style={{ fontSize: '0.65rem', padding: '0.125rem 0.25rem' }}>LOW</Badge>}
            </div>
          );
        }
      },
      { 
        key: 'cost', 
        header: 'Cost',
        align: 'right',
        render: (value) => (
          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            ${value.toFixed(2)}
          </span>
        )
      },
      { key: 'supplier', header: 'Supplier' },
    ];

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
            Tool Inventory Management
          </h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'hsl(240, 5%, 64.9%)' }}>
            Track tool stock levels and manage inventory
          </p>
        </div>
        
        <DataTable 
          columns={columns} 
          data={toolData}
          searchable
          selectable
          pageSize={5}
          onRowClick={(tool) => console.log('Tool selected:', tool)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool inventory management with stock level indicators and low stock alerts.',
      },
    },
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [tableConfig, setTableConfig] = useState({
      searchable: true,
      sortable: true,
      selectable: true,
      pagination: true,
      pageSize: 5,
    });

    const columns: DataTableColumn[] = [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'name', header: 'Name' },
      { key: 'role', header: 'Role' },
      { 
        key: 'status', 
        header: 'Status',
        render: (value) => {
          const variant = value === 'active' ? 'success' : value === 'offline' ? 'destructive' : 'warning';
          return <Badge variant={variant}>{value}</Badge>;
        }
      },
      { key: 'experience', header: 'Experience', align: 'right' },
    ];

    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: 'hsl(240, 10%, 3.9%)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1000px'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
          Interactive Data Table Demo
        </h3>
        
        {/* Configuration Panel */}
        <div style={{ 
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: 'hsl(240, 3.7%, 15.9%)',
          borderRadius: '6px'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: 'hsl(0, 0%, 98%)' }}>
            Table Configuration
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
              <input
                type="checkbox"
                checked={tableConfig.searchable}
                onChange={(e) => setTableConfig(prev => ({ ...prev, searchable: e.target.checked }))}
              />
              Searchable
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
              <input
                type="checkbox"
                checked={tableConfig.sortable}
                onChange={(e) => setTableConfig(prev => ({ ...prev, sortable: e.target.checked }))}
              />
              Sortable
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
              <input
                type="checkbox"
                checked={tableConfig.selectable}
                onChange={(e) => setTableConfig(prev => ({ ...prev, selectable: e.target.checked }))}
              />
              Selectable
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
              <input
                type="checkbox"
                checked={tableConfig.pagination}
                onChange={(e) => setTableConfig(prev => ({ ...prev, pagination: e.target.checked }))}
              />
              Pagination
            </label>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'hsl(0, 0%, 98%)' }}>
                Page Size: {tableConfig.pageSize}
              </label>
              <input
                type="range"
                min="3"
                max="10"
                value={tableConfig.pageSize}
                onChange={(e) => setTableConfig(prev => ({ ...prev, pageSize: Number(e.target.value) }))}
                style={{ width: '100%', accentColor: 'hsl(262, 83%, 58%)' }}
              />
            </div>
          </div>
        </div>
        
        <DataTable 
          columns={columns} 
          data={sampleUsers}
          searchable={tableConfig.searchable}
          sortable={tableConfig.sortable}
          selectable={tableConfig.selectable}
          pagination={tableConfig.pagination}
          pageSize={tableConfig.pageSize}
          onRowSelect={(rows) => console.log('Selected rows:', rows)}
          onRowClick={(row) => console.log('Row clicked:', row)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration with configurable table features.',
      },
    },
  },
};