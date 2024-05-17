import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
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
    class_key: string;
    course_name: string;
    course_title: string;
    time_start: string;
    time_end: string;
    professor: string;
    professor_number: string;
    semester: string;
    year: string;
    max_absences: number;
    // CUSTOM
    toggle: boolean;
    isProfessor?: boolean;
}

const ClassCard: React.FC<ClassCardProps> = (props) : JSX.Element => {
    return (
        <IonCard className = "main-card card-class round-border" routerLink={props.toggle ? `/app/dashboard/view/${props.isProfessor ? "p" : "s"}/${props.id}`: undefined}>
            <div className = "card-class-info">
                <img src = "https://picsum.photos/50" className = "round-border card-class-icon"/>
                <IonCardHeader className = "header-container">
                    <div className = "card-class-header">
                        <IonCardTitle className = "title-coursetitle" data-testid = {`class-card-${props.course_title}`}>{props.course_name}</IonCardTitle>
                        <IonCardContent>{props.time_start && toStandardTime(props.time_start)}</IonCardContent>
                    </div>
                    <IonCardSubtitle className = "subtitle-coursename">{props.course_title}</IonCardSubtitle>
                    {!props.isProfessor && <IonCardSubtitle className = "prof-subtitle">{`Prof. ${props.professor}`}</IonCardSubtitle>}
                    <div className = "chip-div">
                        <IonChip color = "medium">{props.year}</IonChip>
                        <IonChip color = "medium">{props.semester}</IonChip>
                    </div>
                </IonCardHeader>
            </div>
        </IonCard>
    );
};

export default ClassCard;