import React from "react";

const LoadingSpinner = ({ size = 24, color = "#000", strokeWidth = 2 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        //    strokeDasharray="31.4"
        //    strokeDashoffset="31.4"
        fill="none"
        strokeDasharray="80"
        strokeDashoffset="40"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;62.8"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 12 12;360 12 12"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default LoadingSpinner;
