import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode((prev) => newMode)
      let replaceHistory = [...history];
      replaceHistory[replaceHistory.length - 1] = mode;
      setHistory((prev) => replaceHistory);
    } else {
      setMode((prev) => newMode);
      let newHistory = [...history];
      if(newHistory[newHistory.length - 1] !== newMode){
        newHistory.push(newMode);
      }

      setHistory((prev) => newHistory);
    }
  };

  //set mode for different suation
  const back = () => {
    setHistory(prev => {
      let replaceHistory = [...prev];
      return replaceHistory;
    });
    if(mode ==="ERROR_SAVE") {
      if (history.length > 1) {
        setMode((prev) => history[(history.length - 1)]);
      }
    } else {
      if (history.length > 1) {
        setMode((prev) => history[(history.length - 2)]);
      }
    }

  };

  return { mode, transition, back }
}

export default useVisualMode;