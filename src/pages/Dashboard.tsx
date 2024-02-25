import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Dashboard: React.FC = () => {

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
                Dashboard
            </IonContent>
        </IonPage>
    );
};

export default Dashboard;