import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import supabase from '../../config/supabaseClient';
import AttendanceReport from '../../components/AttendanceReport';
import { User } from '@supabase/supabase-js';
interface DetailsPageProps extends RouteComponentProps<{
    id: string;
    date?: string;
}> {
    user: User | null;
}

interface Student {
    id: string;
    first_name: string;
    last_name: string;
}

const formatDate = (dateString: string) => {
    const options : any = { year: 'numeric', month: 'long', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const ClassPage: React.FC<DetailsPageProps> = ({match, user}) => {
    const {id} = match.params
    const [uniqueDays, setUniqueDays] = useState<string[]>([]);
    const [userType, setUserType] = useState<string>('');
    useEffect(() => {
        const fetchClasses = async () => {
            const { data, error } = await supabase
            .from("attendance")
            .select("timestamp")
            .eq("class_id", id)
    
            if (error) {
                console.log(error)
            }
            else{
                const days = data.map(entry => entry.timestamp.split('T')[0])
                const uniqueDays = [...new Set(days)]
                setUniqueDays(uniqueDays)
            }
        }
        fetchClasses();
    },[]);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot = "start">
                        <IonBackButton defaultHref = "/app/dashboard/view"></IonBackButton>
                    </IonButtons>
                    <IonTitle>View</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h1 className="font-heavy"><center>Attendance Report</center></h1>
                <IonList>
                    {uniqueDays?.map((day: any) => {
                        const formattedDay = formatDate(day)
                        return(
                        <IonItem key={day} routerLink = {`/app/dashboard/view/${id}/${day.split("-").join("")}`}>
                            <IonLabel>{formattedDay}</IonLabel>
                        </IonItem>
                        )
                    })}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default ClassPage;