import React, { forwardRef } from 'react';
import { IonButton } from '@ionic/react';
import './Button.css';

// Defina a interface para as propriedades
interface ModalButtonProps {
  text: string; // Texto dinâmico do botão
  className?: string; // Classe CSS opcional
  onClick?: () => void; // Função de clique opcional
}

const ModalButton = forwardRef<HTMLIonButtonElement, ModalButtonProps>(
  ({ text, className, onClick, ...props }, ref) => {
    return (
      <IonButton
        id="open-modal"
        expand="block"
        className={`custom-button ${className || ''}`}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        <span className="button-text">{text}</span>
        <img className="button-arrow" src="/arrow.png" alt="Arrow" />
      </IonButton>
    );
  }
);

// Adiciona um display name para facilitar o debug
ModalButton.displayName = "ModalButton";

export default ModalButton;
