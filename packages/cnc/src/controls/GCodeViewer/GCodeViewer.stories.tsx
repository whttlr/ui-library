import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { GCodeViewer, CompactGCodeViewer, type GCodeLine } from './GCodeViewer';
import { Card, Button, Badge } from '@whttlr/ui-core';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

const meta: Meta<typeof GCodeViewer> = {
  title: 'CNC/Controls/GCodeViewer',
  component: GCodeViewer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A G-code viewer component with syntax highlighting, search functionality, and program execution tracking.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showLineNumbers: {
      control: 'boolean',
    },
    showSyntaxHighlight: {
      control: 'boolean',
    },
    searchEnabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    maxHeight: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample G-code program
const sampleGCode = `; Simple Face Milling Program
; Material: Aluminum 6061
; Tool: 12mm Face Mill

G21 ; Metric units
G90 ; Absolute positioning
G17 ; XY plane selection
G54 ; Work coordinate system

; Safety line
G00 G40 G49 G80 G90

; Tool change
T1 M06 ; Select tool 1
S3000 M03 ; Spindle on CW at 3000 RPM
G00 X0 Y0 Z50 ; Rapid to start position

; Face milling operation
G00 Z5 ; Rapid to clearance height
G01 Z-0.5 F200 ; Plunge to depth
G01 X100 F800 ; Cut across X
G01 Y20 ; Step over in Y
G01 X0 ; Cut back
G01 Y40 ; Step over
G01 X100 ; Cut across
G01 Y60 ; Step over
G01 X0 ; Cut back
G01 Y80 ; Step over
G01 X100 ; Cut across
G01 Y100 ; Step over
G01 X0 ; Final cut

; Retract and end
G00 Z50 ; Retract to safe height
M05 ; Spindle stop
M30 ; Program end and rewind`;

// Complex program with various commands
const complexGCode = `%
O1234 (COMPLEX PART PROGRAM)

(SETUP INFORMATION)
(PART: BEARING HOUSING)
(MATERIAL: STEEL 4140)
(DATE: 2024-01-15)

; Initialize machine
G21 G40 G49 G80 G90
G54 ; Work offset

; Tool 1 - Roughing
T1 M06 (1/2" ROUGHING ENDMILL)
S2500 M03
G43 H1 Z100
M08 ; Coolant on

; Approach
G00 X-10 Y-10
G00 Z5

; Roughing passes
G01 Z-5 F150
G01 X50 F300
G02 X60 Y0 I5 J0 ; Arc move
G01 Y50
G03 X50 Y60 I-10 J0 ; Arc move
G01 X0
G01 Y0
G00 Z25

; Tool change for finishing
M09 ; Coolant off
M05 ; Spindle stop
G91 G28 Z0 ; Return to home
M01 ; Optional stop

; Tool 2 - Finishing
T2 M06 (1/4" FINISHING ENDMILL)
S4000 M03
G43 H2 Z100
M08

; Finishing pass
G00 X-5 Y-5
G00 Z5
G01 Z-5.1 F100
G01 X50 F500
G02 X60 Y0 I5 J0
G01 Y50
G03 X50 Y60 I-10 J0
G01 X0
G01 Y0

; Drilling cycle
T3 M06 (8MM DRILL)
S1200 M03
G43 H3 Z100

; Drill holes
G81 X10 Y10 Z-15 R3 F80
X40 Y10
X40 Y40
X10 Y40
G80 ; Cancel cycle

; Program end
M09
M05
G91 G28 Z0
G28 X0 Y0
M30
%`;

export const Default: Story = {
  render: () => {
    const [currentLine, setCurrentLine] = useState<number>(1);

    return (
      <div style={{ width: '800px', height: '600px' }}>
        <GCodeViewer
          code={sampleGCode}
          currentLine={currentLine}
          onLineClick={(line) => setCurrentLine(line)}
          onRunFrom={(line) => {
            console.log('Run from line:', line);
            setCurrentLine(line);
          }}
        />
      </div>
    );
  },
};

export const WithProgramExecution: Story = {
  render: () => {
    const [currentLine, setCurrentLine] = useState<number>(1);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    
    const lines = sampleGCode.split('\n');

    // Simulate program execution
    useEffect(() => {
      if (isRunning && !isPaused) {
        const timer = setTimeout(() => {
          if (currentLine < lines.length) {
            setCurrentLine(currentLine + 1);
          } else {
            setIsRunning(false);
            setCurrentLine(1);
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    }, [isRunning, isPaused, currentLine, lines.length]);

    const handleStart = () => {
      setIsRunning(true);
      setIsPaused(false);
    };

    const handlePause = () => {
      setIsPaused(true);
    };

    const handleStop = () => {
      setIsRunning(false);
      setIsPaused(false);
      setCurrentLine(1);
    };

    const handleSingleStep = () => {
      if (currentLine < lines.length) {
        setCurrentLine(currentLine + 1);
      }
    };

    return (
      <div style={{ width: '900px' }}>
        <Card style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <h3 style={{ 
                margin: 0, 
                color: 'hsl(0, 0%, 98%)',
                fontSize: '1.125rem',
              }}>
                Program Execution
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Badge variant={isRunning ? 'success' : 'secondary'}>
                  {isRunning ? (isPaused ? 'Paused' : 'Running') : 'Stopped'}
                </Badge>
                <span style={{ 
                  fontSize: '0.875rem',
                  color: 'hsl(240, 5%, 64.9%)',
                }}>
                  Line {currentLine} of {lines.length}
                </span>
              </div>
            </div>
            
            {/* Control buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {!isRunning || isPaused ? (
                <Button
                  variant="success"
                  onClick={handleStart}
                  leftIcon={<Play size={16} />}
                >
                  {isPaused ? 'Resume' : 'Start'}
                </Button>
              ) : (
                <Button
                  variant="warning"
                  onClick={handlePause}
                  leftIcon={<Pause size={16} />}
                >
                  Pause
                </Button>
              )}
              
              <Button
                variant="destructive"
                onClick={handleStop}
                disabled={!isRunning}
                leftIcon={<RotateCcw size={16} />}
              >
                Stop
              </Button>
              
              <Button
                variant="outline-default"
                onClick={handleSingleStep}
                disabled={isRunning && !isPaused}
                leftIcon={<SkipForward size={16} />}
              >
                Single Step
              </Button>
            </div>
          </div>
          
          <GCodeViewer
            code={sampleGCode}
            currentLine={currentLine}
            onLineClick={(line) => {
              if (!isRunning) {
                setCurrentLine(line);
              }
            }}
            onRunFrom={(line) => {
              setCurrentLine(line);
              handleStart();
            }}
          />
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'G-code viewer with simulated program execution controls.',
      },
    },
  },
};

export const WithSyntaxHighlighting: Story = {
  render: () => {
    const [currentLine, setCurrentLine] = useState<number>(15);

    return (
      <div style={{ width: '800px', height: '600px' }}>
        <GCodeViewer
          code={complexGCode}
          currentLine={currentLine}
          onLineClick={setCurrentLine}
          showSyntaxHighlight={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex G-code program with full syntax highlighting showing different command types.',
      },
    },
  },
};

export const WithErrorHighlighting: Story = {
  render: () => {
    const linesWithErrors: GCodeLine[] = sampleGCode.split('\n').map((content, index) => ({
      lineNumber: index + 1,
      content,
      type: 'misc' as const,
      hasError: [5, 12, 18].includes(index + 1),
      errorMessage: [5, 12, 18].includes(index + 1) ? 'Syntax error detected' : undefined,
    }));

    return (
      <div style={{ width: '800px', height: '500px' }}>
        <Card style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ 
              margin: '0 0 0.5rem 0', 
              color: 'hsl(0, 0%, 98%)',
            }}>
              Program Verification
            </h4>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.5rem',
              backgroundColor: 'hsl(0, 84.2%, 60.2%, 0.1)',
              borderRadius: '4px',
              fontSize: '0.875rem',
            }}>
              <Badge variant="destructive">3 Errors</Badge>
              <span style={{ color: 'hsl(0, 84.2%, 60.2%)' }}>
                Lines 5, 12, and 18 contain syntax errors
              </span>
            </div>
          </div>
          
          <GCodeViewer
            code={linesWithErrors}
            onLineClick={(line) => console.log('Error on line:', line)}
          />
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'G-code viewer with error highlighting for syntax validation.',
      },
    },
  },
};

export const CompactVersion: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Card style={{ padding: '1rem' }}>
        <h4 style={{ 
          margin: '0 0 1rem 0', 
          color: 'hsl(0, 0%, 98%)',
          fontSize: '1rem',
        }}>
          Current Program
        </h4>
        <CompactGCodeViewer code={sampleGCode} maxLines={8} />
        <Button 
          variant="outline-default" 
          size="sm" 
          style={{ marginTop: '1rem', width: '100%' }}
        >
          View Full Program
        </Button>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact G-code viewer for showing program preview in limited space.',
      },
    },
  },
};

export const WithoutLineNumbers: Story = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <GCodeViewer
        code={sampleGCode}
        showLineNumbers={false}
        searchEnabled={false}
      />
    </div>
  ),
};

export const NoSyntaxHighlight: Story = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <GCodeViewer
        code={sampleGCode}
        showSyntaxHighlight={false}
      />
    </div>
  ),
};

export const ProgramLibrary: Story = {
  render: () => {
    const programs = [
      { id: 1, name: 'Face Mill Operation', code: sampleGCode, lines: sampleGCode.split('\n').length },
      { id: 2, name: 'Complex Part', code: complexGCode, lines: complexGCode.split('\n').length },
      { id: 3, name: 'Drill Pattern', code: `; Drill pattern program\nG21 G90\nT1 M06\nS1200 M03`, lines: 4 },
    ];

    const [selectedProgram, setSelectedProgram] = useState(programs[0]);

    return (
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '1.5rem',
        height: '600px',
        width: '100%',
        maxWidth: '1200px',
      }}>
        {/* Program List */}
        <Card style={{ padding: '1rem', overflowY: 'auto' }}>
          <h3 style={{ 
            margin: '0 0 1rem 0', 
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1.125rem',
          }}>
            Program Library
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {programs.map((program) => (
              <div
                key={program.id}
                onClick={() => setSelectedProgram(program)}
                style={{
                  padding: '0.75rem',
                  backgroundColor: selectedProgram.id === program.id ? 
                    'hsl(262, 83%, 58%, 0.1)' : 'hsl(240, 10%, 12%)',
                  border: selectedProgram.id === program.id ? 
                    '1px solid hsl(262, 83%, 58%)' : '1px solid transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ 
                  fontWeight: 600,
                  color: 'hsl(0, 0%, 98%)',
                  marginBottom: '0.25rem',
                }}>
                  {program.name}
                </div>
                <div style={{ 
                  fontSize: '0.75rem',
                  color: 'hsl(240, 5%, 64.9%)',
                }}>
                  {program.lines} lines
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Program Viewer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card style={{ 
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <h4 style={{ 
                margin: 0,
                color: 'hsl(0, 0%, 98%)',
                fontSize: '1.125rem',
              }}>
                {selectedProgram.name}
              </h4>
              <span style={{ 
                fontSize: '0.875rem',
                color: 'hsl(240, 5%, 64.9%)',
              }}>
                {selectedProgram.lines} lines
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="outline-default" size="sm">Edit</Button>
              <Button variant="default" size="sm">Load</Button>
            </div>
          </Card>
          
          <div style={{ flex: 1, minHeight: 0 }}>
            <GCodeViewer
              code={selectedProgram.code}
              maxHeight="100%"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete program library interface with program selection and viewing.',
      },
    },
  },
};