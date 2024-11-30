import React from 'react';
import { Bold, Italic, Underline } from 'lucide-react';
import { fonts } from '../utils/fonts';

function TextControls({
  selectedFont,
  setSelectedFont,
  fontSize,
  setFontSize,
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  isUnderline,
  setIsUnderline,
}) {
  return (
    <div className="flex items-center space-x-4 border-b pb-4">
      <select
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}
        className="p-2 border rounded-md"
      >
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setFontSize(Math.max(16, fontSize - 1))}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          -
        </button>
        <span className="w-8 text-center">{fontSize}</span>
        <button
          onClick={() => setFontSize(Math.min(72, fontSize + 1))}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsBold(!isBold)}
          className={`p-2 rounded ${isBold ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          <Bold size={20} />
        </button>
        <button
          onClick={() => setIsItalic(!isItalic)}
          className={`p-2 rounded ${isItalic ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          <Italic size={20} />
        </button>
        <button
          onClick={() => setIsUnderline(!isUnderline)}
          className={`p-2 rounded ${isUnderline ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          <Underline size={20} />
        </button>
      </div>
    </div>
  );
}

export default TextControls;