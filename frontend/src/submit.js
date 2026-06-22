import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const { num_nodes, num_edges, is_dag } = await response.json();

      const dagLabel = is_dag ? '✅ Yes — acyclic pipeline' : '❌ No — contains cycles';

      alert(
        `Pipeline Analysis\n` +
        `─────────────────\n` +
        `Nodes  : ${num_nodes}\n` +
        `Edges  : ${num_edges}\n` +
        `Is DAG : ${dagLabel}`
      );
    } catch (err) {
      alert(`Failed to submit pipeline:\n${err.message}`);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        padding: '12px 32px',
        background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
        color: '#fff',
        border: 'none',
        borderRadius: '999px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
        letterSpacing: '0.3px',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateX(-50%) translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,58,237,0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateX(-50%) translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.4)';
      }}
    >
      ⚡ Submit Pipeline
    </button>
  );
};
