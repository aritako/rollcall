import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonInput, IonButton, IonIcon, useIonRouter, useIonLoading, IonCol, IonGrid, IonRow, IonAlert } from '@ionic/react';
import {logInOutline} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';
import logoSample from '../assets/sample/logo-sample.png';
import supabase from '../config/supabaseClient';
import { Session } from '@supabase/supabase-js';
const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => {
    const [introSeen, setIntroSeen] = useState(true);
    const router = useIonRouter();
    const [present, dismiss] = useIonLoading();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [alertData, setAlertData] = useState({
        show: false,
        message: ""
    })
    
    // Check for preferences
    useEffect(() => {
        const checkStorage = async () => {
          const seen = await Preferences.get({ key: INTRO_KEY });
          setIntroSeen(seen.value === 'true');
        };
        checkStorage();
    }, []);
    
    const handleChange = (event : any) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value ?? ''
            }
        })
    }

    const doLogin = async (event: any) =>{
        event.preventDefault();
        // console.log("EMAIL PASSED: ", formData.email, "PASSWORD PASSED: " ,formData.password);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        })
        if (error){
            setAlertData({show: true, message: "Invalid email or password."});
        }
        else{
            router.push('/app', 'forward', 'replace'); 
        }
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
    <>
    <IonPage>
        <IonHeader>
            <IonToolbar color = {'primary'}>
                <IonTitle>RollCall</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent scrollY={false} className = "ion-padding">
            <IonGrid fixed>
                <IonRow class = "ion-justify-content-center">
                    <IonCol size = '8' sizeMd = '6' sizeLg = '4' sizeXl = "2">
                        <div className = "ion-text-center ion-padding">
                        <img src = {logoSample} alt = "RollCall Logo" style = {{width: '50%'}}/>
                        </div>
                    </IonCol>
                </IonRow>

                <IonRow class = "ion-justify-content-center">
                    <IonCol size = '12' sizeMd = '8' sizeLg = '6' sizeXl = "4">
                        <IonCard>
                            <IonCardContent>
                                <form onSubmit={doLogin}>
                                    <IonInput required 
                                        name = "email" 
                                        type = "email" 
                                        label = "UP Email" 
                                        labelPlacement="floating" 
                                        fill = "outline" 
                                        placeholder = "UP Email"
                                        onIonInput = {handleChange} 
                                        value = {formData.email}
                                        />
                                    <IonInput required 
                                        name = "password" 
                                        type = "password" 
                                        label = "Password" 
                                        labelPlacement="floating" 
                                        fill = "outline" 
                                        placeholder = "Password" 
                                        className = "ion-margin-top"
                                        onIonInput = {handleChange} 
                                        value = {formData.password}
                                        />
                                    <IonButton type = 'submit' expand = "block" className = "ion-margin-top">
                                        Login
                                    <IonIcon icon = {logInOutline}/>
                                    </IonButton>
                                </form>
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
    <IonAlert
            isOpen={alertData.show}
            onDidDismiss={() => setAlertData({show: false, message: ""})}
            header={alertData.message.includes("Success") ? "Success" : "Error"}
            message={alertData.message}
            buttons={['OK']}
        />
    </>
                )
            )}
        </>
    );
};

export default Login;