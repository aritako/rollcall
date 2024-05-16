import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import AttendanceReport from '../../components/AttendanceReport';

interface DetailsPageProps extends RouteComponentProps<{
    id: string;
    sid: string; // Student ID
}> {
    user: User | null;
}

const ClassDetailsAttendance: React.FC<DetailsPageProps> = ({match, user}) => {
    const { id, sid } = match.params;
    console.log("SUP", id, sid)
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
                <AttendanceReport class_id = {id} student_id = {sid} user = {user}/>
            </IonContent>
        </IonPage>
    );
};

export default ClassDetailsAttendance;