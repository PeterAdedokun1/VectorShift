import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Input"
    icon="📥"
    color="#10b981"
    fields={[
      { key: 'name', label: 'Name', type: 'text', default: 'input_1', placeholder: 'Variable name' },
      {
        key: 'inputType',
        label: 'Type',
        type: 'select',
        default: 'Text',
        options: ['Text', 'File', 'Image', 'Number'],
      },
    ]}
    outputHandles={[{ id: 'value', label: 'Value' }]}
  />
);
