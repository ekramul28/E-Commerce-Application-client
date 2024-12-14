interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`px-4 py-2 rounded ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
