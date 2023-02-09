import './BaseButton.css'

interface BaseButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    fullWidth?: boolean;
}

const BaseButton = ({children, onClick, fullWidth}: BaseButtonProps) => {
    return (
        <button onClick={onClick} className={`base-button ${fullWidth ? 'base-button--full-width' : ''}`}>
            {children}
        </button>
    )
}

export default BaseButton;