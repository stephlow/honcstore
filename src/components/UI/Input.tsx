type InputProps = {
  value: string;
  setValue: (value: string) => void;
  type?: string;
};

export function Input({ type, value, setValue }: InputProps) {
  return (
    <input
      value={value}
      // @ts-ignore
      onChange={(event) => setValue(event.currentTarget.value)}
      className="bg-slate-50 rounded py-2 px-4"
      type={type}
    />
  );
}
