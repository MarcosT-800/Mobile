import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonToast } from '@ionic/react';
import { Link } from 'react-router-dom';

const Loading3 = () => {
  const [url, setUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const dadosUsuario = localStorage.getItem("linkContracao");

    if (dadosUsuario) {
      const parsedData = JSON.parse(dadosUsuario);
      if (parsedData.url) {
        setUrl(parsedData.url);
      }
      if (parsedData.message) {
        setToastMessage(parsedData.message);
        setShowToast(true);
      } else {
        setErrorMessage('Algo deu errado. Por favor, tente mais tarde.');
      }
    } else {
      setErrorMessage('Dados não encontrados no localStorage.');
    }
  }, []);

  return (
    <>
      <IonPage>
        <IonContent className="custom-dash-content" scrollY>
          <div className="custom-content">
            <img src="/PHlogo.png" alt="Logo" />
            <h3>Aguarde um momento estamos gerando sua proposta!</h3>

            {url ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <p>Proposta enviada! Clique no link para finalizar a proposta!:</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="styled-link">
                  Clique aqui para acessar
                </a>
              </div>
            ) : errorMessage ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <p style={{ color: "red" }}>Erro: {errorMessage}</p>
                <p style={{ color: "red" }}>Algo deu errado no seu cadastro, por favor entre em contato ou tente mais tarde!</p>
                <Link className="link" to="/dashboard">
                  <button className="custom-button-modal1">
                    <a>Tentar novamente</a>
                  </button>
                </Link>
              </div>
            ) : (
              <svg className="spinner" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="loading">
                  <g id="Group">
                    <path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M23.4534 0.0030281C23.3276 0.00101193 23.2015 0 23.0751 0C10.3311 0 0 10.2975 0 23C0 35.7025 10.3311 46 23.0751 46C34.9237 46 44.6865 37.0988 46 25.6393H40.8079C39.531 34.3293 32.0445 41 23 41C13.0589 41 5 32.9411 5 23C5 13.0589 13.0589 5 23 5C23.1516 5 23.3027 5.00187 23.4534 5.0056V0.0030281Z" fill="#D70404" />
                  </g>
                </g>
              </svg>
            )}
          </div>
          <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message={toastMessage} duration={3000} />
        </IonContent>
      </IonPage>
    </>
  );
}

export default Loading3;
