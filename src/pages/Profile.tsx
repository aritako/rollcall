import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/react';
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import React from 'react';

const supabase = createClient("https://rckwuovuvxpzfjgzkhdq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJja3d1b3Z1dnhwemZqZ3praGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2NTM2NzgsImV4cCI6MjAyNDIyOTY3OH0.CfJK2zFd2Kw_Lcx57AD1uf7QX502HOkz2vlngcCu7Pk");

const Tab2: React.FC = () => {

    const [students, setName] = useState<any[]>([]);

    useEffect(() => {
        getName();
    }, []);

    async function getName() {
        const { data, error } = await supabase.from('students1').select();

        if (error) {
            console.error('Error fetching data:', error);
        } else {
            // Handle the case where data might be null
            setName(data || []);
        }
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {students.map((student) => (
                        <IonItem key={student.name}>
                            <IonLabel>{student.name}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;