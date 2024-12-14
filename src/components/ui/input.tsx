interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  className = "",
  ...props
}) => (
  <div>
    {label && (
      <label className="block mb-1 text-sm font-semibold">{label}</label>
    )}
    <input
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  </div>
);
