import React from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import './Profile.css';

function AuthorizePHApp() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Como Autorizar a PH Negócios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={true}>
          {/* Passo 1 */}
          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h3>1. Acesse o aplicativo FGTS</h3>
              <p>Abra o aplicativo FGTS oficial da Caixa Econômica Federal em seu celular.</p>
            </IonLabel>
          </IonItem>

          {/* Passo 2 */}
          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h3>2. Faça login</h3>
              <p>Entre com seu CPF e senha cadastrados. Caso não tenha uma conta, clique em "Cadastrar" e siga os passos.</p>
            </IonLabel>
          </IonItem>

          {/* Passo 3 */}
          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h3>3. Vá para "Autorizações"</h3>
              <p>No menu principal, selecione a opção "Autorizações" ou algo similar relacionado a compartilhamento de dados.</p>
            </IonLabel>
          </IonItem>

          {/* Passo 4 */}
          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h3>4. Adicione a PH Negócios</h3>
              <p>Na lista de empresas autorizadas, clique em "Adicionar nova autorização" e procure por "UY3 (457)".</p>
            </IonLabel>
          </IonItem>

          {/* Passo 5 */}
          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h3>5. Confirme a autorização</h3>
              <p>Revise as informações e confirme para permitir que a PH Negócios consulte seus dados do FGTS.</p>
            </IonLabel>
          </IonItem>

          {/* Passo 6 */}
          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h3>6. Verifique a autorização</h3>
              <p>Após concluir, verifique se a PH Negócios está listada como autorizada no aplicativo FGTS.</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </>
  );
}

export default AuthorizePHApp;
