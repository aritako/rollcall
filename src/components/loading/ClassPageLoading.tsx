import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSkeletonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const ClassPageLoading: React.FC = () => {

    return (
        <IonContent className="ion-padding">
            <div className = "classpage-title">
                <h1 className="font-heavy">Class Report</h1>
            </div>
            <IonList>
            {Array.from({ length: 3 }).map((_, index) => (
                <IonItem key={index}>
                    <IonLabel>
                        <h3>
                            <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
                        </h3>
                        <p>
                            <IonSkeletonText animated={true} style={{ width: '60%' }}></IonSkeletonText>
                        </p>
                        <p>
                            <IonSkeletonText animated={true} style={{ width: '30%' }}></IonSkeletonText>
                        </p>
                    </IonLabel>
                </IonItem>
                ))}
            </IonList>
        </IonContent>
    );
};

export default ClassPageLoading;