import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonToast, IonButton } from "@ionic/react";
import './Loading2.css';
import { Link } from "react-router-dom";

function Loading2() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);
    const [errorDetails, setErrorDetails] = useState<string | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setShowSpinner(false);
            const errorData = localStorage.getItem("erroSimulacao");

            if (errorData) {
                try {
                    const parsedError = JSON.parse(errorData);

                    if (!parsedError.success && parsedError.message?.message) {
                        setErrorMessage(parsedError.message.message);
                        setErrorDetails(getErrorExplanation(parsedError.message.details.code));
                        setShowToast(true);
                    }
                } catch (error) {
                    console.error("Erro ao processar JSON do localStorage:", error);
                }
            }
        }, 2000);
    }, []);

    function getErrorExplanation(code: number): string {
        switch (code) {
            case 665:
                return `
                Motivos pelos quais você recebeu essa mensagem:
                1️⃣ Você não possui saldo suficiente no FGTS. Verifique seu saldo.
                2️⃣ Nenhuma parcela do Saque-Aniversário está disponível para antecipação.
                3️⃣ O tempo mínimo de carência para antecipação não foi cumprido.
                4️⃣ O valor mínimo para antecipação não foi atingido.
                5️⃣ Divergência nos dados cadastrais (CPF irregular, dados desatualizados, etc.).
                🔹 **Solução**: Acesse o aplicativo do FGTS para verificar detalhes e entre em contato com a Caixa se necessário.`;
            case 500:
                return "Erro interno do sistema. Tente novamente mais tarde.";
            default:
                return "Erro desconhecido. Verifique seus dados e tente novamente.";
        }
    }

    return (
        <IonPage>
            <IonContent className="custom-dash-content" scrollY style={{ heigth: '100vh' }}>

                {showSpinner ? (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%' }}>

                        <svg className="spinner" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="loading2">
                                <g id="Group">
                                    <path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M23.4534 0.0030281C23.3276 0.00101193 23.2015 0 23.0751 0C10.3311 0 0 10.2975 0 23C0 35.7025 10.3311 46 23.0751 46C34.9237 46 44.6865 37.0988 46 25.6393H40.8079C39.531 34.3293 32.0445 41 23 41C13.0589 41 5 32.9411 5 23C5 13.0589 13.0589 5 23 5C23.1516 5 23.3027 5.00187 23.4534 5.0056V0.0030281Z" fill="#D70404" />
                                </g>
                            </g>
                        </svg>
                    </div>

                ) : (
                    <>
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
                        <div className="custom-content" style={{ heigth: 'auto' }}>
                            <img src="/error1atualizado.png" alt="Logo" style={{ marginTop: '350px', width: '250px' }} />

                            <h3 style={{ color: "#111", textAlign: "center", marginTop: '', fontSize: '24px', fontStyle: 'normal', fontWeight: '500', lineHeight: 'normal' }}>
                                Você não possui parcelas disponíveis para antecipar
                            </h3>

                            <p style={{ color: "#838282", textAlign: "center", marginTop: '0px', fontFamily: 'Poppins', fontSize: '16px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', paddingRight: '20px', paddingLeft: '20px' }}>Porque isso acontece?</p>



                            <div className="carousel-card">
                                <img src="8.png" />

                            </div>
                        <Link to="/simulation3">
                            <button color="danger" className="custom-button-modal1" expand="block" style={{ marginTop: 20, fontSize: "16px", fontWeight: "bold" }}>
                                Tentar novamente
                            </button>
                        </Link>
                        </div>

                    </>
                )}

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={errorMessage}
                    duration={4000}
                    color="danger"
                />
            </IonContent>
        </IonPage>
    );
}

export default Loading2;
