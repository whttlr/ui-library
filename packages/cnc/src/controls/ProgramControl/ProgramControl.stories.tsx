import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { ProgramControl, CompactProgramControl, type ProgramState } from './ProgramControl';
import { Card, Button, Badge } from '@whttlr/ui-core';
import { FileText, Settings, AlertCircle, CheckCircle } from 'lucide-react';

const meta: Meta<typeof ProgramControl> = {
  title: 'CNC/Controls/ProgramControl',
  component: ProgramControl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive program control component for CNC machines with play, pause, stop, and step functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample program state
const initialProgramState: ProgramState = {
  status: 'idle',
  currentLine: 1,
  totalLines: 45,
  runtime: 0,
  estimatedTime: 780, // 13 minutes
  programName: 'Face_Mill_Operation.nc',
};

export const Default: Story = {
  render: () => {
    const [programState, setProgramState] = useState<ProgramState>(initialProgramState);

    const handleStart = () => {
      setProgramState(prev => ({ ...prev, status: 'running' }));
    };

    const handlePause = () => {
      setProgramState(prev => ({ ...prev, status: 'paused' }));
    };

    const handleStop = () => {
      setProgramState(prev => ({ 
        ...prev, 
        status: 'stopped',
        currentLine: 1,
        runtime: 0,
      }));
    };

    const handleReset = () => {
      setProgramState(prev => ({ 
        ...prev, 
        status: 'idle',
        currentLine: 1,
        runtime: 0,
      }));
    };

    const handleSingleStep = () => {
      setProgramState(prev => ({ 
        ...prev, 
        currentLine: Math.min(prev.currentLine + 1, prev.totalLines),
      }));
    };

    const handleSkipToLine = (line: number) => {
      setProgramState(prev => ({ 
        ...prev, 
        currentLine: Math.max(1, Math.min(line, prev.totalLines)),
      }));
    };

    return (
      <div style={{ width: '600px' }}>
        <ProgramControl
          programState={programState}
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
          onReset={handleReset}
          onSingleStep={handleSingleStep}
          onSkipToLine={handleSkipToLine}
          onLoadProgram={() => console.log('Load program')}
          onSaveProgram={() => console.log('Save program')}
          onProgramSettings={() => console.log('Program settings')}
        />
      </div>
    );
  },
};

export const WithSimulation: Story = {
  render: () => {
    const [programState, setProgramState] = useState<ProgramState>(initialProgramState);

    // Simulate program execution
    useEffect(() => {
      if (programState.status === 'running') {
        const timer = setInterval(() => {
          setProgramState(prev => {
            const newRuntime = prev.runtime + 1;
            const newCurrentLine = Math.min(
              prev.currentLine + (Math.random() > 0.7 ? 1 : 0),
              prev.totalLines
            );
            
            // Complete program when reaching end
            if (newCurrentLine >= prev.totalLines) {
              return {
                ...prev,
                status: 'completed',
                currentLine: prev.totalLines,
                runtime: newRuntime,
              };
            }
            
            return {
              ...prev,
              currentLine: newCurrentLine,
              runtime: newRuntime,
            };
          });
        }, 1000);
        
        return () => clearInterval(timer);
      }
    }, [programState.status]);

    const handleStart = () => {
      setProgramState(prev => ({ 
        ...prev, 
        status: 'running',
        ...(prev.status === 'idle' && { currentLine: 1, runtime: 0 }),
      }));
    };

    const handlePause = () => {
      setProgramState(prev => ({ ...prev, status: 'paused' }));
    };

    const handleStop = () => {
      setProgramState(prev => ({ 
        ...prev, 
        status: 'stopped',
        currentLine: 1,
        runtime: 0,
      }));
    };

    const handleReset = () => {
      setProgramState(prev => ({ 
        ...prev, 
        status: 'idle',
        currentLine: 1,
        runtime: 0,
      }));
    };

    const handleSingleStep = () => {
      setProgramState(prev => ({ 
        ...prev, 
        currentLine: Math.min(prev.currentLine + 1, prev.totalLines),
      }));
    };

    return (
      <div style={{ width: '650px' }}>
        <Card style={{ padding: '1.5rem', marginBottom: '1rem' }}>
          <h3 style={{ 
            margin: '0 0 1rem 0', 
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1.125rem',
          }}>
            Program Execution Simulation
          </h3>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            marginBottom: '1rem',
          }}>
            <Badge variant={programState.status === 'running' ? 'success' : 'secondary'}>
              {programState.status === 'running' ? 'Executing' : 'Simulation Ready'}
            </Badge>
            <span style={{ 
              fontSize: '0.875rem',
              color: 'hsl(240, 5%, 64.9%)',
            }}>
              Progress will advance automatically when running
            </span>
          </div>
        </Card>

        <ProgramControl
          programState={programState}
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
          onReset={handleReset}
          onSingleStep={handleSingleStep}
          onLoadProgram={() => console.log('Load program')}
          onSaveProgram={() => console.log('Save program')}
          onProgramSettings={() => console.log('Program settings')}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Program control with simulated execution showing real-time progress updates.',
      },
    },
  },
};

