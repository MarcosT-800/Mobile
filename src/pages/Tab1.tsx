import React, { useEffect, useRef } from "react";
import {
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
} from "@ionic/react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import "./main.css";

function Example() {
  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    // Adiciona a classe ao body quando o componente é montado
    document.body.classList.add("backdrop-no-scroll");

    // Abre o modal automaticamente
    if (modal.current) {
      modal.current.present();
    }

    // Remove a classe ao desmontar o componente
    return () => {
      document.body.classList.remove("backdrop-no-scroll");
    };
  }, []); // O array vazio garante que isso aconteça apenas uma vez ao montar

  return (
    <div className="body">

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding body">
          <IonButton id="open-modal" expand="block" className="bg-red-500 text-white hover:bg-red-700">
            Open Sheet Modal
          </IonButton>

          <IonModal
            ref={modal}
            trigger="open-modal"
            initialBreakpoint={1}
            breakpoints={[0, 1]}
          >
            <div className="block content">

                <IonCard className="card">
                  <img alt="Silhouette of mountains" src="/img-get-started.png" />
                </IonCard>

                <h1 className="title">Bem-vindo ao PH Negócios App</h1>
                <p className="subtitle">Antecipe seu FGTS hoje mesmo de forma rápida e simples com a PH Negócios.</p>

                <button className="button">
                  Iniciar
                </button>
            </div>
          </IonModal>
        </IonContent>
      </IonPage>
    </div>
  );
}

export default Example;
