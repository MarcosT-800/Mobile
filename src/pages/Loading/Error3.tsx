import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonToast, IonButton } from "@ionic/react";
import './Loading2.css';
import { Link } from "react-router-dom";

function Loading2() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);
    const [detailError, setDetailError] = useState<string | null>(null);
    const [message2, setMessage2] = useState<string | null>(null);

    useEffect(() => {
        // Simula um carregamento por 2 segundos antes de exibir a mensagem de erro
        setTimeout(() => {
            setShowSpinner(false);

            // Recupera os dados do localStorage
            const errorData = localStorage.getItem("erroSimulacao");

            if (errorData) {
                try {
                    const parsedError = JSON.parse(errorData);
                    const parsedErrorDetail = JSON.parse(errorData);
                    if (!parsedError.success && parsedError.message?.message) {
                        setErrorMessage(parsedError.message.message);
                        setDetailError(parsedErrorDetail.message.details.reason);
                        setShowToast(true);
                        const code2 = parsedError.message.details.code;
                        const setMessage2 = parsedError.message.message;
                    }

                    /* TRATAMENTO DO ERRO 665 NÃO HÁ PARCELAS DISPONÍVEIS PARA ANTECIPAÇÃO */



                } catch (error) {
                    console.error("Erro ao processar JSON do localStorage:", error);
                }
            }
        }, 2000);
    }, []);


    return (
        <>
            <IonPage>
                <IonContent className="custom-dash-content" scrollY>
                    <nav className="custom-simulation3-navbar">
                        <Link to="/simulation3">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18.3247 6.17496C17.8691 5.71935 17.1304 5.71935 16.6748 6.17496L9.67476 13.175C9.21915 13.6306 9.21915 14.3693 9.67476 14.8249L16.6748 21.8249C17.1304 22.2805 17.8691 22.2805 18.3247 21.8249C18.7803 21.3693 18.7803 20.6306 18.3247 20.175L12.1496 13.9999L18.3247 7.82488C18.7803 7.36926 18.7803 6.63057 18.3247 6.17496Z"
                                        fill="#D70404"
                                    />
                                </svg>
                            </button>
                        </Link>
                    </nav>
                    <div className="custom-content">
                        <img src="/404-1.png" style={{ marginTop: '-200px'}}/>

                        {showSpinner ? (
                            <svg className="spinner" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="loading2">
                                    <g id="Group">
                                        <path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M23.4534 0.0030281C23.3276 0.00101193 23.2015 0 23.0751 0C10.3311 0 0 10.2975 0 23C0 35.7025 10.3311 46 23.0751 46C34.9237 46 44.6865 37.0988 46 25.6393H40.8079C39.531 34.3293 32.0445 41 23 41C13.0589 41 5 32.9411 5 23C5 13.0589 13.0589 5 23 5C23.1516 5 23.3027 5.00187 23.4534 5.0056V0.0030281Z" fill="#D70404" />
                                    </g>
                                </g>
                            </svg>
                        ) : (
                            <>
                                <h3 style={{ color: "#a00", fontSize: "24px", marginTop: 20 }}>
                                    Ocorreu um erro em nosso sistema tente novamente mais tarde!
                                </h3>

                                {errorMessage && (
                                    <div style={{
                                        backgroundColor: "#ffcccc",
                                        padding: "15px",
                                        borderRadius: "10px",
                                        color: "#a00",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        maxWidth: "80%",
                                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                                        marginTop: 10
                                    }}>
                                        {message2}
                                    </div>
                                )}

                                <Link to="/simulation3">
                                    <button
                                        className="custom-button-modal1"

                                        style={{ marginTop: 20, fontSize: "16px", fontWeight: "bold" }}
                                    >
                                        Tentar novamente
                                    </button>
                                </Link>
                            </>
                        )}

                        {/* Toast para exibir a mensagem de erro */}
                        <IonToast
                            isOpen={showToast}
                            onDidDismiss={() => setShowToast(false)}
                            message={errorMessage}
                            duration={4000}
                            color="danger"
                        />
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
}

export default Loading2;
