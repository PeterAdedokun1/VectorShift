import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Conditional"
    icon="🔀"
    color="#84cc16"
    fields={[
      { key: 'condition', label: 'Condition', type: 'text', default: '', placeholder: 'e.g. value > 10' },
    ]}
    inputHandles={[{ id: 'value', label: 'Value' }]}
    outputHandles={[
      { id: 'true',  label: 'True' },
      { id: 'false', label: 'False' },
    ]}
  />
);
