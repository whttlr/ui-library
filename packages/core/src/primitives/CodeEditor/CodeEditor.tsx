import * as React from 'react';
import { EditorView, keymap, lineNumbers as cmLineNumbers, highlightActiveLineGutter } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { StreamLanguage, bracketMatching, foldGutter } from '@codemirror/language';
import { tokens } from '../../utils/tokens';

// Simple G-code language mode
const gcodeLanguage = StreamLanguage.define({
  name: 'gcode',
  token(stream) {
    // Skip whitespace
    if (stream.eatSpace()) return null;

    // Comments
    if (stream.match(/^[;(]/)) {
      stream.skipToEnd();
      return 'comment';
    }

    // G-code commands (G0, G1, G2, etc.)
    if (stream.match(/^[GM]\d+/i)) {
      return 'keyword';
    }

    // Parameters (X, Y, Z, F, S, etc.)
    if (stream.match(/^[A-Z]/i)) {
      return 'variable';
    }

    // Numbers
    if (stream.match(/^-?\d+\.?\d*/)) {
      return 'number';
    }

    stream.next();
    return null;
  }
});

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  readOnly?: boolean;
  lineNumbers?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
  (
    {
      value,
      onChange,
      height = '400px',
      readOnly = false,
      lineNumbers = true,
      className,
      style
    },
    ref
  ) => {
    const editorRef = React.useRef<HTMLDivElement>(null);
    const viewRef = React.useRef<EditorView | null>(null);

    React.useImperativeHandle(ref, () => editorRef.current as HTMLDivElement);

    React.useEffect(() => {
      if (!editorRef.current) return;

      // Create initial state with custom basic setup
      const startState = EditorState.create({
        doc: value,
        extensions: [
          // Basic editor features
          cmLineNumbers(),
          highlightActiveLineGutter(),
          history(),
          foldGutter(),
          bracketMatching(),

          // Keymaps
          keymap.of([...defaultKeymap, ...historyKeymap]),

          // Language and theme
          gcodeLanguage,
          oneDark,

          // Editor configuration
          EditorView.editable.of(!readOnly),
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (update.docChanged && !readOnly) {
              onChange(update.state.doc.toString());
            }
          }),

          // Custom theme
          EditorView.theme({
            '&': {
              fontSize: tokens.text.size.sm[0],
              fontFamily: tokens.text.family.mono.join(', ')
            },
            '.cm-content': {
              fontFamily: tokens.text.family.mono.join(', '),
              padding: tokens.spacing.md
            },
            '.cm-gutters': {
              backgroundColor: tokens.colors.bg.secondary,
              color: tokens.colors.text.secondary,
              border: 'none'
            },
            '.cm-activeLineGutter': {
              backgroundColor: tokens.colors.bg.tertiary
            }
          })
        ]
      });

      // Create editor view
      const view = new EditorView({
        state: startState,
        parent: editorRef.current
      });

      viewRef.current = view;

      // Cleanup
      return () => {
        view.destroy();
        viewRef.current = null;
      };
    }, []); // Only run once on mount

    // Update editor when value changes externally
    React.useEffect(() => {
      if (viewRef.current && value !== viewRef.current.state.doc.toString()) {
        const transaction = viewRef.current.state.update({
          changes: {
            from: 0,
            to: viewRef.current.state.doc.length,
            insert: value
          }
        });
        viewRef.current.dispatch(transaction);
      }
    }, [value]);

    return (
      <div
        ref={editorRef}
        className={className}
        style={{
          height,
          overflow: 'auto',
          borderRadius: tokens.radius.base,
          border: `1px solid ${tokens.colors.border.default}`,
          ...style
        }}
      />
    );
  }
);

CodeEditor.displayName = 'CodeEditor';
