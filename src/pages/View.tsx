import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRefresher,
    IonRefresherContent, RefresherEventDetail,
    IonText,} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import ClassCard from '../components/ClassCard';
import Dashboard from './Dashboard';
import './Dashboard.css';
import './View.css';
import UserImage from '../assets/user.png'
import { compassSharp, settingsOutline } from 'ionicons/icons';
import supabase from '../config/supabaseClient';
import { Session, UserMetadata } from '@supabase/supabase-js';

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
    const [metadata, setMetadata] = useState<UserMetadata | null | undefined>(null)
    const [isClassIdValid, setIsClassIdValid] = useState<boolean>();
    const [formData, setFormData] = useState({
        class_id: ""
    });

    const fetchClasses = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        let viewName = 'enrollment_view';
        let idColumnName = 'student_number';
        if (user?.user_metadata?.user_type == 'professor') {  
            viewName = 'teaching_view';
            idColumnName = 'professor_id';
        }

        const { data, error } = await supabase
        .from(viewName)
        .select()
        .eq(idColumnName, user?.user_metadata?.student_number);

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
    
    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
        fetchClasses()
        event.detail.complete();
        }, 2000);
    }
    

    const handleChange = (event : any) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }
    const validateClassIdFormat = (class_id: string) => {
        return class_id.match(
            /^[0-9]+$/
        )
    }

    const validateClassId = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;
    
        setIsClassIdValid(undefined);
    
        if (value === '') return;
    
        validateClassIdFormat(value) !== null ? setIsClassIdValid(true) : setIsClassIdValid(false);
      };
    useEffect(() => {
        const fetchSession = async () => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setMetadata(session?.user?.user_metadata)
        })
        };
        fetchSession();
    }, []);
    
    useEffect(() => {
        const fetchClasses = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            let viewName = 'enrollment_view';
            let idColumnName = 'student_number';
            if (user?.user_metadata?.user_type == 'professor') {  
                viewName = 'teaching_view';
                idColumnName = 'professor_id';
            }
    
            const { data, error } = await supabase
            .from(viewName)
            .select()
            .eq(idColumnName, user?.user_metadata?.student_number);
    
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

    async function addClass(event: any){
        event.preventDefault();
        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase
            .from('learners')
            .insert({student_number: user?.user_metadata.student_number, class_id: formData.class_id})
            console.log(user?.user_metadata.student_number)
            console.log(formData.class_id)
            fetchClasses()

            if (error){
            alert(error.message)
            } else{
            alert("Succesfully added class!")
        }

    }
    // console.log(metadata)
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
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
                <div className = "dashboard-header flex align-center ion-margin-vertical">
                    <div className = "parent-user-header">
                        <img 
                            src= {UserImage} alt="User" 
                            className = "icon-profile"
                        />
                        <div className = "user-greeting">
                            <IonTitle color = {'dark'} className = "font-medium">Hello, {metadata?.first_name ? metadata.first_name : 'User'}!</IonTitle>
                            {metadata?.user_type === 'professor' ? <IonText>Professor</IonText> : <IonText>Student</IonText>}
                        </div>
                    </div>
                    <IonButton fill = "outline" className = "settings-button">
                        <IonIcon icon = {settingsOutline} className = "settings-button-ion-icon"></IonIcon>
                    </IonButton>
                </div>
                {metadata?.user_type === "student" && (
                <IonCard className = "card-class round-border">
                    <div className = "flex align-center ion-margin-vertical">
                        <h4>Enroll in a Class</h4>
                    </div>
                    <div>
                        <form onSubmit={addClass}>
                            <IonInput required 
                                name = "class_id"
                                label = "Place Enrollment Key" 
                                labelPlacement="floating" 
                                fill = "outline" 
                                placeholder = "Enrollment Key"
                                onIonInput={(event) => validateClassId(event)}
                                onIonChange={handleChange}
                                />
                            <IonButton type = 'submit' expand = "block" className = "ion-margin-top">
                                Enroll
                            </IonButton>
                        </form>
                    </div>
                    
                </IonCard>)}
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