import React from "react";
import {
    IonContent,
    IonPage,
} from "@ionic/react";
import { Link } from "react-router-dom";
import './Simulation1.css';

function Simulation1() {
    return (
        <IonPage>
            <IonContent className="custom-dash-content" scrollY>
                {/* Header Navigation */}
                <nav className="custom-simulation1-navbar">
                    <Link to="/dashboard" className="back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.3247 6.17496C17.8691 5.71935 17.1304 5.71935 16.6748 6.17496L9.67476 13.175C9.21915 13.6306 9.21915 14.3693 9.67476 14.8249L16.6748 21.8249C17.1304 22.2805 17.8691 22.2805 18.3247 21.8249C18.7803 21.3693 18.7803 20.6306 18.3247 20.175L12.1496 13.9999L18.3247 7.82488C18.7803 7.36926 18.7803 6.63057 18.3247 6.17496Z" fill="#D70404" />
                        </svg>
                    </Link>
                    <h3 className="fade-in">Saque Aniversário FGTS</h3>
                </nav>

                {/* Hero Section */}
                {/* <div className="hero-section">
                    <img src="/Simulation1-card.png" className="custom-simulation1-img slide-in" alt="FGTS Card" />
                </div> */}

                {/* How it Works Section */}
                <div className="how-it-works-section">
                    <h3 className="custom-simulation1-comofunciona fade-in">Como funciona?</h3>

                    <div className="custom-simulation1-steps">
                        <ol className="styled-list">
                            <li className="step-item slide-in">
                                <div className="step-number-container">
                                    <span className="step-number">1</span>
                                </div>
                                <div className="step-content">
                                    <strong>Ser maior de idade</strong>
                                    <p>É necessário ter 18 anos ou mais para realizar a antecipação. Se você ainda não atingiu a maioridade, aguarde até completar 18 anos para poder utilizar este serviço.</p>
                                </div>
                            </li>
                            <li className="step-item slide-in">
                                <div className="step-number-container">
                                    <span className="step-number">2</span>
                                </div>
                                <div className="step-content">
                                    <strong>Informar uma conta corrente</strong>
                                    <p>Você precisa fornecer os dados de uma conta pix para receber o valor. A conta pix deve estar no seu nome e ser válida para o recebimento de transferências bancárias.</p>
                                </div>
                            </li>
                            <li className="step-item slide-in">
                                <div className="step-number-container">
                                    <span className="step-number">3</span>
                                </div>
                                <div className="step-content">
                                    <strong>Autorizar consulta ao saldo FGTS</strong>
                                    <p>Permita que o sistema consulte seu saldo disponível no FGTS. A consulta será realizada de forma segura e você poderá visualizar o valor disponível para antecipação.</p>
                                </div>
                            </li>
                            <li className="step-item slide-in">
                                <div className="step-number-container">
                                    <span className="step-number">4</span>
                                </div>
                                <div className="step-content">
                                    <strong>Fazer a simulação aqui no APP</strong>
                                    <p>Realize a simulação para saber os valores e condições da antecipação. A simulação oferece uma estimativa precisa dos valores que você pode antecipar, além das condições e prazos para pagamento.</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>

                {/* Action Button */}
                <div className="custom-button-content fade-in" style={{textAlign: 'center'}}>
                    <Link className="link" to="/simulation2">
                        <button className="custom-button-modal1 pulse">
                            Simular
                        </button>
                    </Link>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Simulation1;