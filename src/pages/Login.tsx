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
    useIonRouter,
    useIonLoading,
    IonCol,
    IonGrid,
    IonRow, 
} from '@ionic/react';
import {
    logInOutline
} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';
import logoSample from '../assets/sample/logo-sample.png';
const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => {
    const [introSeen, setIntroSeen] = useState(true);
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Check for preferences
    useEffect(() => {
        const checkStorage = async () => {
          const seen = await Preferences.get({ key: INTRO_KEY });
          setIntroSeen(seen.value === 'true');
        };
        checkStorage();
      }, []);

    const doLogin = async (event: any) =>{
        event.preventDefault();
        await present('Logging in...');
        setTimeout(() => {
            dismiss();
            router.push('/app','forward')
        }, 1000);
        // INSERT LOGIN LOGIC HERE
        console.log('doLogin');
        //router.push('/home', 'root') 
    }

    const finishIntro = async () => {
        setIntroSeen(true);
        Preferences.set({ key: INTRO_KEY, value: 'true' });
    };

    const resetIntro = () => {
        setIntroSeen(false);
        Preferences.remove({ key: INTRO_KEY })
    }

    return (
        <>
            {introSeen === false ? (
                <Intro onFinish = {finishIntro} />
            ) : (
                introSeen === true && (
    <IonPage>
        <IonHeader>
            <IonToolbar color = {'primary'}>
                <IonTitle>RollCall</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent scrollY={false} className = "ion-padding">
            <IonGrid fixed>
                <IonRow class = "ion-justify-content-center">
                    <IonCol size = '12' sizeMd = '8' sizeLg = '6' sizeXl = "4">
                        <div className = "ion-text-center ion-padding">
                        <img src = {logoSample} alt = "RollCall Logo" style = {{width: '50%'}}/>
                        </div>
                    </IonCol>
                </IonRow>

                <IonRow class = "ion-justify-content-center">
                    <IonCol size = '12' sizeMd = '8' sizeLg = '6' sizeXl = "4">
                        <IonCard>
                            <IonCardContent>
                                <form onSubmit = {doLogin}>
                                    <IonInput required type = "email" label = "UP Email" labelPlacement="floating" fill = "outline" placeholder = "UP Email" onIonChange={(e: any) => setUsername(e.target.value)}/>
                                    <IonInput required type = "password" label = "Password" labelPlacement="floating" fill = "outline" placeholder = "Password" className = "ion-margin-top" onIonChange={(e: any) => setPassword(e.target.value)}/>
                                    <IonButton type = 'submit' expand = "block" className = "ion-margin-top">
                                        Login
                                    {/* <IonIcon icon = {logInOutline}/> */}
                                    </IonButton>
                                </form>
                                {/* replace with ionic tutorial page */}
                                <IonButton color = "tertiary" routerLink = "/register" type = 'submit' expand = "block" className = "ion-margin-top">
                                        Login with Magic Link
                                </IonButton>
                                <IonButton color = "tertiary" routerLink = "/register" type = 'submit' expand = "block" className = "ion-margin-top">
                                        Create Account
                                </IonButton>
                                <IonButton onClick={resetIntro} color="medium" fill="clear" expand ="block" type='submit' className="ion-margin-top ion-justify-content-center" size="small">
                                    What's RollCall About?
                                </IonButton>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
            
        </IonContent>

    </IonPage>
                )
            )}
        </>
    );
};

export default Login;