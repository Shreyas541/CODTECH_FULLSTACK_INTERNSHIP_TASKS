import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    socket.on('load', data => setText(data));
    socket.on('update', data => setText(data));
  }, []);

  const handleChange = e => {
    setText(e.target.value);
    socket.emit('edit', e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Collaborative Document Editor</h2>
      <textarea
        value={text}
        onChange={handleChange}
        rows="15"
        cols="80"
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default App;
