import * as React from 'react';
import { 
  Gauge, 
  Plus, 
  Minus, 
  RotateCcw,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Button, legacyTokens as tokens, cn } from '@whttlr/ui-core';

export interface FeedRateOverrideProps {
  currentOverride: number
  onChange: (percentage: number) => void
  min?: number
  max?: number
  step?: number
  presets?: number[]
  showTrend?: boolean
  previousOverride?: number
  disabled?: boolean
  className?: string
}

export const FeedRateOverride: React.FC<FeedRateOverrideProps> = ({
  currentOverride,
  onChange,
  min = 0,
  max = 200,
  step = 5,
  presets = [0, 25, 50, 75, 100, 125, 150, 200],
  showTrend = true,
  previousOverride,
  disabled = false,
  className,
}) => {
  const [isAdjusting, setIsAdjusting] = React.useState(false);
  
  // Container styles
  const containerStyles: React.CSSProperties = {
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.lg,
    border: `1px solid ${tokens.colors.border.primary}`,
    padding: tokens.spacing.lg,
  };

  // Header styles
  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing.md,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: tokens.text.size.base[0],
    fontWeight: tokens.text.weight.semibold,
    color: tokens.colors.text.primary,
  };

  // Display styles
  const displayContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.lg,
    position: 'relative',
  };

  const percentageDisplayStyles: React.CSSProperties = {
    fontSize: tokens.text.size['3xl'][0],
    fontWeight: tokens.text.weight.bold,
    fontFamily: tokens.text.family.mono.join(', '),
    color: getOverrideColor(currentOverride),
    textAlign: 'center',
    minWidth: '120px',
  };

  // Slider styles
  const sliderContainerStyles: React.CSSProperties = {
    position: 'relative',
    marginBottom: tokens.spacing.lg,
  };

  const sliderStyles: React.CSSProperties = {
    width: '100%',
    height: '8px',
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.colors.bg.tertiary,
    appearance: 'none',
    outline: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const sliderTrackStyles: React.CSSProperties = {
    position: 'absolute',
    height: '8px',
    borderRadius: tokens.radius.full,
    backgroundColor: getOverrideColor(currentOverride),
    pointerEvents: 'none',
    top: 0,
    left: 0,
    width: `${(currentOverride / max) * 100}%`,
    transition: 'width 0.2s ease',
  };

  // Get color based on override percentage
  function getOverrideColor(percentage: number): string {
    if (percentage === 0) return tokens.colors.status.error;
    if (percentage < 50) return tokens.colors.status.warning;
    if (percentage > 150) return tokens.colors.status.warning;
    return tokens.colors.status.success;
  }

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onChange(value);
    setIsAdjusting(true);
    setTimeout(() => setIsAdjusting(false), 1000);
  };

  // Handle increment/decrement
  const handleIncrement = () => {
    const newValue = Math.min(max, currentOverride + step);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, currentOverride - step);
    onChange(newValue);
  };

  // Reset to 100%
  const handleReset = () => {
    onChange(100);
  };

  return (
    <div className={cn(className)} style={containerStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <span style={titleStyles}>Feed Rate Override</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          disabled={disabled || currentOverride === 100}
          leftIcon={<RotateCcw size={16} />}
        >
          Reset
        </Button>
      </div>

      {/* Percentage Display */}
      <div style={displayContainerStyles}>
        <Button
          variant="outline-default"
          size="icon"
          onClick={handleDecrement}
          disabled={disabled || currentOverride <= min}
        >
          <Minus size={18} />
        </Button>

        <div>
          <div style={percentageDisplayStyles}>
            {currentOverride}%
          </div>
          {showTrend && previousOverride !== undefined && previousOverride !== currentOverride && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: tokens.spacing.xs,
              fontSize: tokens.text.size.sm[0],
              color: tokens.colors.text.secondary,
              marginTop: tokens.spacing.xs,
            }}>
              {currentOverride > previousOverride ? (
                <>
                  <TrendingUp size={14} />
                  <span>+{currentOverride - previousOverride}%</span>
                </>
              ) : (
                <>
                  <TrendingDown size={14} />
                  <span>{currentOverride - previousOverride}%</span>
                </>
              )}
            </div>
          )}
        </div>

        <Button
          variant="outline-default"
          size="icon"
          onClick={handleIncrement}
          disabled={disabled || currentOverride >= max}
        >
          <Plus size={18} />
        </Button>
      </div>

      {/* Slider */}
      <div style={sliderContainerStyles}>
        <div style={sliderTrackStyles} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentOverride}
          onChange={handleSliderChange}
          disabled={disabled}
          style={sliderStyles}
        />
        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${getOverrideColor(currentOverride)};
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
            position: relative;
            z-index: 1;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: transform 0.2s ease;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${getOverrideColor(currentOverride)};
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
            border: none;
            position: relative;
            z-index: 1;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
        `}</style>
      </div>

      {/* Preset Buttons */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: tokens.spacing.sm,
      }}>
        {presets.map((preset) => (
          <Button
            key={preset}
            variant={currentOverride === preset ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(preset)}
            disabled={disabled}
            style={{ 
              backgroundColor: currentOverride === preset ? getOverrideColor(preset) : undefined,
              borderColor: currentOverride === preset ? getOverrideColor(preset) : undefined,
            }}
          >
            {preset}%
          </Button>
        ))}
      </div>

      {/* Status Text */}
      <div style={{ 
        marginTop: tokens.spacing.md,
        padding: tokens.spacing.sm,
        backgroundColor: tokens.colors.bg.tertiary,
        borderRadius: tokens.radius.md,
        textAlign: 'center',
        fontSize: tokens.text.size.sm[0],
        color: tokens.colors.text.secondary,
      }}>
        {currentOverride === 0 && 'Feed Hold - Motion Stopped'}
        {currentOverride > 0 && currentOverride < 100 && `Feed Rate Reduced to ${currentOverride}%`}
        {currentOverride === 100 && 'Feed Rate at Programmed Speed'}
        {currentOverride > 100 && `Feed Rate Increased to ${currentOverride}%`}
      </div>
    </div>
  );
};

// Compact version for toolbar integration
export interface CompactFeedRateOverrideProps {
  currentOverride: number
  onChange: (percentage: number) => void
  disabled?: boolean
  className?: string
}

export const CompactFeedRateOverride: React.FC<CompactFeedRateOverrideProps> = ({
  currentOverride,
  onChange,
  disabled = false,
  className,
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border.primary}`,
  };

  const displayStyles: React.CSSProperties = {
    fontSize: tokens.text.size.lg[0],
    fontWeight: tokens.text.weight.semibold,
    fontFamily: tokens.text.family.mono.join(', '),
    color: currentOverride === 100 ? tokens.colors.text.primary : tokens.colors.status.warning,
    minWidth: '60px',
    textAlign: 'center',
  };

  const quickPresets = [50, 100, 150];

  return (
    <div className={cn(className)} style={containerStyles}>
      <Gauge size={20} color={tokens.colors.text.secondary} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(Math.max(0, currentOverride - 10))}
          disabled={disabled || currentOverride <= 0}
          style={{ padding: tokens.spacing.xs }}
        >
          <Minus size={16} />
        </Button>
        
        <div style={displayStyles}>
          {currentOverride}%
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(Math.min(200, currentOverride + 10))}
          disabled={disabled || currentOverride >= 200}
          style={{ padding: tokens.spacing.xs }}
        >
          <Plus size={16} />
        </Button>
      </div>

      <div style={{ 
        borderLeft: `1px solid ${tokens.colors.border.primary}`,
        height: '24px',
        margin: `0 ${tokens.spacing.xs}`,
      }} />

      {quickPresets.map((preset) => (
        <Button
          key={preset}
          variant={currentOverride === preset ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onChange(preset)}
          disabled={disabled}
          style={{ 
            padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
            minWidth: 'auto',
          }}
        >
          {preset}%
        </Button>
      ))}
    </div>
  );
};