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
                   <label className=" text-sm text-bold text-slate-400 ">
                   {label}
                   </label>
                )}
                <textarea ref={ref}
               className={ twMerge("placeholder:Descriere optionala(max 200 cuvinte) border text-black border-slate-500 outline-none transition-all  focus:ring-2 focus:border-blue-500 focus:ring-blue-400",
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