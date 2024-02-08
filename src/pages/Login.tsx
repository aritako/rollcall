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
    IonIcon, 
} from '@ionic/react';
import {
    logInOutline
} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';

const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => {
    const [introSeen, setIntroSeen] = useState(true);
    
    // Check for preferences
    useEffect(() => {
        const checkStorage = async () => {
          const seen = await Preferences.get({ key: INTRO_KEY });
          setIntroSeen(seen.value === 'true');
        };
        checkStorage();
      }, []);

    const doLogin = (event: any) =>{
        event.preventDefault();
        console.log('doLogin');
    }

    const finishIntro = async () => {
        setIntroSeen(true);
        Preferences.set({ key: INTRO_KEY, value: 'true' });
    };

    return (
        <>
            {!introSeen ? (
                <Intro onFinish = {finishIntro} />
            ) : (
                <IonPage>
                    <IonHeader>
                        <IonToolbar color = {'primary'}>
                            <IonTitle>RollCall</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent scrollY={false}>
                        <IonCard>
                            <IonCardContent>
                                <form onSubmit = {doLogin}>
                                    <IonInput type = "email" label = "UP Email" labelPlacement="floating" fill = "outline" placeholder = "UP Email"/>
                                    <IonInput type = "password" label = "Password" labelPlacement="floating" fill = "outline" placeholder = "Password" className = "ion-margin-top"/>
                                    <IonButton type = 'submit' expand = "block" className = "ion-margin-top">
                                        Login
                                    {/* <IonIcon icon = {logInOutline}/> */}
                                    </IonButton>
                                    <IonButton color = "tertiary" routerLink = "/register" type = 'submit' expand = "block" className = "ion-margin-top">
                                        Create Account
                                    </IonButton>
                                </form>
                            </IonCardContent>
                        </IonCard>
                    </IonContent>

                </IonPage>
            )}
        </>
    );
};

export default Login;