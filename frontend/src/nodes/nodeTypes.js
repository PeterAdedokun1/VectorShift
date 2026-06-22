import { InputNode }       from './inputNode';
import { OutputNode }      from './outputNode';
import { LLMNode }         from './llmNode';
import { TextNode }        from './textNode';
import { FilterNode }      from './filterNode';
import { TransformNode }   from './transformNode';
import { ApiCallNode }     from './apiCallNode';
import { ConditionalNode } from './conditionalNode';
import { AggregatorNode }  from './aggregatorNode';

export const nodeTypes = {
  customInput:  InputNode,
  customOutput: OutputNode,
  llm:          LLMNode,
  text:         TextNode,
  filter:       FilterNode,
  transform:    TransformNode,
  apiCall:      ApiCallNode,
  conditional:  ConditionalNode,
  aggregator:   AggregatorNode,
};
