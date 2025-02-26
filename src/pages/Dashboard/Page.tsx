import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonInput,
  IonItem,
  IonList,
  IonLabel,
  IonIcon,
} from "@ionic/react";

import { IonCol, IonGrid, IonRow } from '@ionic/react';
import Notification from '../../components/Notification'; // Importando o componente Notification

import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './dashboard.css';
import { Link } from "react-router-dom";
import Notification2 from "../../components/Notification2";
import Notification3 from "../../components/Profile";
import Notification4 from "../../components/Notification4";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
function Dashboard() {
  const modal = useRef<HTMLIonModalElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50) {
      // Swipe para a esquerda (próximo card)
      setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    } else if (deltaX < -50) {
      // Swipe para a direita (card anterior)
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
    }
  };

  const [activeIndex, setActiveIndex] = useState(0); // Estado para controlar o card ativo
  const [activeIndex2, setActiveIndex2] = useState(0);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [propostas, setPropostas] = useState([]);
  const [cliente, setCliente] = useState("");
  const [isConsignadoOpen, setIsConsignadoOpen] = useState(false);
  const [isFgtsOpen, setIsFgtsOpen] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const toggleConsignado = () => setIsConsignadoOpen(!isConsignadoOpen);
  const toggleFgts = () => setIsFgtsOpen(!isFgtsOpen);
  const [newNotification, setNewNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
          setIsLoading(false);
      }, 3000); // Simula um carregamento de 3 segundos

      return () => clearTimeout(timer); // Limpa o timer ao desmontar
  }, []);



  useEffect(() => {

    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado!");
          return;
        }
        console.log("Token:", token);
        const response = await fetch("https://phapp.phng.com.br/api/user", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Dados do usuário:", data);
          setUser(data); // Define os dados do usuário no estado
          localStorage.setItem("dadosUsuario", JSON.stringify(data));
        } else {
          throw new Error("Falha ao carregar os dados do usuário");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };


    fetchUser();
  }, []); // Apenas executa uma vez, ao carregar o componente

  const [formData, setFormData] = useState<any>(() => {
    return JSON.parse(localStorage.getItem('dadosUsuario') || '{}') || {
      pessoa_cpf: ''
    };
  });

  console.log(formData.pessoa_cpf);

  const cpf = formData.pessoa_cpf;

  useEffect(() => {
    const fetchProposta = async () => {
      try {
        const response = await fetch(`https://phapp.phng.com.br/api/propostaCpf/${cpf}`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();

          setCliente(data.cliente);
          setPropostas(data.propostas);
        } else {
          console.error("Erro ao buscar propostas.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchProposta();

  }, []);





  const page = useRef(null);

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  async function canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  const obterSaudacao = () => {
    const horaAtual = new Date().getHours(); // Obtém a hora atual do sistema (0-23)

    if (horaAtual >= 6 && horaAtual < 12) {
      return 'Bom dia';
    } else if (horaAtual >= 12 && horaAtual < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  };
  useEffect(() => {
    handleSimulate();
  }, []);


  /* Obtendo oferta */

  const handleSimulate = async () => {
    const dadosUsuario = localStorage.getItem("dadosUsuario");
    const cpf = formData.pessoa_cpf;

    try {
      const token = localStorage.getItem("1|QtWPNw7pTLz4mdwP9nVwcXpX6E892TqZpZbV36xu22d18f18"); // ou de onde você estiver armazenando o token
      const response = await fetch(`https://phapp.phng.com.br/api/simular-saldo-fgts2/${cpf}`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ cpf, dateOfBirth: birthDate, dadosUsuario }),
      });
      console.log("fazendo response");


      if (response.ok) {
        const data = await response.json();
        console.log("Data . success" + data.success);
        // Salve os dados no localStorage
        if (data.success === true) {
          setTitle("🚀 Antecipação disponível! ✅ ");
          setMessage("Você já possui saldo para o antecipar clique e saiba mais!");
          console.log("Sucesso" + JSON.stringify(data));
          const simulation = localStorage.setItem("simulationData", JSON.stringify(data));

        } else {
          setTitle("Simulação 🔥")
          setMessage("Simule hoje mesmo para saber se você tem saldo no FGTS! Clique em antecipação para saber mais!");
          localStorage.removeItem("simulationData");
          localStorage.setItem("erroSimulacao", JSON.stringify(data));
          console.log("Erro" + JSON.stringify(data));
        }
        // Redirecione para a próxima página
      } else {
        /* console.log("deu erro"); */
        const data = await response.json();
        setTitle("Simulação 🔥")
        setMessage("Simule hoje mesmo para saber se você tem saldo no FGTS! Clique em antecipação para saber mais!");
        localStorage.setItem("erroSimulacao", JSON.stringify("data"));
        localStorage.removeItem("simulationData");
        console.log("Erro" + JSON.stringify("data"));
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("simulationData");
    } finally {
      /* console.log("finaly não tinha o que colocar"); */
    }
  };



  useEffect(() => {
    const notification = async () => {
      try {
        const response = await fetch(`https://phapp.phng.com.br/api/getNotification/${cpf}`, {
          method: "GET",
        });

        if (!response.ok) {
          console.warn("Erro na requisição:", response.status);
          return;
        }

        const data = await response.json();

        if (data.message && Array.isArray(data.message)) {
          // Verifica se há alguma notificação com `click === null`
          const hasUnread = data.message.some((item) => item.click === null);

          setNewNotification(hasUnread);
          console.log("🔔 Notificações não lidas:", hasUnread);
        } else {
          console.warn("Estrutura inesperada na resposta:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    notification();
  }, [cpf]); // Adicionando `cpf` como dependência

  return (
    <>
      <IonPage>
        <IonContent className="custom-dash-content" scrollY>
          <div className="custom-dash-content">
            <div className="custom-dash-menu">
            <nav className="dash-navbar">
    <div className="navbar-profile">
        <div className="profile-avatar" onClick={() => setShowModal3(true)}>
            <img
                src={user?.pessoa_image ? `https://phapp.phng.com.br/storage/profile_images/${user.pessoa_image}` : 'https://phapp.phng.com.br/storage/profile_images/1738760051.png'}
                alt="Avatar"
                className="avatar-img"
            />
        </div>
        <div className="profile-info">
            <p className="greeting-text">{obterSaudacao()}!</p>
            <p className="user-name">{user ? user.name : "Carregando..."}</p>
        </div>
    </div>
    <div className="navbar-notifications" onClick={() => setShowModal4(true)}>
        <div className="notification-wrapper">
            <img src="/icon-bell.png" alt="Notificação" className="notification-icon" />
            {newNotification && <span className="notification-badge"></span>}
        </div>
    </div>
</nav>
            </div>

            {/*             <p className="custom-dash-p-sejabemvindo" data-text="Seja bem-vindo ao App PH Negócios!">Seja bem-vindo ao App PH Negócios!</p>
 */}
            <div className="custom-dash-content-cards">
              <IonGrid fixed={true}>
                <IonRow>
                  <IonCol>
                    <Link to="/simulation1">
                      <div className={`custom-dash-card ${activeIndex === 0 ? "active" : ""}`}
                        onClick={() => setActiveIndex(0)}>
                        <span>

                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 14.6667C8.5 15.9553 9.54467 17 10.8333 17H13C14.3807 17 15.5 15.8807 15.5 14.5C15.5 13.1193 14.3807 12 13 12H11C9.61929 12 8.5 10.8807 8.5 9.5C8.5 8.11929 9.61929 7 11 7H13.1667C14.4553 7 15.5 8.04467 15.5 9.33333M12 5.5V7M12 17V18.5M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>

                        </span>

                        <p>Antecipação FGTS</p>
                      </div>
                    </Link>
                  </IonCol>

                  <IonCol>
                    <Link to="/proposta1">
                      <div className={`custom-dash-card ${activeIndex === 1 ? "active" : ""}`}
                        onClick={() => setActiveIndex(1)}
                      >
                        <span>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 9L21 3M21 3H15M21 3L13 11M10 5H7.8C6.11984 5 5.27976 5 4.63803 5.32698C4.07354 5.6146 3.6146 6.07354 3.32698 6.63803C3 7.27976 3 8.11984 3 9.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>

                        </span>
                        <p>Meus Contratos</p>
                      </div>
                    </Link>
                  </IonCol>

                  <IonCol>
                    <div className={`custom-dash-card ${activeIndex === 2 ? "active" : ""}`}
                      onClick={() => setShowModal3(true)}>
                      <span>

                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M16 2.66667C12.4638 2.66667 9.0724 4.07143 6.57191 6.57191C4.07143 9.0724 2.66667 12.4638 2.66667 16C2.66667 19.5362 4.07143 22.9276 6.57191 25.4281C6.9552 25.8114 7.35941 26.1689 7.78187 26.4996C7.79891 26.5139 7.81637 26.5275 7.83419 26.5403C10.1586 28.3412 13.0282 29.3333 16 29.3333C18.9723 29.3333 21.8422 28.3409 24.1669 26.5395C24.1839 26.5272 24.2007 26.5142 24.217 26.5005C24.6399 26.1696 25.0445 25.8117 25.4281 25.4281C27.9286 22.9276 29.3333 19.5362 29.3333 16C29.3333 12.4638 27.9286 9.0724 25.4281 6.57191C22.9276 4.07143 19.5362 2.66667 16 2.66667ZM23.6839 24.6406C23.852 24.4911 24.0162 24.3362 24.1762 24.1762C26.3447 22.0078 27.5629 19.0667 27.5629 16C27.5629 12.9333 26.3447 9.99225 24.1762 7.82378C22.0078 5.65531 19.0667 4.43707 16 4.43707C12.9333 4.43707 9.99225 5.65531 7.82378 7.82378C5.65531 9.99225 4.43707 12.9333 4.43707 16C4.43707 19.0667 5.65531 22.0078 7.82378 24.1762C7.98377 24.3362 8.14797 24.491 8.31611 24.6406C9.26687 23.8087 10.3478 23.1356 11.5175 22.6489C12.938 22.0579 14.4614 21.7537 16 21.7537C17.5385 21.7537 19.0619 22.0579 20.4824 22.6489C21.6521 23.1356 22.7331 23.8088 23.6839 24.6406ZM9.76262 25.7364C11.61 26.9198 13.7718 27.5629 16 27.5629C18.2281 27.5629 20.39 26.9198 22.2373 25.7364C21.501 25.1389 20.6812 24.6491 19.8024 24.2835C18.5974 23.7822 17.3051 23.5241 16 23.5241C14.6948 23.5241 13.4026 23.7822 12.1976 24.2835C11.3187 24.6491 10.4989 25.1389 9.76262 25.7364ZM11.2664 8.77677C12.5218 7.52134 14.2246 6.81604 16 6.81604C17.7754 6.81604 19.4782 7.52134 20.7336 8.77677C21.989 10.0322 22.6943 11.7349 22.6943 13.5104C22.6943 15.2858 21.989 16.9885 20.7336 18.244C19.4782 19.4994 17.7754 20.2047 16 20.2047C14.2246 20.2047 12.5218 19.4994 11.2664 18.244C10.011 16.9885 9.30567 15.2858 9.30567 13.5104C9.30567 11.7349 10.011 10.0322 11.2664 8.77677ZM16 8.58645C14.6941 8.58645 13.4417 9.10522 12.5183 10.0286C11.5948 10.952 11.0761 12.2045 11.0761 13.5104C11.0761 14.8163 11.5948 16.0687 12.5183 16.9921C13.4417 17.9155 14.6941 18.4343 16 18.4343C17.3059 18.4343 18.5583 17.9155 19.4817 16.9921C20.4052 16.0687 20.9239 14.8163 20.9239 13.5104C20.9239 12.2045 20.4052 10.952 19.4817 10.0286C18.5583 9.10522 17.3059 8.58645 16 8.58645Z" fill="white" />
                        </svg>
                      </span>
                      <p>Meus <br />Dados</p>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </div>


          <div className="custom-dash-products">
          <IonCard className="notification-card">
        <IonCardHeader className="notification-header">
            <p className="see-all" onClick={() => setShowModal(true)}>Ver tudo</p>
            <IonCardTitle className="notification-title">Informações</IonCardTitle>
        </IonCardHeader>
        {isLoading ? (
            <IonCardContent className="notification-skeleton">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-text-container">
                    <div className="skeleton-text short"></div>
                    <div className="skeleton-text long"></div>
                </div>
            </IonCardContent>
        ) : (
            <IonCardContent className="notification-content" onClick={() => setShowModal(true)}>
                <img
                    src="https://phapp.phng.com.br/storage/profile_images/Avatar1.png"
                    alt="Notificação"
                    className="notification-avatar"
                />
                <div className="notification-text">
                    <h3 className="notification-message-title">{title || "Carregando"}</h3>
                    <p className="notification-message">{message || "Estamos verificando se você possui saldo no FGTS, caso tenha em breve será carregado aguarde um momento..."}</p>
                </div>
            </IonCardContent>
        )}
    </IonCard>

            <div className="description-services">
            </div>
            {/* <h3>Em desenvolvimento</h3>
<a href="https://wa.me/1147651770" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}><p>Saiba mais</p></a>
</div> */}

            {/* <IonList style={{ onBlur: '25px'}}>
        <IonItem button onClick={toggleConsignado} style={{ borderBottom: '1px solid #ddd', padding: '15px' }}>
          <IonLabel>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#3c3c3c' }}>Empréstimo Consignado</h2>
          </IonLabel>
          <IonIcon icon={isConsignadoOpen ? removeCircleOutline : addCircleOutline} style={{ fontSize: '24px', color: 'red' }} />
        </IonItem>
        {isConsignadoOpen && (
          <IonCard style={{ margin: '10px 0', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
            <IonCardContent>
              <h3 style={{ color: 'red' }}>O que é um Empréstimo Consignado?</h3>
              <p style={{ color: '#555' }}>O empréstimo consignado é um tipo de crédito pessoal onde as parcelas são descontadas diretamente da sua folha de pagamento ou benefício. Isso garante taxas de juros mais baixas, pois o risco para a instituição financeira é menor.</p>
              <h4 style={{ color: '#333', fontWeight: 'bold' }}>Vantagens:</h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#333' }}>
                <li>Taxas de juros mais baixas.</li>
                <li>Desconto direto em folha de pagamento.</li>
                <li>Facilidade na aprovação.</li>
              </ul>
              <p style={{ color: '#555' }}>É ideal para quem precisa de crédito de forma rápida e com menos burocracia.</p>
            </IonCardContent>
          </IonCard>
        )}

       
        <IonItem button onClick={toggleFgts} style={{ borderBottom: '1px solid #ddd', padding: '15px' }}>
          <IonLabel>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#3c3c3c' }}>FGTS (Fundo de Garantia do Tempo de Serviço)</h2>
          </IonLabel>
          <IonIcon icon={isFgtsOpen ? removeCircleOutline : addCircleOutline} style={{ fontSize: '24px', color: 'red' }} />
        </IonItem>
        {isFgtsOpen && (
          <IonCard style={{ margin: '10px 0', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
            <IonCardContent>
              <h3 style={{ color: 'red' }}>O que é o FGTS?</h3>
              <p style={{ color: '#555' }}>O FGTS é um direito do trabalhador que visa garantir a segurança financeira em momentos de desemprego ou outras situações específicas. Ele é formado por depósitos mensais feitos pelo empregador em uma conta vinculada ao trabalhador.</p>
              <h4 style={{ color: '#333', fontWeight: 'bold' }}>Usos do FGTS:</h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#333' }}>
                <li>Compra da casa própria.</li>
                <li>Empréstimos ou saques para situações de emergência.</li>
                <li>Retirada em casos de demissão sem justa causa.</li>
              </ul>
              <p style={{ color: '#555' }}>Você pode utilizar seu saldo do FGTS para diversos fins, como a antecipação de valores ou até mesmo empréstimos consignados, dependendo da instituição financeira.</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonList> */}
        <div className="description-services">
  <h3>Produtos</h3>
</div>

<div className="carousel-container" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
  <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
    {/* Card 1 */}
    <div className="carousel-item">
      <img alt="Cartão Benefício" src="/baner1.png" className="carousel-image" />
      <div className="carousel-content">
        <p className="carousel-title">Cartão Benefício</p>
        <p className="carousel-description">Em breve você terá a opção de solicitar o seu cartão benefício aqui no app!</p>
        <button className="carousel-button">
          <a href="https://phng.com.br" className="carousel-link">Em breve</a>
        </button>
      </div>
    </div>

    {/* Card 2 */}
    <div className="carousel-item">
      <img alt="Antecipação FGTS" src="/baner2.png" className="carousel-image" />
      <div className="carousel-content">
        <p className="carousel-title">Está precisando de um dinheiro extra?</p>
        <p className="carousel-description">Sem complicações aqui você consegue de forma rápida e segura antecipar o seu FGTS hoje mesmo!</p>
        <Link to="/simulation3">
          <button className="carousel-button">
            <span className="carousel-link">Saiba mais</span>
          </button>
        </Link>
      </div>
    </div>

    {/* Card 3 */}
    <div className="carousel-item">
      <img alt="Aprovação rápida" src="/baner3.png" className="carousel-image" />
      <div className="carousel-content">
        <p className="carousel-title">A aprovação é feita em menos de segundos</p>
        <p className="carousel-description">Logo após a aprovação você consegue verificar o status de seu contrato na aba contratos.</p>
        <Link to="/simulation3">
          <button className="carousel-button">
            <span className="carousel-link">Simular</span>
          </button>
        </Link>
      </div>
    </div>
  </div>
  
  {/* Indicadores de navegação */}
  <div className="carousel-indicators">
    {[0, 1, 2].map((index) => (
      <div 
        key={index} 
        className={`carousel-indicator ${currentIndex === index ? 'active' : ''}`}
        onClick={() => setCurrentIndex(index)}
      ></div>
    ))}
  </div>
</div>
          </div>

        </IonContent>
      </IonPage>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} className="modal-dashboard1" initialBreakpoint={1} breakpoints={[0, 1]} >
        <Notification /> {/* Exibe o componente Notification dentro do modal */}
      </IonModal>


      <IonModal isOpen={showModal2} onDidDismiss={() => setShowModal2(false)} className="modal-dashboard1" initialBreakpoint={1} breakpoints={[0, 1]} >
        <Notification2 />
        <IonButton onClick={() => setShowModal2(false)} expand="block" color="danger" className="custom-button-modal3" style={{ alignSelf: 'center', marginBottom: '20px', width: '90%' }}>
          Fechar
        </IonButton>
      </IonModal>

      <IonModal isOpen={showModal3} onDidDismiss={() => setShowModal3(false)} className="modal-dashboard1" initialBreakpoint={1} breakpoints={[0, 1]} >
        <Notification3 />
        <IonButton onClick={() => setShowModal3(false)} expand="block" color="danger" className="custom-button-modal3" style={{ alignSelf: 'center', marginBottom: '20px', width: '90%' }}>
          Fechar
        </IonButton>
      </IonModal>

      <IonModal isOpen={showModal4} onDidDismiss={() => setShowModal4(false)} className="modal-dashboard1" initialBreakpoint={1} breakpoints={[0, 1]} >
        <Notification4 />
        <IonButton onClick={() => setShowModal4(false)} expand="block" color="danger" className="custom-button-modal3" style={{ alignSelf: 'center', marginBottom: '20px', width: '90%' }}>
          Fechar
        </IonButton>
      </IonModal>
    </>
  );
}

export default Dashboard;
