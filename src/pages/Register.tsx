import { 
    IonContent, 
    IonFooter, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonCard, 
    IonCardContent, 
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton,
    IonIcon, 
    useIonRouter,
    IonGrid,
    IonCol,
    IonRow
} from '@ionic/react';
import React, {useState} from 'react';

const Register: React.FC = () => {
    const router = useIonRouter();

    const doRegister = (event: any) => {
        event.preventDefault();
        console.log('doRegister');

        // router.push('/home', 'root)
    }
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
                <IonGrid fixed>
                    <IonRow class = "ion-justify-content-center">
                            <IonCol size = '12' sizeMd = '8' sizeLg = '6' sizeXl = "4">
                                <IonCard>
                                    <IonCardContent>
                                        <form onSubmit = {doRegister}>
                                            <IonInput type = "email" label = "UP Email" labelPlacement="floating" fill = "outline" placeholder = "UP Email"/>
                                            <IonInput type = "password" label = "Password" labelPlacement="floating" fill = "outline" placeholder = "Password" className = "ion-margin-top"/>
                                            <IonButton type = 'submit' expand = "block" className = "ion-margin-top">
                                                Submit
                                            {/* <IonIcon icon = {logInOutline}/> */}
                                            </IonButton>
                                        </form>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

        </IonPage>
    );
};

export default Register;