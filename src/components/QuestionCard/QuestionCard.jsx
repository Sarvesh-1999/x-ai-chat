import React from "react";

const QuestionCard = ({ card }) => {
  return (
    <div className="bg-white max-w-[514px] sm:w-[514px] min-h-[111px] rounded p-5 shadow cursor-pointer">
      <h2 className="font-bold text-[20px]">{card.question}</h2>
      <p className="text-[#00000080] text-[16px] mt-1 text-wrap">
        {card.description}
      </p>
    </div>
  );
};

export default QuestionCard;
