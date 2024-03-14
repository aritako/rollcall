import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useState, useEffect } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const [token, setToken] = useState(false);

  if(token){
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      setToken(JSON.parse(sessionStorage.getItem('token')!))
    }
  },[])

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Login setToken ={setToken}/>
          </Route>
          <Route component={Register} path="/register" exact />
          {token ? 
            <Route path="/app">
              <Home token = {token}/>
            </Route>
            : 
            <Redirect to = "/"/>
          }
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
