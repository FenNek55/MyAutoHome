import { useEffect, useState } from 'react';
import './LoaderOverlay.css'

interface LoaderOverlayProps {
    isVisible?: boolean;
}

const LoaderOverlay = ({isVisible = true}: LoaderOverlayProps) => {
    const [visible, setVisible] = useState(isVisible);

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible])

    return (
        <div style={{display: visible ? 'flex' : 'none'}} className='loader-overlay'>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    )
}

export default LoaderOverlay