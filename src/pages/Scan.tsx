import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Tab2: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot = "start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>Scan QR Code</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                Insert Scan QR UI Here...
            </IonContent>
        </IonPage>
    );
};

export default Tab2;