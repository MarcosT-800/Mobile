import React, { useRef, useState, useEffect } from "react";
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
    IonLabel,
    IonList,
    IonThumbnail,
    IonSelect,
    IonSelectOption,
} from "@ionic/react";
import InputMask from "react-input-mask"; // Biblioteca para máscara
import { Link, useHistory } from "react-router-dom";
import "./Cadastro2.css";
import "../Simulation/Simulation3.css";

function Cadastro2() {
    const modal = useRef<HTMLIonModalElement>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [genero, setGenero] = useState("Masculino");
    const [estadoCivil, setEstadoCivil] = useState("Solteiro");
    const [cidade, setCidade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [rendaMensal, setRendaMensal] = useState("");
    const [nacionalidade, setNacionalidade] = useState("");
    const [profissao, setProfissao] = useState("");

    const history = useHistory();

    const [formData, setFormData] = useState<any>(() => {
            return JSON.parse(localStorage.getItem('formData') || '{}') || {
                nome: '',
                cpf: '',
                dataNascimento: '',
                genero: '',
                estadoCivil: '',
                cidade: '',
                telefone: '',
                email: '',
                rendaMensal: '',
                nacionalidade: '',
                profissao: ''
            };
        });

         useEffect(() => {
                setFormData(prevState => ({
                    ...prevState,
                    nome: prevState.nome || '',
                    cpf: prevState.cpf || '',
                    dataNascimento: prevState.dataNascimento || '',
                    estadoCivil: prevState.estadoCivil || '',
                    cidade: prevState.cidade || '',
                    telefone: prevState.telefone || '',
                    email: prevState.email || '',
                    rendaMensal: prevState.rendaMensal || '',
                    nacionalidade: prevState.nacionalidade || '',
                    profissao: prevState.profissao || ''
                }));
            }, []);

            const handleInputChange2 = (e) => {
                const value = e.detail.value;
                setFormData(prevFormData => ({
                  ...prevFormData,
                  rendaMensal: value
                }));
              };

              const formatarData = (dataISO: string) => {
                const data = new Date(dataISO);
                return data.toLocaleDateString("pt-BR", { timeZone: "UTC" }); // Converte para DD/MM/AAAA
              }; 

              const formatarCPF = (cpf: string) => {
                return cpf
                  .replace(/\D/g, "") // Remove tudo que não for número
                  .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
                  .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o segundo ponto
                  .replace(/(\d{3})(\d{1,2})$/, "$1-$2") // Adiciona o traço
                  .slice(0, 14); // Limita ao formato 000.000.000-00
              };
              


    const handleNext = () => {
        
        localStorage.setItem("formData", JSON.stringify(formData));
        history.push('./cadastro3');
    };

     useEffect(() => {
                console.log("Dados salvos no localStorage:", formData); // Verifique se está funcionando corretamente
            }, [formData]);
    return (
        <IonPage>
            <IonContent className="custom-dash-content" scrollY>
                <nav className="custom-cadastro2-navbar">
                    <Link to="/cadastro1">
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M18.3248 6.17496C17.8692 5.71935 17.1305 5.71935 16.6749 6.17496L9.67488 13.175C9.21927 13.6306 9.21927 14.3693 9.67488 14.8249L16.6749 21.8249C17.1305 22.2805 17.8692 22.2805 18.3248 21.8249C18.7804 21.3693 18.7804 20.6306 18.3248 20.175L12.1498 13.9999L18.3248 7.82488C18.7804 7.36926 18.7804 6.63057 18.3248 6.17496Z"
                                    fill="#D70404"
                                />
                            </svg>
                        </button>
                    </Link>
                </nav>

                <div className="custom-cadastro2-content">
                    <div className="custom-cadastro2-content-header">
                        <h3>Dados Pessoais</h3>
                        <p>
                            Preencha os dados corretamente para enviar a proposta
                            ao banco e tudo prosseguir corretamente. Abaixo
                            preencha os seus dados:
                        </p>
                    </div>

                    <hr />

                    <div className="custom-cadastro2-form">
                        <div className="custom-cadastro2-form-header">
                            <h3>Dados pessoais</h3>
                            <p>Preencha corretamente</p>
                        </div>

                        <div className="custom-cadastro2-form-field">
                            <div>
                                <label>Nome completo</label>
                                <IonItem>
                                    <IonInput
                                        placeholder="Nome completo"
                                        value={formData.nome}
                                        onIonChange={(e) => setFormData({ ...formData, nome: e.detail.value! })}
                                    />
                                </IonItem>
                            </div>

                            <div>
                                <label>CPF</label>
                                <IonItem>
                                    <IonInput
                                        placeholder="000.000.000-00"
                                        className="ion-input-mask"
                                        value={formData.cpf}
                                        onIonChange={(e) => setFormData({ ...formData, cpf: e.detail.value! })}
                                    />
                                </IonItem>
                            </div>

                            <div>
                                <label>Data de nascimento</label>
                                <IonItem>
                                    <IonInput
                                        placeholder="DD/MM/AAAA"
                                        className="ion-input-mask"
                                        value={formData.dataNascimento ? formatarData(formData.dataNascimento) : ""}
                                        onIonChange={(e) => setFormData({ ...formData, dataNascimento: e.detail.value! })}
                                    />
                                </IonItem>
                            </div>

                            <div className="custom-input-gen">
                                <div style={{ width: "100%" }}>
                                    <label>Gênero</label>
                                    <IonList>
                                        <IonItem>
                                            <IonSelect
                                               value={formData.genero}
                                               onIonChange={(e) => setFormData({ ...formData, genero: e.detail.value! }) ?? 'Masculino'}
                                            >
                                                <IonSelectOption value="Masculino">
                                                    Masculino
                                                </IonSelectOption>
                                                <IonSelectOption value="Feminino">
                                                    Feminino
                                                </IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonList>
                                </div>

                                <div style={{ width: "100%" }}>
                                    <label>Estado cívil</label>
                                    <IonList>
                                        <IonItem>
                                            <IonSelect
                                               value={formData.estadoCivil}
                                               onIonChange={(e) => setFormData({ ...formData, estadoCivil: e.detail.value! })}
                                            >
                                                <IonSelectOption value="Solteiro">
                                                    Solteiro
                                                </IonSelectOption>
                                                <IonSelectOption value="Casado">
                                                    Casado
                                                </IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </div>

                            <div>
                                <label>Cidade</label>
                                <IonItem>
                                    <IonInput
                                        placeholder="São Paulo"
                                        value={formData.cidade}
                                        onIonChange={(e) => setFormData({ ...formData, cidade: e.detail.value! })}
                                    />
                                </IonItem>
                            </div>

                            <div>
                                <label>Nacionalidade</label>
                                <IonItem>
                                    <IonInput
                                        placeholder="Nacionalidade"
                                        value={formData.nacionalidade}
                                        onIonChange={(e) => setFormData({ ...formData, nacionalidade: e.detail.value! })}
                                    />
                                </IonItem>
                            </div>

                            <div>
                                <label>Profissão Atual</label>
                                <IonItem>
                                    <IonInput 
                                        placeholder="Advogado"
                                        value={formData.profissao}
                                        onIonChange={(e) => setFormData({ ...formData, profissao: e.detail.value! })}
                                    />
                                </IonItem>
                            </div>

                            <div className="custom-cadastro2-form-header">
                                <h3>Contatos</h3>
                                <p>Preencha suas informações de contato corretamente</p>
                            </div>

                            <div>
                                <label>Telefone</label>
                                <IonItem>
                                    <IonInput
                                        placeholder="(00) 00000-0000"
                                        value={formData.telefone}
                                        onIonChange={(e) => setFormData({ ...formData, telefone: e.detail.value! })}
                                    />
                                </IonItem>
                            </div>

                            <div>
                                <label>E-mail</label>
                                <IonItem>
                                    <IonInput
                                        placeholder="email@domain.com"
                                        value={formData.email}
                                        onIonChange={(e) => setFormData({ ...formData, email: e.detail.value! })}
                                    />
                                </IonItem>
                            </div>

                            <div>
                                <label>Valor da sua renda mensal</label>
                                <IonItem>
                                    <IonInput
                                        placeholder="R$ 0,00"
                                        value={formData.rendaMensal}
                                        onIonInput={handleInputChange2}
                                    />
                                </IonItem>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="custom-cadastro2-button">
                    <button className="custom-button-modal3" onClick={handleNext}>
                        Continuar
                    </button>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Cadastro2;
