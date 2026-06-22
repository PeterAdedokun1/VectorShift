import { BaseNode } from './BaseNode';

export const ApiCallNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="API Call"
    icon="🌐"
    color="#f97316"
    minWidth={260}
    fields={[
      { key: 'url',    label: 'URL',    type: 'text',   default: '',     placeholder: 'https://api.example.com/endpoint' },
      {
        key: 'method',
        label: 'Method',
        type: 'select',
        default: 'GET',
        options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      },
      { key: 'headers', label: 'Headers (JSON)', type: 'text', default: '{}', placeholder: '{"Authorization": "Bearer ..."}' },
    ]}
    inputHandles={[
      { id: 'body',   label: 'Body' },
      { id: 'params', label: 'Params' },
    ]}
    outputHandles={[
      { id: 'response', label: 'Response' },
      { id: 'error',    label: 'Error' },
    ]}
  />
);
