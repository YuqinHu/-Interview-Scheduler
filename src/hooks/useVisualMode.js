import { useState } from 'react';

// custom hook that takes an initial state and returns an object with three properties
const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory(prev => [...prev.slice(0,-1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  };

//function that goes back to the previous mode in the history, if there is one. 
//It updates the history state accordingly.
  const back = () => {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, -1)]);
    }
    else {
      setHistory(prev => prev)
    }
  };
  return { mode:history[history.length - 1], transition, back }
}

export default useVisualMode;