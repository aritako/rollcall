import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import QRCodeGen from '../components/QRCodeGen';

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
                <QRCodeGen />
            </IonContent>
        </IonPage>
    );
};

export default Tab2;