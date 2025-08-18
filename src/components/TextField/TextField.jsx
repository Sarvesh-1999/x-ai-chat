import React from "react";
const TextField = ({ input, setInput, handleSubmit, onSave }) => {
  return (
    <form
      className="w-full gap-2 mx-auto flex p-3 items-center justify-between"
      onSubmit={handleSubmit}
    >
      <input
        className="bg-white w-[70%] rounded-[5px] p-2 border"
        placeholder="Message Bot AI..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="bg-purple-300 h-10 w-20 rounded hover:bg-purple-400">
        Ask
      </button>
      <button type="button" onClick={onSave} className="bg-purple-300 h-10 w-20 rounded hover:bg-purple-400">
        Save
      </button>
    </form>
  );
};
export default TextField;