export const ErrorState: Story = {
  render: () => {
    const errorProgramState: ProgramState = {
      ...initialProgramState,
      status: 'error',
      currentLine: 23,
      runtime: 145,
      errorMessage: 'G-code error: Invalid feed rate on line 23 (F0 not allowed)',
    };

    const [programState, setProgramState] = useState<ProgramState>(errorProgramState);

    const handleReset = () => {
      setProgramState(prev => ({ 
        ...prev, 
        status: 'idle',
        currentLine: 1,
        runtime: 0,
        errorMessage: undefined,
      }));
    };

    return (
      <div style={{ width: '600px' }}>
        <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}>
            <AlertCircle size={16} color="hsl(0, 84.2%, 60.2%)" />
            <h4 style={{ 
              margin: 0,
              color: 'hsl(0, 84.2%, 60.2%)',
              fontSize: '1rem',
            }}>
              Program Error Detected
            </h4>
          </div>
          <p style={{ 
            margin: 0,
            fontSize: '0.875rem',
            color: 'hsl(240, 5%, 64.9%)',
          }}>
            This demonstrates how the program control handles error states with detailed error messages.
          </p>
        </Card>

        <ProgramControl
          programState={programState}
          onStart={() => {}}
          onPause={() => {}}
          onStop={() => {}}
          onReset={handleReset}
          onSingleStep={() => {}}
          onLoadProgram={() => console.log('Load program')}
          onSaveProgram={() => console.log('Save program')}
          onProgramSettings={() => console.log('Program settings')}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Program control in error state with detailed error message display.',
      },
    },
  },
};

export const CompletedState: Story = {
  render: () => {
    const completedProgramState: ProgramState = {
      ...initialProgramState,
      status: 'completed',
      currentLine: 45,
      runtime: 720, // 12 minutes
    };

    const [programState, setProgramState] = useState<ProgramState>(completedProgramState);

    const handleReset = () => {
      setProgramState(prev => ({ 
        ...prev, 
        status: 'idle',
        currentLine: 1,
        runtime: 0,
      }));
    };

    return (
      <div style={{ width: '600px' }}>
        <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}>
            <CheckCircle size={16} color="hsl(142, 76%, 36%)" />
            <h4 style={{ 
              margin: 0,
              color: 'hsl(142, 76%, 36%)',
              fontSize: '1rem',
            }}>
              Program Completed Successfully
            </h4>
          </div>
          <p style={{ 
            margin: 0,
            fontSize: '0.875rem',
            color: 'hsl(240, 5%, 64.9%)',
          }}>
            The program has finished executing all 45 lines in 12 minutes.
          </p>
        </Card>

        <ProgramControl
          programState={programState}
          onStart={() => {}}
          onPause={() => {}}
          onStop={() => {}}
          onReset={handleReset}
          onSingleStep={() => {}}
          onLoadProgram={() => console.log('Load program')}
          onSaveProgram={() => console.log('Save program')}
          onProgramSettings={() => console.log('Program settings')}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Program control showing completed program state with full progress.',
      },
    },
  },
};

export const NoProgramLoaded: Story = {
  render: () => {
    const emptyProgramState: ProgramState = {
      status: 'idle',
      currentLine: 0,
      totalLines: 0,
      runtime: 0,
      estimatedTime: 0,
      programName: '',
    };

    const [programState, setProgramState] = useState<ProgramState>(emptyProgramState);

    const handleLoadProgram = () => {
      setProgramState({
        ...initialProgramState,
        status: 'idle',
        currentLine: 1,
        runtime: 0,
      });
    };

    return (
      <div style={{ width: '600px' }}>
        <ProgramControl
          programState={programState}
          onStart={() => {}}
          onPause={() => {}}
          onStop={() => {}}
          onReset={() => {}}
          onSingleStep={() => {}}
          onLoadProgram={handleLoadProgram}
          onSaveProgram={() => console.log('Save program')}
          onProgramSettings={() => console.log('Program settings')}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Program control when no program is loaded, showing load program functionality.',
      },
    },
  },
};

