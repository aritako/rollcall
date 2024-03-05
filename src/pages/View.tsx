import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ClassCard from '../components/ClassCard';
type Class = {
    course: string;
    prof: string;
    time: string;
};

const Tab1: React.FC = () => {
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
                    <IonButtons slot = "start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Dashboard</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {sampleClass.map((item, index) => (
                    <ClassCard 
                        key = {index}
                        course = {item.course} 
                        prof = {item.prof} 
                        time = {item.time}
                    />
                ))}
            </IonContent>
        </IonPage>
    );
};

export default Tab1;