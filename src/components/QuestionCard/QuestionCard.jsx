import React from "react";

const QuestionCard = ({ card, onClick }) => {
  return (
    <div 
      className="bg-white max-w-[514px] sm:w-[514px] min-h-[111px] rounded p-5 shadow cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(card.question)}
    >
      <h2 className="font-bold text-[20px]">{card.question}</h2>
      <p className="text-gray-500 text-[16px] mt-1">
        {card.description}
      </p>
    </div>
  );
};

export default QuestionCard;
