interface FormErrorProps {
  message: string | null;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
      {message}
    </div>
  );
}
