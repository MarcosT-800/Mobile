import React, { useState, useEffect } from "react";
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
  IonText, 
  IonCard, 
  IonCardContent,
} from "@ionic/react";
import { notifications, share, trash, bookmark } from "ionicons/icons";
import "./Notification4.css";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [newNotification, setNewNotification] = useState(false);
  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem('dadosUsuario') || '{}') || { pessoa_cpf: '' };
  });

  const cpf = formData.pessoa_cpf;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`https://phapp.phng.com.br/api/getNotification/${cpf}`);
        if (!response.ok) {
          console.warn("Erro na requisição:", response.status);
          return;
        }
        const data = await response.json();
        if (data.message && Array.isArray(data.message)) {
          setNotifications(data.message);
          const hasUnread = data.message.some((item) => item.click === null);
          setNewNotification(hasUnread);
        }
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();
  }, [cpf]);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  return (
     <>
  <IonHeader className="notifications-header">
    <IonToolbar>
      <IonTitle className="page-title">Notificações</IonTitle>
    </IonToolbar>
  </IonHeader>

  <IonContent className="notifications-content">
    {/* Componente de carregamento Skeleton */}
    {notifications.length === 0 ? (
      <div className="skeleton-loading">
        {[1, 2, 3].map((item) => (
          <div key={item} className="skeleton-item">
            <div className="skeleton-header">
              <div className="skeleton skeleton-avatar"></div>
              <div className="skeleton-text">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-message"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : notifications.length > 0 ? (
      <IonList className="notifications-list">
        {notifications.map((notification) => (
          <IonItemSliding key={notification.id} className="notification-item-sliding notification-enter">
            <IonItem 
              button={true}
              onClick={() => handleNotificationClick(notification)}
              className="notification-item"
              detail={false}
            >
              <IonAvatar slot="start" className="notification-avatar">
                <img 
                  alt="Avatar" 
                  src={notification.avatar || "https://ionicframework.com/docs/img/demos/avatar.svg"}
                />
              </IonAvatar>
              <IonLabel className="notification-label">
                <h2>{notification.title || "Sem título"}</h2>
                <p>{notification.message}</p>
              </IonLabel>
            </IonItem>

            <IonItemOptions slot="end">
              <IonItemOption color="primary" className="notification-option">
                <IonIcon slot="icon-only" icon={bookmark}></IonIcon>
              </IonItemOption>
              <IonItemOption color="tertiary" className="notification-option">
                <IonIcon slot="icon-only" icon={share}></IonIcon>
              </IonItemOption>
              <IonItemOption color="danger" expandable={true} className="notification-option">
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonList>
    ) : (
      <div className="no-notifications">
        <IonIcon icon={notificationsOff} className="no-notifications-icon"></IonIcon>
        <h2 className="no-notifications-text">Nenhuma notificação</h2>
        <p className="no-notifications-subtext">Você não tem notificações no momento</p>
      </div>
    )}

    {selectedNotification && (
      <div className="notification-detail-container">
        <IonCard className="notification-detail-card">
          <IonCardContent>
            <div className="notification-detail-header">
              <IonAvatar className="detail-avatar">
                <img 
                  alt="Avatar" 
                  src={selectedNotification.avatar || "https://ionicframework.com/docs/img/demos/avatar.svg"}
                />
              </IonAvatar>
              <div className="detail-title">
                <h3>{selectedNotification.title || "Sem título"}</h3>
                <span className="detail-time">Agora</span>
              </div>
            </div>
            <div className="notification-detail-content">
              <p>{selectedNotification.message}</p>
            </div>
          </IonCardContent>
        </IonCard>
      </div>
    )}
  </IonContent>
</>
  );
};

export default NotificationsPage;