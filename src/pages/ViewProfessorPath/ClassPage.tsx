import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import supabase from '../../config/supabaseClient';
import { User } from '@supabase/supabase-js';
import "./ClassPage.css";
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
    const [displayType, setDisplayType] = useState<string>("class");
    const [students, setStudents] = useState<any[]>([]);
    useEffect(() => {
        const fetchStudents = async () => {
            const { data, error } = await supabase
            .from("enrollment_view")
            .select()
            .match({id: id})
    
            if (error) {
                console.log(error)
            }
            if (data){
                setStudents(data)
            }
        }
        const fetchDates = async () => {
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
        fetchStudents();
        fetchDates();
    },[]);
    useEffect(() => {
        if(user){
            if (user?.user_metadata?.user_type == 'professor') {
                setUserType('p')
            } else {
                setUserType('s')
            }
        }
    }, [user]);
    const handleDisplayChange = (e: CustomEvent) => {
        setDisplayType(e.detail.value)
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
            <IonContent className="ion-padding classpage-content">
                <div className = "classpage-title">
                    <h1 className="font-heavy">Class Report</h1>
                </div>
                <IonSegment value= {displayType} onIonChange={handleDisplayChange}>
                    <IonSegmentButton value="class">
                    <IonLabel>Students</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="date">
                    <IonLabel>Date</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                {displayType === "class" ?
                <div className = "classpage-list">
                    <IonList>
                        {students?.map((student: any) => 
                            <IonItem key={student.student_number}>
                                <IonLabel>{student.last_name + ", " + student.first_name}</IonLabel>
                            </IonItem>
                            )
                        } 
                    </IonList>
                </div>
                :
                <div className = "classpage-list">
                    <IonList>
                        {uniqueDays?.map((day: any) => {
                            const formattedDay = formatDate(day)
                            return(
                            <IonItem key={day} routerLink = {`/app/dashboard/view/${userType}/${id}/${day.split("-").join("")}`}>
                                <IonLabel>{formattedDay}</IonLabel>
                            </IonItem>
                            )
                        })}
                    </IonList>
                </div>
                }
            </IonContent>
        </IonPage>
    );
};

export default ClassPage;