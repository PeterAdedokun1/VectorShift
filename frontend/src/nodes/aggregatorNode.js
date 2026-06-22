import { BaseNode } from './BaseNode';

export const AggregatorNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Aggregator"
    icon="📊"
    color="#a855f7"
    fields={[
      {
        key: 'mode',
        label: 'Mode',
        type: 'select',
        default: 'concat',
        options: ['concat', 'merge', 'sum', 'average', 'min', 'max', 'count'],
      },
      { key: 'separator', label: 'Separator', type: 'text', default: ', ', placeholder: 'Used for concat mode' },
    ]}
    inputHandles={[
      { id: 'input1', label: 'Input 1' },
      { id: 'input2', label: 'Input 2' },
      { id: 'input3', label: 'Input 3' },
    ]}
    outputHandles={[{ id: 'result', label: 'Result' }]}
  />
);
