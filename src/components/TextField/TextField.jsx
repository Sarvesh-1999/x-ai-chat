import React from "react";

const TextField = ({ input, setInput, handleSubmit }) => {
  return (
    <form
      className="w-full gap-2 mx-auto flex p-3 items-center justify-between "
      onSubmit={handleSubmit}
    >
      <input
        className="bg-white w-[70%] rounded-[5px] p-2 "
        placeholder="Message Bot AI…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="bg-[#D7C7F4] h-10 w-20 rounded">
        Ask
      </button>
      <button type="button" className="bg-[#D7C7F4] h-10 w-20 rounded">
        Save
      </button>
    </form>
  );
};

export default TextField;
