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
} from "@ionic/react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ModalButton from "../../components/Buttons/Button";
import { Link } from "react-router-dom";
import './Loading2.css';
function Loading2() {
    const modal = useRef<HTMLIonModalElement>(null);
    const [user_login, setUser_login] = useState("");
    const [user_pass, setUser_pass] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(""); 
        useEffect(() => {
            setTimeout(function() {
                window.location.replace('/loading3');
              }, 5000);
        }); 

    return (
        <>
            <IonPage>
                <IonContent className="custom-dash-content" scrollY>
                    <div className="custom-content">
                        <img src="/PHlogo.png" />
                        <h3>Sua proposta está sendo enviada para o banco futuro, não feche o App</h3>

                        <svg className="spinner" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="loading2">
                                <g id="Group">
                                    <path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M23.4534 0.0030281C23.3276 0.00101193 23.2015 0 23.0751 0C10.3311 0 0 10.2975 0 23C0 35.7025 10.3311 46 23.0751 46C34.9237 46 44.6865 37.0988 46 25.6393H40.8079C39.531 34.3293 32.0445 41 23 41C13.0589 41 5 32.9411 5 23C5 13.0589 13.0589 5 23 5C23.1516 5 23.3027 5.00187 23.4534 5.0056V0.0030281Z" fill="#D70404" />
                                </g>
                            </g>
                        </svg>

                    </div>
                </IonContent>
            </IonPage>
        </>
    );
}

export default Loading2;
