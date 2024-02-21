import { IonContent, IonHeader, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Redirect, Route } from 'react-router';
import Dashboard from './Dashboard';
import Settings from './Settings';
import { homeOutline, newspaperOutline } from 'ionicons/icons';
// import './Home.css';

const Home: React.FC = () => {
  const paths = [
    { name: 'Home', url: '/app/dashboard', icon: homeOutline },
    { name: 'Settings', url: '/app/settings', icon: newspaperOutline },
  ]
  return (
    <IonPage>
      <IonMenu contentId = 'main'>
          <IonHeader>
              <IonToolbar color = {'secondary'}>
                  <IonTitle>Dashboard</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent>
            {paths.map((item, index) => (
              <IonMenuToggle key = { index }>
                <IonItem routerLink = {item.url} key = { index } routerDirection = "none">
                {item.name}
                </IonItem>
              </IonMenuToggle>
              ))}
          </IonContent>
      </IonMenu>
      <IonRouterOutlet id = 'main'>
          <Route exact path = "/app/dashboard" component = {Dashboard} />
          <Route path = "/app/settings" component = {Settings} />
          <Route exact path = "/app">
              <Redirect to = "/app/dashboard"/>
          </Route>
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Home;
