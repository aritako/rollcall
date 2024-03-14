import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonInput, IonButton, IonButtons, IonBackButton, IonIcon, useIonRouter, IonGrid, IonCol, IonRow } from '@ionic/react';
import React, {useEffect, useState} from 'react';
import RegisterForm from '../components/RegisterForm';
const Register: React.FC = () => {
    const router = useIonRouter();
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color = {'primary'}>
                    <IonButtons slot = "start">
                        <IonBackButton defaultHref = "/"/>
                    </IonButtons>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false} className = "ion-padding">
                <RegisterForm/>
            </IonContent>
        </IonPage>
    );
};

export default Register;