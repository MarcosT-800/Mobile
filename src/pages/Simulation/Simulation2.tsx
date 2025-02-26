import React, { useState } from "react";
import {
    IonButton,
    IonModal,
    IonContent,
    IonPage,
} from "@ionic/react";
import { Link } from "react-router-dom";
import './Simulation2.css';
import ComoAntecipar from "../../components/ComoAntecipar";
import ComoAutorizar from "../../components/ComoAutorizar";

function Simulation2() {
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [checkboxes, setCheckboxes] = useState({ first: false, second: false });

    return (
        <IonPage>
            <IonContent className="sim2-main-content" scrollY>
                <div className="sim2-container">
                    {/* Header Navigation */}
                    <nav className="sim2-nav">
                        <Link to="/simulation1" className="sim2-back-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.3247 6.17496C17.8691 5.71935 17.1304 5.71935 16.6748 6.17496L9.67476 13.175C9.21915 13.6306 9.21915 14.3693 9.67476 14.8249L16.6748 21.8249C17.1304 22.2805 17.8691 22.2805 18.3247 21.8249C18.7803 21.3693 18.7803 20.6306 18.3247 20.175L12.1496 13.9999L18.3247 7.82488C18.7803 7.36926 18.7803 6.63057 18.3247 6.17496Z" fill="#D70404" />
                            </svg>
                        </Link>
                    </nav>

                    {/* Header Content */}
                    <div className="sim2-header">
                        <h3 className="sim2-title slide-in">Simular contratação</h3>
                        <p className="sim2-subtitle fade-in">Para simular a oferta de saque-aniversário do FGTS siga o passo a passo abaixo:</p>
                    </div>

                    {/* Checklist Cards */}
                    <div className="sim2-checklist">
                        <div className={`sim2-card ${checkboxes.first ? 'checked' : ''}`}>
                            <div className="sim2-card-content">
                                <h3>Habilite o saque-aniversário no app FGTS</h3>
                                <p>Ao finalizar marque a caixinha ao lado.</p>
                                <button className="sim2-help-btn" onClick={() => setOpenModal2(true)}>
                                    Como habilitar?
                                    <span className="sim2-help-icon">?</span>
                                </button>
                            </div>
                            <label className="sim2-checkbox">
                                <input 
                                    type="checkbox"
                                    checked={checkboxes.first}
                                    onChange={() => setCheckboxes(prev => ({...prev, first: !prev.first}))}
                                />
                                <span className="sim2-checkmark"></span>
                            </label>
                        </div>

                        <div className={`sim2-card ${checkboxes.second ? 'checked' : ''}`}>
                            <div className="sim2-card-content">
                                <h3>Autorize a PH Negócios no seu app do FGTS</h3>
                                <p>Ao finalizar marque a caixinha ao lado.</p>
                                <button className="sim2-help-btn" onClick={() => setOpenModal(true)}>
                                    Como habilitar?
                                    <span className="sim2-help-icon">?</span>
                                </button>
                            </div>
                            <label className="sim2-checkbox">
                                <input 
                                    type="checkbox"
                                    checked={checkboxes.second}
                                    onChange={() => setCheckboxes(prev => ({...prev, second: !prev.second}))}
                                />
                                <span className="sim2-checkmark"></span>
                            </label>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="sim2-action">
                        <Link to="/simulation3">
                            <button className={`sim2-submit-btn ${checkboxes.first && checkboxes.second ? 'active pulse' : ''}`}>
                                Simular
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Modals */}
                <IonModal 
                    isOpen={openModal} 
                    onDidDismiss={() => setOpenModal(false)} 
                    className="sim2-modal" 
                    initialBreakpoint={1} 
                    breakpoints={[0, 1]}
                >
                    <ComoAutorizar />
                    <IonButton 
                        onClick={() => setOpenModal(false)} 
                        expand="block" 
                        color="danger" 
                        className="sim2-modal-btn"
                    >
                        Fechar
                    </IonButton>
                </IonModal>

                <IonModal 
                    isOpen={openModal2} 
                    onDidDismiss={() => setOpenModal2(false)} 
                    className="sim2-modal" 
                    initialBreakpoint={1} 
                    breakpoints={[0, 1]}
                >
                    <ComoAntecipar />
                    <IonButton 
                        onClick={() => setOpenModal2(false)} 
                        expand="block" 
                        color="danger" 
                        className="sim2-modal-btn"
                    >
                        Fechar
                    </IonButton>
                </IonModal>
            </IonContent>
        </IonPage>
    );
}

export default Simulation2;