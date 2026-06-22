import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Transform"
    icon="⚙️"
    color="#06b6d4"
    minWidth={240}
    fields={[
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        default: 'uppercase',
        options: ['uppercase', 'lowercase', 'trim', 'reverse', 'JSON parse', 'JSON stringify'],
      },
      { key: 'expression', label: 'Custom Expression', type: 'text', default: '', placeholder: 'Optional JS expression' },
    ]}
    inputHandles={[{ id: 'input', label: 'Input' }]}
    outputHandles={[{ id: 'output', label: 'Output' }]}
  />
);
