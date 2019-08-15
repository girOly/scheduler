import React, { useState, useEffect } from "react";
// transition hooks
export default function useVisualMode(value) {
  const [mode, setMode] = useState(value);
  const [history, setHistory] = useState([]);

  const transition = function(value, skip) {
    if (!skip) {
      setHistory(prev => [...prev, mode]);
    }
    setMode(value);
  };

  const back = function() {
    if (history.length >= 1) {
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
    }
  };

  return { transition, mode, back };
}
