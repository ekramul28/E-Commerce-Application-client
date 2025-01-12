// Rating Component to display stars
export const Rating = ({ value }: { value: number }) => {
  const totalStars = 5; // Maximum number of stars
  const stars = Array(totalStars)
    .fill(false)
    .map((_, index) => index < value);

  return (
    <div className="flex">
      {stars.map((filled, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          fill={filled ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-5 h-5 ${filled ? "text-yellow-500" : "text-gray-300"}`}
        >
          <path
            fillRule="evenodd"
            d="M12 17.248l-6.47 3.398 1.234-7.196L1.68 7.732l7.212-1.004L12 0l3.608 6.728 7.212 1.004-5.084 5.718 1.234 7.196L12 17.248z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};
