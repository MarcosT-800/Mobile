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
    IonLabel,
    IonList,
    IonThumbnail,
    IonSelect,
    IonSelectOption
} from "@ionic/react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ModalButton from "../../components/Buttons/Button";
import { Link } from "react-router-dom";
import './Cadastro5.css';
import '../Simulation/Simulation3.css';
import { IonIcon } from '@ionic/react';
import { eye, leaf, lockClosed } from 'ionicons/icons';
import { useHistory } from "react-router-dom"; // Importação do useHistory

function Cadastro5() {
    const modal = useRef<HTMLIonModalElement>(null);
    const [user_login, setUser_login] = useState("");
    const [user_pass, setUser_pass] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isParcelasVisible, setIsParcelasVisible] = useState(false);
    const history = useHistory(); // Definir o hook history

    // Carregar os dados armazenados no localStorage (formData)
    const [formData, setFormData] = useState<any>(() => {
        return JSON.parse(localStorage.getItem('formData') || '{}') || {
            documento: '',
            tipoDocumento: '',
            ufExpedicao: '',
            orgaoEmissor: '',
            dataEmissao: '',
            aceitaCompartilhamento: false
        };
    });

    const name = formData.nome;

    const token = localStorage.getItem("token"); // ou de onde você estiver armazenando o token
    console.log("Token encontrado: " + token);
    const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario") || "{}");
    const payload = {
        ...formData,
        ...dadosUsuario
    };
    useEffect(() => {
        const savedFormData = JSON.parse(localStorage.getItem('formData') || '{}');
        if (savedFormData) {
            setFormData(savedFormData);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            aceitaCompartilhamento: e.target.checked
        });
    };
    const handleSubmit = async () => {
        try {
            console.log(formData);
            // Enviar os dados para a API
            const response = await fetch("https://phapp.phng.com.br/api/pessoaFisica", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                setToastMessage("Dados enviados com sucesso!");
                setShowToast(true);
                // Limpar localStorage após o envio
                localStorage.setItem("hash_person", JSON.stringify(data));

                history.push("/loading");


                // Página de loading pode ser exibida aqui
            } else {
                setToastMessage("Erro ao enviar os dados.");
                setShowToast(true);
                /*   history.push("/error"); // Redirecionar para página de erro */
            }
        } catch (error) {
            console.error(error);
            setToastMessage("Erro na conexão com a API.");
            setShowToast(true);
        }
    };

    const toggleParcelas = () => {
        setIsParcelasVisible(!isParcelasVisible);
    };

    return (
        <>
            <IonPage>
                <IonContent className="custom-dash-content" scrollY>
                    <nav className="custom-cadastro5-navbar">
                        <Link to="/cadastro4">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3248 6.17496C17.8692 5.71935 17.1305 5.71935 16.6749 6.17496L9.67488 13.175C9.21927 13.6306 9.21927 14.3693 9.67488 14.8249L16.6749 21.8249C17.1305 22.2805 17.8692 22.2805 18.3248 21.8249C18.7804 21.3693 18.7804 20.6306 18.3248 20.175L12.1498 13.9999L18.3248 7.82488C18.7804 7.36926 18.7804 6.63057 18.3248 6.17496Z" fill="#D70404" />
                                </svg>
                            </button>
                        </Link>
                    </nav>

                    <div className="custom-cadastro5-content">
                        <div className="custom-cadastro5-content-header">
                            <h3>Documentos</h3>
                            <p>Preencha os dados corretamente para enviar a proposta ao banco e tudo prosseguir corretamente abaixo preencha os seus dados:</p>
                        </div>

                        <hr />

                        <div className="custom-cadastro5-form">
                            <div className="custom-cadastro5-form-header">
                                <h3>Dados pessoais</h3>
                                <p>Preencha corretamente</p>
                            </div>

                            <div className="custom-cadastro5-form-field">
                                <div>
                                    <label>Número do documento</label>
                                    <IonItem>
                                        <IonInput
                                            name="documento"
                                            labelPlacement="stacked"
                                            placeholder="000.000.000-00"
                                            value={formData.documento || ''}  // Garantir que nunca seja undefined
                                            onIonChange={handleChange}
                                        />
                                    </IonItem>
                                </div>

                                <div className="custom-input-gen">
                                    {/* Tipo de Documento */}
                                    <div style={{ width: '50%'}}>
                                        <label>Tipo de documento</label>
                                        <IonItem>
                                            <IonSelect
                                                name="tipoDocumento"
                                                placeholder="Selecione o tipo de documento"
                                                value={formData.tipoDocumento || ''}
                                                onIonChange={(e) => handleChange({ ...e, target: { name: 'tipoDocumento', value: e.detail.value } })}
                                            >
                                                <IonSelectOption value="RG">RG</IonSelectOption>
                                                <IonSelectOption value="CPF">CPF</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </div>

                                    {/* UF de Expedição */}
                                    <div style={{ width: "50%", marginTop: '-14px' }}>
                                        <label >UF de expedição</label>
                                        <IonItem>
                                            <IonSelect
                                                name="ufExpedicao"
                                                labelPlacement="stacked"
                                                placeholder="Selecione a UF"
                                                value={formData.ufExpedicao || ''}
                                                onIonChange={(e) => handleChange({ ...e, target: { name: 'ufExpedicao', value: e.detail.value } })}
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
                                    <label>Orgão emissor</label>
                                    <IonItem>
                                        <IonInput
                                            name="orgaoEmissor"
                                            labelPlacement="stacked"
                                            placeholder="São Paulo"
                                            value={formData.orgaoEmissor}
                                            onIonChange={handleChange}
                                        />
                                    </IonItem>
                                </div>

                                <div>
                                    <label>Data emissão</label>
                                    <IonItem>
                                        <IonInput
                                            name="dataEmissao"
                                            labelPlacement="stacked"
                                            placeholder="00/00/0000"
                                            value={formData.dataEmissao}
                                            onIonChange={handleChange}
                                        />
                                    </IonItem>
                                </div>

                                <div className="custom-content-check6">
                                    <div className="check">
                                        <input
                                            type="checkbox"
                                            checked={formData.aceitaCompartilhamento}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p className="p_credenciais">Você aceita que a PH Negócios faça o compartilhamento de suas informações com o banco futuro?</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="custom-cadastro2-button">
                        <button onClick={handleSubmit} className="custom-button-modal3">
                            Continuar
                        </button>
                    </div>

                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message={toastMessage} duration={3000} />

                </IonContent>
            </IonPage>
        </>
    );
}

export default Cadastro5;
