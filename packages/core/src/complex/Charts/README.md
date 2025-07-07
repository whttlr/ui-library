# Chart Components

A comprehensive set of data visualization components built on Recharts, optimized for CNC machine monitoring and industrial dashboards.

## Components

- **LineChart**: Time-series and trend visualization
- **AreaChart**: Filled area charts for cumulative data
- **BarChart**: Categorical data comparison
- **PieChart**: Proportional data representation
- **MetricCard**: KPI display with optional mini-charts
- **MachineDashboard**: Complete machine status dashboard

## Usage

### LineChart

```tsx
import { LineChart } from '@whttlr/ui-core';

const temperatureData = [
  { time: '10:00', temperature: 20.5, target: 22 },
  { time: '10:05', temperature: 21.2, target: 22 },
  { time: '10:10', temperature: 21.8, target: 22 },
  { time: '10:15', temperature: 22.1, target: 22 },
];

<LineChart 
  data={temperatureData}
  xKey="time"
  lines={[
    { key: 'temperature', color: '#ff6b6b', name: 'Current' },
    { key: 'target', color: '#4ecdc4', name: 'Target', strokeDasharray: '5 5' }
  ]}
  title="Temperature Monitor"
  height={300}
/>
```

### AreaChart

```tsx
import { AreaChart } from '@whttlr/ui-core';

const productionData = [
  { hour: '8:00', parts: 45, defects: 2 },
  { hour: '9:00', parts: 52, defects: 1 },
  { hour: '10:00', parts: 48, defects: 3 },
];

<AreaChart 
  data={productionData}
  xKey="hour"
  areas={[
    { key: 'parts', color: '#4ecdc4', name: 'Parts Produced' },
    { key: 'defects', color: '#ff6b6b', name: 'Defects' }
  ]}
  stacked
  title="Production Overview"
/>
```

### BarChart

```tsx
import { BarChart } from '@whttlr/ui-core';

const machineUtilization = [
  { machine: 'CNC-001', utilization: 85, downtime: 15 },
  { machine: 'CNC-002', utilization: 92, downtime: 8 },
  { machine: 'CNC-003', utilization: 78, downtime: 22 },
];

<BarChart 
  data={machineUtilization}
  xKey="machine"
  bars={[
    { key: 'utilization', color: '#4ecdc4', name: 'Utilization %' },
    { key: 'downtime', color: '#ff6b6b', name: 'Downtime %' }
  ]}
  orientation="vertical"
  title="Machine Utilization"
/>
```

### PieChart

```tsx
import { PieChart } from '@whttlr/ui-core';

const statusDistribution = [
  { name: 'Running', value: 75, color: '#4ecdc4' },
  { name: 'Idle', value: 15, color: '#ffa726' },
  { name: 'Maintenance', value: 8, color: '#ff6b6b' },
  { name: 'Error', value: 2, color: '#ef5350' },
];

<PieChart 
  data={statusDistribution}
  nameKey="name"
  valueKey="value"
  showLabels
  title="Machine Status Distribution"
/>
```

### MetricCard

```tsx
import { MetricCard } from '@whttlr/ui-core';

<MetricCard 
  title="Overall Equipment Effectiveness"
  value="87.2%"
  variant="success"
  trend={{ value: 2.3, direction: 'up' }}
  chart={<LineChart data={oeeHistory} height={60} />}
  subtitle="Last 24 hours"
/>
```

### MachineDashboard

```tsx
import { MachineDashboard } from '@whttlr/ui-core';

const machineData = {
  temperature: {
    current: 42.5,
    target: 45.0,
    history: temperatureHistory
  },
  spindle: {
    rpm: 1250,
    load: 78,
    maxRpm: 2000
  },
  position: {
    x: 120.55,
    y: 85.22,
    z: 15.01
  },
  status: 'running',
  utilization: 89.2,
  partsCount: 1247
};

<MachineDashboard 
  data={machineData}
  layout="grid"
  showAlerts
  refreshInterval={1000}
/>
```

## Props

### LineChart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<object>` | - | Chart data array |
| `xKey` | `string` | `'name'` | Key for X-axis values |
| `lines` | `LineConfig[]` | - | Line configuration array |
| `title` | `string` | - | Chart title |
| `width` | `number` | `400` | Chart width |
| `height` | `number` | `250` | Chart height |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `showTooltip` | `boolean` | `true` | Show tooltip on hover |
| `showLegend` | `boolean` | `true` | Show legend |

### MetricCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Metric title |
| `value` | `string \| number` | - | Main metric value |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Visual variant |
| `trend` | `{ value: number, direction: 'up' \| 'down' }` | - | Trend indicator |
| `chart` | `ReactNode` | - | Mini chart component |
| `subtitle` | `string` | - | Additional context |
| `loading` | `boolean` | `false` | Loading state |

### MachineDashboard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `MachineData` | - | Complete machine data |
| `layout` | `'grid' \| 'compact' \| 'detailed'` | `'grid'` | Dashboard layout |
| `showAlerts` | `boolean` | `true` | Show alert indicators |
| `refreshInterval` | `number` | - | Auto-refresh interval (ms) |
| `onAlertClick` | `(alert: Alert) => void` | - | Alert click handler |

## Examples

### Real-time Temperature Monitoring

```tsx
const TemperatureMonitor = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch new temperature data
      fetchTemperatureData().then(newData => {
        setData(prev => [...prev.slice(-50), ...newData]);
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <LineChart 
      data={data}
      xKey="timestamp"
      lines={[
        { 
          key: 'temperature', 
          color: '#ff6b6b', 
          name: 'Current Temperature',
          animation: true
        }
      ]}
      title="Live Temperature Feed"
      height={400}
    />
  );
};
```

### Production Dashboard

```tsx
const ProductionDashboard = () => {
  return (
    <div className="dashboard-grid">
      <MetricCard 
        title="Parts Completed Today"
        value="1,247"
        variant="success"
        trend={{ value: 8.2, direction: 'up' }}
      />
      
      <MetricCard 
        title="Current Efficiency"
        value="94.2%"
        variant="success"
        chart={<AreaChart data={efficiencyData} height={60} />}
      />
      
      <MetricCard 
        title="Machine Temperature"
        value="42.5°C"
        variant="warning"
        trend={{ value: 2.1, direction: 'up' }}
      />
      
      <BarChart 
        data={hourlyProduction}
        title="Hourly Production"
        height={300}
      />
    </div>
  );
};
```

### Custom Chart Themes

```tsx
const customTheme = {
  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'],
  backgroundColor: '#1a1a1a',
  gridColor: '#333',
  textColor: '#fff'
};

<LineChart 
  data={data}
  theme={customTheme}
  title="Custom Themed Chart"
/>
```

## Accessibility

- Keyboard navigation support
- Screen reader compatible with ARIA labels
- High contrast mode support
- Focus indicators for interactive elements
- Alternative text for chart data

## Performance

- Optimized for real-time data updates
- Automatic data point limiting for performance
- Lazy loading for large datasets
- Memory efficient re-rendering
- Configurable animation performance

## CNC-Specific Features

- Industrial color schemes
- Machine status indicators
- Real-time data visualization
- Alert threshold visualization
- Multi-axis position tracking
- Temperature monitoring layouts
- Production metrics formatting

## Related Components

- [MetricCard](../../primitives/Card/README.md) - Individual KPI display
- [Dashboard](../../layouts/Dashboard/README.md) - Dashboard layout
- [StatusIndicator](../../../cnc/controls/StatusIndicator/README.md) - Status displays