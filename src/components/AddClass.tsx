import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonPage, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import React, { useState } from 'react';
import './AddClass.css';
import supabase from '../config/supabaseClient';
import { User } from '@supabase/supabase-js';
interface AddClassProps {
    user: User | null;
    dismiss: () => void;
    onFetchClasses: () => void;
    onSetAlertData: (data: {show: boolean, message: string}) => void;
}
const AddClass: React.FC<AddClassProps> = (props) => {
    const {user, dismiss, onFetchClasses, onSetAlertData} = props;
    const [enrollmentKey, setEnrollmentKey] = useState<string>('');
    const handleChange = (event: any) => {
        setEnrollmentKey(event.target.value);
    }
    async function addClass(event: any){
      event.preventDefault();
      const { error } = await supabase
          .from('learners')
          .insert({student_number: user?.user_metadata.student_number, enrollment_key: enrollmentKey})
          // console.log(user?.user_metadata.student_number)
          // console.log(enrollmentKey)
          onFetchClasses()

          if (error){
            console.log(error)
            onSetAlertData({show: true, message: "You're already in this class!"})
          } else{
            onSetAlertData({show: true, message: "Successfully added class!"})
          }
          dismiss()
    }
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Class</IonTitle>
              <IonButtons slot="end">
                <IonButton color="medium" onClick={() => dismiss()}>
                  Cancel
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <form onSubmit={addClass} className = "enroll-form">
              <IonInput required 
                name = "enrollmentKey" 
                type = "text" 
                label = "Enrollment Key" 
                labelPlacement="floating" 
                fill = "outline" 
                placeholder = "Password" 
                className = "ion-margin-top"
                onIonInput = {handleChange} 
                value = {enrollmentKey}
                />
              <IonButton className = "test" type="submit">Enroll</IonButton>
            </form>
          </IonContent>
        </IonPage>
    );
};

export default AddClass;