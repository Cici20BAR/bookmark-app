import React, {forwardRef}from "react";
import { twMerge } from "tailwind-merge";
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    label?:string,
    error?:string
}
export const Textarea =forwardRef<HTMLTextAreaElement,TextareaProps>(
    ({label,error,className,...props},ref)=>{
        return (
            <div className="flex flex-col gap-1.5 ">
                {label &&(
                   <label className="text-sm font-bold text-slate-600 dark:text-slate-300">
                   {label}
                   </label>
                )}
                <textarea ref={ref}
               className={ twMerge("w-full rounded-2xl border bg-white text-slate-900 placeholder:text-slate-400 border-slate-300 px-3 py-3 outline-none transition-all focus:ring-2 focus:border-blue-500 focus:ring-blue-400 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:border-slate-700",
                error&& "border-red-500 focus:border-red-500 focus:ring-red-100",
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
            
        )
    }
)
