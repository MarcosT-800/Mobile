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
import { Link } from "react-router-dom";
import './Cadastro1.css';
import '../Documents/Cadastro1.css';

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
    
    const data = localStorage.getItem("message");
    const message = data.replace(/"/g, "");  // Remove as aspas duplas se existirem

    return (
        <>
            <IonPage>
                <IonContent className="custom-dash-content" scrollY>

                <nav className="custom-cadastro1-navbar">
                      <Link to="/simulation3">
                        <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.1342 5.86554C21.5077 5.23907 20.492 5.23907 19.8656 5.86554L13.9997 11.7314L8.13399 5.86563C7.50753 5.23916 6.49182 5.23916 5.86536 5.86563C5.23889 6.49209 5.23889 7.50779 5.86536 8.13426L11.7311 14L5.86553 19.8656C5.23907 20.492 5.23907 21.5077 5.86553 22.1342C6.492 22.7607 7.5077 22.7607 8.13417 22.1342L13.9997 16.2686L19.8654 22.1343C20.4918 22.7608 21.5075 22.7607 22.134 22.1343C22.7605 21.5078 22.7605 20.4921 22.134 19.8657L16.2684 14L22.1342 8.13418C22.7607 7.50771 22.7607 6.49201 22.1342 5.86554Z" fill="#505050"/>
</svg>
                        </button>
                      </Link>
                    </nav>


                    <div className="custom-cadastro1-content">

                            <img src="/Cadastro1.png" />

                            <h1>{message || "Mensagem não encontrada!"}</h1>
                            <p>Preencha todas as etapas do cadastro para darmos andamento na sua proposta do Empréstimo Saque-Aniversário.</p>

                            <div className="warner2-content">

                     <div className="warner2">
                     <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.0098 17C11.4575 17 11.0098 16.5523 11.0098 16V12C11.0098 11.4477 11.4575 11 12.0098 11C12.5621 11 13.0098 11.4477 13.0098 12V16C13.0098 16.5523 12.5621 17 12.0098 17ZM12 7C11.4477 7 11 7.44771 11 8C11 8.55228 11.4477 9 12 9H12.001C12.5533 9 13.001 8.55229 13.001 8C13.001 7.44772 12.5533 7 12.001 7H12Z" fill="#145F91"/>
</svg>
                        <h3>Antes de continuar, precisamos que você leia e concorde com a politica de privacidade.</h3>
                     </div>
</div>
                        <Link to="/cadastro2">
                            <button
                                className="custom-button-modal3"
                                >Continuar</button>
                        </Link>

                                </div>
                </IonContent>
            </IonPage>
        </>
    );
}

export default Simulation4;
