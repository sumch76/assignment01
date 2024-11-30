import React, { useState, useCallback, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Undo, Redo } from 'lucide-react';
import TextControls from './TextControls';
import { useTextHistory } from '../hooks/useTextHistory';

function TextEditor() {
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const { currentText, setCurrentText, undo, redo, canUndo, canRedo } = useTextHistory('');
  const contentRef = useRef(null);

  const handleTextChange = useCallback(() => {
    if (contentRef.current) {
      const newText = contentRef.current.innerHTML;
      setCurrentText(newText);
    }
  }, [setCurrentText]);

  useEffect(() => {
    if (contentRef.current) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(contentRef.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      contentRef.current.focus();
    }
  }, [currentText]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Undo/Redo Buttons */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`p-2 rounded ${canUndo ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300'}`}
            >
              <Undo size={20} />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`p-2 rounded ${canRedo ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300'}`}
            >
              <Redo size={20} />
            </button>
          </div>
        </div>

        {/* Text Controls */}
        <TextControls
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          fontSize={fontSize}
          setFontSize={setFontSize}
          isBold={isBold}
          setIsBold={setIsBold}
          isItalic={isItalic}
          setIsItalic={setIsItalic}
          isUnderline={isUnderline}
          setIsUnderline={setIsUnderline}
        />

        {/* Draggable Text Area */}
        <div className="mt-4 border-2 border-emerald-500 rounded-lg p-4 min-h-[400px] relative">
          <Draggable bounds="parent">
            <div
              ref={contentRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleTextChange}
              dangerouslySetInnerHTML={{ __html: currentText }}
              style={{
                fontFamily: selectedFont,
                fontSize: `${fontSize}px`,
                fontWeight: isBold ? 'bold' : 'normal',
                fontStyle: isItalic ? 'italic' : 'normal',
                textDecoration: isUnderline ? 'underline' : 'none',
                cursor: 'move',
                display: 'inline-block',
              }}
              className="bg-transparent outline-none"
            />
          </Draggable>
        </div>
      </div>
    </div>
  );
}

export default TextEditor;

