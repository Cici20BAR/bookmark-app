import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?:'primary'|'ghost'|'secondary' |'destroy',
    isActive?:boolean,
    isAdd?:boolean,
}
export function Button({
    children,
    variant='primary',
    className='',
    isActive=false,
    isAdd=false,
    ...props
}:ButtonProps){
    const baseStyle="flex items-center justify-center px-4 py-4 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ";
    const variants={
        primary:"bg-blue-600 text-white shadow-md hover:bg-blue-300",
        ghost:"bg-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200",
        destroy:"bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white",
        secondary: "bg-slate-700 text-slate-200 hover:bg-slate-600"
    };
    const finalVar=isActive?variants.primary:variants[variant];
    const WidthStyle=isAdd? "w-full" : "w-auto";



    return(
        <button
        className={`${baseStyle} ${finalVar} ${WidthStyle} ${className}`}
        {...props}
        >{children}</button>

    );

}