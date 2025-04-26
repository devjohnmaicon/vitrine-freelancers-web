import {ReactNode} from "react";


interface Props {
    children: ReactNode;
}

const CardRoot = ({children}: Props) => {
    return (
        <div
            className='w-full h-full bg-zinc-50 bg-base-100 shadow-xl space-y-1 cursor-pointer border-1 rounded-md p-2 md:px-4'
        >
            {children}
        </div>
    );
}

export default CardRoot;
