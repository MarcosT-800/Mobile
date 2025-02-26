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

function Example() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Como Habilitar o Saque-Aniversário</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={true}>
          {/* Passo 1 */}
          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h3>1. Baixe o aplicativo FGTS</h3>
              <p>Acesse a loja de aplicativos do seu celular (Google Play ou App Store) e faça o download do aplicativo FGTS oficial da Caixa Econômica Federal.</p>
            </IonLabel>
          </IonItem>

          {/* Passo 2 */}
          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h3>2. Faça o login</h3>
              <p>Use seu CPF e senha cadastrados. Caso ainda não tenha cadastro, clique em "Cadastrar" e siga as instruções para criar uma conta.</p>
            </IonLabel>
          </IonItem>

          {/* Passo 3 */}
          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h3>3. Acesse a opção "Saque-Aniversário"</h3>
              <p>No menu principal, procure pela opção "Saque-Aniversário" e clique nela para iniciar o processo de habilitação.</p>
            </IonLabel>
          </IonItem>

          {/* Passo 4 */}
          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h3>4. Leia as condições</h3>
              <p>Leia atentamente os termos e condições apresentados. Certifique-se de entender as regras antes de prosseguir.</p>
            </IonLabel>
          </IonItem>

          {/* Passo 5 */}
          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h3>5. Confirme a adesão</h3>
              <p>Clique no botão para confirmar a adesão ao Saque-Aniversário. Após isso, você estará habilitado para utilizar essa modalidade.</p>
            </IonLabel>
          </IonItem>

          {/* Passo 6 */}
          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
            <IonLabel>
              <h3>6. Verifique sua habilitação</h3>
              <p>Após concluir, você pode verificar sua habilitação na área "Saque-Aniversário" do aplicativo.</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </>
  );
}

export default Example;
