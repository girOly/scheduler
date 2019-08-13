import React, { useState, useEffect } from "react";

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
      setMode(history.pop());
    }
  };

  return { transition, mode, back };
}
