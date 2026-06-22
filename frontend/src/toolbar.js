import { DraggableNode } from './draggableNode';

const NODE_CATALOG = [
  { type: 'customInput',     label: 'Input',       icon: '📥', color: '#10b981' },
  { type: 'llm',             label: 'LLM',         icon: '🧠', color: '#7c3aed' },
  { type: 'customOutput',    label: 'Output',      icon: '📤', color: '#3b82f6' },
  { type: 'text',            label: 'Text',        icon: '📝', color: '#f59e0b' },
  { type: 'filter',          label: 'Filter',      icon: '🔍', color: '#ec4899' },
  { type: 'transform',       label: 'Transform',   icon: '⚙️', color: '#06b6d4' },
  { type: 'apiCall',         label: 'API Call',    icon: '🌐', color: '#f97316' },
  { type: 'conditional',     label: 'Conditional', icon: '🔀', color: '#84cc16' },
  { type: 'aggregator',      label: 'Aggregator',  icon: '📊', color: '#a855f7' },
];

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        background: 'rgba(15, 17, 23, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
        <span style={{ fontSize: '20px' }}>⚡</span>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.3px' }}>
          VectorShift
        </span>
      </div>
      <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.1)' }} />
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          flex: 1,
        }}
      >
        {NODE_CATALOG.map((node) => (
          <DraggableNode key={node.type} {...node} />
        ))}
      </div>
    </div>
  );
};
