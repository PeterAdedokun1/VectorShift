import { Handle, Position } from '@xyflow/react';
import { useStore } from '../store';

const HANDLE_STYLE_BASE = {
  width: '10px',
  height: '10px',
  border: '2px solid #1e293b',
  borderRadius: '50%',
};

const FieldInput = ({ field, value, onChange }) => {
  const inputStyle = {
    width: '100%',
    padding: '6px 10px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px',
    color: '#e2e8f0',
    fontSize: '12px',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s',
  };

  const handleFocus = (e) => { e.target.style.borderColor = 'rgba(124,58,237,0.6)'; };
  const handleBlur  = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; };

  if (field.type === 'select') {
    return (
      <select
        value={value ?? field.default ?? field.options[0]}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ ...inputStyle, cursor: 'pointer' }}
      >
        {field.options.map((opt) => (
          <option key={opt} value={opt} style={{ background: '#1e293b' }}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        value={value ?? field.default ?? ''}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={field.rows ?? 3}
        style={{ ...inputStyle, resize: 'vertical' }}
      />
    );
  }

  return (
    <input
      type={field.type ?? 'text'}
      value={value ?? field.default ?? ''}
      onChange={(e) => onChange(e.target.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={inputStyle}
      placeholder={field.placeholder ?? ''}
    />
  );
};

/**
 * BaseNode — the shared abstraction for all pipeline nodes.
 *
 * Props (passed by the node component):
 *  id            — node id from ReactFlow
 *  data          — node data object (field values live here)
 *  title         — display name in the header
 *  icon          — emoji shown in header
 *  color         — accent color for the header bar
 *  fields        — array of { key, label, type, default, options, placeholder, rows }
 *  inputHandles  — array of { id, label?, style? }
 *  outputHandles — array of { id, label?, style? }
 *  extraContent  — optional ReactNode rendered below fields
 *  minWidth      — override minimum width (default 220)
 */
export const BaseNode = ({
  id,
  data,
  title,
  icon,
  color = '#7c3aed',
  fields = [],
  inputHandles = [],
  outputHandles = [],
  extraContent,
  minWidth = 220,
}) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const handleChange = (key, value) => {
    updateNodeField(id, key, value);
  };

  return (
    <div
      style={{
        minWidth: `${minWidth}px`,
        background: '#141927',
        border: `1px solid ${color}55`,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${color}22`,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${color}cc, ${color}88)`,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '16px' }}>{icon}</span>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff', letterSpacing: '0.2px' }}>
          {title}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {fields.map((field) => (
          <div key={field.key}>
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
              {field.label}
            </label>
            <FieldInput
              field={field}
              value={data[field.key]}
              onChange={(val) => handleChange(field.key, val)}
            />
          </div>
        ))}
        {extraContent}
      </div>

      {/* Input Handles */}
      {inputHandles.map((handle, i) => {
        const top =
          inputHandles.length === 1
            ? '50%'
            : `${((i + 1) / (inputHandles.length + 1)) * 100}%`;
        return (
          <Handle
            key={handle.id}
            type="target"
            position={Position.Left}
            id={handle.id}
            style={{ ...HANDLE_STYLE_BASE, top, background: color, ...handle.style }}
          >
            {handle.label && (
              <span
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '10px',
                  color: '#94a3b8',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {handle.label}
              </span>
            )}
          </Handle>
        );
      })}

      {/* Output Handles */}
      {outputHandles.map((handle, i) => {
        const top =
          outputHandles.length === 1
            ? '50%'
            : `${((i + 1) / (outputHandles.length + 1)) * 100}%`;
        return (
          <Handle
            key={handle.id}
            type="source"
            position={Position.Right}
            id={handle.id}
            style={{ ...HANDLE_STYLE_BASE, top, background: color, ...handle.style }}
          />
        );
      })}
    </div>
  );
};
