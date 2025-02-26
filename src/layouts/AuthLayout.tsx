import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter } from '@ionic/react';

interface MainLayoutProps {
  title: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ title, children }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
      <IonFooter>
        <IonToolbar>
          <p style={{ textAlign: 'center' }}>© 2025 PH Negócios</p>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default MainLayout;
