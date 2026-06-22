# VectorShift Pipeline Builder — Frontend Technical Assessment

A visual pipeline editor built with React + ReactFlow on the frontend and FastAPI on the backend. Users drag nodes onto a canvas, connect them into a pipeline, and submit it for analysis.

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python 3.12+

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs at `http://localhost:3000`.

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs at `http://localhost:8000`.

> **Windows note:** If `pip` / `uvicorn` are not on your PATH, use the full Python path:
> ```
> C:\Users\PETER\AppData\Local\Programs\Python\Python3127\python.exe -m pip install -r requirements.txt
> C:\Users\PETER\AppData\Local\Programs\Python\Python3127\python.exe -m uvicorn main:app --reload
> ```

---

## Project Structure

```
VectorShift/
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js              # Root component
│       ├── store.js            # Zustand state (nodes, edges, actions)
│       ├── ui.js               # ReactFlow canvas with drag-and-drop
│       ├── toolbar.js          # Top toolbar with draggable node palette
│       ├── draggableNode.js    # Individual draggable node item
│       ├── submit.js           # Submit button + backend integration
│       └── nodes/
│           ├── BaseNode.js         # Shared node abstraction (Part 1)
│           ├── nodeTypes.js        # ReactFlow node type registry
│           ├── inputNode.js
│           ├── outputNode.js
│           ├── llmNode.js
│           ├── textNode.js         # Auto-resize + {{variable}} handles (Part 3)
│           ├── filterNode.js
│           ├── transformNode.js
│           ├── apiCallNode.js
│           ├── conditionalNode.js
│           └── aggregatorNode.js
└── backend/
    ├── main.py                 # FastAPI app with /pipelines/parse endpoint
    └── requirements.txt
```

---

## Assessment Parts

### Part 1 — Node Abstraction

All nodes are built on a single `BaseNode` component (`src/nodes/BaseNode.js`). It accepts:

| Prop | Description |
|---|---|
| `title` | Node header label |
| `icon` | Emoji displayed in the header |
| `color` | Accent color for the header and handles |
| `fields` | Array of form fields (`text`, `number`, `select`, `textarea`) |
| `inputHandles` | Array of `{ id, label }` — left-side connection points |
| `outputHandles` | Array of `{ id, label }` — right-side connection points |
| `minWidth` | Minimum node width (default 220px) |

Example — a new node in ~10 lines:

```jsx
import { BaseNode } from './BaseNode';

export const MyNode = ({ id, data }) => (
  <BaseNode
    id={id} data={data}
    title="My Node" icon="🔧" color="#6366f1"
    fields={[{ key: 'value', label: 'Value', type: 'text' }]}
    inputHandles={[{ id: 'input' }]}
    outputHandles={[{ id: 'output' }]}
  />
);
```

**Five new nodes added:** Filter, Transform, API Call, Conditional, Aggregator.

---

### Part 2 — Styling

- Dark theme (`#0f1117` background) with the Inter font
- Each node type has a unique accent color applied to its header gradient and handles
- Toolbar uses a glass-morphism effect with backdrop blur
- Edges are animated with purple stroke and arrow markers
- MiniMap and zoom controls are styled to match the dark theme

---

### Part 3 — Text Node Logic

The Text node (`src/nodes/textNode.js`) has two dynamic behaviors:

**Auto-resize:** The textarea grows in height as the user types. The node wrapper also widens (up to 600px) when a line is longer than the default width.

**Variable handles:** When the user types `{{variableName}}` (a valid JS identifier inside double curly braces), a new input handle is created on the left side of the node labeled with that variable name. Multiple variables produce multiple handles, spaced evenly. Pill badges inside the node body show all detected variables.

---

### Part 4 — Backend Integration

**Frontend (`src/submit.js`):** The Submit Pipeline button POSTs `{ nodes, edges }` to `http://localhost:8000/pipelines/parse`. On success, an alert displays the results in a readable format.

**Backend (`backend/main.py`):** The `/pipelines/parse` endpoint receives the pipeline, counts nodes and edges, and checks whether the graph is a Directed Acyclic Graph (DAG) using **Kahn's algorithm** (BFS-based topological sort). A graph is a DAG if every node can be visited exactly once with no cycles.

**Response format:**
```json
{ "num_nodes": 3, "num_edges": 2, "is_dag": true }
```

**Example alert:**
```
Pipeline Analysis
─────────────────
Nodes  : 3
Edges  : 2
Is DAG : ✅ Yes — acyclic pipeline
```

---

## Node Catalog

| Node | Color | Inputs | Outputs | Description |
|---|---|---|---|---|
| Input | Green | — | value | Pipeline entry point |
| Output | Blue | value | — | Pipeline exit point |
| LLM | Purple | system, prompt | response | Language model call |
| Text | Amber | (dynamic) | output | Text with `{{variable}}` interpolation |
| Filter | Pink | data | match, no match | Filter data by field/operator/value |
| Transform | Cyan | input | output | Apply string or data transformations |
| API Call | Orange | body, params | response, error | HTTP request to an external endpoint |
| Conditional | Lime | value | true, false | Branch based on a condition expression |
| Aggregator | Violet | input1–3 | result | Combine multiple inputs (concat, merge, sum…) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 |
| Pipeline canvas | @xyflow/react (ReactFlow v12) |
| State management | Zustand |
| Backend framework | FastAPI |
| Server | Uvicorn |
| Data validation | Pydantic v2 |
