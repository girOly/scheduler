import React, { useState, useEffect } from "react";

export default function useVisualMode(value) {
  const [mode, setMode] = useState(value);
  const [history, setHistory] = useState([]);

  function transition(value, skip) {
    if (!skip) {
      setHistory(prev => [...prev, mode]);
      // setHistory([...history, mode]);
    }
    setMode(value);
  }

  function back() {
    if (history.length >= 1) {
      setMode(history.pop());
      // setHistory(prev => [...prev, mode]);
    }
  }

  return { transition, mode, back };
}
