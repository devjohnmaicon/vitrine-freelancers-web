import React from 'react';

interface CardActionsProps {
    children?: React.ReactNode;
}

const CardActions = ({children}: CardActionsProps) => {
    return (
        <div className='flex justify-end items-center gap-3 mt-1'>
            {children}
        </div>
    );
};

export default CardActions;