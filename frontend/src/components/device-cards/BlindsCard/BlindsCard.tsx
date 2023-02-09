import { useState } from "react";
import BaseCard from "../../BaseCard/BaseCard";
import BaseButton from "../../BaseButton/BaseButton";
import LoaderOverlay from "../../LoaderOverlay/LoaderOverlay";
import './BlindsCard.css';

interface BlindsCardProps {
    name: string;
    openLink: string;
    closeLink: string;
}

const BlindsCard = (props: BlindsCardProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const openBlinds = () => {
        console.log('Otwieranie żaluzji...')
        setIsLoading(true);
        fetch(props.openLink)
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    }

    const closeBlinds = () => {
        console.log('Zamykanie żaluzji...')
        setIsLoading(true);
        fetch(props.closeLink)
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    }

    return (
        <BaseCard>
            <LoaderOverlay isVisible={isLoading}/>
            <h2 className="blinds-card__name">{props.name}</h2>
            <div className="blinds-card__controls">
                <BaseButton fullWidth onClick={openBlinds}>Otwórz</BaseButton>
                <BaseButton fullWidth onClick={closeBlinds}>Zamknij</BaseButton>
            </div>
        </BaseCard>
    )
}

export default BlindsCard;