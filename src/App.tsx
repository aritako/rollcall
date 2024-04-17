import { Redirect, Route, useHistory } from 'react-router-dom';
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
import supabase from './config/supabaseClient';
import { Session } from '@supabase/supabase-js';

setupIonicReact();

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  
  useEffect(() => {
    const fetchSession = async () => {
      const { data: {session}, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
        setLoading(false);
        return;
      }
      setSession(session);
      setLoading(false);
    };

    fetchSession();

    const { data: {subscription} } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  console.log("CURRENT SESSION:", session)
  if (loading) {
    return null; // Render nothing while loading
  }
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route component={Register} path="/register" exact />
          <Route component= {Login} path="/login" exact />
          <Route path="/app">
            {session ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Redirect exact from="/" to={session ? "/app" : "/login"} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
