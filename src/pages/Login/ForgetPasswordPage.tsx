import React, { useState } from "react";
import { IonButton, IonInput, IonLabel, IonItem, IonToast, IonContent, IonPage } from "@ionic/react";
import { sendPasswordResetLink } from "../../components/api"; // Serviço para interagir com o backend

function ForgetPasswordPage() {
    const [email, setEmail] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Para gerenciar o estado de carregamento

    const handleSubmit = async () => {
        if (!email) {
            setToastMessage("O campo de email é obrigatório.");
            setShowToast(true);
            return;
        }

        setIsLoading(true); // Iniciar carregamento

        try {
            const response = await sendPasswordResetLink(email);
            // Se a resposta for bem-sucedida, mostramos uma mensagem de sucesso
            setToastMessage("Link de redefinição enviado com sucesso!");
            setShowToast(true);
        } catch (error) {
            // Exibe mensagem de erro com base no tipo de erro recebido do backend
            if (error.response) {
                // Erro vindo da resposta do backend (exemplo: email não encontrado)
                setToastMessage(error.response.data.message || "Erro ao enviar link de redefinição.");
            } else {
                // Erro de rede ou outro tipo de erro
                setToastMessage("Erro desconhecido. Tente novamente mais tarde.");
            }
            setShowToast(true);
        } finally {
            setIsLoading(false); // Finaliza o carregamento
        }
    };

    return (
        <IonPage>
            <IonContent>
                <div className="forget-password-form">
                    <IonLabel>Email para redefinir a senha</IonLabel>
                    <IonItem>
                        <IonInput
                            value={email}
                            onIonChange={e => setEmail(e.detail.value!)}
                            placeholder="Digite seu email"
                            type="email"
                        />
                    </IonItem>
                    <IonButton onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Enviando..." : "Enviar link de redefinição"}
                    </IonButton>
                </div>
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

export default ForgetPasswordPage;
