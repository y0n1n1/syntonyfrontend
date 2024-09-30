import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { Button } from '../ui/button';
import { Toggle } from '../ui/toggle';

const KeywordTextArea: React.FC = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && input.trim()) {
      setKeywords([...keywords, input.trim()]);
      setInput('');
      e.preventDefault(); // Prevent newline
    }
  };

  const handleDelete = (index: number) => (e: MouseEvent<HTMLButtonElement>): void => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  return (
    <div className="relative flex flex-wrap gap-1">
      <textarea
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter keywords..."
        className="border p-2 rounded-lg w-full min-h-[100px] resize-none"
        rows={3}
      />
      {keywords.map((keyword, index) => (
        <div
          key={index}
          className="group relative inline-flex items-center bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 mt-2 transition-all duration-300 ease-in-out"
        >
          <div>{keyword}</div>
          
        </div>
      ))}
    </div>
  );
};

export default KeywordTextArea;
