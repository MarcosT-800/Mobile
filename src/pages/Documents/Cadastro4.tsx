import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
    IonPage,
    IonContent,
    IonItem,
    IonInput,
    IonSelectOption,
    IonSelect
} from "@ionic/react";
import { Link } from "react-router-dom";
import './Cadastro4.css';
import InputMask from "react-input-mask";

function Cadastro4() {
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [complemento, setComplemento] = useState("");
    const [semNumero, setSemNumero] = useState(false);
    const [numero, setNumero] = useState("");
    const [cep, setCep] = useState("");
    const history = useHistory();

    // Recupera os dados do localStorage ao iniciar o componente
    const [formData, setFormData] = useState<any>(() => {
        return JSON.parse(localStorage.getItem('formData') || '{}') || {
            logradouro: '',
            bairro: '',
            estado: '',
            cidade: '',
            complemento: '',
            semNumero: false,
            numero: '',
            cep: ''
        };
    });

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            logradouro: prevState.logradouro || '',
            bairro: prevState.bairro || '',
            estado: prevState.estado || '',
            cidade: prevState.cidade || '',
            complemento: prevState.complemento || '',
            semNumero: prevState.semNumero || false,
            numero: prevState.numero || '',
            cep: prevState.cep || ''
        }));
    }, []);

    const handleNext = () => {
        localStorage.setItem("formData", JSON.stringify(formData));
    };

    useEffect(() => {
        console.log("Dados salvos no localStorage:", formData); // Verifique se está funcionando corretamente
    }, [formData]);


    return (
        <>
            <IonPage>
                <IonContent className="custom-dash-content" scrollY>
                    <nav className="custom-cadastro4-navbar">
                        <Link to="/cadastro3">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.3248 6.17496C17.8692 5.71935 17.1305 5.71935 16.6749 6.17496L9.67488 13.175C9.21927 13.6306 9.21927 14.3693 9.67488 14.8249L16.6749 21.8249C17.1305 22.2805 17.8692 22.2805 18.3248 21.8249C18.7804 21.3693 18.7804 20.6306 18.3248 20.175L12.1498 13.9999L18.3248 7.82488C18.7804 7.36926 18.7804 6.63057 18.3248 6.17496Z" fill="#D70404" />
                                </svg>
                            </button>
                        </Link>
                    </nav>

                    <div className="custom-cadastro4-content">
                        <div className="custom-cadastro4-content-header">
                            <h3>Endereço Residencial</h3>
                            <p>Preencha os dados corretamente para enviar a proposta ao banco e tudo prosseguir corretamente abaixo preencha os seus dados:</p>
                        </div>

                        <hr />

                        <div className="custom-cadastro4-form">
                            <div className="custom-cadastro4-form-header">
                                <h3>Informe o seu CEP</h3>
                                <p>Preencha corretamente</p>
                            </div>

                            <div className="custom-cadastro4-form-field">
                                <div>
                                    <label>Cep</label>
                                    <IonItem>
                                        <InputMask
                                            mask="999-99999"
                                            labelPlacement="stacked"
                                            placeholder="CEP"
                                            value={formData.cep}
                                            style={{ background: 'transparent', border: 'none'}}
                                            onIonChange={(e) => setFormData({ ...formData, cep: e.detail.value! })}
                                        ></InputMask>
                                    </IonItem>
                                </div>

                                <div>
                                    <label>Logradouro</label>
                                    <IonItem>
                                        <IonInput
                                            labelPlacement="stacked"
                                            placeholder="Ex: Rua das Flores"
                                            value={formData.logradouro}
                                            onIonChange={(e) => setFormData({ ...formData, logradouro: e.detail.value! })}
                                        ></IonInput>
                                    </IonItem>
                                </div>

                                <div>
                                    <label>Bairro</label>
                                    <IonItem style={{ width: '100%'}}>
                                        <IonInput
                                            labelPlacement="stacked"
                                            placeholder="Ex: Centro"
                                            value={formData.bairro}
                                            onIonChange={(e) => setFormData({ ...formData, bairro: e.detail.value! })}
                                        ></IonInput>
                                    </IonItem>
                                </div>

                                <div className="custom-input-gen">
                                    <div className="custom-input-gen" style={{ width: '48%' }}>
                                        <div style={{ width: '100%' }}>
                                            <label>Estado</label>
                                            <IonItem>
                                                <IonSelect
                                                    labelPlacement="stacked"
                                                    placeholder="Selecione o estado"
                                                    style={{ width: '100%'}}
                                                    value={formData.estado}
                                                    onIonChange={(e) => setFormData({ ...formData, estado: e.detail.value })}
                                                >
                                                    <IonSelectOption value="AC">Acre</IonSelectOption>
                                                    <IonSelectOption value="AL">Alagoas</IonSelectOption>
                                                    <IonSelectOption value="AP">Amapá</IonSelectOption>
                                                    <IonSelectOption value="AM">Amazonas</IonSelectOption>
                                                    <IonSelectOption value="BA">Bahia</IonSelectOption>
                                                    <IonSelectOption value="CE">Ceará</IonSelectOption>
                                                    <IonSelectOption value="DF">Distrito Federal</IonSelectOption>
                                                    <IonSelectOption value="ES">Espírito Santo</IonSelectOption>
                                                    <IonSelectOption value="GO">Goiás</IonSelectOption>
                                                    <IonSelectOption value="MA">Maranhão</IonSelectOption>
                                                    <IonSelectOption value="MT">Mato Grosso</IonSelectOption>
                                                    <IonSelectOption value="MS">Mato Grosso do Sul</IonSelectOption>
                                                    <IonSelectOption value="MG">Minas Gerais</IonSelectOption>
                                                    <IonSelectOption value="PA">Pará</IonSelectOption>
                                                    <IonSelectOption value="PB">Paraíba</IonSelectOption>
                                                    <IonSelectOption value="PR">Paraná</IonSelectOption>
                                                    <IonSelectOption value="PE">Pernambuco</IonSelectOption>
                                                    <IonSelectOption value="PI">Piauí</IonSelectOption>
                                                    <IonSelectOption value="RJ">Rio de Janeiro</IonSelectOption>
                                                    <IonSelectOption value="RN">Rio Grande do Norte</IonSelectOption>
                                                    <IonSelectOption value="RS">Rio Grande do Sul</IonSelectOption>
                                                    <IonSelectOption value="RO">Rondônia</IonSelectOption>
                                                    <IonSelectOption value="RR">Roraima</IonSelectOption>
                                                    <IonSelectOption value="SC">Santa Catarina</IonSelectOption>
                                                    <IonSelectOption value="SP">São Paulo</IonSelectOption>
                                                    <IonSelectOption value="SE">Sergipe</IonSelectOption>
                                                    <IonSelectOption value="TO">Tocantins</IonSelectOption>
                                                </IonSelect>
                                            </IonItem>
                                        </div>
                                    </div>



                                    <div>
                                        <label>Número</label>
                                        <IonItem>
                                            <IonInput
                                                labelPlacement="stacked"
                                                placeholder="Número"
                                                value={formData.numero}
                                                onIonChange={(e) => setFormData({ ...formData, numero: e.detail.value! })}
                                            ></IonInput>
                                        </IonItem>
                                    </div>
                                </div>

                                <div>
                                    <label>Complemento (opcional)</label>
                                    <IonItem>
                                        <IonInput
                                            labelPlacement="stacked"
                                            placeholder="Ex: Apartamento 101"
                                            value={formData.complemento}
                                            onIonChange={(e) => setFormData({ ...formData, complemento: e.detail.value! })}
                                        ></IonInput>
                                    </IonItem>
                                </div>

                                <div className="custom-content-check2">
                                    <div className="check">
                                        <input
                                            type="checkbox"
                                            checked={semNumero}
                                            onChange={(e) => setSemNumero(e.target.checked)}
                                        />
                                        <p className="p_credenciais2">Meu endereço não tem número</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="custom-cadastro2-button">
                        <Link to="/cadastro5">
                            <button
                                className="custom-button-modal3"
                                onClick={handleNext}
                            >Continuar</button>
                        </Link>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
}

export default Cadastro4;
