import { useState, useEffect, useRef, useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useStore } from '../store';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const HANDLE_STYLE = {
  width: '10px',
  height: '10px',
  border: '2px solid #1e293b',
  borderRadius: '50%',
  background: '#f59e0b',
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [text, setText] = useState(data.text ?? '');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const wrapperRef = useRef(null);

  const extractVariables = useCallback((value) => {
    const found = new Set();
    let match;
    VAR_REGEX.lastIndex = 0;
    while ((match = VAR_REGEX.exec(value)) !== null) {
      found.add(match[1]);
    }
    return [...found];
  }, []);

  useEffect(() => {
    const el = textareaRef.current;
    const wrapper = wrapperRef.current;
    if (!el || !wrapper) return;

    // Reset to measure natural scroll size
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;

    // Widen node if text is wider than current width
    const naturalWidth = Math.min(Math.max(el.scrollWidth + 28, 220), 600);
    wrapper.style.minWidth = `${naturalWidth}px`;

    setVariables(extractVariables(text));
    updateNodeField(id, 'text', text);
  }, [text, extractVariables, id, updateNodeField]);

  const handleFocus = (e) => { e.target.style.borderColor = 'rgba(245,158,11,0.6)'; };
  const handleBlur  = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; };

  return (
    <div
      ref={wrapperRef}
      style={{
        minWidth: '220px',
        background: '#141927',
        border: '1px solid #f59e0b55',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px #f59e0b22',
        fontFamily: 'Inter, sans-serif',
        transition: 'min-width 0.15s ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f59e0bcc, #f59e0b88)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '16px' }}>📝</span>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Text</span>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '11px',
            fontWeight: 500,
            color: '#94a3b8',
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Content
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Enter text… use {{variable}} to create input handles"
          style={{
            width: '100%',
            padding: '6px 10px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            color: '#e2e8f0',
            fontSize: '12px',
            outline: 'none',
            fontFamily: 'Inter, sans-serif',
            resize: 'none',
            overflow: 'hidden',
            minHeight: '60px',
            lineHeight: 1.5,
            transition: 'border-color 0.2s',
          }}
        />
        {variables.length > 0 && (
          <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {variables.map((v) => (
              <span
                key={v}
                style={{
                  padding: '2px 8px',
                  background: '#f59e0b22',
                  border: '1px solid #f59e0b55',
                  borderRadius: '999px',
                  fontSize: '10px',
                  color: '#fbbf24',
                  fontWeight: 500,
                }}
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic variable input handles */}
      {variables.map((varName, i) => {
        const top =
          variables.length === 1
            ? '50%'
            : `${((i + 1) / (variables.length + 1)) * 100}%`;
        return (
          <Handle
            key={varName}
            type="target"
            position={Position.Left}
            id={varName}
            style={{ ...HANDLE_STYLE, top }}
          >
            <span
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '10px',
                color: '#fbbf24',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {varName}
            </span>
          </Handle>
        );
      })}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ ...HANDLE_STYLE, top: '50%' }}
      />
    </div>
  );
};
