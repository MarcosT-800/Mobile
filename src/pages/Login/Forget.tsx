import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonItem,
  IonInput,
  IonToast,
  IonLabel
} from "@ionic/react";
import './Forget.css';
import '../Simulation/Simulation3.css';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function PasswordResetFlow() {
  // Estado para controlar a etapa atual: "email", "token" ou "password"
  const [currentStep, setCurrentStep] = useState<"email" | "token" | "password">("email");

  // Estados para os dados do fluxo
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados para carregamento e feedback
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  // Endpoint base do backend – ajuste conforme seu domínio/porta
  const API_BASE = "https://phapp.phng.com.br/api";

  // Envia o e-mail e recebe o token fake
  const handleSendEmail = async () => {
    if (!email) {
      setToastMessage("Por favor, insira seu e-mail!");
      setShowToast(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/password/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        setToastMessage(data.message);
        setShowToast(true);
        // Opcional: você pode guardar o token recebido, se necessário.
        // Por simplicidade, passamos para a etapa de token.
        setCurrentStep("token");
      } else {
        setToastMessage(data.message || "Erro ao enviar e-mail.");
        setShowToast(true);
      }
    } catch (error) {
      setIsLoading(false);
      setToastMessage("Erro na requisição de e-mail.");
      setShowToast(true);
    }
  };

  // Verifica o token informado
  const handleVerifyToken = async () => {
    if (!token) {
      setToastMessage("Por favor, insira o token!");
      setShowToast(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/password/verify-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        setToastMessage(data.message);
        setShowToast(true);
        setCurrentStep("password");
      } else {
        setToastMessage(data.message || "Token inválido.");
        setShowToast(true);
      }
    } catch (error) {
      setIsLoading(false);
      setToastMessage("Erro na verificação do token.");
      setShowToast(true);
    }
  };

  // Reseta a senha
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setToastMessage("Preencha os campos de senha!");
      setShowToast(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setToastMessage("As senhas não coincidem!");
      setShowToast(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          password: newPassword,
          password_confirmation: confirmPassword
        })
      });
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        setToastMessage(data.message);
        setShowToast(true);
        history.push('/');
        // Opcional: redirecionar para a página de login
      } else {
        setToastMessage(data.message || "Erro ao resetar senha.");
        setShowToast(true);
      }
    } catch (error) {
      setIsLoading(false);
      setToastMessage("Erro na requisição de reset de senha.");
      setShowToast(true);
    }
  };

   // 🔹 Correção na função de input
   const handleInputChange6 = (e: CustomEvent) => {
    setEmail(e.detail.value || ""); // Garante que sempre seja uma string
  };

    // 🔹 Correção na função de input
    const handleInputChange7 = (e: CustomEvent) => {
      setToken(e.detail.value || ""); // Garante que sempre seja uma string
    };

    // 🔹 Correção na função de input
    const handleInputChange8 = (e: CustomEvent) => {
      setNewPassword(e.detail.value || ""); // Garante que sempre seja uma string
    };

      // 🔹 Correção na função de input
      const handleInputChange9 = (e: CustomEvent) => {
        setConfirmPassword(e.detail.value || ""); // Garante que sempre seja uma string
      };

  return (
    <IonPage>
      <IonHeader>
        {/*  <IonToolbar>
          <h2>Reset de Senha</h2>
        </IonToolbar> */}
      </IonHeader>
      <IonContent className="custom-dash-content" scrollY>
        <nav className="custom-simulation3-navbar">
          <a href="/register">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M22.1342 5.86554C21.5077 5.23907 20.492 5.23907 19.8656 5.86554L13.9997 11.7314L8.13399 5.86563C7.50753 5.23916 6.49182 5.23916 5.86536 5.86563C5.23889 6.49209 5.23889 7.50779 5.86536 8.13426L11.7311 14L5.86553 19.8656C5.23907 20.492 5.23907 21.5077 5.86553 22.1342C6.492 22.7607 7.5077 22.7607 8.13417 22.1342L13.9997 16.2686L19.8654 22.1343C20.4918 22.7608 21.5075 22.7607 22.134 22.1343C22.7605 21.5078 22.7605 20.4921 22.134 19.8657L16.2684 14L22.1342 8.13418C22.7607 7.50771 22.7607 6.49201 22.1342 5.86554Z" fill="#505050" />
              </svg>
            </button>
          </a>
        </nav>
        {currentStep === "email" && (
          <div className="custom-forget-content">
            <img src="/forget.png" alt="Recuperar Senha" />
            <h1>Recuperar Senha</h1>
            <p>Insira seu e-mail para receber o token de redefinição.</p>
            <IonItem style={{ width: '100%' }}>
              <IonLabel className="custom-label" position="stacked">E-mail</IonLabel>
              <IonInput
                type="email"
                value={email}
                placeholder="Digite seu e-mail"
                onIonInput={handleInputChange6}
                className="custom-input-input"
                style={{ marginTop: '20px'}}
              />
            </IonItem>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button className="custom-button-modal1" onClick={handleSendEmail} disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar E-mail"}
              </button>
            </div>
          </div>
        )}

        {currentStep === "token" && (
          <div className="custom-forget-content">
            <img src="/forget.png" alt="Verificar Token" />
            <h1>Verificar Token</h1>
            <p>Insira o token que você recebeu no seu e-mail.</p>
            <IonItem style={{ width: '100%' }}>
              <IonLabel className="custom-label" position="stacked">Token</IonLabel>
              <IonInput
                type="text"
                value={token}
                placeholder="Insira o token"
                onIonInput={handleInputChange7}
                className="custom-input-input"
                style={{ marginTop: '20px'}}
              />
            </IonItem>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button className="custom-button-modal1" onClick={handleVerifyToken} disabled={isLoading}>
                {isLoading ? "Verificando..." : "Verificar Token"}
              </button>
            </div>
          </div>
        )}

        {currentStep === "password" && (
          <div className="custom-forget-content">
            <img src="/forget.png" alt="Redefinir Senha" />
            <h1>Redefinir Senha</h1>
            <p>Insira sua nova senha.</p>
            <IonItem style={{ width: '100%' }}>
              <IonLabel className="custom-label" position="stacked">Nova Senha</IonLabel>
              <IonInput
                type="password"
                value={newPassword}
                placeholder="Sua nova senha"
                onIonInput={handleInputChange8}
                className="custom-input-input"
                style={{ marginTop: '20px'}}

              />
            </IonItem>
            <IonItem style={{ width: '100%' }} >
              <IonLabel className="custom-label" position="stacked">Confirmar Senha</IonLabel>
              <IonInput
                type="password"
                value={confirmPassword}
                placeholder="Confirme sua nova senha"
                onIonInput={handleInputChange9}
                className="custom-input-input"
                style={{ marginTop: '20px'}}

              />
            </IonItem>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button className="custom-button-modal1" onClick={handleResetPassword} disabled={isLoading}>
                {isLoading ? "Resetando..." : "Resetar Senha"}
              </button>
            </div>
          </div>
        )}

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={3000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default PasswordResetFlow;
