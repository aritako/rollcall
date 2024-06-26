import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRefresher,
    IonRefresherContent, RefresherEventDetail,
    IonText,
    IonAlert,
    useIonModal,
    IonLoading,
    useIonLoading,} from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import ClassCard from '../components/ClassCard';
import Dashboard from './Dashboard';
import './Dashboard.css';
import './View.css';
import UserImage from '../assets/user.png'
import { compassSharp, settingsOutline } from 'ionicons/icons';
import supabase from '../config/supabaseClient';
import { Session, User, UserMetadata } from '@supabase/supabase-js';
import AddClass from '../components/AddClass';
import ViewLoading from '../components/loading/ViewLoading';
import CreateClass from '../components/CreateClass';

type Class = {
    id: number;
    class_key: string;
    course_name: string;
    course_title: string;
    time_start: string;
    time_end: string;
    professor: string;
    professor_number: string;
    semester: string;
    year: string;
    max_absences: number;
    // CUSTOM
    toggle: boolean;
    isProfessor?: boolean;
};
interface ViewProps {
    user: User | null;
}
const View: React.FC<ViewProps> = (props) => {
    const { user } = props
    const [fetchError, setFetchError] : Array<any> = useState(null)
    const [courses, setCourses] : Array<any> = useState(null)
    const [metadata, setMetadata] = useState<UserMetadata | null | undefined>(null)
    const [isClassIdValid, setIsClassIdValid] = useState<boolean>();
    const [formData, setFormData] = useState({
        class_id: ""
    });
    const [alertData, setAlertData] = useState({
        show: false,
        message: ""
    })
    const [loading, setLoading] = useState(true)
    const fetchClasses = async (init = false) => {
        if(init) setLoading(true)
        let viewName = 'enrollment_view';
        let idColumnName = 'student_number';
        if (user?.user_metadata?.user_type == 'professor') {  
            viewName = 'sample_class';
            idColumnName = 'professor_number';
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
        if (init) setLoading(false)
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
    const [presentModalAdd, dismissModalAdd] = useIonModal(AddClass,{
        user: user,
        dismiss: () => dismissModalAdd(),
        onFetchClasses: fetchClasses,
        onSetAlertData: setAlertData,
    })

    const [presentModalCreate, dismissModalCreate] = useIonModal(CreateClass,{
        user: user,
        dismiss: () => dismissModalCreate(),
        onFetchClasses: fetchClasses,
        onSetAlertData: setAlertData,
    })
    useEffect(() => {
        if (user){
            setMetadata(user?.user_metadata)
            fetchClasses(true);
        }
    }, [user]);

    return (
        <>
        <IonPage>
        {(loading) ? 
            <ViewLoading />
            : <>
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
                {metadata?.user_type === "student" ?  
                <IonButton expand="block" onClick = {() => presentModalAdd()}>
                    Add Class
                </IonButton>
                : 
                <IonButton expand="block" onClick = {() => presentModalCreate()}>
                    Create Class
                </IonButton>
                }
                <h1 className="font-heavy">Your Classes</h1>
                {courses && courses.map((item: Class) => (
                    <ClassCard
                        key={item.id}
                        {...item}
                        toggle={true}
                        isProfessor={metadata?.user_type === 'professor'}
                    />
                ))}
                
            </IonContent>
            </>
            }
        </IonPage>
        <IonAlert
            isOpen={alertData.show}
            onDidDismiss={() => setAlertData({show: false, message: ""})}
            header={alertData.message.includes("Success") ? "Success" : "Error"}
            message={alertData.message}
            buttons={['OK']}
        />
        </>
    );
};

export default View;