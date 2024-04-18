import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import './ClassCard.css';
import { ellipse } from 'ionicons/icons';

function toStandardTime(militaryTime: string): string {
    const timeParts = militaryTime.split(':');
    const hour = parseInt(timeParts[0]);
    const minute = timeParts[1];

    return (hour > 12 ? hour - 12 : hour) + ':' + minute + (hour >= 12 ? ' PM' : ' AM');
}

interface ClassCardProps {
    id: number;
    course_name?: string;
    course_title?: string;
    time_start?: string;
    time_end?: string;
    professor?: string;
}

const ClassCard: React.FC<ClassCardProps> = (props) : JSX.Element => {
    return (
        <IonCard className = "main-card card-class round-border" routerLink={`/app/dashboard/view/${props.id}`}>
            <div className = "card-class-info">
                <img src = "https://picsum.photos/50" className = "round-border card-class-icon"/>
                <IonCardHeader>
                    <div className = "card-class-header">
                        <IonCardTitle data-testid = {`class-card-${props.course_name}`}>{props.course_name}</IonCardTitle>
                        <IonCardContent>{props.time_start && toStandardTime(props.time_start)}</IonCardContent>
                    </div>
                    <IonCardSubtitle>{props.course_title}</IonCardSubtitle>
                    {props.professor && <IonCardSubtitle>{`Prof. ${props.professor}`}</IonCardSubtitle>}
                </IonCardHeader>
            </div>
        </IonCard>
    );
};

export default ClassCard;