import { useAuth } from '../contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { getUserEntries } from '../firebase';

function Timeline() {
    const [entries, setEntries] = useState([]);
    const { currentUser } = useAuth();
  
    useEffect(() => {
      if (!currentUser) return;
  
      console.log("Fetching entries for:", currentUser.uid);
      getUserEntries()
        .then(data => {
          console.log("Fetched entries:", data);
          setEntries(data);
        })
        .catch((err) => {
          console.error('Error fetching entries:', err);
        });
    }, [currentUser]);
    
    console.log("Final rendered entries:", entries);
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">📖 Your Timeline</h1>
        {entries.length === 0 ? (
          <p className="text-gray-500 text-center">No entries yet.</p>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
              <p className="text-sm text-gray-400">{new Date(entry.date).toLocaleString()}</p>
              <p className="mt-2 font-medium text-blue-600">{entry.prompt}</p>
              <p className="mt-1 text-gray-800 whitespace-pre-wrap">{entry.text}</p>
            </div>
          ))
        )}
      </div>
    );
  }

export default Timeline;
