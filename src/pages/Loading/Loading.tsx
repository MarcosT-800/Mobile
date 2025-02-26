import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonToast } from "@ionic/react";
import { Link } from "react-router-dom";
import './Loading.css';

function Loading() {
  const [userData, setUserData] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [url, setUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingText, setLoadingText] = useState('Analisando seus dados...');

  const loadingTexts = [
    "Analisando seus dados...",
    "Calculando valores disponíveis...",
    "Preparando sua proposta personalizada...",
    "Quase lá! Finalizando os detalhes..."
  ];

  useEffect(() => {
    handleSubmit();
    
    const textInterval = setInterval(() => {
      setLoadingText(current => {
        const currentIndex = loadingTexts.indexOf(current);
        return loadingTexts[(currentIndex + 1) % loadingTexts.length];
      });
    }, 3000);

    return () => clearInterval(textInterval);
  }, []);
  

  const handleSubmit = async () => {
    const storedData = JSON.parse(localStorage.getItem("hash_person") || "{}");
    const personId = storedData.hash_pessoa;

    try {
      const response = await fetch("https://phapp.phng.com.br/api/inserirOperacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ person_Id: personId }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar dados para o backend");
      }

      const responseData = await response.json();
      setUrl(responseData.hash_link);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setErrorMessage("Erro ao enviar os dados. Tente novamente.");
    }
  };

  return (
    <IonPage>
      <IonContent>
        {!url && !errorMessage && (
          <div className="loading-container">
            <div className="loading-content">
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
              
              <h2 className="loading-title">Gerando sua proposta</h2>
              <p className="loading-text">{loadingText}</p>
              
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>

              <div className="info-container">
                <div className="info-item">
                  <span className="info-icon">✨</span>
                  <p>Dinheiro disponível em 24h após aprovação</p>
                </div>
                <div className="info-item">
                  <span className="info-icon">🔒</span>
                  <p>Processo 100% seguro e aprovado</p>
                </div>
                <div className="info-item">
                  <span className="info-icon">💳</span>
                  <p>Sem consulta ao SPC/Serasa</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {url && (
          <div className="success-container">
            <div className="success-content">
              <div className="success-icon">
                <div className="checkmark"></div>
              </div>
              
              <h2 className="success-title">Proposta Gerada!</h2>
              <p className="success-text">Clique no botão abaixo para visualizar e assinar sua proposta</p>
              
              <a href={url} className="success-button">
                <span>Visualizar Proposta</span>
                <svg className="arrow-icon" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </a>

              <div className="success-info">
                <p>⚡ Assine sua proposta em até 24h para garantir as condições</p>
                <p>Precisa de ajuda? Entre em contato com nosso suporte</p>
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="error-container">
            <div className="error-content">
              <h2 className="error-title">Ops! Algo deu errado</h2>
              <p className="error-text">{errorMessage}</p>
              <button onClick={handleSubmit} className="retry-button">
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
}

export default Loading;