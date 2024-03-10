import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './ClassCard.css';
import { ellipse } from 'ionicons/icons';
interface ClassCardProps {
    key: number;
    course?: string;
    prof?: string;
    time?: string;
}

const ClassCard: React.FC<ClassCardProps> = (props) : JSX.Element => {
    
    return (
        <IonCard className = "card-class round-border">
            <div className = "card-class-info">
                <img src = "https://picsum.photos/50" className = "round-border card-class-icon"/>
                <IonCardHeader>
                    <IonCardTitle data-testid = {`class-card-${props.course}`}>{props.course}</IonCardTitle>
                    {props.prof && <IonCardSubtitle>{`Prof. ${props.prof}`}</IonCardSubtitle>}
                </IonCardHeader>
            </div>
            <IonCardContent>{props.time}</IonCardContent>
        </IonCard>
    );
};

export default ClassCard;