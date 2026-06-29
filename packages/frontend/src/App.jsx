import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [items, setItems] = useState([]);
  const [echo, setEcho] = useState('');
  const [text, setText] = useState('Hello backend');

  useEffect(() => {
    fetch('/api/message')
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setItems(data.items || []);
      })
      .catch(() => setMessage('Error fetching backend'));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/echo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const data = await response.json();
    setEcho(data.received.text);
  };

  return (
    <div className="app-shell">
      <header>
        <h1>Full Stack Project</h1>
        <p>{message}</p>
      </header>

      <section>
        <h2>Backend Items</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Echo API</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type something"
          />
          <button type="submit">Send</button>
        </form>
        {echo && <p>Backend echoed: {echo}</p>}
      </section>
    </div>
  );
}

export default App;
