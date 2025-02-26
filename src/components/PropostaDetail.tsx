import React, { useEffect, useState } from 'react';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonAccordionGroup,
  IonAccordion,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import { chatbubbleEllipses, helpCircle, lockClosed, pin, settings, share, trash } from 'ionicons/icons';
import './Profile.css';
import './Notification.css';
import { camera } from 'ionicons/icons';

function Example({ idProposta }) {
  const [user, setUser] = useState(null);
  const formData = new FormData();
  formData.append('image', file); // Adiciona o arquivo real no FormData
  formData.append('pessoa_hash', user.pessoa_hash); // Certifique-se de enviar o hash ou id do usuário

  const token = localStorage.getItem("token");

  const response = await fetch('https://phapp.phng.com.br/api/upload-profile-image', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Imagem enviada com sucesso:', data);
    setUser((prevUser) => ({ ...prevUser, pessoa_image: data.image })); // Atualiza a imagem do perfil no estado
  } else {
    const data = await response.json();
    console.log(data);
    console.error('Erro ao enviar imagem');
  }
};


  return (
    <>
      <IonHeader>
      </IonHeader>
      <IonContent>

      </IonContent>
    </>
  );
}
export default Example;