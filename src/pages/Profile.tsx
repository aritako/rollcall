import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/react';
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import React from 'react';
import supabase from '../config/supabaseClient';

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