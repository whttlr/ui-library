import * as React from 'react';
import { 
  FileText,
  Play,
  Pause,
  SkipForward,
  Search,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronRight
} from 'lucide-react';
import { 
  Button, 
  tokens, 
  Card, 
  Badge, 
  TextInput,
  cn 
} from '@whttlr/ui-core';

export interface GCodeLine {
  lineNumber: number
  content: string
  type: 'movement' | 'tool' | 'spindle' | 'coolant' | 'comment' | 'program' | 'misc'
  isActive?: boolean
  hasError?: boolean
  errorMessage?: string
}

export interface GCodeViewerProps {
  code: string | GCodeLine[]
  currentLine?: number
  onLineClick?: (lineNumber: number) => void
  onRunFrom?: (lineNumber: number) => void
  showLineNumbers?: boolean
  showSyntaxHighlight?: boolean
  searchEnabled?: boolean
  readOnly?: boolean
  maxHeight?: string
  className?: string
}

export const GCodeViewer: React.FC<GCodeViewerProps> = ({
  code,
  currentLine,
  onLineClick,
  onRunFrom,
  showLineNumbers = true,
  showSyntaxHighlight = true,
  searchEnabled = true,
  readOnly = true,
  maxHeight = '600px',
  className,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const lineRefs = React.useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Parse code into lines if string provided
  const lines = React.useMemo((): GCodeLine[] => {
    if (Array.isArray(code)) return code;
    
    return code.split('\n').map((line, index) => ({
      lineNumber: index + 1,
      content: line,
      type: getLineType(line),
      isActive: currentLine === index + 1,
    }));
  }, [code, currentLine]);

  // Get line type for syntax highlighting
  function getLineType(line: string): GCodeLine['type'] {
    const trimmed = line.trim();
    if (!trimmed) return 'misc';
    if (trimmed.startsWith('(') || trimmed.startsWith(';')) return 'comment';
    if (/^[GMT]\d+/i.test(trimmed)) {
      if (/^G0?[0-3]/i.test(trimmed)) return 'movement';
      if (/^M0?[3-5]/i.test(trimmed)) return 'spindle';
      if (/^M0?[7-9]/i.test(trimmed)) return 'coolant';
      if (/^T\d+/i.test(trimmed)) return 'tool';
      if (/^M30|M0?2/i.test(trimmed)) return 'program';
    }
    return 'misc';
  }

  // Get syntax color
  function getSyntaxColor(type: GCodeLine['type']): string {
    switch (type) {
      case 'movement': return tokens.colors.status.info;
      case 'tool': return tokens.colors.status.warning;
      case 'spindle': return tokens.colors.status.success;
      case 'coolant': return '#00bcd4';
      case 'comment': return tokens.colors.text.secondary;
      case 'program': return tokens.colors.status.error;
      default: return tokens.colors.text.primary;
    }
  }

  // Handle search
  React.useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const results: number[] = [];
    lines.forEach((line) => {
      if (line.content.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(line.lineNumber);
      }
    });
    setSearchResults(results);
    setCurrentSearchIndex(0);
  }, [searchTerm, lines]);

  // Scroll to line
  const scrollToLine = (lineNumber: number) => {
    const lineElement = lineRefs.current[lineNumber];
    if (lineElement && scrollContainerRef.current) {
      lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Scroll to current line on change
  React.useEffect(() => {
    if (currentLine) {
      scrollToLine(currentLine);
    }
  }, [currentLine]);

  // Navigate search results
  const navigateSearch = (direction: 'next' | 'prev') => {
    if (searchResults.length === 0) return;
    
    let newIndex = currentSearchIndex;
    if (direction === 'next') {
      newIndex = (currentSearchIndex + 1) % searchResults.length;
    } else {
      newIndex = currentSearchIndex === 0 ? searchResults.length - 1 : currentSearchIndex - 1;
    }
    
    setCurrentSearchIndex(newIndex);
    scrollToLine(searchResults[newIndex]);
  };

  // Container styles
  const containerStyles: React.CSSProperties = {
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.lg,
    border: `1px solid ${tokens.colors.border.primary}`,
    display: 'flex',
    flexDirection: 'column',
    height: maxHeight,
  };

  // Header styles
  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: tokens.spacing.md,
    borderBottom: `1px solid ${tokens.colors.border.primary}`,
  };

  // Code container styles
  const codeContainerStyles: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    backgroundColor: tokens.colors.bg.primary,
    fontFamily: tokens.text.family.mono.join(', '),
    fontSize: tokens.text.size.sm[0],
    lineHeight: '1.6',
  };

  // Line styles
  const getLineStyles = (line: GCodeLine): React.CSSProperties => {
    const isSearchMatch = searchResults.includes(line.lineNumber);
    const isCurrentSearchMatch = searchResults[currentSearchIndex] === line.lineNumber;
    
    return {
      display: 'flex',
      padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
      backgroundColor: line.isActive ? `${tokens.colors.primary.main}20` :
                      isCurrentSearchMatch ? `${tokens.colors.status.warning}30` :
                      isSearchMatch ? `${tokens.colors.status.warning}10` :
                      line.hasError ? `${tokens.colors.status.error}10` :
                      'transparent',
      borderLeft: line.isActive ? `3px solid ${tokens.colors.primary.main}` : '3px solid transparent',
      cursor: onLineClick ? 'pointer' : 'default',
      transition: 'background-color 0.2s ease',
    };
  };

  // Line number styles
  const lineNumberStyles: React.CSSProperties = {
    minWidth: '50px',
    marginRight: tokens.spacing.md,
    color: tokens.colors.text.secondary,
    textAlign: 'right',
    userSelect: 'none',
  };

  return (
    <div className={cn(className)} style={containerStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
          <FileText size={20} color={tokens.colors.text.secondary} />
          <span style={{ 
            fontSize: tokens.text.size.base[0],
            fontWeight: tokens.text.weight.semibold,
            color: tokens.colors.text.primary,
          }}>
            G-Code Program
          </span>
          {currentLine && (
            <Badge variant="secondary" style={{ marginLeft: tokens.spacing.sm }}>
              Line {currentLine}
            </Badge>
          )}
        </div>

        {/* Search */}
        {searchEnabled && (
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
            <div style={{ position: 'relative', width: '200px' }}>
              <TextInput
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="sm"
                icon={<Search size={16} />}
              />
              {searchResults.length > 0 && (
                <div style={{
                  position: 'absolute',
                  right: tokens.spacing.sm,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: tokens.text.size.xs[0],
                  color: tokens.colors.text.secondary,
                }}>
                  {currentSearchIndex + 1}/{searchResults.length}
                </div>
              )}
            </div>
            {searchResults.length > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateSearch('prev')}
                  style={{ padding: tokens.spacing.xs }}
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateSearch('next')}
                  style={{ padding: tokens.spacing.xs }}
                >
                  ↓
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Code Display */}
      <div ref={scrollContainerRef} style={codeContainerStyles}>
        {lines.map((line) => (
          <div
            key={line.lineNumber}
            ref={(el) => { lineRefs.current[line.lineNumber] = el; }}
            style={getLineStyles(line)}
            onClick={() => onLineClick?.(line.lineNumber)}
            onDoubleClick={() => onRunFrom?.(line.lineNumber)}
          >
            {showLineNumbers && (
              <span style={lineNumberStyles}>
                {line.lineNumber}
              </span>
            )}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
              <span style={{ 
                color: showSyntaxHighlight ? getSyntaxColor(line.type) : tokens.colors.text.primary,
                flex: 1,
              }}>
                {line.content || '\u00A0'}
              </span>
              {line.hasError && (
                <AlertTriangle size={16} color={tokens.colors.status.error} />
              )}
              {line.isActive && (
                <ChevronRight size={16} color={tokens.colors.primary.main} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div style={{ 
        padding: tokens.spacing.sm,
        borderTop: `1px solid ${tokens.colors.border.primary}`,
        fontSize: tokens.text.size.xs[0],
        color: tokens.colors.text.secondary,
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>{lines.length} lines</span>
        {!readOnly && (
          <span style={{ color: tokens.colors.status.warning }}>
            <AlertTriangle size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Editing Mode
          </span>
        )}
      </div>
    </div>
  );
};

// Compact inline viewer
export interface CompactGCodeViewerProps {
  code: string
  maxLines?: number
  className?: string
}

export const CompactGCodeViewer: React.FC<CompactGCodeViewerProps> = ({
  code,
  maxLines = 5,
  className,
}) => {
  const lines = code.split('\n').slice(0, maxLines);
  const hasMore = code.split('\n').length > maxLines;

  const containerStyles: React.CSSProperties = {
    backgroundColor: tokens.colors.bg.secondary,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border.primary}`,
    padding: tokens.spacing.sm,
    fontFamily: tokens.text.family.mono.join(', '),
    fontSize: tokens.text.size.xs[0],
  };

  return (
    <div className={cn(className)} style={containerStyles}>
      {lines.map((line, index) => (
        <div key={index} style={{ 
          color: getLineType(line) === 'comment' ? tokens.colors.text.secondary : tokens.colors.text.primary,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {line}
        </div>
      ))}
      {hasMore && (
        <div style={{ 
          color: tokens.colors.text.secondary,
          fontSize: tokens.text.size.xs[0],
          marginTop: tokens.spacing.xs,
        }}>
          ... and {code.split('\n').length - maxLines} more lines
        </div>
      )}
    </div>
  );

  function getLineType(line: string): GCodeLine['type'] {
    const trimmed = line.trim();
    if (trimmed.startsWith('(') || trimmed.startsWith(';')) return 'comment';
    return 'misc';
  }
};