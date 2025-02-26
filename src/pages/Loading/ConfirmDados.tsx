import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonToast, IonInput, IonButton, IonItem, IonRow, IonCol } from "@ionic/react";
import { useHistory } from "react-router";
import './confirm.css';
function Loading2() {
  const [userData, setUserData] = useState(null); // Armazenar os dados do usuário
  const [editedData, setEditedData] = useState(null); // Dados para editar
  const [showToast, setShowToast] = useState(false); // Controla o toast de erro
  const [toastMessage, setToastMessage] = useState(""); // Mensagem do toast
  const history = useHistory(); // Corrigido para obter o objeto history

  useEffect(() => {
    // Recupera os dados do usuário do localStorage
    const storedData = localStorage.getItem("simulationData2");

    if (storedData) {
      const parsedData = JSON.parse(storedData); // Converte a string JSON armazenada em um objeto

      // Verifica se os dados do usuário estão presentes no campo 'data'
      if (parsedData && parsedData.data) {
        const userInfo = parsedData.data; // Pega os dados do usuário

        setUserData(userInfo); // Armazena os dados no estado
        setEditedData(userInfo); // Inicializa os dados editáveis com os dados encontrados
      } else {
        setToastMessage("Dados do usuário não encontrados!");
        setShowToast(true);
      }
    } else {
      setToastMessage("Dados não encontrados no localStorage!");
      setShowToast(true);
    }
  }, []);

  // Função para lidar com as alterações nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendToController = async () => {
    if (editedData) {
      // Formatar os dados para o formato esperado pela API
      const updatedData = {
        message: "Usuário encontrado!",
        data: {
          name: editedData.name,
          registrationNumber: editedData.cpf ? editedData.cpf.replace(/\D/g, "") : "",
          birthDate: editedData.birthDate ? new Date(editedData.birthDate).toISOString() : "",
          civilStatus: editedData.civilStatus,
          email: editedData.email,
          nationality: editedData.nationality,
          occupation: editedData.profissao,
          phone: editedData.telefone ? editedData.telefone.replace(/\D/g, "") : "",
          address: {
            addressName: editedData.address?.logradouro || "",
            zipCode: editedData.address?.cep || "",
            city: editedData.address?.cidade || "",
            uf: editedData.address?.estado || "",
            district: editedData.address?.bairro || null,
          },
          bankAccounts: editedData.bankAccounts?.map(account => ({
            keyPix: account.chave ? account.chave.replace(/\D/g, "") : "",
            typeKey: account.tipoChave || "",
            typeAccount: account.tipoConta || "",
          })) || []
        }
      };


      var dadosUsuario = localStorage.getItem("simulationData2"); // Recupera do localStorage
    
    
      try {
        // Envia os dados via POST
        dadosUsuario = JSON.stringify(dadosUsuario)
        console.log(dadosUsuario)
        dadosUsuario = JSON.parse(dadosUsuario)

        const response = await fetch("https://phapp.phng.com.br/api/envioByVerificaoPessoa", {
          method: "POST", // Ou PUT se for uma atualização
          headers: new Headers({
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }),
          body: JSON.stringify(dadosUsuario),
        });
  
        console.log("dados a serem enviados", JSON.stringify(dadosUsuario));
  
        // Verifica se a requisição foi bem-sucedida
        if (response.ok) {
          const jsonResponse = await response.json();

          localStorage.setItem("linkContracao", JSON.stringify(jsonResponse));
          setToastMessage("Dados enviados com sucesso!");
          setShowToast(true);
          history.push('/loading4');
        } else {
          setToastMessage("Erro ao enviar dados!");
          setShowToast(true);
        }
      } catch (error) {
        setToastMessage("Erro ao conectar com o servidor.");
        setShowToast(true);
      }
    } else {
      setToastMessage("Não há dados para enviar.");
      setShowToast(true);
    }
  };
  

  

  const uniqueBank = [];

  const handleSave = () => {
    if (editedData) {
      // Formatar os dados para o formato esperado
      const updatedData = {
        message: "Usuário encontrado!",
        data: {
          name: editedData.name,
          registrationNumber: editedData.cpf ? editedData.cpf.replace(/\D/g, "") : "",
          birthDate: editedData.birthDate ? new Date(editedData.birthDate).toISOString() : "",
          civilStatus: editedData.civilStatus,
          email: editedData.email,
          nationality: editedData.nationality,
          occupation: editedData.profissao,
          phone: editedData.telefone ? editedData.telefone.replace(/\D/g, "") : "",
          address: {
            addressName: editedData.address?.logradouro || "",
            zipCode: editedData.address?.cep || "",
            city: editedData.address?.cidade || "",
            uf: editedData.address?.estado || "",
            district: editedData.address?.bairro || null,
          },
          bankAccounts: editedData.bankAccounts?.map(account => ({
            keyPix: account.chave ? account.chave.replace(/\D/g, "") : "",
            typeKey: account.tipoChave || "",
            typeAccount: account.tipoConta || "",
          })) || []

        }
      };
  
      // Atualiza o localStorage com os dados editados
      localStorage.setItem("simulationData2", JSON.stringify(updatedData));
  
      setUserData(updatedData.data); // Atualiza os dados exibidos
      setToastMessage("Dados atualizados com sucesso!");
      setShowToast(true);
    }
  };
  
  // Função para salvar as alterações no localStorage


  return (
    <>
      <IonPage>
        <IonContent className="custom-dash-content" scrollY>
          {/* Exibe dados do usuário caso existam */}
          {userData ? (
            <IonCard className="custom-card">
              <IonCardHeader className="card-header">
                <IonCardTitle className="card-title">Dados do Usuário</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {/* Exibe dados do usuário */}
                <IonItem className="custom-item">
                  <IonInput
                    label="Nome"
                    value={editedData.name || userData.name}
                    onIonChange={handleChange}
                    name="name"
                    placeholder="Nome"
                  />
                </IonItem>
                <IonItem className="custom-item">
                  <IonInput
                    label="Telefone"
                    value={editedData.phone || userData.phone}
                    onIonChange={handleChange}
                    name="phone"
                    placeholder="Telefone"
                  />
                </IonItem>
                <IonItem className="custom-item">
                  <IonInput
                    label="Email"
                    value={editedData.email || userData.email}
                    onIonChange={handleChange}
                    name="email"
                    placeholder="Email"
                  />
                </IonItem>
                <IonItem className="custom-item">
                  <IonInput
                    label="Estado Civil"
                    value={editedData.civilStatus || userData.civilStatus}
                    onIonChange={handleChange}
                    name="civilStatus"
                    placeholder="Estado Civil"
                  />
                </IonItem>
                <IonItem className="custom-item">
                  <IonInput
                    label="Nacionalidade"
                    value={editedData.nationality || userData.nationality}
                    onIonChange={handleChange}
                    name="nationality"
                    placeholder="Nacionalidade"
                  />
                </IonItem>
                <IonItem className="custom-item">
                  <IonInput
                    label="Data de Nascimento"
                    value={editedData.birthDate || userData.birthDate}
                    onIonChange={handleChange}
                    name="birthDate"
                    placeholder="Data de Nascimento"
                  />
                </IonItem>

                {/* Exibe dados do endereço */}
                <IonCardTitle className="card-subtitle">Endereço</IonCardTitle>
                <IonItem className="custom-item">
                  <IonInput
                    label="Rua"
                    value={editedData.address?.addressName || userData.address?.addressName}
                    onIonChange={handleChange}
                    name="addressName"
                    placeholder="Rua"
                  />
                </IonItem>
                <IonItem className="custom-item">
                  <IonInput
                    label="CEP"
                    value={editedData.address?.zipCode || userData.address?.zipCode}
                    onIonChange={handleChange}
                    name="zipCode"
                    placeholder="CEP"
                  />
                </IonItem>
                <IonItem className="custom-item">
                  <IonInput
                    label="Cidade"
                    value={editedData.address?.city || userData.address?.city}
                    onIonChange={handleChange}
                    name="city"
                    placeholder="Cidade"
                  />
                </IonItem>
                <IonItem className="custom-item">
                  <IonInput
                    label="Estado"
                    value={editedData.address?.uf || userData.address?.uf}
                    onIonChange={handleChange}
                    name="uf"
                    placeholder="Estado"
                  />
                </IonItem>

                {/* Exibe contas bancárias */}
                <IonCardTitle className="card-subtitle">Conta Bancária</IonCardTitle>
                {editedData.bankAccounts?.map((account, index) => (
                  <IonItem key={index} className="custom-item">
                    <IonInput
                      label={`Chave Pix ${index + 1}`}
                      value={account.keyPix}
                      onIonChange={handleChange}
                      name={`keyPix${index}`}
                      placeholder="Chave Pix"
                    />
                  </IonItem>
                ))}

                {/* Botões de ação */}
                <IonRow>
                 <div>

                    <button onClick={handleSave} className="custom-button-modal3">Salvar Alterações</button>
                
                    <button  onClick={handleSendToController} className="custom-button-modal3">Confirmar os Dados</button>
                 </div>
                
                </IonRow>
              </IonCardContent>
            </IonCard>
          ) : (
            <p>Carregando dados...</p>
          )}

          {/* Exibe o Toast */}
          <IonToast
            isOpen={showToast}
            message={toastMessage}
            duration={2000}
            onDidDismiss={() => setShowToast(false)}
          />
        </IonContent>
      </IonPage>
    </>
  );
}

export default Loading2;
