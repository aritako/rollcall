import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import supabase from '../config/supabaseClient';
interface DetailsPageProps extends RouteComponentProps<{
    id: string;
}> {}

interface Student {
    id: string;
    first_name: string;
    last_name: string;
}

const ViewDetails: React.FC<DetailsPageProps> = ({match}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState<Student[]>([]);
    useEffect(() => {
        console.log('SEARCH', searchTerm)
    }, [searchTerm]);
    useIonViewWillEnter( () => {
        const id = match.params.id;
        const fetchClasses = async () => {
            const { data: { user } } = await supabase.auth.getUser()
    
            const { data, error } = await supabase
            .from("learners")
            .select()
            .match({class_id: id})
    
            if (error) {
                console.log(error)
            }
            if (data){
                setStudents(data)
            }
        }
        fetchClasses();
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot = "start">
                        <IonBackButton defaultHref = "/app/dashboard/view"></IonBackButton>
                    </IonButtons>
                    <IonTitle>View Class</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonSearchbar value={searchTerm} 
                    debounce = {300}
                    onIonChange = {(e) => setSearchTerm(e.detail.value!)}>
                </IonSearchbar>
                <h1 className="font-heavy">Class List</h1>
                <IonList>
                    {students?.map((course: any) => (
                        <IonItem key={course.student_number}>
                            <IonLabel>{course.student_number}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default ViewDetails;