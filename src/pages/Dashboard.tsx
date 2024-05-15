import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { triangle, ellipse, square } from 'ionicons/icons';
import React from 'react';
import { Route, Redirect } from 'react-router';
import View from './View';
import Scan from './Scan';
import Profile from './Profile';
import ClassDetails from './ViewProfessorPath/ClassDetails';
import { User } from '@supabase/supabase-js';
import MarkAttendance from './MarkAttendance';
import AttendancePage from './ViewStudentPath/AttendancePage';
import ClassPage from './ViewProfessorPath/ClassPage';

interface DashboardProps {
  user: User | null;
}
const Dashboard: React.FC<DashboardProps> = (props) => {
  const {user} = props
    return (
      <IonTabs>
        <IonTabBar slot="bottom">
          <IonTabButton tab="View" href="/app/dashboard/view">
            <IonIcon icon={triangle} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Scan" href="/app/dashboard/scan">
            <IonIcon icon={ellipse} />
            <IonLabel>{user?.user_metadata.user_type === "professor" ? "Generate" : "Scan"}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Profile" href="/app/dashboard/profile">
            <IonIcon icon={square} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
  
        <IonRouterOutlet>
          <Route exact path='/app/dashboard/view/:id/:date' 
          render={(props) => <ClassDetails {...props} user={user} />} />
          <Route exact path='/app/dashboard/view/:id' 
          render={(props) => user?.user_metadata.user_type === "professor" ? 
            <ClassPage {...props} user={user} /> : 
            <AttendancePage {...props} user={user} />
          } 
          />
          <Route exact path="/app/dashboard/view" render={(props) => <View {...props} user={user} />} />
          <Route exact path='/app/dashboard/attendance/:id' component={MarkAttendance} />
          <Route path="/app/dashboard/scan" render={(props) => <Scan {...props} user={user} />} />
          <Route path="/app/dashboard/profile" component={Profile} />
          <Route exact path="/app/dashboard">
            <Redirect to="/app/dashboard/view" />
          </Route>
        </IonRouterOutlet>
      </IonTabs>
    );
};

export default Dashboard;