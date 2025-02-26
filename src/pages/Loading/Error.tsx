import React, { useEffect, useRef, useState } from "react";
import { IonPage, IonContent, IonToast, IonButton } from "@ionic/react";
import './Loading2.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"; // Importação do useHistory
import './Error.css';
function Loading2() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);
    const [detailError, setDetailError] = useState<string | null>(null);
    const [path, setPath] = useState();
    const history = useHistory(); // Definir o hook history
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const totalCards = 7; // Número total de cards

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const deltaX = touchStartX.current - touchEndX.current;
        if (deltaX > 50) {
            // Swipe para a esquerda (próximo card)
            setCurrentIndex((prevIndex) => (prevIndex === totalCards - 1 ? 0 : prevIndex + 1));
        } else if (deltaX < -50) {
            // Swipe para a direita (card anterior)
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalCards - 1 : prevIndex - 1));
        }
    };

    useEffect(() => {
        // Simula um carregamento por 2 segundos antes de exibir a mensagem de erro
        setTimeout(() => {
            setShowSpinner(false);
            // Recupera os dados do localStorage
            const errorData = localStorage.getItem("erroSimulacao");
            if (errorData) {
                const parsedError = JSON.parse(errorData);
                const parsedErrorDetail = JSON.parse(errorData);
                try {
                    const parsedError = JSON.parse(errorData);
                    const parsedErrorDetail = JSON.parse(errorData);
                    if (!parsedError.success && parsedError.message?.message) {
                        setErrorMessage(parsedError.message.message);
                        setDetailError(parsedErrorDetail.message.details.reason);
                        setShowToast(true);
                    }
                } catch (error) {
                    console.error("Erro ao processar JSON do localStorage:", error);
                }
            }
        }, 2000);
    }, []);


    useEffect(() => {
        const errorData = localStorage.getItem("erroSimulacao");
        if (errorData) {
            const parsedError = JSON.parse(errorData);
            const parsedErrorDetail = JSON.parse(errorData);

            if (parsedError.message.details.code === 200) {
                console.log(parsedError.message.details.code + "Operação concluida com sucesso");
            }
            else if (parsedError.message.code === "INVALID_AMORTIZATION_QUERY_MINIMUM_PRINCIPAL_FOR_PRODUCT") {
                console.log("Código" + parsedError.message.code + "Mensagem: " + parsedError.message.message);
                history.push("/error3");
            }
            else if (parsedError.message.code === "TOO_MANY_REQUESTS") {
                console.log("Código" + parsedError.message.code + "Mensagem: " + parsedError.message.message);
                history.push("/error7");
            }
            else if (parsedError.message.details.code === 7) {
                console.log("Código" + parsedError.message.details.code + "Mensagem: " + parsedError.message.message);
                history.push("/error");
            }
            else if (parsedError.message.details.code === 665) {
                console.log("Código" + parsedError.message.details.code + "Mensagem: " + parsedError.message.message);
                history.push("/error1");
            }
            else if (parsedError.message.details.code === 10) {
                console.log("Código" + parsedError.message.details.code + "Mensagem: " + parsedError.message.message);
                history.push("/error2");
            }
            else if (parsedError.message.details.code === 9) {
                console.log("Código" + parsedError.message.details.code + "Mensagem: " + parsedError.message.message);
                history.push("/error4");
            }
            else if (parsedError.message.details.code === 35) {
                console.log("Código" + parsedError.message.details.code + "Mensagem: " + parsedError.message.message);
                history.push("/error5");
            }
            else if (parsedError.message.details.code === 404) {
                console.log("Código" + parsedError.message.details.code + "Mensagem: " + parsedError.message.message);
                history.push("/error6");

            }
            else if (parsedError.message.details.code === 5) {
                console.log("Código" + parsedError.message.details.code + "Mensagem: " + parsedError.message.message);
                history.push("/error9");
            }
        }
    }, []);



    return (
        <>
            <IonPage>
                <IonContent className="custom-dash-content" scrollY style={{ height: 'auto' }}>
                    {showSpinner ? (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%'}}>
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
                            <div className="custom-content" style={{ height: 'auto' }}>
                                <img src="/error.png" style={{ marginTop: '20px' }} />
                                <h3 style={{ color: "#111", textAlign: "center", marginTop: '0px', fontSize: '24px', fontStyle: 'normal', fontWeight: '500', lineHeight: 'normal' }}>
                                    UY3 Desabilitada para consultar o seu saldo no seu FGTS.
                                </h3>

                                <p style={{ color: "#838282", textAlign: "center", marginTop: '0px', fontFamily: 'Poppins', fontSize: '16px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', paddingRight: '20px', paddingLeft: '20px' }}> Você ainda não autorizou a UY3 para verificar o seu saldo</p>
                                <div
                                    className="card-carousel"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <div
                                        className="carousel-track"
                                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    >
                                        {[...Array(totalCards)].map((_, index) => (
                                            <div className="carousel-card" key={index}>
                                                <img alt={`Card ${index + 1}`} src={`/${index + 1}.png`} style={{ height: '100%' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                <Link to="/simulation3">
                                    <button
                                        className="custom-button-modal1"

                                        style={{ marginTop: 20, fontSize: "16px", fontWeight: "bold" }}
                                    >
                                        Tentar novamente
                                    </button>
                                </Link>
                            </div>
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
                </IonContent>
            </IonPage>
        </>
    );
}

export default Loading2;