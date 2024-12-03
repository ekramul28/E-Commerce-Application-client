import React from "react";

type BadgeProps = {
  count: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const Badge: React.FC<BadgeProps> = ({ count, children, style }) => {
  return (
    <div className="relative inline-block" style={style}>
      {children}
      {count > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2">
          {count}
        </span>
      )}
    </div>
  );
};

export default Badge;
