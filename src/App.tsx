import React, { useEffect, useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/Login/Login'; // Página de login
import GetStarted from './pages/GetStarted';
import Dashboard from './pages/Dashboard/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './pages/app.css';
/* Theme variables */
import './theme/variables.css';
import Simulation1 from './pages/Simulation/Simulation1';
import Simulation2 from './pages/Simulation/Simulation2';
import Simulation3 from './pages/Simulation/Simulation3';
import Loading from './pages/Loading/Loading';
import Simulation4 from './pages/Simulation/Simulation4';
import Cadastro1 from './pages/Documents/Cadastro1';
import Cadastro2 from './pages/Documents/Cadastro2'
import Cadastro3 from './pages/Documents/Cadastro3';
import Cadastro4 from './pages/Documents/Cadastro4';
import Cadastro5 from './pages/Documents/Cadastro5';
import Loading3 from './pages/Loading/Loading3';
import Loading4 from './pages/Loading/loading4';
import Loading2 from './pages/Loading/Loading2';
import Proposta1 from './pages/Proposal/Proposta1';
import Signup from './pages/Login/Sign';
import Forget from './pages/Login/Forget';
import OneSignal from 'onesignal-cordova-plugin';
import Error from './pages/Loading/Error';
import ConfirmDados from './pages/Loading/ConfirmDados';
import ForgetPasswordPage from "./pages/Login/ForgetPasswordPage";
import ResetPasswordPage from "./pages/Login/ResetPasswordPage";
import Error1 from './pages/Loading/Error1';
import Error2 from './pages/Loading/Error2';
import Error3 from './pages/Loading/Error3';
import Error4 from './pages/Loading/Error4';
import Error5 from './pages/Loading/Error5';
import Error7 from './pages/Loading/Error7';
import Error6 from './pages/Loading/Error6';
import Error8 from './pages/Loading/Error8';
import Informative from './components/Informative';
import PropostaDetalhes from './pages/Proposal/PropostaDetalhe';

setupIonicReact();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Verifica a autenticação ao carregar o aplicativo
  useEffect(() => {
    setIsAuthenticated(false);
    /* const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Atualiza o estado com base no token */
  }, []);


  React.useEffect(() => {
    if (window?.cordova) {
      try {
        (OneSignal as any).setAppId('3dc54551-d79e-4fe5-a7b4-f59b2c76eb17');

        (OneSignal as any).setNotificationWillShowInForegroundHandler((notification: any) => {
          console.log('Notificação recebida:', notification);
          return notification;
        });

        (OneSignal as any).setNotificationOpenedHandler((notification: any) => {
          console.log('Notificação aberta:', notification);
        });
      } catch (error) {
        console.error('Erro do OneSignal:', error);
      }
    } else {
      console.warn('Cordova não está disponível. Execute em um dispositivo ou emulador.');
    }
  }, []);

  try {

    // Inicialize o OneSignal
    OneSignal.Debug.setLogLevel(6)
    
    // Replace YOUR_ONESIGNAL_APP_ID with your OneSignal App ID
    OneSignal.initialize("3dc54551-d79e-4fe5-a7b4-f59b2c76eb17");

    OneSignal.Notifications.addEventListener('click', async (e) => {
      let clickData = await e.notification;
      console.log("Notification Clicked : " + clickData);
    })

    OneSignal.Notifications.requestPermission(true).then((success: Boolean) => {
      console.log("Notification permission granted " + success);
    })
  
} catch(error) {
  console.log(JSON.stringify("Erro do One Signal" + error));
}

 /*  useEffect(() => {
    const unlisten = history.listen(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    });

    return () => unlisten();
  }, [history]); */

  const history = useHistory();

  

  
  const showTabBar = !['/GetStarted', '/login', '/register'].includes(location.pathname);

  useEffect(() => {
    if (showTabBar) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [showTabBar]); // Executa sempre que `showTabBar` muda

  console.log("teste");
  
  const [activeIndex, setActiveIndex] = useState(0); // Estado para controlar o card ativo

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet className='background-primary'>
            <Route exact path="/login">
              <Login />
            </Route>
          <IonRouterOutlet>
                <Route path="/proposta1" component={Proposta1} exact />
                <Route path="/proposta-detalhes/:hash" component={PropostaDetalhes} />
            </IonRouterOutlet>
            <Route exact path="/forget">
              <Forget />
            </Route>
            <Route exact path="/register">
              <Signup /> 
            </Route>
            <Route exact path="/tab1">
              {isAuthenticated ? <Tab1 /> : <Redirect to="/GetStarted" />}
            </Route>
            <Route exact path="/tab2">
              {isAuthenticated ? <Tab2 /> : <Redirect to="/GetStarted" />}
            </Route>
            <Route exact path="/tab3">
              {isAuthenticated ? <Tab3 /> : <Redirect to="/GetStarted" />}
            </Route>
            <Route exact path="/simulation1">
             <Simulation1 />
            </Route>
            <Route exact path="/simulation2">
             <Simulation2 />
            </Route>
            <Route exact path="/simulation3">
             <Simulation3 />
            </Route>
            <Route exact path="/simulation4">
             <Simulation4 />
            </Route>
            <Route exact path="/cadastro1">
             <Cadastro1 />
            </Route>
            <Route exact path="/cadastro2">
             <Cadastro2 />
            </Route>
            <Route exact path="/cadastro3">
             <Cadastro3 />
            </Route>
            <Route exact path="/cadastro4">
             <Cadastro4 />
            </Route>
            <Route exact path="/cadastro5">
             <Cadastro5 />
            </Route>
            <Route exact path="/proposta1">
             <Proposta1 />
            </Route>
            <Route exact path="/loading">
             <Loading />
            </Route>
            <Route exact path="/loading2">
             <Loading2 />
            </Route>
            <Route exact path="/loading3">
             <Loading3 />
            </Route>
            <Route exact path="/loading4">
             <Loading4 />
            </Route>
            <Route exact path="/error">
             <Error />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/GetStarted">
              <GetStarted />
            </Route>
            <Route exact path="/">
              <Redirect to="/GetStarted" />
            </Route>

            <Route exact path="/error1">
              <Error1 />
            </Route>

            <Route exact path="/error2">
              <Error2 />
            </Route>

            <Route exact path="/error3">
              <Error3 />
            </Route>

            <Route exact path="/error4">
              <Error4 />
            </Route>

            <Route exact path="/error5">
              <Error5 />
            </Route>

            <Route exact path="/error6">
              <Error6 />
            </Route>

            <Route exact path="/error7">
              <Error7 />
            </Route>

            <Route exact path="/error8">
              <Error8 />
            </Route>

            <Route exact path="/informative">
              <Informative />
            </Route>
            
            <Route path="/password/reset" exact component={ResetPasswordPage} />
            <Route path="/password/reset/:token" component={ResetPasswordPage} />

            <Route exact path="/confirm">
              <ConfirmDados />
            </Route> 
          </IonRouterOutlet>

        {showTabBar && (
            <IonTabBar slot="bottom" className="tabbar" /* style={{ background: 'white'}} */>
              {/* Botão da Esquerda */}
              <IonTabButton tab="tab1" href="/dashboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.66667 2.25C2.70017 2.25 1.91667 3.0335 1.91667 4V13C1.91667 13.9665 2.70017 14.75 3.66667 14.75H10.1667C11.1332 14.75 11.9167 13.9665 11.9167 13V4C11.9167 3.0335 11.1332 2.25 10.1667 2.25H3.66667Z"
                    fill="#D70404"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.1667 21.75C14.2002 21.75 13.4167 20.9665 13.4167 20V11C13.4167 10.0335 14.2002 9.25 15.1667 9.25H21.6667C22.6332 9.25 23.4167 10.0335 23.4167 11V20C23.4167 20.9665 22.6332 21.75 21.6667 21.75H15.1667Z"
                    fill="#D70404"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.91667 18C1.91667 17.0335 2.70017 16.25 3.66667 16.25H10.1667C11.1332 16.25 11.9167 17.0335 11.9167 18V20C11.9167 20.9665 11.1332 21.75 10.1667 21.75H3.66667C2.70017 21.75 1.91667 20.9665 1.91667 20V18Z"
                    fill="#D70404"
                  />
                  <path
                    d="M15.1667 7.75C14.2002 7.75 13.4167 6.9665 13.4167 6V4C13.4167 3.0335 14.2002 2.25 15.1667 2.25H21.6667C22.6332 2.25 23.4167 3.0335 23.4167 4V6C23.4167 6.9665 22.6332 7.75 21.6667 7.75H15.1667Z"
                    fill="#D70404"
                  />
                </svg>
                <IonLabel
                  className={`label-menu ${activeIndex === 0 ? "active" : ""}`}
                  onClick={() => setActiveIndex(0)}
                >
                  Menu
                </IonLabel>
              </IonTabButton>

              {/* Botão Central */}
              <IonTabButton
                tab="central"
                href="/simulation3"
                className="central-tab-button"
                onClick={() => setActiveIndex(2)}
              >
                <div className="central-button-icon">
                  <svg
                    width="70"
                    height="70"
                    viewBox="0 0 70 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Exemplo: círculo com sinal de “+” */}
                    <circle cx="35" cy="35" r="35" fill="#D70404" />
                    <text
                      x="35"
                      y="45"
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="30"
                      fontFamily="Arial"
                    >
                      +
                    </text>
                  </svg>
                </div>
              </IonTabButton>

              {/* Botão da Direita */}
              <IonTabButton tab="tab2" href="/proposta1">
                <img
                  src="/ShieldCheck.png"
                  style={{ width: "25px", height: "auto" }}
                  alt="Shield"
                />
                <IonLabel
                  className={`label-menu ${activeIndex === 1 ? "active" : ""}`}
                  onClick={() => setActiveIndex(1)}
                >
                  Meus Contratos
                </IonLabel>
              </IonTabButton>
            </IonTabBar>
          )}

        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
