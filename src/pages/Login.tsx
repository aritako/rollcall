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

import { createClient } from '@supabase/supabase-js'
const supabase = createClient("https://rckwuovuvxpzfjgzkhdq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJja3d1b3Z1dnhwemZqZ3praGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2NTM2NzgsImV4cCI6MjAyNDIyOTY3OH0.CfJK2zFd2Kw_Lcx57AD1uf7QX502HOkz2vlngcCu7Pk");

/*
supabase.auth.signInWithOAuth({
    provider: 'google',
  })

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  },
})
*/
// CLIENT ID FOR OAUTH: 535815826046-bte1m9skc89vigj6e296hhp5u57oooqg.apps.googleusercontent.com
async function handleSignInWithGoogle(response : any) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
      nonce: 'NONCE', // must be the same one as provided in data-nonce (if any)
    })
  }
  

const Login: React.FC = () => {
    const [introSeen, setIntroSeen] = useState(true);
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
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
                                    <IonInput type = "email" label = "UP Email" labelPlacement="floating" fill = "outline" placeholder = "UP Email"/>
                                    <IonInput type = "password" label = "Password" labelPlacement="floating" fill = "outline" placeholder = "Password" className = "ion-margin-top"/>
                                    <IonButton type = 'submit' expand = "block" className = "ion-margin-top">
                                        Login
                                    {/* <IonIcon icon = {logInOutline}/> */}
                                    </IonButton>
                                </form>
                                                    <div
                                                        id="g_id_onload"
                                                        data-client_id="535815826046-bte1m9skc89vigj6e296hhp5u57oooqg.apps.googleusercontent.com"
                                                        data-context="signin"
                                                        data-ux_mode="popup"
                                                        data-login_uri="https://rckwuovuvxpzfjgzkhdq.supabase.co/auth/v1/callback"
                                                        data-auto_prompt="false"
                                                    ></div>
                                                    <div
                                                        className="g_id_signin"
                                                        data-type="standard"
                                                        data-shape="pill"
                                                        data-theme="outline"
                                                        data-text="signin_with"
                                                        data-size="large"
                                                        data-logo_alignment="left"
                                                        onClick={handleSignInWithGoogle}
                                                    ></div>
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