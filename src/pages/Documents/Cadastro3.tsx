import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    IonPage,
    IonContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonList
} from "@ionic/react";
import { Link } from "react-router-dom";
import './Cadastro3.css';
import InputMask from "react-input-mask";


function Cadastro3() {
    const [tipoConta, setTipoConta] = useState("conta corrente");
    const [codigoBanco, setCodigoBanco] = useState("");
    const [agencia, setAgencia] = useState("");
    const [conta, setConta] = useState("");
    const [digito, setDigito] = useState("");
    const [chave, setChave] = useState("");
    const [tipoChave, setTipoChave] = useState("");
    const history = useHistory();

    // Função para salvar os dados no localStorage
    function saveDataToLocalStorage(key: string, value: any) {
        const existingData = JSON.parse(localStorage.getItem(key) || "{}");
        const updatedData = { ...existingData, ...value };
        localStorage.setItem(key, JSON.stringify(updatedData));
    }

    const [formData, setFormData] = useState<any>(() => {
            return JSON.parse(localStorage.getItem('formData') || '{}') || {
            tipoConta,
            codigoBanco,
            agencia,
            conta,
            digito,
            chave,
            tipoChave
        };
    });

     useEffect(() => {
            setFormData(prevState => ({
                ...prevState,
                tipoConta: prevState.tipoConta || '',
                codigoBanco: prevState.codigoBanco || '',
                agencia: prevState.agencia || '',
                conta: prevState.conta || '',
                digito: prevState.digito || '',
                chave: prevState.chave || '',
                tipoChave: prevState.tipoChave || '',
            }));
        }, []);

        const handleInputChange = (e) => {
            const value = e.detail.value;
            setFormData(prevFormData => ({
              ...prevFormData,
              digito: value
            }));
          };


        const handleNext = () => {
            localStorage.setItem("formData", JSON.stringify(formData));
            history.push('./cadastro4');
        };

        const verify = () => {
            console.log("Cliquei");
        }

        useEffect(() => {
            console.log("Dados salvos no localStorage:", formData); // Verifique se está funcionando corretamente
        }, [formData]);
    return (
        <IonPage>
            <IonContent className="custom-dash-content" scrollY>
                <nav className="custom-cadastro3-navbar">
                    <Link to="/cadastro2">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
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

                <div className="custom-cadastro3-content">
                    <div className="custom-cadastro3-content-header">
                        <h3>Dados Pessoais</h3>
                        <p>Preencha os dados corretamente para enviar a proposta ao banco e tudo prosseguir corretamente abaixo preencha os seus dados:</p>
                    </div>

                    <hr />

                    <div className="custom-cadastro3-form">
                        <div className="custom-cadastro3-form-header">
                            <h3>Informações bancárias</h3>
                            <p>Preencha corretamente</p>
                        </div>

                        <div className="custom-cadastro3-form-field">

                        <div>
                                <label>Tipo Chave</label>
                                <IonList no-lines>
                                    <IonItem>
                                        <IonSelect
                                             value={formData.tipoChave}
                                             onIonChange={(e) => setFormData({ ...formData, tipoChave: e.detail.value! })}
                                            labelPlacement="stacked"
                                        >
                                            <IonSelectOption value="CPF">CPF\CNPJ</IonSelectOption>
                                            <IonSelectOption value="EMAIL">Email</IonSelectOption>
                                            <IonSelectOption value="TELEFONE">Telefone</IonSelectOption>
                                            <IonSelectOption value="ALEATORIA">Chave Aleatória</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                </IonList>
                            </div>

                            <div>
                                <label>Tipo de Conta</label>
                                <IonList no-lines>
                                    <IonItem>
                                        <IonSelect
                                             value={formData.tipoConta}
                                             onIonChange={(e) => setFormData({ ...formData, tipoConta: e.detail.value! })}
                                            labelPlacement="stacked"
                                            style={{ border: 'none', background: 'transparent', color: 'black', outline: 'none',  boxShadow: 'none', width: '100%'}}

                                        >
                                            <IonSelectOption value="conta corrente">Conta Corrente</IonSelectOption>
                                            <IonSelectOption value="poupança">Poupança</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                </IonList>
                            </div>

                                <div>
                                        <IonList no-lines>
                                    <label>Chave Pix</label>

                                    <IonItem>
                                        <IonInput
                                            value={formData.chave}
                                            onIonChange={(e) => setFormData({ ...formData, chave: e.detail.value! })}
                                            labelPlacement="stacked"
                                            placeholder="Sua chave PIX"
                                            style={{
                                                border: 'none',
                                                background: 'transparent',
                                                color: 'black',
                                                outline: 'none',
                                                boxShadow: 'none',
                                                width: '100%',
                                                padding: '8px 12px',
                                                fontSize: '16px',
                                                textAlign: 'left',
                                                display: 'block',
                                              }}
                                            className="custom-input-form"
                                        ></IonInput>
                                    </IonItem>
                                    </IonList>
                                </div>
                            <div className="custom-input-gen">

                            <div className="custom-input-gen">
                                <div>
                                    <label>Código Banco</label>
                                    <IonItem>
                                        <IonInput
                                            value={formData.codigoBanco}
                                            onIonChange={(e) => setFormData({ ...formData, codigoBanco: e.detail.value! })}
                                            labelPlacement="stacked"
                                            placeholder="00000-0"
                                           
                                            className="custom-input-form"
                                            
                                        ></IonInput>
                                    </IonItem>
                                </div>

                                <div>
                                    <label>Agência</label>
                                    <IonItem>
                                        <IonInput
                                            value={formData.agencia}
                                            onIonChange={(e) => setFormData({ ...formData, agencia: e.detail.value! })}
                                            labelPlacement="stacked"
                                            placeholder="0000-0"
                                            className="custom-input-form"

                                        ></IonInput>
                                    </IonItem>
                                </div>

                               
                            </div>

                        </div>
                            <div>
                                <label>Conta</label>
                                <IonItem no-lines>
                                    <IonInput
                                        value={formData.conta}
                                        onIonChange={(e) => setFormData({ ...formData, conta: e.detail.value! })}
                                        labelPlacement="stacked"
                                        placeholder="0000000"
                                        className="custom-input-form"

                                    ></IonInput>
                                </IonItem>
                                </div>

                                <div>
                                    <label>Dígito</label>
                                    <IonItem>
                                        <IonInput
                                         placeholder="Digito"
                                         value={formData.digito}
                                         onIonInput={handleInputChange}
                                         className="custom-input-form"
                                         ></IonInput>
                                    </IonItem>
                                </div>
                    </div>
                </div>
                </div>

                <div className="custom-cadastro2-button">
                    <Link to="/cadastro4">
                        <button
                            className="custom-button-modal3"
                            onClick={handleNext}
                        >
                            Continuar
                        </button>
                    </Link>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Cadastro3;
