import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { triangle, ellipse, square } from 'ionicons/icons';
import React from 'react';
import { Route, Redirect } from 'react-router';
import Tab1 from './View';
import Tab2 from './Scan';
import Tab3 from './Profile';

const Dashboard: React.FC = () => {

    return (
        <IonTabs>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/app/dashboard/view">
            <IonIcon icon={triangle} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/app/dashboard/scan">
            <IonIcon icon={ellipse} />
            <IonLabel>Scan</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/app/dashboard/profile">
            <IonIcon icon={square} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
  
        <IonRouterOutlet>
          <Route path="/app/dashboard/view" component={Tab1} />
          <Route path="/app/dashboard/scan" component={Tab2} />
          <Route path="/app/dashboard/profile" component={Tab3} />
          <Route exact path="/app/dashboard">
            <Redirect to="/app/dashboard/view" />
          </Route>
        </IonRouterOutlet>
      </IonTabs>
        // <IonPage>
        //     <IonHeader>
        //         <IonToolbar>
        //             <IonButtons slot = "start">
        //                 <IonMenuButton/>
        //             </IonButtons>
        //             <IonTitle>Dashboard</IonTitle>
        //         </IonToolbar>
        //     </IonHeader>
        //     <IonContent className="ion-padding">
        //         Dashboard
        //     </IonContent>
        // </IonPage>
    );
};

export default Dashboard;