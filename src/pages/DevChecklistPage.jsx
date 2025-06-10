import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DevChecklist() {
  const [items, setItems] = useState([]);
  const [newText, setNewText] = useState('');
  const [savedItems, setSavedItems] = useState([]);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/checklist`;

  // Load checklist on mount
  useEffect(() => {
    axios.get(API_URL, { withCredentials: true })
      .then(res => {
        setItems(res.data || []);
        setSavedItems(res.data || []);
      })
      .catch(() => alert('⚠️ Failed to load checklist'));
  }, []);

  // Update one field of an item
  const updateItem = (id, field, value) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Add new checklist item
  const addItem = () => {
    if (!newText.trim()) return;
    const newItem = {
      id: Date.now(),
      text: newText.trim(),
      done: false
    };
    setItems([...items, newItem]);
    setNewText('');
  };

  // Delete an item
  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Check if current items differ from savedItems
  const hasChanges = () => {
    return JSON.stringify(items) !== JSON.stringify(savedItems);
  };

  // Save checklist to backend
  const save = () => {
    axios.post(API_URL, items, { withCredentials: true })
      .then(() => {
        alert('✅ Checklist saved');
        setSavedItems(items);
      })
      .catch(() => alert('❌ Save failed'));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '700px', margin: 'auto' }}>
      <h1>🛠️ Dev Checklist</h1>
      <h2>Must start server at http://localhost:5174/</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={e => updateItem(item.id, 'done', e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            <input
              type="text"
              value={item.text}
              onChange={e => updateItem(item.id, 'text', e.target.value)}
              style={{ flexGrow: 1, marginRight: '0.5rem' }}
            />
            <button onClick={() => deleteItem(item.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="New checklist item"
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
        <button onClick={addItem} style={{ marginLeft: '0.5rem' }}>➕ Add</button>
      </div>

      <button
        onClick={save}
        disabled={!hasChanges()}
        style={{ marginTop: '1.5rem', cursor: hasChanges() ? 'pointer' : 'not-allowed' }}
      >
        💾 Save Checklist
      </button>
    </div>
  );
}
