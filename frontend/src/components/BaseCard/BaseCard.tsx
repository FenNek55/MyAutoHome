import React from 'react';
import './BaseCard.css';

interface BaseCardProps {
    children: React.ReactNode;
}

const BaseCard = (props: BaseCardProps) => {
    return (
        <div className="base-card">
            {props.children}
        </div>
    )
}

export default BaseCard;