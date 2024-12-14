interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={`border rounded-lg shadow-md ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={`p-4 border-b ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => (
  <div className={`p-4 border-t ${className}`} {...props}>
    {children}
  </div>
);
