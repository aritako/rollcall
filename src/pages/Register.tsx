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
import React, {useEffect, useState} from 'react';
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rckwuovuvxpzfjgzkhdq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJja3d1b3Z1dnhwemZqZ3praGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2NTM2NzgsImV4cCI6MjAyNDIyOTY3OH0.CfJK2zFd2Kw_Lcx57AD1uf7QX502HOkz2vlngcCu7Pk");


const Register: React.FC = () => {
    const router = useIonRouter();
    const [username, setUsername] = useState<any[]>([]);
    const [password, setPassword] = useState<any[]>([]);
    const [studentID, setID] = useState<any[]>([]);
    const [firstName, setFirstName] = useState<any[]>([]);
    const [lastName, setLastName] = useState<any[]>([]);



    async function insertDataCreds() {
        const { data, error } = await supabase.from('student_creds').insert({ email: username, password: password});

        if (error) {
            console.error('Error fetching data:', error);
        } else {
            // Handle the case where data might be null
            setUsername(data || []);
            setPassword(data || []);
        }
    }
    async function insertDataDet() {
        const { data, error } = await supabase.from('student_details').insert({ student_number: studentID, first_name: firstName, last_name: lastName, email: username});

        if (error) {
            console.error('Error fetching data:', error);
        } else {
            // Handle the case where data might be null
            setUsername(data || []);
            setID(data || []);
            setFirstName(data || []);
            setLastName(data || []);
        }
    }
    
    const doRegister =  (event: any) => {
        insertDataCreds();
        insertDataDet();
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
                                            <IonInput required type = "number" label = "Student Number" labelPlacement="floating" fill = "outline" placeholder = "Student Number" onIonChange={(e: any) => setID(e.target.value)}/>
                                            <IonInput required type = "text" label = "First Name" labelPlacement="floating" fill = "outline" placeholder = "First Name" className = "ion-margin-top" onIonChange={(e: any) => setFirstName(e.target.value)}/>
                                            <IonInput required type = "text" label = "Last Name" labelPlacement="floating" fill = "outline" placeholder = "Last Name" className = "ion-margin-top" onIonChange={(e: any) => setLastName(e.target.value)}/>
                                            <IonInput required type = "email" label = "UP Email" labelPlacement="floating" fill = "outline" placeholder = "UP Email" className = "ion-margin-top" onIonChange={(e: any) => setUsername(e.target.value)}/>
                                            <IonInput required type = "password" label = "Password" labelPlacement="floating" fill = "outline" placeholder = "Password" className = "ion-margin-top" onIonChange={(e: any) => setPassword(e.target.value)}/>
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