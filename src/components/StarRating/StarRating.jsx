const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl ${readonly ? 'cursor-default' : 'cursor-pointer hover:text-yellow-400'} ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => !readonly && onRatingChange(star)}
          disabled={readonly}
        >
          ★
        </button>
      ))}
    </div>
  );
};
export default StarRating