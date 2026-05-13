import { useState, type KeyboardEvent } from 'react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export function Tags({ tags, setTags }: TagInputProps) {
  const [input, setInput] = useState("");

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = input.trim();
      
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      

      setInput(""); 
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div>
      <label className="block text-sm text-gray-400 font-medium">Tags</label>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span key={tag} className="bg-blue-300 text-blue-600 px-1 py-1.5 rounded-md border border-gray-300 flex items-center">
            {tag}
            <button 
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2 text-gray-500 hover:text-red-500 font-bold"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleInput} 
        placeholder="Type a tag and press Enter or comma" 
        className="w-full border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-xs text-gray-500 mt-1">Apasa Enter sau virgula sa adaugi un tag</p>
    </div>
  );
}