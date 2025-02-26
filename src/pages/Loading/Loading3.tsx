import React, { useEffect, useRef, useState } from "react";
import {
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonInput,
    IonItem,
    IonToast,
} from "@ionic/react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ModalButton from "../../components/Buttons/Button";
import { Link } from "react-router-dom";
import './Loading3.css';
import { useHistory } from "react-router-dom";

function Loading3() {
    const modal = useRef<HTMLIonModalElement>(null);
    const [user_login, setUser_login] = useState("");
    const [user_pass, setUser_pass] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [userData, setUserData] = useState<any>(null);
    const [editedData, setEditedData] = useState<any>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    // Estados para o loader interativo
    const [contador, setContador] = useState(0);
    const [mensagemAtual, setMensagemAtual] = useState(0);
    const [pontos, setPontos] = useState('');

    const mensagens = [
        "Seus dados estão sendo enviados para o banco, por favor aguarde!",
        "Estamos processando sua solicitação, só mais um momento...",
        "Quase lá! Finalizando o registro dos seus dados...",
        "Verificando a integridade das informações enviadas...",
        "Concluindo o processo, não vai demorar!"
    ];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const dadosUsuario = localStorage.getItem("dadosUsuario");
                localStorage.removeItem("simulationData");

                // Iniciar os intervalos para animação do loader
                const intervaloMensagem = setInterval(() => {
                    setMensagemAtual((prev) => (prev + 1) % mensagens.length);
                }, 3000);

                const intervaloPontos = setInterval(() => {
                    setPontos((prev) => prev.length < 3 ? prev + '.' : '');
                }, 500);

                const intervaloContador = setInterval(() => {
                    setContador((prev) => {
                        // Se chegar a 100%, limpar os intervalos
                        if (prev >= 99) {
                            clearInterval(intervaloContador);
                            clearInterval(intervaloMensagem);
                            clearInterval(intervaloPontos);
                        }
                        return Math.min(prev + 1, 100);
                    });
                }, 150);

                const response = await fetch("https://phapp.phng.com.br/api/verificarPessoa", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify({ dadosUsuario }),
                });
                
                if (response.ok) {
                    const data = await response.json();
                    // Salve os dados no localStorage
                    localStorage.setItem("formData", JSON.stringify(data));
                    localStorage.setItem("message", JSON.stringify("Bem vindo de volta!, encontramos o seu cadastro aqui, apenas confirme se todos os dados estão corretos!"));
                    
                    // Garantir que o contador chegue a 100% antes de redirecionar
                    if (contador < 100) {
                        const completarContador = setInterval(() => {
                            setContador((prev) => {
                                const novoValor = prev + 5;
                                if (novoValor >= 100) {
                                    clearInterval(completarContador);
                                    history.push("/cadastro1");
                                }
                                return Math.min(novoValor, 100);
                            });
                        }, 100);
                    } else {
                        history.push("/cadastro1");
                    }
                    
                    if (data.success) {
                        setUserData(data);
                        setEditedData({ ...data }); // Inicializa com uma cópia dos dados
                        setShowModal(true);
                    }
                } else {
                    // Garantir que o contador chegue a 100% antes de redirecionar
                    if (contador < 100) {
                        const completarContador = setInterval(() => {
                            setContador((prev) => {
                                const novoValor = prev + 5;
                                if (novoValor >= 100) {
                                    clearInterval(completarContador);
                                    localStorage.setItem("message", JSON.stringify("Identificamos que você é novo por aqui, vamos iniciar o seu cadastro!"));
                                    history.push("/cadastro1");
                                }
                                return Math.min(novoValor, 100);
                            });
                        }, 100);
                    } else {
                        localStorage.setItem("message", JSON.stringify("Identificamos que você é novo por aqui, vamos iniciar o seu cadastro!"));
                        history.push("/cadastro1");
                    }
                    
                    console.log("Usuário não encontrado no banco");
                    throw new Error("Usuário não encontrado no banco!");
                }
            } catch (error) {
                setErrorMessage("Usuário não encontrado no banco!");
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <IonPage>
                <IonContent className="custom-dash-content" scrollY>
                    <div className="custom-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: 'white', height: '100%' }}>
                        {/* Ícone do banco */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="97" height="91" viewBox="0 0 97 91" fill="none">
                            <path d="M12.125 79.625H84.875M24.25 68.25V37.9167M40.4167 68.25V37.9167M56.5833 68.25V37.9167M72.75 68.25V37.9167M80.8333 26.5417L50.2137 8.58812C49.592 8.22361 49.2811 8.04135 48.9478 7.97029C48.653 7.90745 48.347 7.90745 48.0522 7.97029C47.7189 8.04135 47.408 8.22361 46.7863 8.58812L16.1667 26.5417H80.8333Z" stroke="#D70404" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        
                        {/* Barra de progresso */}
                        <div style={{ width: '100%', marginTop: '1.5rem', marginBottom: '1rem' }}>
                            <div style={{ height: '8px', backgroundColor: '#f1f1f1', borderRadius: '999px', overflow: 'hidden' }}>
                                <div 
                                    style={{ 
                                        height: '100%', 
                                        width: `${contador}%`, 
                                        backgroundColor: '#D70404',
                                        transition: 'width 0.3s ease-out'
                                    }} 
                                />
                            </div>
                            <div style={{ marginTop: '0.5rem', textAlign: 'right', fontSize: '0.875rem', color: '#666' }}>
                                {contador}%
                            </div>
                        </div>
                        
                        {/* Mensagem interativa */}
                        <h3 style={{ textAlign: 'center', margin: '1rem 0', color: '#333', fontWeight: '500' }}>
                            {mensagens[mensagemAtual]}{pontos}
                        </h3>
                        
                        {/* Indicadores de mensagem */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', margin: '1rem 0' }}>
                            {mensagens.map((_, index) => (
                                <div 
                                    key={index}
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: mensagemAtual === index ? '#D70404' : '#e0e0e0'
                                    }}
                                />
                            ))}
                        </div>
                        
                        {/* Spinner animado */}
                        <div style={{ position: 'relative', width: '46px', height: '46px' }}>
                             {/* Novo Spinner SVG */}
                        <div style={{ position: 'relative', width: '60px', height: '60px', margin: '1rem 0' }}>
                            {/* Spinner animado */}
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                                animation: 'rotate 1.5s linear infinite',
                            }}>
                                {/* Círculo de fundo */}
                                <circle cx="30" cy="30" r="25" stroke="#f0f0f0" strokeWidth="5" />
                                
                                {/* Arco animado */}
                                <path 
                                    d="M30 5 A25 25 0 0 1 55 30" 
                                    stroke="#D70404" 
                                    strokeWidth="5" 
                                    strokeLinecap="round" 
                                />
                            </svg>
                            
                            {/* Símbolo de conclusão */}
                            {contador >= 100 && (
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '50%', 
                                    left: '50%', 
                                    transform: 'translate(-50%, -50%)',
                                    color: '#D70404',
                                    fontSize: '2rem',
                                    fontWeight: 'bold'
                                }}>
                                    ✓
                                </div>
                            )}
                        </div>

                        <style>
                            {`
                                @keyframes rotate {
                                    0% { transform: rotate(0deg); }
                                    100% { transform: rotate(360deg); }
                                }
                            `}
                        </style>
                            {contador >= 100 && (
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '50%', 
                                    left: '50%', 
                                    transform: 'translate(-50%, -50%)',
                                    color: '#D70404',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1.4rem'
                                }}>
                                    
                                </div>
                            )}
                        </div>
                        
                        {/* Mensagem de aviso */}
                        <p style={{ 
                            marginTop: '1.5rem', 
                            marginBottom: '1.5rem',
                            fontSize: '0.875rem', 
                            color: contador >= 100 ? '#D70404' : '#666',
                            fontWeight: contador >= 100 ? '500' : 'normal'
                        }}>
                            {contador >= 100 ? 'Processo concluído com sucesso!' : 'Por favor, não feche esta página'}
                        </p>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
}

export default Loading3;