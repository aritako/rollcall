import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';

interface DetailsPageProps extends RouteComponentProps<{
    id: string;
}> {}

const ViewDetails: React.FC<DetailsPageProps> = ({match}) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot = "start">
                        <IonBackButton defaultHref = "/app/dashboard/view"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Page Title</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                UI goes here...
            </IonContent>
        </IonPage>
    );
};

export default ViewDetails;