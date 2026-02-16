interface AlertMessageProps {
  message: string;
  type: 'success' | 'error';
}

export default function AlertMessage({ message, type }: AlertMessageProps) {
  return (
    <div className={type === 'success' ? 'alert alert-success' : 'alert alert-error'}>
      {message}
    </div>
  );
}