import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonPage, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import React, { useState } from 'react';
import './AddClass.css';
import supabase from '../config/supabaseClient';
import { User } from '@supabase/supabase-js';
interface AddClassProps {
    user: User | null;
    trigger: string;
    onFetchClasses: () => void;
    onSetAlertData: (data: {show: boolean, message: string}) => void;
}
const AddClass: React.FC<AddClassProps> = (props) => {
    const {user, trigger, onFetchClasses, onSetAlertData} = props;
    const [enrollmentKey, setEnrollmentKey] = useState<string>('');
    const handleChange = (event: any) => {
        setEnrollmentKey(event.target.value);
    }
    async function addClass(event: any){
      event.preventDefault();
      const { error } = await supabase
          .from('learners')
          .insert({student_number: user?.user_metadata.student_number, class_id: enrollmentKey})
          console.log(user?.user_metadata.student_number)
          console.log(enrollmentKey)
          onFetchClasses()

          if (error){
            onSetAlertData({show: true, message: "You're already in this class!"})
          } else{
            onSetAlertData({show: true, message: "Successfully added class!"})
      }
    }
    return (
        <IonModal className = "enrollKey" trigger = {trigger} initialBreakpoint={1} breakpoints={[0, 1]}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Class</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <form onSubmit={addClass}>
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
              <IonButton className = "test" type="submit">Submit</IonButton>
            </form>
          </IonContent>
        </IonModal>
    );
};

export default AddClass;