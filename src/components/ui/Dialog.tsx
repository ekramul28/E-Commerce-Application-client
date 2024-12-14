interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
}) =>
  open ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  ) : null;

export const DialogContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div>{children}</div>;

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <h2 className="text-lg font-bold mb-4">{children}</h2>;
