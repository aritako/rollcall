import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

function Example() {
    return (
        <>
            <IonCard>
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <IonCardHeader>
                    <IonCardTitle>Welcome Back!</IonCardTitle>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>
            
                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardHeader>
                <IonCardTitle>CS 192</IonCardTitle>
                <IonCardSubtitle>Software Engineering II</IonCardSubtitle>
                </IonCardHeader>
        
                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardHeader>
                <IonCardTitle>CS 145</IonCardTitle>
                <IonCardSubtitle>Computer Networks</IonCardSubtitle>
                </IonCardHeader>
        
                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>
        </>
      );
  }

const Tab1: React.FC = () => {

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
                <Example />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;