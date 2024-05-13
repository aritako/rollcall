import { IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonMenuButton, IonPage, IonSkeletonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const ViewLoading: React.FC = () => {

    return (
        <>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Dashboard</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className = "ion-padding">
        <IonList>
        {Array.from({ length: 7 }).map((_, index) => (
            <IonItem key={index}>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true}></IonSkeletonText>
                </IonThumbnail>
                <IonLabel>
                    <h3>
                        <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
                    </h3>
                    <p>
                        <IonSkeletonText animated={true} style={{ width: '60%' }}></IonSkeletonText>
                    </p>
                    <p>
                        <IonSkeletonText animated={true} style={{ width: '30%' }}></IonSkeletonText>
                    </p>
                </IonLabel>
            </IonItem>
            ))}
        </IonList>
        </IonContent>
        </>
    );
};

export default ViewLoading;