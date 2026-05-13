import { forwardRef } from "react"; 
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full max-w-7xl">
        {/* Label-ul de deasupra */}
        {label && (
          <label className="text-sm font-bold text-slate-500">
            {label}
          </label>
        )}

        {/* Input-ul real */}
        <input
          ref={ref}
          className={twMerge(
            "w-full max-w-7xl rounded-2xl border text-neutral-950 border-slate-600 px-3 py-3 focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 outline-none transition-all",
            error && "border-red-500 focus:border-red-500 focus:ring-red-100",
            className
          )}
          {...props}
        />

        {error && (
          <span className="text-xs text-red-500 font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input"; 