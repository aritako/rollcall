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
  header: 'Semester',
  subHeader: 'Please select the appropriate semester.',
};

const CreateClass: React.FC<AddClassProps> = (props) => {
    const {user, dismiss, onFetchClasses, onSetAlertData} = props;
    const [formData, setFormData] = useState({
      classKey: "",
      className: "",
      classTitle: "",
      classSemester: "",
      classYear: "",
      classStartTime: "",
      classEndTime: "",
      maxAbsences: 0,
    })
    console.log(formData.classStartTime + ':00')
    console.log(formData)
    const handleChange = (event: any) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }
    async function createClass(event: any){
      event.preventDefault();

      const { error } = await supabase
          .from('sample_class')
          .insert({
            class_key: formData.classKey,
            course_name: formData.className,
            course_title: formData.classTitle,
            professor_number: user?.user_metadata.student_number,
            time_start: formData.classStartTime + ':00',
            time_end: formData.classEndTime + ':00',
            professor: user?.user_metadata.first_name + ' ' + user?.user_metadata.last_name,
            year: formData.classYear,
            semester: formData.classSemester,
            max_absences: formData.maxAbsences
          })
      
          if (error){
            console.log(error)
            onSetAlertData({show: true, message: "Can't add class!"})
            
          } else{
            onSetAlertData({show: true, message: "Successfully created class!"})
          }
          dismiss()
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
            <form onSubmit={createClass} className = "create-form ion-margin-top">
                <IonInput required 
                name = "classKey" 
                type = "text" 
                label = "Class Enrollment Key" 
                labelPlacement="floating" 
                fill = "outline" 
                placeholder = "e.g. CS200KEY"
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
                onIonInput = {handleChange} 
                value = {formData.className}
                />
                <IonInput required 
                name = "classTitle" 
                type = "text" 
                label = "Class Title" 
                labelPlacement="floating" 
                fill = "outline" 
                placeholder = "e.g. Software Engineering I"
                onIonInput = {handleChange} 
                value = {formData.classTitle}
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
                label = "Start Time" 
                labelPlacement="floating" 
                fill = "outline" 
                onIonInput = {handleChange} 
                value = {formData.classStartTime}
                />
                <IonInput required 
                name = "classEndTime" 
                type = "time" 
                label = "End Time" 
                labelPlacement="floating" 
                fill = "outline" 
                onIonInput = {handleChange} 
                value = {formData.classEndTime}
                />
                </div>
                <IonInput required 
                name = "maxAbsences" 
                type = "number" 
                label = "Max No. of Absences" 
                labelPlacement="floating"
                placeholder = "e.g. 7"
                fill = "outline" 
                onIonInput = {handleChange} 
                value = {formData.maxAbsences}
                />
              <IonButton className = "test" type="submit">Enroll</IonButton>
            </form>
          </IonContent>
        </IonPage>
    );
};

export default CreateClass;