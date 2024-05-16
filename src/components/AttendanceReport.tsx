import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import supabase from '../config/supabaseClient';
import { parse } from 'path';
import { time } from 'console';

interface AttendanceReportProps{
    class_id: string;
    student_id?: string;
    user: User | null;
}

interface DateComponents {
    month: string;
    date: number;
    time: string;
    year: number;
  }
  
function parseISOString(dateString: string): DateComponents {
    const dateObj = new Date(dateString);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const date = dateObj.getDate();
    const time = dateObj.toLocaleTimeString();
    const year = dateObj.getFullYear();

    return {
        month,
        date,
        time,
        year
    };
}

const AttendanceReport: React.FC<AttendanceReportProps> = ({class_id, student_id, user}) => {
    const [attendanceData, setAttendanceData] = useState<any>([]);
    const [timeData, setTimeData] = useState<DateComponents[]>([]);
    useEffect(() => {
        const fetchAttendance = async () => {
            let student_number = user?.user_metadata.student_number;
            if (student_id){
                student_number = student_id;
            }
            const { data, error } = await supabase
            .from('attendance')
            .select()
            .eq("class_id", class_id)
            .eq("student_number", student_number)

            if (error){
                console.log(error)
            }
            if (data){
                setAttendanceData(data)
            }
        }
        fetchAttendance();

    },[]);

    useEffect(() => {
        if (attendanceData){
            setTimeData(attendanceData.map((data: any) => parseISOString(data.timestamp)))
        }
    }, [attendanceData]);
    return (
        <>
            <h1 className = "font-medium ion-text-center">Attendance Report</h1>
            <IonList>
                {timeData.map((data: any, index: number) => (
                    <IonItem key = {index}>
                        <IonLabel>{data.month}</IonLabel>
                        <IonLabel>{data.date}</IonLabel>
                        <IonLabel>{data.year}</IonLabel>
                        <IonLabel>{data.time}</IonLabel>
                    </IonItem>
                ))}
            </IonList>
        </>

    );
};

export default AttendanceReport;