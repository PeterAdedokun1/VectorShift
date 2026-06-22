import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Output"
    icon="📤"
    color="#3b82f6"
    fields={[
      { key: 'name', label: 'Name', type: 'text', default: 'output_1', placeholder: 'Variable name' },
      {
        key: 'outputType',
        label: 'Type',
        type: 'select',
        default: 'Text',
        options: ['Text', 'File', 'Image', 'Number'],
      },
    ]}
    inputHandles={[{ id: 'value', label: 'Value' }]}
  />
);
