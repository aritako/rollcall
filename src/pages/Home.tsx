import { IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Redirect, Route } from 'react-router';
import Dashboard from './Dashboard';
import Settings from './Settings';
import { homeOutline, logOutOutline, newspaperOutline } from 'ionicons/icons';
import './Home.css';
import supabase from '../config/supabaseClient';
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import ViewDetails from './ViewDetails';


const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const paths = [
    { name: 'Home', url: '/app/dashboard/view', icon: homeOutline },
    { name: 'Settings', url: '/app/settings', icon: newspaperOutline },
  ]
  const signOut = async () => {
    await supabase.auth.signOut();
  }

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <IonPage>
      <IonSplitPane contentId = 'main' when = "xl">
      <IonMenu contentId = 'main'>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>RollCall</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent>
            {paths.map((item, index) => (
              <IonMenuToggle key = { index } autoHide = { false }>
                <IonItem routerLink = {item.url} key = { index } routerDirection = "none">
                <IonIcon slot = "start" icon = {item.icon} />
                {item.name}
                </IonItem>
              </IonMenuToggle>
              ))}
              <IonMenuToggle autoHide = { false }>
                  <IonItem detail = {false} routerLink = "/" routerDirection = "root" onClick={signOut}>
                    <IonIcon slot = "start" icon = {logOutOutline} />
                    Logout
                  </IonItem>
              </IonMenuToggle>
          </IonContent>
      </IonMenu>
      <IonRouterOutlet id = 'main'>
          <Route path="/app/dashboard" render={(props) => <Dashboard {...props} user={user} />} />
          <Route path = "/app/settings" component = {Settings} />
          <Route exact path = "/app">
              <Redirect to = "/app/dashboard/view"/>
          </Route>
      </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Home;
