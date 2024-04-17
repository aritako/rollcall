import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import ClassCard from '../components/ClassCard';
import Dashboard from './Dashboard';
import './Dashboard.css';
import UserImage from '../assets/user.png'
import { settingsOutline } from 'ionicons/icons';
import supabase from '../config/supabaseClient';
import { Session } from '@supabase/supabase-js';

type Class = {
    id: number;
    course_name: string;
    course_title: string;
    time_start: string;
    time_end: string;
    professor: string;
};

const View: React.FC = () => {
    const [fetchError, setFetchError] : Array<any> = useState(null)
    const [courses, setCourses] : Array<any> = useState(null)
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        const fetchSession = async () => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        };
        fetchSession();
    }, []);
    
    useEffect(() => {
        const fetchClasses = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            const { data, error } = await supabase
            .from('enrollment_view')
            .select()
            .eq('student_number', user?.user_metadata?.student_number)

            if (error) {
                setFetchError("An error occurred while fetching classes")
                setCourses(null)
                console.log(error)
            }
            if (data){
                setCourses(data)
                setFetchError(null)
            }
        }
        fetchClasses()
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Dashboard</IonTitle>
                </IonToolbar>
            </IonHeader>
            {fetchError && <div>{fetchError}</div>}
            <IonContent className="ion-padding">
                <div className = "flex align-center ion-margin-vertical">
                    <img 
                        src= {UserImage} alt="User" 
                        className = "icon-profile"
                    />
                    <IonTitle color = {'dark'} className = "font-medium">Hello, {session?.user?.user_metadata?.first_name}!</IonTitle>
                    <IonButton fill = "outline" className = "settings-button">
                        <IonIcon icon = {settingsOutline} className = "settings-button-ion-icon"></IonIcon>
                    </IonButton>
                </div>
                <h1 className="font-heavy">Your Classes</h1>
                {courses && courses.map((item: Class) => (
                    <ClassCard
                        key={item.id}
                        {...item}
                    />
                ))}
            </IonContent>
        </IonPage>
    );
};

export default View;