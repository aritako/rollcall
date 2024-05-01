import { IonButton, IonCheckbox, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React, { useState } from 'react';
import './MarkAttendance.css';
import ClassCard from '../components/ClassCard';

type Class = {
    id: number;
    course_name: string;
    course_title: string;
    time_start: string;
    time_end: string;
    professor: string;
    toggle?: boolean;
};

const MarkAttendance: React.FC = () => {
    const router = useIonRouter();
    const [classData, setClassData] = useState<Class>({
        id: 0,
        course_name: "CS 192",
        course_title: "Software Engineering II",
        time_start: "7:30",
        time_end: "8:30",
        professor: "Solamo",
        toggle: false
    });
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const handleCheckboxChange = (event: Event) => {
        const { checked } = event.target as HTMLInputElement;
        setIsChecked(checked)
    }
    const submitAttendance = () => {
        console.log("Attendance confirmed");
        router.push("/app/dashboard/view", 'forward', 'replace');
    }
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