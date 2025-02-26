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
    IonLabel,
    IonList,
    IonThumbnail
} from "@ionic/react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ModalButton from "../../components/Buttons/Button";
import './Simulation4.css';
import { Link } from "react-router-dom";

interface SimulationState {
    simulationData: any; // Substitua `any` pelo tipo correto se souber o formato dos dados
  }
function Simulation4() {
    const modal = useRef<HTMLIonModalElement>(null);
    const [user_login, setUser_login] = useState("");
    const [user_pass, setUser_pass] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const [isParcelasVisible, setIsParcelasVisible] = useState(false);

    const toggleParcelas = () => {
        setIsParcelasVisible(!isParcelasVisible);
    };

    const [simulationData, setSimulationData] = useState(null);
    useEffect(() => {
        // Recupere os dados do localStorage
        const data = localStorage.getItem("simulationData");
        if (data) {
          setSimulationData(JSON.parse(data));
        } else {
          console.error("Nenhum dado encontrado no localStorage.");
        }
      }, []);
    
      if (!simulationData) {
        return <p>Carregando os dados da simulação...</p>;
      }
    
       // Ajustando os nomes das variáveis para o retorno da API
       const { valorInicial, valorLiquido, parcelas, meses } = simulationData.dados;


    return (
        <>
            <IonPage>
                <IonContent className="custom-dash-content" scrollY>

                    <div className="custom-simulation4-content">

                        <div className="custom-simulation4-resumo">
                            <h3>Resultado da Simulação</h3>
                            <p>O valor do empréstimo é descontado anualmente do saldo do FGTS em parcelas, de forma automática.</p>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" width="420" height="2" viewBox="0 0 328 2" fill="none">
                            <path d="M0 1H328" stroke="#F0F0F0" />
                        </svg>

                        <div className="custom-simulation4-valores">
                            <p>Valor bruto</p>
                            <h3>R$ {valorInicial?.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00"}</h3>
                            </div>

                        <div className="custom-simulation4-valores">
                            <p>Valor líquido</p>
                            <h3>R$ {valorLiquido?.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00"}</h3>
                            </div>

                        <div className="custom-simulation4-valores">
                            <p>Parcelas Solicitadas</p>
                            <h3>{meses} meses</h3>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" width="420" height="2" viewBox="0 0 328 2" fill="none">
                            <path d="M0 1H328" stroke="#F0F0F0" />
                        </svg>

                        <div className="custom-simulation4-aprovacao">

<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="base/outline/icon-paper-bag">
<path id="Vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M6.66667 3.625C6.3904 3.625 6.12545 3.73475 5.9301 3.9301C5.73475 4.12545 5.625 4.3904 5.625 4.66667V7.01912L6.78567 9.34046C7.11838 10.0058 7.29162 10.7394 7.29167 11.4833V16.3333C7.29167 16.6989 7.20434 17.0554 7.04124 17.375H15C15.2763 17.375 15.5412 17.2653 15.7366 17.0699C15.9319 16.8746 16.0417 16.6096 16.0417 16.3333V11.4834C16.0417 11.4834 16.0417 11.4834 16.0417 11.4834C16.0416 10.9336 15.9136 10.3913 15.6677 9.89954L14.881 8.32621C14.5483 7.66089 14.375 6.92725 14.375 6.18338V4.66667C14.375 4.3904 14.2653 4.12545 14.0699 3.9301C13.8746 3.73475 13.6096 3.625 13.3333 3.625H6.66667ZM5 18.625C4.39221 18.625 3.80932 18.3836 3.37955 17.9538C2.94977 17.524 2.70833 16.9411 2.70833 16.3333V11.4833C2.70838 10.7395 2.88162 10.0058 3.21431 9.34049C3.21431 9.3405 3.21432 9.34048 3.21431 9.34049L4.375 7.01912V4.66667C4.375 4.05888 4.61644 3.47598 5.04621 3.04621C5.47598 2.61644 6.05888 2.375 6.66667 2.375H13.3333C13.9411 2.375 14.524 2.61644 14.9538 3.04621C15.3836 3.47598 15.625 4.05888 15.625 4.66667V6.18329C15.625 6.18328 15.625 6.18331 15.625 6.18329C15.625 6.73309 15.7531 7.27538 15.999 7.76712L16.7857 9.34046C16.7857 9.34045 16.7857 9.34047 16.7857 9.34046C17.1184 10.0058 17.2916 10.7394 17.2917 11.4833V16.3333C17.2917 16.9411 17.0502 17.524 16.6205 17.9538C16.1907 18.3836 15.6078 18.625 15 18.625H5ZM5 8.56421L4.33235 9.89951C4.08644 10.3913 3.95838 10.9335 3.95833 11.4833C3.95833 11.4833 3.95833 11.4833 3.95833 11.4833V16.3333C3.95833 16.6096 4.06808 16.8746 4.26343 17.0699C4.45878 17.2653 4.72373 17.375 5 17.375C5.27627 17.375 5.54122 17.2653 5.73657 17.0699C5.93192 16.8746 6.04167 16.6096 6.04167 16.3333V11.4834C6.04167 11.4834 6.04167 11.4834 6.04167 11.4834C6.04162 10.9336 5.91357 10.3913 5.66767 9.89954L5 8.56421ZM8.54167 6.33333C8.54167 5.98816 8.82149 5.70833 9.16667 5.70833H10.8333C11.1785 5.70833 11.4583 5.98816 11.4583 6.33333C11.4583 6.67851 11.1785 6.95833 10.8333 6.95833H9.16667C8.82149 6.95833 8.54167 6.67851 8.54167 6.33333ZM10.0462 11.3795C10.476 10.9498 11.0589 10.7083 11.6667 10.7083C12.2745 10.7083 12.8573 10.9498 13.2871 11.3795C13.7169 11.8093 13.9583 12.3922 13.9583 13C13.9583 13.6078 13.7169 14.1907 13.2871 14.6205C12.8573 15.0502 12.2745 15.2917 11.6667 15.2917C11.0589 15.2917 10.476 15.0502 10.0462 14.6205C9.61644 14.1907 9.375 13.6078 9.375 13C9.375 12.3922 9.61644 11.8093 10.0462 11.3795ZM11.6667 11.9583C11.3904 11.9583 11.1254 12.0681 10.9301 12.2634C10.7347 12.4588 10.625 12.7237 10.625 13C10.625 13.2763 10.7347 13.5412 10.9301 13.7366C11.1254 13.9319 11.3904 14.0417 11.6667 14.0417C11.9429 14.0417 12.2079 13.9319 12.4032 13.7366C12.5986 13.5412 12.7083 13.2763 12.7083 13C12.7083 12.7237 12.5986 12.4588 12.4032 12.2634C12.2079 12.0681 11.9429 11.9583 11.6667 11.9583Z" fill="#191225"/>
</g>
</svg>

                            <p>Disponível em até 2 dias úteis após aprovação.</p>
                        </div>

                        <div className="custom-simulation4-parcelas">
                            <h3>Parcelas Liberadas</h3> 
                            <h4>detalhes</h4>
                        </div>

                    </div>
                    <div className="custom-simulation4-detalhes"  onClick={toggleParcelas}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 9H11.5C10.6716 9 10 9.67157 10 10.5C10 11.3284 10.6716 12 11.5 12H12.5C13.3284 12 14 12.6716 14 13.5C14 14.3284 13.3284 15 12.5 15H10M12 8V9M12 15V16M18 12H18.01M6 12H6.01M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2ZM18.5 12C18.5 12.2761 18.2761 12.5 18 12.5C17.7239 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.7239 11.5 18 11.5C18.2761 11.5 18.5 11.7239 18.5 12ZM6.5 12C6.5 12.2761 6.27614 12.5 6 12.5C5.72386 12.5 5.5 12.2761 5.5 12C5.5 11.7239 5.72386 11.5 6 11.5C6.27614 11.5 6.5 11.7239 6.5 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                        <p>Detalhes das parcelas atuais</p>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 8.68309C4.90237 9.07362 4.90237 9.70678 5.29289 10.0973L11.2929 16.0973C11.6834 16.4878 12.3166 16.4878 12.7071 16.0973L18.7071 10.0973C19.0976 9.70678 19.0976 9.07362 18.7071 8.68309C18.3166 8.29257 17.6834 8.29257 17.2929 8.68309L12 13.976L6.70711 8.68309C6.31658 8.29257 5.68342 8.29257 5.29289 8.68309Z" fill="white" />
                        </svg>

                    </div>

                    {isParcelasVisible && (
            <IonCardContent>
              {parcelas?.map((parcela: any, index: number) => (
                <IonList key={index}>
                  <IonItem>
                    <IonThumbnail slot="start" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 21V15M16 18H22M22 10H2M22 12V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.0799 19 5.2 19H12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                   </IonThumbnail>
                    <IonLabel>
                      Parcela - Vencimento: {new Date(parcela.dataVencimento).toLocaleDateString("pt-BR")}
                    </IonLabel>
                    <p>R$ {parcela.valorPrincipal?.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00"}</p>
                  </IonItem>
                </IonList>
              ))}
            </IonCardContent>
          )}
                    <div className="custom-content-check">

                        <div className="check">
                            <input type="checkbox" />
                            <p className="p_credenciais">Li e estou de acordo com o aviso de privacidade e a politica de serviços da PH negócios</p>
                        </div>
                    </div>
                    <div className="custom-button-content">


                        <Link to="/loading3" style={{ textAlign: 'center'}}>
                            <button
                                className="custom-button-modal1"
                            >Contratar</button>
                        </Link>

                       {/*  <Link to="/simulation3">
                            <button
                                className="custom-button-modal2"
                            >Cancelar</button>
                        </Link> */}


                    </div>

                </IonContent>
            </IonPage>
        </>
    );
}

export default Simulation4;
