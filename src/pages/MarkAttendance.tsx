import { IonButton, IonCheckbox, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './MarkAttendance.css';
import ClassCard from '../components/ClassCard';
import { Route, RouteComponentProps } from 'react-router';
import supabase from '../config/supabaseClient';

type Class = {
    id: number;
    course_name: string;
    course_title: string;
    time_start: string;
    time_end: string;
    professor: string;
    toggle?: boolean;
};

interface MarkAttendanceProps extends RouteComponentProps<{
    id: string;
}> {}

const MarkAttendance: React.FC<MarkAttendanceProps> = ({match}) => {
    const router = useIonRouter();
    const [alertData, setAlertData] = useState({
        show: false,
        message: ""
    })
    const [classData, setClassData] = useState<Class>({
        id: -1,
        course_name: "",
        course_title: "",
        time_start: "",
        time_end: "",
        professor: "",
        toggle: false
    });
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const handleCheckboxChange = (event: Event) => {
        const { checked } = event.target as HTMLInputElement;
        setIsChecked(checked)
    }

    async function submitAttendance(event: any) {
        console.log("Attendance confirmed");
        router.push("/app/dashboard/view", 'forward', 'replace');
        const { data: { user } } = await supabase.auth.getUser()
        const { error } = await supabase
            .from('attendance')
            .insert({student_number: user?.user_metadata.student_number, class_id: classData.id, timestamp: (new Date()).toISOString()})
            console.log(user?.user_metadata.student_number)
            console.log(classData.id)
            console.log((new Date()).toISOString())
            if (error){
                console.log('oh no')
                setAlertData({show: true, message: "Can't log attendance"})
            } else{
                console.log('yay')
                setAlertData({show: true, message: "Successfully logged attendance!"})
        }
    }

    useEffect(() => {
        const id = match.params.id;
        const fetchCurrentClass = async () => {
            const {data, error} = await supabase
            .from("sample_class")
            .select()
            .match({id: id});
            if (error) {
                console.log("ERROR:", error);
            }
            if (data) {
                console.log(data)
                setClassData(
                    {...data[0]}
                )
            }
        }
        fetchCurrentClass();
    },[]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Generate QR Code</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding center">
                <div className = "div-mark-attendance">
                    <div className = "mark-title">You are confirming your attendance for</div>
                    <div className = "mark-card">
                    <ClassCard {...classData}/>
                    </div>
                    <IonCheckbox value = {isChecked} labelPlacement="end" onIonChange = {handleCheckboxChange}>
                        <IonText color = "medium" className = "ion-text-wrap mark-confirm">
                        I am truthfully confirming my attendance. Any suspected misconduct is an academic dishonesty and will be subject to disciplinary sanction.
                        </IonText>
                    </IonCheckbox>
                    <IonButton 
                        shape = "round" 
                        onClick = {submitAttendance} 
                        disabled = {!isChecked}>
                            Confirm Attendance
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default MarkAttendance;