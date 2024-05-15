import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import supabase from '../config/supabaseClient';
import AttendanceReport from '../components/AttendanceReport';
import { User } from '@supabase/supabase-js';
interface DetailsPageProps extends RouteComponentProps<{
    id: string;
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
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState<Student[]>([]);
    const [uniqueDays, setUniqueDays] = useState<string[]>([]);
    const [userType, setUserType] = useState<string>('');
    useEffect(() => {
        console.log('SEARCH', searchTerm)
    }, [searchTerm]);
    useEffect(() => {
        if (user){
            if (user?.user_metadata?.user_type == 'professor') {
                setUserType('professor')
            } else {
                setUserType('student')
            }
        }
    }, [user]);
    useEffect(() => {
        const id = match.params.id;
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
                const formattedDays = uniqueDays.map(day => formatDate(day))
                setUniqueDays(formattedDays)
            }
        }
        fetchClasses();
    });
    if (!userType) {
        // Render loading state or return null while userType is being fetched
        return null;
    }
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
                {/* <IonSearchbar value={searchTerm} 
                    debounce = {300}
                    onIonChange = {(e) => setSearchTerm(e.detail.value!)}>
                </IonSearchbar> */}
                <h1 className="font-heavy">Attendance Report</h1>
                <IonList>
                    {uniqueDays?.map((day: any) => (
                        <IonItem key={day}>
                            <IonLabel>{day}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default ClassPage;