export const CompactVersion: Story = {
  render: () => {
    const [programState, setProgramState] = useState<ProgramState>({
      ...initialProgramState,
      status: 'running',
      currentLine: 23,
      runtime: 145,
    });

    const [showDetails, setShowDetails] = useState(false);

    const handleStart = () => {
      setProgramState(prev => ({ ...prev, status: 'running' }));
    };

    const handlePause = () => {
      setProgramState(prev => ({ ...prev, status: 'paused' }));
    };

    const handleStop = () => {
      setProgramState(prev => ({ 
        ...prev, 
        status: 'stopped',
        currentLine: 1,
        runtime: 0,
      }));
    };

    return (
      <div style={{ width: 'auto' }}>
        <CompactProgramControl
          programState={programState}
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
          onShowDetails={() => setShowDetails(!showDetails)}
        />
        {showDetails && (
          <div style={{ marginTop: '1rem' }}>
            <Card style={{ padding: '1rem' }}>
              <p style={{ 
                margin: 0, 
                color: 'hsl(240, 5%, 64.9%)',
                fontSize: '0.875rem',
              }}>
                Full program control interface would open here...
              </p>
            </Card>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact program control suitable for toolbars and status displays.',
      },
    },
  },
};

export const MultiProgramSetup: Story = {
  render: () => {
    const programs = [
      {
        id: 1,
        name: 'Roughing_Pass.nc',
        lines: 120,
        estimated: 900,
        status: 'completed' as const,
        progress: 100,
      },
      {
        id: 2,
        name: 'Finishing_Pass.nc',
        lines: 85,
        estimated: 650,
        status: 'running' as const,
        progress: 65,
      },
      {
        id: 3,
        name: 'Drilling_Cycle.nc',
        lines: 45,
        estimated: 320,
        status: 'idle' as const,
        progress: 0,
      },
    ];

    const [activeProgram, setActiveProgram] = useState(programs[1]);
    const [programState, setProgramState] = useState<ProgramState>({
      status: 'running',
      currentLine: Math.floor(activeProgram.lines * (activeProgram.progress / 100)),
      totalLines: activeProgram.lines,
      runtime: Math.floor(activeProgram.estimated * (activeProgram.progress / 100) / 60),
      estimatedTime: activeProgram.estimated,
      programName: activeProgram.name,
    });

    const handleStart = () => {
      setProgramState(prev => ({ ...prev, status: 'running' }));
    };

    const handlePause = () => {
      setProgramState(prev => ({ ...prev, status: 'paused' }));
    };

    const handleStop = () => {
      setProgramState(prev => ({ 
        ...prev, 
        status: 'stopped',
        currentLine: 1,
        runtime: 0,
      }));
    };

    const handleReset = () => {
      setProgramState(prev => ({ 
        ...prev, 
        status: 'idle',
        currentLine: 1,
        runtime: 0,
      }));
    };

    const handleSingleStep = () => {
      setProgramState(prev => ({ 
        ...prev, 
        currentLine: Math.min(prev.currentLine + 1, prev.totalLines),
      }));
    };

    return (
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '1000px',
      }}>
        {/* Program Queue */}
        <Card style={{ padding: '1rem' }}>
          <h3 style={{ 
            margin: '0 0 1rem 0', 
            color: 'hsl(0, 0%, 98%)',
            fontSize: '1.125rem',
          }}>
            Program Queue
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {programs.map((program) => (
              <div
                key={program.id}
                onClick={() => {
                  setActiveProgram(program);
                  setProgramState({
                    status: program.status,
                    currentLine: Math.floor(program.lines * (program.progress / 100)),
                    totalLines: program.lines,
                    runtime: Math.floor(program.estimated * (program.progress / 100) / 60),
                    estimatedTime: program.estimated,
                    programName: program.name,
                  });
                }}
                style={{
                  padding: '0.75rem',
                  backgroundColor: activeProgram.id === program.id ? 
                    'hsl(262, 83%, 58%, 0.1)' : 'hsl(240, 10%, 12%)',
                  border: activeProgram.id === program.id ? 
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
                  fontSize: '0.875rem',
                }}>
                  {program.name}
                </div>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Badge 
                    variant={
                      program.status === 'completed' ? 'success' :
                      program.status === 'running' ? 'default' : 'secondary'
                    }
                  >
                    {program.status}
                  </Badge>
                  <span style={{ 
                    fontSize: '0.75rem',
                    color: 'hsl(240, 5%, 64.9%)',
                  }}>
                    {program.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Program Control */}
        <div>
          <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
            <h3 style={{ 
              margin: '0 0 0.5rem 0', 
              color: 'hsl(0, 0%, 98%)',
              fontSize: '1.125rem',
            }}>
              Active Program
            </h3>
            <p style={{ 
              margin: 0,
              fontSize: '0.875rem',
              color: 'hsl(240, 5%, 64.9%)',
            }}>
              Currently executing: {activeProgram.name}
            </p>
          </Card>

          <ProgramControl
            programState={programState}
            onStart={handleStart}
            onPause={handlePause}
            onStop={handleStop}
            onReset={handleReset}
            onSingleStep={handleSingleStep}
            onLoadProgram={() => console.log('Load program')}
            onSaveProgram={() => console.log('Save program')}
            onProgramSettings={() => console.log('Program settings')}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-program setup with program queue and active program control.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    programState: initialProgramState,
    disabled: true,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <ProgramControl
        {...args}
        onStart={() => {}}
        onPause={() => {}}
        onStop={() => {}}
        onReset={() => {}}
        onSingleStep={() => {}}
        onLoadProgram={() => console.log('Load program')}
        onSaveProgram={() => console.log('Save program')}
        onProgramSettings={() => console.log('Program settings')}
      />
    </div>
  ),
};