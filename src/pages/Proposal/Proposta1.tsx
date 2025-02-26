import React, { useEffect, useRef, useState } from "react";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import './Proposta1.css';
import { Link } from "react-router-dom";

function Proposta1() {
    const [propostas, setPropostas] = useState([]);
    const [cliente, setCliente] = useState("");
    const [timelines, setTimelines] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState(() => {
        return JSON.parse(localStorage.getItem('dadosUsuario') || '{}') || { pessoa_cpf: '' };
    });

    const cpf = formData.pessoa_cpf;

    useEffect(() => {
        const fetchProposta = async () => {
            try {
                const response = await fetch(`https://phapp.phng.com.br/api/propostaCpf/${cpf}`, { method: "GET" });
                if (response.ok) {
                    const data = await response.json();
                    setCliente(data.cliente);
                    setPropostas(data.propostas);
                    setIsLoading(false);
                    console.log("mostrando...");

                    const timelinePromises = data.propostas.map((proposta) => propostaDetail(proposta.hash));
                    await Promise.all(timelinePromises);
                } else {
                    console.error("Erro ao buscar propostas.");
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };

        fetchProposta();
    }, [cpf]);

    const propostaDetail = async (idProposta) => {
        try {
            const response = await fetch(`https://phapp.phng.com.br/api/propostaStatus2/${idProposta}`);
            const data = await response.json();
            if (response.ok && data?.resposta?.resposta?.timeline) {
                const timelineData = data.resposta.resposta.timeline;
                if (Array.isArray(timelineData) && timelineData.length > 0) {
                    setTimelines((prevTimelines) => ({
                        ...prevTimelines,
                        [idProposta]: timelineData,
                    }));
                    console.log(`Timeline da proposta ${idProposta}:`, timelineData);
                }
            } else {
                console.error("Erro ao obter os detalhes da proposta:", data);
            }
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
        }
    };

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

    return (
        <IonPage>
            <IonContent scrollY>
                <div className="custom-proposta1-content">
                    <nav className="custom-proposta1-navbar">
                        <Link to="/dashboard">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M12.9422 15.8078C13.0003 15.8659 13.0463 15.9348 13.0777 16.0107C13.1092 16.0866 13.1254 16.1679 13.1254 16.25C13.1254 16.3321 13.1092 16.4135 13.0777 16.4893C13.0463 16.5652 13.0003 16.6341 12.9422 16.6922C12.8841 16.7503 12.8152 16.7963 12.7393 16.8278C12.6634 16.8592 12.5821 16.8754 12.5 16.8754C12.4179 16.8754 12.3366 16.8592 12.2607 16.8278C12.1848 16.7963 12.1159 16.7503 12.0578 16.6922L5.80782 10.4422C5.74971 10.3842 5.70361 10.3152 5.67215 10.2393C5.6407 10.1635 5.62451 10.0821 5.62451 10C5.62451 9.91788 5.6407 9.83655 5.67215 9.76067C5.70361 9.6848 5.74971 9.61587 5.80782 9.55782L12.0578 3.30782C12.1751 3.19055 12.3342 3.12466 12.5 3.12466C12.6659 3.12466 12.8249 3.19055 12.9422 3.30782C13.0595 3.4251 13.1254 3.58416 13.1254 3.75001C13.1254 3.91586 13.0595 4.07492 12.9422 4.1922L7.1336 10L12.9422 15.8078Z" fill="#878787" />
                                </svg>
                            </button>
                        </Link>
                        <h3>Proposta</h3>
                    </nav>

                    <div className="custom-proposta1-navbar" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                        <h4 style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', fontSize: '28px' }}>Meus contratos</h4>
                    </div>

                    <p className="custom-proposta1-describe">Visualize todos os seus contratos aqui e acompanhe os seus status.</p>
                    {propostas.map((proposta, index) => (
                        <div key={proposta.hash} className="proposal-card">
                            <div className="proposal-logo">
                                <img src="/logophtech.png" alt="Logo Empresa" className="company-logo" />
                            </div>
                            <div className="proposal-header">
                                <div className="proposal-title-wrapper" style={{ display: "flex", alignItems: "center" }}>
                                    <img src="/bolo.png" className="cake-icon" style={{ marginRight: '8px', width: '20px', fontSize: '24px' }} />
                                    <h3 className="proposal-title" style={{ margin: 0 }}>Antecipação Saque Aniversário FGTS</h3>
                                </div>
                                <div className="proposal-value-box">
                                    <span className="proposal-value-label">Valor Liberado</span>
                                    <span className="proposal-value">
                                        R$ {parseFloat(proposta.valorLiquido).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                            <div className="proposal-details">
                                <div className="proposal-info" style={{ textAlign: 'center' }}>
                                    <span className="proposal-info-label">Data Proposta</span>
                                    <span className="proposal-info-value" style={{ fontSize: '12px' }}>
                                        {new Date(proposta.data).toLocaleDateString("pt-BR")}
                                    </span>
                                </div>
                                <div className="proposal-info" style={{ textAlign: 'center' }}>
                                    <span className="proposal-info-label">Status</span>
                                    <span className="proposal-info-value" style={{ fontSize: '12px' }}>{proposta.status}</span>
                                </div>
                            </div>

                            {timelines[proposta.hash] && timelines[proposta.hash].length > 0 ? (
                                <div className="proposal-timeline">
                                    {timelines[proposta.hash]
                                        .filter(item => ["Rascunho", "Assinatura", "Encerrado"].includes(item.name))
                                        .map((item, idx) => (
                                            <div key={idx} className="timeline-step">
                                                <div className="timeline-step-marker">
                                                    <div className={`step-indicator ${item.createdAt ? 'active' : ''}`}>
                                                        {item.createdAt && (
                                                            <svg className="step-check" viewBox="0 0 24 24">
                                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    {idx < 2 && <div className="timeline-step-line"></div>}
                                                </div>
                                                <div className="timeline-step-content">
                                                    <span className="step-name">
                                                        {item.name === "Rascunho" ? "Simulação" : item.name === "Encerrado" ? "Pago" : item.name}
                                                    </span>
                                                    <span className="step-date">
                                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString("pt-BR") : "Pendente"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <p className="no-timeline">Sem timeline disponível</p>
                            )}

                            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                <a href={`/proposta-detalhes/${proposta.hash}`}>
                                    <button
                                        style={{
                                            backgroundColor: "#d32f2f",
                                            color: "#fff",
                                            border: "none",
                                            padding: "10px 16px",
                                            borderRadius: "6px",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            transition: "0.3s",
                                            textWrap: "nowrap",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = "#b71c1c"}
                                        onMouseOut={(e) => e.target.style.backgroundColor = "#d32f2f"}
                                    >
                                        Detalhes
                                    </button>
                                </a>
                            </div>
                        </div>
                    ))}

                    <Link to="/simulation3">
                        <button className="custom-button-modal3">Quero Simular</button>
                    </Link>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Proposta1;