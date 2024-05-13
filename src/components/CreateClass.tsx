import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonModal, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import React, { useState } from 'react';
import './CreateClass.css';
import supabase from '../config/supabaseClient';
import { User } from '@supabase/supabase-js';
interface AddClassProps {
    user: User | null;
    dismiss: () => void;
    onFetchClasses: () => void;
    onSetAlertData: (data: {show: boolean, message: string}) => void;
}

const customActionSheetOptions = {
  header: 'User Type',
  subHeader: 'Please select whether you are a student or a professor.',
};

const CreateClass: React.FC<AddClassProps> = (props) => {
    const {user, dismiss, onFetchClasses, onSetAlertData} = props;
    const [formData, setFormData] = useState({
      classKey: "",
      className: "",
      classSemester: "",
      classYear: "",
      classStartTime: "",
      classEndTime: "",
    })
    console.log(formData)
    const handleChange = (event: any) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }
    async function addClass(event: any){
      event.preventDefault();
      // const { error } = await supabase
      //     .from('learners')
      //     .insert({student_number: user?.user_metadata.student_number, class_id: enrollmentKey})
      //     console.log(user?.user_metadata.student_number)
      //     onFetchClasses()

      //     if (error){
      //       onSetAlertData({show: true, message: "You're already in this class!"})
      //     } else{
      //       onSetAlertData({show: true, message: "Successfully added class!"})
      //     }
      //     dismiss()
    }
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Create Class</IonTitle>
              <IonButtons slot="end">
                <IonButton color="medium" onClick={() => dismiss()}>
                  Cancel
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <form className = "create-form ion-margin-top">
                <IonInput required 
                name = "classKey" 
                type = "text" 
                label = "Class Enrollment Key" 
                labelPlacement="floating" 
                fill = "outline" 
                placeholder = "e.g. CS200KEY"
                className = {"custom"}
                onIonInput = {handleChange}
                value = {formData.classKey}
                />
                <IonInput required 
                name = "className" 
                type = "text" 
                label = "Class Name" 
                labelPlacement="floating" 
                fill = "outline" 
                placeholder = "e.g. CS 200 WFR-1"
                className = {"custom"}
                onIonInput = {handleChange} 
                value = {formData.className}
                />
                <div className = "sem-year">
                <IonSelect
                    name = "classSemester"
                    label="Class Semester"
                    interfaceOptions={customActionSheetOptions}
                    interface="action-sheet"
                    placeholder="Select a Semester"
                    labelPlacement="floating" 
                    fill = "outline"
                    onIonChange={handleChange} 
                    >
                    <IonSelectOption value="1st Semester">1st Semester</IonSelectOption>
                    <IonSelectOption value="2nd Semester">2nd Semester</IonSelectOption>
                </IonSelect>
                <IonInput required 
                name = "classYear" 
                type = "text" 
                label = "Academic Year" 
                labelPlacement="floating" 
                fill = "outline" 
                placeholder = "e.g. 2023-2024"
                className = {"custom"}
                onIonInput = {handleChange} 
                value = {formData.classYear}
                />
                </div>
                <div className = "start-end">
                <IonInput required 
                name = "classStartTime" 
                type = "time" 
                label = "Starting Time" 
                labelPlacement="floating" 
                fill = "outline" 
                onIonInput = {handleChange} 
                value = {formData.classStartTime}
                />
                <IonInput required 
                name = "classEndTime" 
                type = "time" 
                label = "Ending Time" 
                labelPlacement="floating" 
                fill = "outline" 
                onIonInput = {handleChange} 
                value = {formData.classEndTime}
                />
                </div>
              <IonButton disabled className = "test" type="submit">Enroll</IonButton>
            </form>
          </IonContent>
        </IonPage>
    );
};

export default CreateClass;