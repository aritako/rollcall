import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './AddClass.css';
interface AddClassProps {
    openModal: boolean;
    closeModal: () => void;
}
const AddClass: React.FC<AddClassProps> = (props) => {
    const { openModal, closeModal } = props;
    return (
        <IonModal isOpen={openModal}  initialBreakpoint={1} breakpoints={[0, 1]}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => closeModal()}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div className = "block">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
              reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
              Eaque, dicta.
            </div>
          </IonContent>
        </IonModal>
    );
};

export default AddClass;