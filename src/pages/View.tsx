import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ClassCard from '../components/ClassCard';
import Dashboard from './Dashboard';
import './Dashboard.css';
import UserImage from '../assets/user.png'
import { settingsOutline } from 'ionicons/icons';
type Class = {
    course: string;
    prof: string;
    time: string;
};

const View: React.FC = () => {
    const sampleClass : Array<Class>= [
        {
            course: "CS 192",
            prof: "Solamo",
            time: "7:30 am"
        },
        {
            course: "CS 145",
            prof: "Tan",
            time: "8:30 am"
        },
    ];
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Dashboard</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className = "flex align-center ion-margin-vertical">
                    <img 
                        src= {UserImage} alt="User" 
                        className = "icon-profile"
                    />
                    <IonTitle color = {'dark'} className = "font-medium">Hello, User!</IonTitle>
                    <IonButton fill = "outline" className = "settings-button">
                        <IonIcon icon = {settingsOutline} className = "settings-button-ion-icon"></IonIcon>
                    </IonButton>
                </div>
                <h1 className="font-heavy">Your Classes</h1>
                {sampleClass.map((item, index) => (
                    <ClassCard
                        key={index}
                        course={item.course}
                        prof={item.prof}
                        time={item.time}
                    />
                ))}
            </IonContent>
        </IonPage>
    );
};

export default View;