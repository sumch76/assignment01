import { useState, useCallback } from 'react';

export function useTextHistory(initialText) {
  const [history, setHistory] = useState([initialText]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setCurrentText = useCallback((newText) => {
    setHistory(prev => [...prev.slice(0, currentIndex + 1), newText]);
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, history.length]);

  return {
    currentText: history[currentIndex],
    setCurrentText,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
  };
}