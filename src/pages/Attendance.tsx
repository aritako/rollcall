import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import AttendanceReport from '../components/AttendanceReport';

interface DetailsPageProps extends RouteComponentProps<{
    id: string;
}> {
    user: User | null;
}

const AttendancePage: React.FC<DetailsPageProps> = ({match, user}) => {

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
                <AttendanceReport class_id = {match.params.id} user = {user}/>
            </IonContent>
        </IonPage>
    );
};

export default AttendancePage;