import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonBackButton, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { useParams, useHistory, Link } from "react-router-dom";
import './PropostaDetalhes.css';

function PropostaDetalhes() {
    const { hash } = useParams();
    const history = useHistory();
    const [selectedProposta, setSelectedProposta] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [link, setLink] = useState('');
    const [activeTab, setActiveTab] = useState("detalhes");

    const propostaDetail2 = async (idProposta) => {
        try {
            const response = await fetch(`https://phapp.phng.com.br/api/propostaStatus2/${idProposta}`);
            const data = await response.json();
            if (response.ok) {
                const linkData = JSON.parse(data.link);
                const propostaLink = linkData.resposta[0]?.url;
                return {
                    proposta: data.resposta.resposta,
                    link: propostaLink,
                    timeline: data.resposta.resposta.timeline || [],
                };
            } else {
                console.error("Erro ao obter os detalhes da proposta:", data);
                throw new Error("Erro na resposta da API");
            }
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
            throw error;
        }
    };

    useEffect(() => {
        if (hash) {
            propostaDetail2(hash).then(data => {
                setSelectedProposta(data.proposta);
                setTimeline(data.timeline);
                setLink(data.link);
            }).catch(err => {
                console.error("Erro ao carregar detalhes:", err);
            });
        }
    }, [hash]);

    const closePage = () => {
        history.goBack();
    };

    return (
        <IonPage>
            <IonContent className="proposta-detalhes-content">
                <div className="block2">
                    <nav className="custom-proposta1-navbar">
                        <Link to="/proposta1">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M12.9422 15.8078C13.0003 15.8659 13.0463 15.9348 13.0777 16.0107C13.1092 16.0866 13.1254 16.1679 13.1254 16.25C13.1254 16.3321 13.1092 16.4135 13.0777 16.4893C13.0463 16.5652 13.0003 16.6341 12.9422 16.6922C12.8841 16.7503 12.8152 16.7963 12.7393 16.8278C12.6634 16.8592 12.5821 16.8754 12.5 16.8754C12.4179 16.8754 12.3366 16.8592 12.2607 16.8278C12.1848 16.7963 12.1159 16.7503 12.0578 16.6922L5.80782 10.4422C5.74971 10.3842 5.70361 10.3152 5.67215 10.2393C5.6407 10.1635 5.62451 10.0821 5.62451 10C5.62451 9.91788 5.6407 9.83655 5.67215 9.76067C5.70361 9.6848 5.74971 9.61587 5.80782 9.55782L12.0578 3.30782C12.1751 3.19055 12.3342 3.12466 12.5 3.12466C12.6659 3.12466 12.8249 3.19055 12.9422 3.30782C13.0595 3.4251 13.1254 3.58416 13.1254 3.75001C13.1254 3.91586 13.0595 4.07492 12.9422 4.1922L7.1336 10L12.9422 15.8078Z" fill="#878787" />
                                </svg>
                            </button>
                        </Link>
                    </nav>

                    <h3>Detalhes da Proposta</h3>

                    <div className="tabs" style={{ textAlign: 'center' }}>
                        <button
                            onClick={() => setActiveTab("detalhes")}
                            style={{ textWrap: 'nowrap' }}
                            className={activeTab === "detalhes" ? "active" : ""}
                        >
                            Detalhes
                        </button>
                        <button
                            onClick={() => setActiveTab("timeline")}
                            style={{ textWrap: 'nowrap' }}
                            className={activeTab === "timeline" ? "active" : ""}
                        >
                            Status
                        </button>
                        <button
                            onClick={() => setActiveTab("link")}
                            style={{ textWrap: 'nowrap' }}
                            className={activeTab === "link" ? "active" : ""}
                        >
                            Proposta
                        </button>
                    </div>

                    {selectedProposta ? (
                        <div className="proposal-details-wrapper">
                            {activeTab === "detalhes" && (
                                <div className="proposal-details-card">
                                    <div className="details-header">
                                        <h3 className="details-title">Informações da Proposta</h3>
                                    </div>
                                    <div className="details-body">
                                        <div className="detail-row">
                                            <span className="detail-label">Operação</span>
                                            <span className="detail-value">{selectedProposta.creditNoteNo || "N/A"}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Valor Solicitado</span>
                                            <span className="detail-value">
                                                {selectedProposta.amortization.initialValue
                                                    ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(selectedProposta.amortization.initialValue / 100)
                                                    : "N/A"}
                                            </span>
                                        </div>
                                        <div className="detail-row highlight">
                                            <span className="detail-label">Valor Liberado</span>
                                            <span className="detail-value">
                                                {selectedProposta.amortization.liquidValue
                                                    ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(selectedProposta.amortization.liquidValue / 100)
                                                    : "N/A"}
                                            </span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Antecipações Solicitadas</span>
                                            <span className="detail-value">{selectedProposta.amortization.termInMonths ?? "N/A"} meses</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Status</span>
                                            <span className="detail-value status">{selectedProposta.statusDisplay ?? "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "timeline" && (
                                <div className="chrono-container">
                                    {timeline.map((item, index) => (
                                        <div key={index} className="chrono-item">
                                            <div className="chrono-marker">
                                                <div className={`chrono-dot ${item.createdAt ? 'active' : ''}`}>
                                                    {item.createdAt && (
                                                        <svg className="chrono-check" viewBox="0 0 24 24">
                                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                {index < timeline.length - 1 && <div className="chrono-line"></div>}
                                            </div>
                                            <div className="chrono-content">
                                                <h4>{item.name}</h4>
                                                <p className="chrono-date">
                                                    {item.createdAt ? new Date(item.createdAt).toLocaleString("pt-BR") : "Pendente"}
                                                </p>
                                                <p className="chrono-description">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "link" && link && (
                                <div className="link-container">
                                    <h4 className="link-title">Proposta</h4>
                                    <a href={link} className="link-button" target="_blank" rel="noopener noreferrer">
                                        Clique aqui para acessar
                                    </a>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Carregando detalhes...</p>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default PropostaDetalhes;