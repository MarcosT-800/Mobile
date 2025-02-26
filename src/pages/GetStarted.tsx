import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonInput,
  IonItem,
  IonToast,
  IonIcon,
} from "@ionic/react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ModalButton from "../components/Buttons/Button";
import "./main.css";
import { login } from "../components/api";
import { Link } from "react-router-dom";
import { globe } from 'ionicons/icons';
import { Carousel3D } from '../components/Carousel3D';
import { 
  timeOutline, 
  newspaper, 
  linkOutline, 
  arrowForward,
  trendingUp,
  ribbonOutline
} from 'ionicons/icons';

function GetStarted() {
  const modal = useRef<HTMLIonModalElement>(null);
  const [user_login, setUser_login] = useState("");
  const [user_pass, setUser_pass] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");


  const handleLogin = async () => {
    try {
      // Criando o payload de forma correta
      const payload: { email?: string; cpf?: string; password: string } = {
        password: user_pass,
      };

      // Se for um email, adiciona ao payload corretamente
      if (user_login.includes("@")) {
        payload.email = user_login.trim(); // Corrigido para ser string
      } else {
        payload.cpf = user_login.replace(/\D/g, ""); // Remove caracteres não numéricos do CPF
      }

      console.log("Enviando dados:", JSON.stringify(payload)); // Verifique no console se está correto

      const data = await login(payload);
      setToastMessage("Login realizado com sucesso!");
      setShowToast(true);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      setToastMessage(error.message || "Erro ao fazer login.");
      setShowToast(true);
    }
  };

   useEffect(() =>  {
      const cleanStorage = async () => {
        console.log("cleaning...");
        localStorage.removeItem('simulationData');
        localStorage.removeItem('erroSimulacao');
        localStorage.removeItem('message');
      }
  
      cleanStorage();
  
      setInterval(function() {
        cleanStorage();
      }, 30000);
    }, []);


  // 🔹 Corrigindo o useEffect para forçar um valor inicial na senha
  useEffect(() => {
    setUser_pass(""); // Define um valor inicial
  }, []);

  // 🔹 Correção na função de input
  const handleInputChange3 = (e: CustomEvent) => {
    setUser_pass(e.detail.value || ""); // Garante que sempre seja uma string
  };


  return (
     <IonPage>
        <IonContent className="ph-proposta-content" style={{ overflow: "auto" }}>
          <div className="body">
            <div className="banking-app">
              <div className="hero-section">
                {/* Elemento de animação de fundo */}
                <div className="animated-background">
                  <div className="gradient-orb orb1"></div>
                  <div className="gradient-orb orb2"></div>
                </div>

                {/* Logo e título */}
                <div className="brand-container">
                  <div className="logo-wrapper">
                  <img src="PHlogo.png" />
                  </div>
                  <h1 className="app-title"> Negócios</h1>
                </div>

                {/* Texto principal */}
                <div className="content-wrapper">
                  <h2 className="hero-title">Empréstimos em suas mãos de forma rápida e fácil</h2>
                  <p className="hero-description">
                    Experimente uma nova forma de gerenciar seu dinheiro com tecnologia
                    de ponta e segurança incomparável
                  </p>
                </div>

                {/* Indicadores de slide */}
                <div className="slide-indicators">
                  <span className="indicator active"></span>
                  <span className="indicator"></span>
                  <span className="indicator"></span>
                </div>

                {/* Botão de ação */}
                <Link to="/login">
                <button
                  className="start-button"
                  >
                  Começar agora
                  <svg className="arrow-icon" width="20" height="20" viewBox="0 0 20 20">
                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
                  </Link>

                <Link to="/informative">
                            <button className="learn-more-btn" style={{ marginTop: '20px' }}>
                                        Conheça a PH
                                        <IonIcon icon={arrowForward} />
                                </button>
                </Link>
              </div>
            </div>

{/* 
            <IonModal ref={modal} trigger="open-modal" initialBreakpoint={1} breakpoints={[0, 1]} >
              <div className="block">
                {/*           <img src="onda_capa 2.png" style={{ position: 'fixed', top: '-10px', left: '-37px', width: '350px', zIndex: '9997' }}/>

    
                <div style={{ zIndex: '9997', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>


                  <div>

                    <h1 className="title_modal" style={{ textAlign: 'center' }}>Bem-vindo a PH!</h1>
                    <p className="subtitle_modal">Vamos continuar com o login!</p>
                  </div>

                  <img alt="Silhouette of mountains" src="/PHlogo.png" className="LogoPHModal" />

                </div>
            
                <div className="form" style={{ zIndex: '9999' }}>
                  <div>
                    <label className="custom-label">E-mail ou CPF</label>
                    <button className="custom-input">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42806 -3.03019e-05H7.37464C5.69042 -4.0491e-05 4.41562 -4.80436e-05 3.41638 0.0901523C2.6433 0.159001 2.01448 0.281182 1.50451 0.538152C1.43848 0.561425 1.37753 0.595364 1.3247 0.639C1.23531 0.692334 1.14794 0.750516 1.06667 0.815485C0.494737 1.27124 0.23061 1.95197 0.113785 2.78106C-0.000126217 3.58947 -6.99602e-05 4.58964 3.71304e-06 5.89933L7.49362e-06 6.00045L3.71304e-06 6.10157C-6.99603e-05 7.41126 -0.000126223 8.41143 0.113785 9.21984C0.23061 10.0489 0.493721 10.7297 1.06667 11.1854C1.63962 11.6412 2.40559 11.8206 3.41638 11.9108C4.40544 12 5.66447 12 7.3233 12L7.42806 12H8.57091L8.67573 12C10.3355 12 11.5935 12 12.5836 11.9108C13.5934 11.8206 14.3604 11.6412 14.9333 11.1854C15.5052 10.7297 15.7694 10.0489 15.8862 9.21984C16.0001 8.41144 16.0001 7.41127 16 6.10159V6.10155L16 6.00045L16 5.89935V5.89931C16.0001 4.58963 16.0001 3.58947 15.8862 2.78106C15.7694 1.95197 15.5052 1.27124 14.9333 0.815485C14.8592 0.756334 14.7809 0.702031 14.7007 0.652576C14.6367 0.593425 14.5585 0.550758 14.4731 0.525546C13.9672 0.276334 13.3445 0.158031 12.5836 0.0901523C11.5834 -4.80343e-05 10.3095 -4.0491e-05 8.62436 -3.03019e-05H8.57091H7.42806ZM7.42806 1.09088H8.57091C10.2816 1.09088 11.5596 1.09379 12.4759 1.17621C12.7268 1.19948 12.9412 1.22858 13.1362 1.26252C12.4068 1.83561 10.6423 3.22033 9.08901 4.43924C8.45307 4.93863 7.54691 4.93863 6.91098 4.43924C5.35771 3.22033 3.59314 1.83561 2.86375 1.26252C3.05778 1.22858 3.27314 1.19948 3.52305 1.17621C4.44038 1.09379 5.71733 1.09088 7.42806 1.09088ZM3.63589 3.28136C2.68729 2.53678 1.90304 1.92121 1.6955 1.75803C1.47404 1.98591 1.33283 2.31851 1.24648 2.92651C1.14693 3.63051 1.14286 4.64094 1.14286 6.00045C1.14286 7.35997 1.14693 8.37136 1.24648 9.07439C1.34604 9.77742 1.51264 10.1207 1.79912 10.3486C2.08559 10.5764 2.60673 10.7423 3.52305 10.8247C4.44038 10.9071 5.71733 10.91 7.42806 10.91H8.57091C10.2816 10.91 11.5596 10.9071 12.4769 10.8247C13.3933 10.7423 13.9144 10.5764 14.2009 10.3486C14.4873 10.1207 14.6539 9.77742 14.7535 9.07439C14.8531 8.37136 14.8571 7.35997 14.8571 6.00045C14.8571 4.64094 14.852 3.63051 14.7535 2.92651C14.6672 2.31851 14.5249 1.98591 14.3045 1.75803C14.097 1.9212 13.3128 2.53672 12.3642 3.28124C11.5484 3.9216 10.611 4.65739 9.81434 5.28288C8.76291 6.10809 7.23707 6.10809 6.18565 5.28288C5.38903 4.65742 4.45169 3.92169 3.63589 3.28136Z" fill="#D70404" />
                      </svg>
                      <IonInput
                        type="text"
                        placeholder="Seu email ou CPF"
                        value={user_login}
                        onIonChange={(e) => setUser_login(e.detail.value!)}
                        className="custom-input-input"
                      />
                    </button>
                  </div>

                  <div>
                    <label className="custom-label">Senha</label>
                    <button className="custom-input">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="18" viewBox="0 0 13 18" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25001 0.872986C4.20801 0.872986 2.53801 2.52599 2.50401 4.55999C2.50101 4.58099 2.50001 4.60199 2.50001 4.62299V5.29399C2.45762 5.29659 2.41247 5.29822 2.36707 5.29987H2.36706C2.29036 5.30264 2.21296 5.30545 2.14701 5.31299C1.56001 5.37899 1.04301 5.52299 0.662006 5.90399C0.280006 6.28499 0.136006 6.80199 0.0690063 7.38999C0.00578391 7.95324 0.00587605 8.62936 0.00599578 9.508L0.00600635 9.62499V12.657C0.00200635 12.688 6.34798e-06 12.719 6.34798e-06 12.75L3.14173e-06 12.8291C-5.15963e-05 13.7262 -9.35403e-05 14.4137 0.0650063 14.985C0.131006 15.573 0.275006 16.089 0.657006 16.47C1.03801 16.852 1.55501 16.995 2.14201 17.061C2.7131 17.1251 3.39928 17.125 4.29491 17.125L4.37501 17.125H4.38101H8.12501C8.13089 17.125 8.13677 17.1247 8.14276 17.1245C8.14901 17.1242 8.15538 17.124 8.16201 17.124H8.20298C9.09706 17.124 9.78769 17.124 10.358 17.06C10.945 16.994 11.461 16.851 11.843 16.469C12.225 16.088 12.369 15.572 12.435 14.984C12.5 14.4056 12.5 13.7069 12.5 12.7941V12.7941V12.753V12.749V9.62799V9.62699V9.62499L12.5 9.54593V9.54585C12.5001 8.64874 12.5001 7.9613 12.435 7.38999C12.369 6.80199 12.225 6.28499 11.843 5.90399C11.461 5.52299 10.945 5.37899 10.358 5.31299C10.293 5.30569 10.2172 5.30246 10.142 5.29925L10.1419 5.29925C10.0934 5.29718 10.0451 5.29512 10 5.29199V4.62299C10 4.59999 9.99901 4.57599 9.99601 4.55299C9.95801 2.52199 8.28901 0.872986 6.25001 0.872986ZM6.25001 2.12299C7.63701 2.12299 8.75001 3.23699 8.75001 4.62299V5.25299C8.65622 5.25299 8.5674 5.25228 8.47607 5.25155H8.47604C8.37943 5.25078 8.28003 5.24999 8.16901 5.24999L8.16636 5.24981C8.15235 5.24887 8.13912 5.24799 8.12501 5.24799H4.38101C4.36987 5.24799 4.35873 5.24885 4.34679 5.24977L4.34401 5.24999C4.23033 5.24999 4.12856 5.25078 4.02972 5.25155C3.93639 5.25228 3.84568 5.25299 3.75001 5.25299V4.62299C3.75001 3.23699 4.86301 2.12299 6.25001 2.12299ZM8.08101 6.49799H4.41201L4.41101 6.49899C4.40601 6.49899 4.40101 6.49924 4.39601 6.49949C4.39101 6.49974 4.38601 6.49999 4.38101 6.49999C3.44601 6.49999 2.75301 6.50399 2.28701 6.55599C1.82101 6.60799 1.63401 6.69999 1.54501 6.78799C1.45701 6.87599 1.36501 7.06399 1.31201 7.52999C1.26001 7.99599 1.25601 8.68899 1.25601 9.62499V12.75C1.25601 12.779 1.25501 12.808 1.25101 12.838C1.25101 13.723 1.25501 14.395 1.30601 14.844C1.35901 15.311 1.45101 15.498 1.53901 15.587C1.62801 15.675 1.81501 15.766 2.28101 15.819C2.74701 15.871 3.44001 15.875 4.37501 15.875H4.38101H8.09301C8.09851 15.8745 8.10376 15.8742 8.10901 15.874C8.11426 15.8737 8.11951 15.8735 8.12501 15.873C9.05901 15.873 9.75201 15.871 10.218 15.819C10.684 15.766 10.872 15.674 10.961 15.585C11.049 15.497 11.141 15.309 11.194 14.843C11.246 14.378 11.25 13.686 11.25 12.753V9.62799V9.62599V9.62499C11.25 8.68899 11.246 7.99599 11.194 7.52999C11.141 7.06399 11.049 6.87599 10.961 6.78799C10.872 6.69899 10.684 6.60799 10.218 6.55599C9.75201 6.50399 9.05901 6.49999 8.12501 6.49999C8.11089 6.49999 8.09766 6.4991 8.08365 6.49816L8.08101 6.49799Z" fill="#D70404" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.252 8.99799C5.92 8.99799 5.602 9.12999 5.367 9.36399C5.132 9.59899 5 9.91799 5 10.25C5 10.47 5.058 10.686 5.168 10.876C5.279 11.066 5.437 11.224 5.627 11.334V12.75C5.626 12.833 5.641 12.915 5.672 12.992C5.703 13.069 5.749 13.139 5.807 13.198C5.865 13.257 5.935 13.304 6.011 13.336C6.088 13.368 6.17 13.384 6.252 13.384C6.335 13.384 6.417 13.368 6.494 13.336C6.57 13.304 6.639 13.257 6.697 13.198C6.756 13.139 6.801 13.069 6.832 12.992C6.863 12.915 6.879 12.833 6.877 12.75V11.333C7.068 11.223 7.226 11.065 7.336 10.875C7.446 10.685 7.504 10.47 7.505 10.25C7.505 9.91799 7.373 9.59899 7.138 9.36399C6.903 9.12999 6.585 8.99799 6.252 8.99799Z" fill="#D70404" />
                      </svg>
                      <IonInput
                        type="password"
                        value={user_pass}
                        placeholder="Sua senha"
                        onIonInput={handleInputChange3}
                        className="custom-input-input"
                      />
                    </button>
                  </div>

                  <div className="check-content">
                    <div className="check">
                      {/* <input type="checkbox" />

                      <Link to="/forget"><p className="p_credenciais" style={{ fontFamily: 'Poppins' }}>Esqueci minha senha</p></Link>
                    </div>
                  </div>

                </div>
         

                <button
                  className="custom-button-modal1"
                  onClick={handleLogin}
                >Entrar</button>
                <div className="custom-content-hr">
                  <svg xmlns="http://www.w3.org/2000/svg" width="75" height="2" viewBox="0 0 75 2" fill="none">
                    <path d="M1 1H74" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                  <p className="custom-p-hr" style={{ textAlign: 'center', color: 'black' }}>Suporte para login</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="75" height="2" viewBox="0 0 75 2" fill="none">
                    <path d="M1 1H74" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </div>


                <div>
                  <p className="custom-not-account">Ainda não tem uma conta?<Link to="/register"><a className="custom-not-account-span">Clique aqui</a></Link></p>
                </div>


              </div>

              <IonToast
                trigger="open-toast"
                duration={3000}
                isOpen={showToast}
                message={toastMessage}
                onDidDismiss={() => setShowToast(false)}
                className="custom-toast"
                icon={globe}
                buttons={[
                  {
                    text: 'Fechar',
                    role: 'cancel',
                  },
                ]}
              ></IonToast>

              {/*  <IonToast
                isOpen={showToast}
                message={toastMessage}
                duration={2000}
                onDidDismiss={() => setShowToast(false)}
              /> 
            </IonModal> */}


          </div>
        </IonContent>
    </IonPage>
  );
}

export default GetStarted;
