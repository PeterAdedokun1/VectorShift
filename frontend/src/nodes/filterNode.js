import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Filter"
    icon="🔍"
    color="#ec4899"
    fields={[
      { key: 'field',     label: 'Field',     type: 'text',   default: '',      placeholder: 'e.g. status' },
      {
        key: 'operator',
        label: 'Operator',
        type: 'select',
        default: 'equals',
        options: ['equals', 'not equals', 'contains', 'greater than', 'less than'],
      },
      { key: 'value', label: 'Value', type: 'text', default: '', placeholder: 'Filter value' },
    ]}
    inputHandles={[{ id: 'data', label: 'Data' }]}
    outputHandles={[
      { id: 'match',    label: 'Match' },
      { id: 'noMatch',  label: 'No Match' },
    ]}
  />
);
