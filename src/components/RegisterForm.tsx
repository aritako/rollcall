import React, {useEffect, useState} from 'react';
import supabase from "../config/supabaseClient"
import { IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonInput, IonButton, IonSelect, IonSelectOption, useIonRouter, IonAlert } from '@ionic/react';

const RegisterForm: React.FC = () =>{
    const router = useIonRouter();
    const [isTouchedEmail, setIsTouchedEmail] = useState(false);
    const [isTouchedStudentNumber, setIsTouchedStudentNumber] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState<boolean>();
    const [isStudentNumberValid, setIsStudentNumberValid] = useState<boolean>();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alert, setAlert] = useState({
        show: false,
        message: ""
    })
    const [formData, setFormData] = useState({
        user_type: "",
        student_number: "",
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const validateStudentNumberFormat = (student_number: string) => {
        return student_number.match(
            /^[0-9]{9}$/
        )
    }

    const validateStudentNumber = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;
    
        setIsStudentNumberValid(undefined);
    
        if (value === '') return;
    
        validateStudentNumberFormat(value) !== null ? setIsStudentNumberValid(true) : setIsStudentNumberValid(false);
      };
    
    const validateEmailFormat = (email: string) => {
        return email.match(
            /^[a-zA-Z0-9._-]+@((up)\.edu\.ph)$/
        );
    }
    const markTouchedStudentNumber = () => {
        setIsTouchedStudentNumber(true);
    };
    const validateEmail = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;
    
        setIsEmailValid(undefined);
    
        if (value === '') return;
    
        validateEmailFormat(value) !== null ? setIsEmailValid(true) : setIsEmailValid(false);
      };
    
    const markTouchedEmail = () => {
        setIsTouchedEmail(true);
    };

    const handleChange = (event : any) => {
        setFormData((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }
    const customActionSheetOptions = {
        header: 'User Type',
        subHeader: 'Please select whether you are a student or a professor.',
    };
    async function doSignUp(event: any){
        event.preventDefault();
        const { data, error } = await supabase.auth.signUp(
            {
                email: formData.email,
                password: formData.password,
                options: {
                data: {
                    user_type: formData.user_type,
                    student_number: formData.student_number,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    display_name: formData.first_name + " " + formData.last_name,
                }
                }
            }
            )
            if (error) {
                setAlert({show: true, message: "This email is already in use."})
            } else {
                setAlert({show: true, message: "Please check your email for the verification link."})
                // IMPORTANT NOTE: Remove this when implementing signup with email verification!
                await supabase.auth.signOut();
                router.push('/login');
        }

    }
    // console.log(formData)
    return(
        <>
        <IonGrid fixed>
            <IonRow class = "ion-justify-content-center">
                <IonCol size = '12' sizeMd = '8' sizeLg = '6' sizeXl = "4">
                    <IonCard>
                        <IonCardContent>
                            <form onSubmit = {doSignUp}>
                                <IonSelect
                                    name = "user_type"
                                    label="User Type"
                                    interfaceOptions={customActionSheetOptions}
                                    interface="action-sheet"
                                    placeholder="Student/Professor"
                                    labelPlacement="floating" 
                                    fill = "outline"
                                    onIonChange={handleChange} 
                                    >
                                    <IonSelectOption value="student">Student</IonSelectOption>
                                    <IonSelectOption value="professor">Professor</IonSelectOption>
                                </IonSelect>
                                <IonInput 
                                    required name = "student_number" 
                                    type = "text" 
                                    label = "UP ID Number" 
                                    labelPlacement="floating" 
                                    fill = "outline" 
                                    placeholder = "Student Number" 
                                    className={`ion-margin-top ${isStudentNumberValid && 'ion-valid'} ${isStudentNumberValid === false && 'ion-invalid'} ${isTouchedStudentNumber && 'ion-touched'}`}
                                    onIonInput={(event) => validateStudentNumber(event)}
                                    onIonBlur={() => markTouchedStudentNumber()}
                                    onIonChange={handleChange}
                                />
                                <IonInput required name = "first_name" type = "text" label = "First Name" labelPlacement="floating" fill = "outline" placeholder = "First Name" className = "ion-margin-top" onIonChange={handleChange}/>
                                <IonInput required name = "last_name" type = "text" label = "Last Name" labelPlacement="floating" fill = "outline" placeholder = "Last Name" className = "ion-margin-top" onIonChange={handleChange}/>
                                <IonInput 
                                    required name = "email" 
                                    type = "email" 
                                    label = "UP Email" 
                                    labelPlacement="floating" 
                                    fill = "outline" 
                                    placeholder = "UP Email" 
                                    className={`ion-margin-top ${isEmailValid && 'ion-valid'} ${isEmailValid === false && 'ion-invalid'} ${isTouchedEmail && 'ion-touched'}`}
                                    onIonInput={(event) => validateEmail(event)}
                                    onIonBlur={() => markTouchedEmail()}
                                    onIonChange={handleChange}
                                />
                                <IonInput required name = "password" type = "password" label = "Password" labelPlacement="floating" fill = "outline" placeholder = "Password" className = "ion-margin-top" onIonInput={handleChange}/>
                                <IonButton type = 'submit' expand = "block" className = "ion-margin-top">
                                    Submit
                                {/* <IonIcon icon = {logInOutline}/> */}
                                </IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
        <IonAlert
            isOpen={alert.show}
            onDidDismiss={() => setAlert({show: false, message: ""})}
            header={alert.message.includes("Success") ? "Success" : "Error"}
            message={alert.message}
            buttons={['OK']}
        />
        </>
    )
}

export default RegisterForm