interface AlertMessageProps {
  message: string;
  type: 'success' | 'error';
}

export default function AlertMessage({ message, type }: AlertMessageProps) {
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  
  return (
    <div className={`p-4 rounded-md ${bgColor} ${textColor} border ${borderColor}`}>
      {message}
    </div>
  );
}