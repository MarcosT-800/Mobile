import React, { useEffect, useRef, useState } from 'react';
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
  IonAlert,
  IonModal,
  IonTextarea,
  IonToast,
  IonButtons,
  IonText,
} from '@ionic/react';
import { chatbubbleEllipses, helpCircle, lockClosed, pin, settings, share, trash } from 'ionicons/icons';
import './Profile.css';
import './Notification.css';
import { camera } from 'ionicons/icons';
import { close, sendOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
function Example() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null); // Preview da imagem ou avatar selecionado
  const [selectedFile, setSelectedFile] = useState(null); // Arquivo selecionado (upload)
  const [selectedAvatar, setSelectedAvatar] = useState(null); // Avatar selecionado (URL)
  const [showOptions, setShowOptions] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
          setIsLoading(false);
      }, 3000); // Simula um carregamento de 3 segundos

      return () => clearTimeout(timer); // Limpa o timer ao desmontar
  }, []);
  // Ref para o input de arquivo
  const fileInputRef = useRef(null);

  const avatars = [
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar1.png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar2.png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar3.png',

    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image.png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (1).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (2).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (3).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (4).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (5).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (6).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (7).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (8).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (9).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (10).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (11).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (12).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (14).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (15).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (16).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (17).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (18).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (19).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (20).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (21).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (22).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (23).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (24).png',
    'https://phapp.phng.com.br/storage/profile_images/avatars/Avatar Image (25).png',


  ];

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      alert('Por favor, digite seu feedback.');
      return;
    }

    try {
      const response = await fetch('https://phapp.phng.com.br/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: feedback }),
      });

      if (response.ok) {
        setFeedback('');
        setToastMessage('Feedback enviado com sucesso!');
        setShowModal(false);
      } else {
        setToastMessage('Erro ao enviar feedback.');
        alert('Erro ao enviar feedback.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setToastMessage('Erro ao conectar com o servidor.');

    }
    setShowToast(true);

  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado!");
          return;
        }
        const response = await fetch("https://phapp.phng.com.br/api/user", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          localStorage.setItem("dadosUsuario", JSON.stringify(data));
        } else {
          throw new Error("Falha ao carregar os dados do usuário");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUser();
  }, []);

  // Quando o usuário seleciona um arquivo para upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedAvatar(null); // Limpa eventual avatar selecionado
      setImage(URL.createObjectURL(file));
    }
  };

  // Quando o usuário escolhe um avatar da lista
  const handleAvatarSelection = (avatar) => {
    setSelectedAvatar(avatar);
    setSelectedFile(null); // Limpa eventual arquivo selecionado
    setImage(avatar); // Mostra o avatar como preview
    setShowAvatars(false);
  };

  // Handler unificado para atualizar a foto (arquivo ou avatar)
  const handleUpdateImage = async () => {
    const token = localStorage.getItem("token");

    // Se um arquivo foi selecionado, realiza o upload via FormData
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('pessoa_hash', user.pessoa_hash);
      try {
        const response = await fetch('https://phapp.phng.com.br/api/upload-profile-image', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setUser((prevUser) => ({ ...prevUser, pessoa_image: data.image }));
          // Limpa os estados após o upload
          setImage(null);
          setSelectedFile(null);
        } else {
          const data = await response.json();
          console.error('Erro ao enviar imagem', data);
        }
      } catch (error) {
        console.error('Erro ao enviar a imagem:', error);
      }
    }
    // Se um avatar foi selecionado, atualiza via endpoint específico
    else if (selectedAvatar) {
      try {
        // Atenção: a chave enviada deve ser "avatar" e não "image"
        const response = await fetch('https://phapp.phng.com.br/api/upload-profile-avatar', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pessoa_hash: user.pessoa_hash,
            avatar: selectedAvatar
          })
        });
        if (response.ok) {
          const data = await response.json();
          setUser((prevUser) => ({ ...prevUser, pessoa_image: selectedAvatar }));
          setSelectedAvatar(null);
          setImage(null);
        } else {
          const data = await response.json();
          console.error('Erro ao atualizar avatar', data);
        }
      } catch (error) {
        console.error('Erro ao atualizar avatar:', error);
      }
    }
  };

  const whatsapp = () => {
    window.location.assign("https://api.whatsapp.com/send/?phone=1147651770&text&type=phone_number&app_absent=0");
};

  return (
    <>
    <IonHeader className="profile-header-container">
</IonHeader>
  <IonContent className="ion-padding-horizontal">
    <IonToast
      isOpen={showToast}
      onDidDismiss={() => setShowToast(false)}
      message={toastMessage}
      duration={3000}
      position="top"
      color={toastMessage.includes('sucesso') ? 'success' : 'danger'}
      className="custom-toast"
    />
    
    {/* Header com efeito de cartão flutuante */}
    <div className="profile-card-container">
      <div className="profile-card-content">
        {/* Input de arquivo oculto - mantendo a lógica original */}
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="file-input"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        
        {/* Área de imagem com animação de hover */}
        <div className="profile-image-container">
          <div className="profile-image-wrapper" onClick={() => setShowOptions(true)}>
            <img
              src={
                image
                  ? image
                  : user?.pessoa_image
                    ? user.pessoa_image.startsWith('http')
                      ? user.pessoa_image
                      : `https://phapp.phng.com.br/storage/profile_images/${user.pessoa_image}`
                    : 'https://phapp.phng.com.br/storage/profile_images/1738760051.png'
              }
              alt="Foto do Perfil"
              className="profile-image"
            />
            <div className="profile-image-overlay">
              <IonIcon icon={camera} className="camera-icon" />
            </div>
          </div>
        </div>

        {/* Informações do perfil com tipografia melhorada */}
        <div className="profile-info-container">
          <div className="profile-name-container">
            <h1 className="profile-name">{user ? user.name : 'Meu perfil'}</h1>
            <svg className="verified-badge" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18.5243 9.98997C18.5087 9.43206 18.3386 8.88883 18.032 8.42161C17.7263 7.95524 17.2962 7.58215 16.7901 7.34552C16.9827 6.82129 17.0233 6.25388 16.911 5.7072C16.7978 5.15965 16.5336 4.65529 16.1493 4.25024C15.7433 3.86593 15.2398 3.60252 14.6923 3.48852C14.1456 3.37624 13.5782 3.41683 13.054 3.60943C12.8182 3.10247 12.446 2.67152 11.9788 2.36579C11.5115 2.06006 10.9683 1.88906 10.4095 1.87524C9.85162 1.88993 9.31012 2.0592 8.84375 2.36579C8.37739 2.67238 8.00689 3.10333 7.77285 3.60943C7.24775 3.41683 6.67862 3.37452 6.13021 3.48852C5.5818 3.60079 5.07657 3.86506 4.67066 4.25024C4.28635 4.65615 4.0238 5.16138 3.91239 5.70806C3.80012 6.25474 3.8433 6.82215 4.03675 7.34552C3.5298 7.58215 3.09798 7.95438 2.79053 8.42074C2.48307 8.88711 2.31121 9.4312 2.2948 9.98997C2.31207 10.5487 2.48307 11.092 2.79053 11.5592C3.09798 12.0256 3.5298 12.3987 4.03675 12.6344C3.8433 13.1578 3.80012 13.7252 3.91239 14.2719C4.02466 14.8194 4.28635 15.3238 4.6698 15.7297C5.07571 16.1123 5.58007 16.3748 6.12675 16.488C6.67344 16.602 7.24085 16.5605 7.76507 16.3705C8.00171 16.8766 8.37394 17.3067 8.84116 17.6133C9.30753 17.919 9.85162 18.0892 10.4095 18.1047C10.9683 18.0909 11.5115 17.9207 11.9788 17.615C12.446 17.3093 12.8182 16.8775 13.054 16.3714C13.5756 16.5778 14.1473 16.627 14.6975 16.513C15.2468 16.399 15.7511 16.127 16.1484 15.7297C16.5457 15.3324 16.8186 14.8281 16.9326 14.2779C17.0466 13.7278 16.9973 13.1561 16.7901 12.6344C17.2962 12.3978 17.7263 12.0256 18.0328 11.5583C18.3386 11.092 18.5087 10.5479 18.5243 9.98997ZM9.25398 13.315L6.29257 10.3544L7.40925 9.22997L9.19871 11.0194L12.9987 6.87915L14.162 7.95524L9.25398 13.315Z" fill="#F01D1D" />
            </svg>
          </div>
          <p className="profile-subtitle">Detalhes</p>
        </div>

        {/* Botão de atualizar foto com hover effect */}
        {(selectedFile || selectedAvatar) && (
          <div className="update-button-container">
            <button
              onClick={handleUpdateImage}
              className="update-photo-button"
            >
              <span className="button-text">Atualizar Foto</span>
            </button>
          </div>
        )}
      </div>
    </div>

    {/* Alerta para escolher entre avatar e upload - mantendo a lógica original */}
    <IonAlert
      isOpen={showOptions}
      onDidDismiss={() => setShowOptions(false)}
      header={'Escolha uma opção'}
      buttons={[
        { text: 'Escolher Avatar', handler: () => setShowAvatars(true) },
        { text: 'Fazer Upload de Foto', handler: () => fileInputRef.current && fileInputRef.current.click() },
        { text: 'Cancelar', role: 'cancel' },
      ]}
      cssClass="custom-alert"
    />

    {/* Seleção de avatares com grid moderno */}
    {showAvatars && (
      <div className="avatar-selection-container">
        <div className="avatar-grid">
          {avatars.map((avatar, index) => (
            <div 
              key={index} 
              className="avatar-item-wrapper"
              onClick={() => handleAvatarSelection(avatar)}
            >
              <img
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className="avatar-item"
              />
            </div>
          ))}
        </div>
      </div>
    )}

    {/* FAQ com cards modernos e animados */}
    <div className="faq-section">
      <h2 className="section-title">Perguntas Frequentes</h2>
      <IonAccordionGroup className="faq-accordion-group">
        <IonAccordion value="faq1" className="faq-accordion">
          <IonItem slot="header" className="faq-item">
            <IonLabel className="faq-question">Quem é a PH negócios?</IonLabel>
          </IonItem>
          <div slot="content" className="faq-answer">
            <p>A PH Negócios é uma fintech com autorização que exerce serviços de FGTS de forma segura e rápida!</p>
          </div>
        </IonAccordion>
        
        <IonAccordion value="faq2" className="faq-accordion">
          <IonItem slot="header" className="faq-item">
            <IonLabel className="faq-question">Estou tendo erros para antecipar?</IonLabel>
          </IonItem>
          <div slot="content" className="faq-answer">
            <p>A maioria dos erros são por conta de informações preenchidas incorretamente no formulário. Verifique se seus dados estão realmente corretos; caso persista, entre em contato conosco.</p>
          </div>
        </IonAccordion>
        
        <IonAccordion value="faq3" className="faq-accordion">
          <IonItem slot="header" className="faq-item">
            <IonLabel className="faq-question">Não recebeu o link do seu contrato?</IonLabel>
          </IonItem>
          <div slot="content" className="faq-answer">
            <p>Caso você não tenha recebido o link do seu contrato, você pode encontrá-lo na aba "meus contratos". Clicando em um dos contratos, você poderá verificar se seu contrato foi bem sucedido e pegar o link.</p>
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </div>

    {/* Cards de ação com hover effects e sombras */}
    <div className="action-cards-section">
      <h2 className="section-title">Ações Rápidas</h2>
      {isLoading ? (
        <div className="skeleton-container">
          <div className="card-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-body"></div>
            <div className="skeleton-button"></div>
          </div>
          <div className="card-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-body"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      ) : (
        <div className="action-cards-grid">
          <div className="action-card" onClick={() => setShowModal(true)}>
            <div className="action-card-content">
              <div className="card-icon">
              <img src="/message.png" />      
              </div>
              <h3 className="card-title">Feedback</h3>
              <p className="card-description">Insira o seu feedback do app</p>
              <button className="card-button">
                <span>Saiba mais</span>
                <IonIcon  />
              </button>
            </div>
          </div>
          
          <div className="action-card" onClick={() => whatsapp()}>
            <Link to="https://api.whatsapp.com/send/?phone=1147651770&text&type=phone_number&app_absent=0" className="card-link">
              <div className="action-card-content">
                <div className="card-icon whatsapp-icon">
                    <img src="/whatsapp.png" />      
                </div>
                <h3 className="card-title">Fale Conosco</h3>
                <p className="card-description">Quer tirar alguma dúvida!</p>
                <button className="card-button">
                  <span>Fale conosco</span>
                  <IonIcon  />
                </button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>

    {/* Modal de feedback redesenhado */}
    <IonModal 
  isOpen={showModal} 
  onDidDismiss={() => setShowModal(false)}
  className="feedback-modal"
  breakpoints={[0, 1, 0.8]}
  initialBreakpoint={0.5}
>
<IonHeader className="ion-no-border feedback-header">
    <IonToolbar className="feedback-toolbar">
        <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(false)}>
                <IonIcon icon={close} className="close-icon" />
            </IonButton>
        </IonButtons>
        <IonTitle className="ion-text-center feedback-title">Seu Feedback</IonTitle>
    </IonToolbar>
    <div className="feedback-container">
        <IonText color="medium" className="feedback-text">
            <p className="ion-text-center">
                Sua opinião é muito importante para nós. Por favor, compartilhe seu feedback abaixo.
            </p>
        </IonText>

        <div className="textarea-wrapper ion-margin-vertical">
            <IonTextarea
                placeholder="Digite seu feedback aqui..."
                value={feedback}
                onIonChange={e => setFeedback(e.detail.value)}
                autoGrow
                className="custom-textarea"
                rows={4}
                maxlength={500}
            />
        </div>

        <div className="button-container">
            <IonButton 
                expand="block" 
                onClick={handleSubmit}
                className="submit-button"
                strong
            >
                <IonIcon icon={sendOutline} slot="start" className="send-icon" />
                Enviar Feedback
            </IonButton>

            <IonButton 
                expand="block" 
                fill="outline" 
                onClick={() => setShowModal(false)}
                className="cancel-button"
            >
                Cancelar
            </IonButton>
        </div>
    </div>
</IonHeader>
 
</IonModal>
  </IonContent>
    </>
  );
}

export default Example;
