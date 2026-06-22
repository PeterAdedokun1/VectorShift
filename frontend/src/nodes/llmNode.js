import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="LLM"
    icon="🧠"
    color="#7c3aed"
    minWidth={240}
    fields={[
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        default: 'gpt-4o',
        options: ['gpt-4o', 'gpt-4o-mini', 'claude-sonnet-4-6', 'claude-haiku-4-5', 'gemini-1.5-pro'],
      },
      { key: 'temperature', label: 'Temperature', type: 'number', default: '0.7', placeholder: '0.0 – 1.0' },
    ]}
    inputHandles={[
      { id: 'system', label: 'System' },
      { id: 'prompt', label: 'Prompt' },
    ]}
    outputHandles={[{ id: 'response', label: 'Response' }]}
  />
);
