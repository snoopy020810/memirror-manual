// components/DailyPrompt.jsx
import React, { useState, useEffect } from 'react';
import { getTodayPrompt, saveEntry } from '../firebase';

function DailyPrompt() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    getTodayPrompt().then(setPrompt);
  }, []);

  const handleSubmit = async () => {
    await saveEntry(response);
    alert('Saved!');
    setResponse('');
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold mb-4">Today's Prompt</h1>
      <p className="mb-4 text-lg">{prompt}</p>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        className="w-full p-4 border rounded-md mb-4"
        rows={6}
        placeholder="Write your thoughts here..."
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
    </div>
  );
}

export default DailyPrompt;