import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './ClassCard.css';
import { ellipse } from 'ionicons/icons';
interface ClassCardProps {
    course?: string;
    prof?: string;
    time?: string;
}

const ClassCard: React.FC<ClassCardProps> = (props) : JSX.Element => {
    
    return (
        <IonCard className = "card-class">
            <IonCardHeader>
                <IonCardTitle>{props.course}</IonCardTitle>
                {props.prof && <IonCardSubtitle>{`Prof. ${props.prof}`}</IonCardSubtitle>}
            </IonCardHeader>

            <IonCardContent>{props.time}</IonCardContent>
        </IonCard>
    );
};

export default ClassCard;