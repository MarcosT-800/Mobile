import React, { useState } from "react";
import { IonButton, IonInput, IonLabel, IonItem, IonToast, IonContent, IonPage } from "@ionic/react";
import { sendPasswordResetLink } from "../../components/api"; // Serviço para interagir com o backend

function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [token, setToken] = useState(""); // Token recebido no link
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Para gerenciar o estado de carregamento

    const handleSubmit = async () => {
        if (!email || !password || !passwordConfirmation || !token) {
            setToastMessage("Todos os campos são obrigatórios.");
            setShowToast(true);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('https://phapp.phng.com.br/api/password/reset', {
                email,
                password,
                password_confirmation: passwordConfirmation,
                token, // Incluindo o token
            });

            setToastMessage("Senha redefinida com sucesso!");
            setShowToast(true);
        } catch (error) {
            if (error.response) {
                setToastMessage(error.response.data.message || "Erro ao redefinir a senha.");
            } else {
                setToastMessage("Erro desconhecido. Tente novamente mais tarde.");
            }
            setShowToast(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <IonPage>
            <IonContent>
                <div className="reset-password-form">
                    <IonLabel>Redefinir senha</IonLabel>
                    <IonItem>
                        <IonInput
                            value={email}
                            onIonChange={e => setEmail(e.detail.value!)}
                            placeholder="Digite seu email"
                            type="email"
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            value={password}
                            onIonChange={e => setPassword(e.detail.value!)}
                            placeholder="Nova senha"
                            type="password"
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            value={passwordConfirmation}
                            onIonChange={e => setPasswordConfirmation(e.detail.value!)}
                            placeholder="Confirme sua senha"
                            type="password"
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            value={token}
                            onIonChange={e => setToken(e.detail.value!)}
                            placeholder="Token de redefinição"
                            type="text"
                        />
                    </IonItem>
                    <IonButton onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Redefinindo..." : "Redefinir Senha"}
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

export default ResetPasswordPage;
