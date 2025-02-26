import React, { useRef, useState, useEffect } from "react";
import { IonPage, IonContent } from "@ionic/react";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";
import "./Simulation3.css";
import { useHistory } from "react-router-dom";

function Simulation3() {
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory(); // Corrigido para obter o objeto history
  const [privacyChecked, setPrivacyChecked] = useState(false); // Estado para o primeiro checkbox
  const [dataShareChecked, setDataShareChecked] = useState(false); // Estado para o segundo checkbox

  useEffect(() => {
    localStorage.setItem(
      "1|QtWPNw7pTLz4mdwP9nVwcXpX6E892TqZpZbV36xu22d18f18",
      "1|QtWPNw7pTLz4mdwP9nVwcXpX6E892TqZpZbV36xu22d18f18" // Substitua por um token válido
    );
  }, []);
  
  useEffect(() => {
    setInterval(function() {
      localStorage.removeItem("erroSimulacao");
      localStorage.removeItem("simulationData");
    }, 30000);
  })
  const handleSimulate = async () => {
    if (!cpf || !birthDate) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Verifica se as checkboxes estão marcadas
    if (!privacyChecked || !dataShareChecked) {
      alert('Por favor, marque todas as opções obrigatórias.');
      return; // Impede o envio do formulário
    }

    console.log(localStorage.getItem("1|QtWPNw7pTLz4mdwP9nVwcXpX6E892TqZpZbV36xu22d18f18"));
    const dadosUsuario = localStorage.getItem("dadosUsuario");

    setIsLoading(true);
    try {
      const token = localStorage.getItem("1|QtWPNw7pTLz4mdwP9nVwcXpX6E892TqZpZbV36xu22d18f18"); // ou de onde você estiver armazenando o token
      const response = await fetch(`https://phapp.phng.com.br/api/simular-saldo-fgts/${cpf}`, {
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

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Salve os dados no localStorage
        if (data.success === true) {
          localStorage.setItem("simulationData", JSON.stringify(data));
          history.push("/simulation4");
        } else {
          localStorage.setItem("erroSimulacao", JSON.stringify(data));
          history.push("/error");
        }

        // Redirecione para a próxima página
      } else {
        history.push("/error");
      }
    } catch (error) {
      history.push("/error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
  <IonPage>
    <IonContent className="dados-page-content" scrollY>
      <nav className="dados-navbar">
        <Link to="/simulation2">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.3247 6.17496C17.8691 5.71935 17.1304 5.71935 16.6748 6.17496L9.67476 13.175C9.21915 13.6306 9.21915 14.3693 9.67476 14.8249L16.6748 21.8249C17.1304 22.2805 17.8691 22.2805 18.3247 21.8249C18.7803 21.3693 18.7803 20.6306 18.3247 20.175L12.1496 13.9999L18.3247 7.82488C18.7803 7.36926 18.7803 6.63057 18.3247 6.17496Z"
                fill="#D70404"
              />
            </svg>
          </button>
        </Link>
      </nav>
      
      <h3 className="dados-simular-title">Confira seus dados pessoais</h3>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="dados-content-container">
          <div className="dados-input-group">
            {/* CPF Input */}
            <label className="dados-label">CPF</label>
            <div className="dados-input-wrapper">
              <InputMask
                mask="999.999.999-99"
                placeholder="000.000.000-00"
                className="dados-input"
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>
            
            {/* Date of Birth Input */}
            <label className="dados-label2">Data de Nascimento</label>
            <div className="dados-input-wrapper">
              <InputMask
                mask="99/99/9999"
                placeholder="DD/MM/AAAA"
                className="dados-input"
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="dados-warner-container">
          <div className="dados-warner">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.0098 17C11.4575 17 11.0098 16.5523 11.0098 16V12C11.0098 11.4477 11.4575 11 12.0098 11C12.5621 11 13.0098 11.4477 13.0098 12V16C13.0098 16.5523 12.5621 17 12.0098 17ZM12 7C11.4477 7 11 7.44771 11 8C11 8.55228 11.4477 9 12 9H12.001C12.5533 9 13.001 8.55229 13.001 8C13.001 7.44772 12.5533 7 12.001 7H12Z"
                fill="#145F91"
              />
            </svg>
            <h3>Antes de continuar, precisamos que você leia e concorde com a politica de privacidade.</h3>
          </div>
        </div>
        
        <div className="dados-check-container">
          <div className="dados-check">
            <input
              type="checkbox"
              id="privacy-policy"
              checked={dataShareChecked}
              onChange={() => setDataShareChecked(!dataShareChecked)}
            />
            <label htmlFor="privacy-policy" className="dados-check-label">
              Li e estou de acordo com o aviso de privacidade e a política de serviços da PH negócios
            </label>
          </div>
          <div className="dados-check">
            <input
              type="checkbox"
              id="data-sharing"
              checked={privacyChecked}
              onChange={() => setPrivacyChecked(!privacyChecked)}
            />
            <label htmlFor="data-sharing" className="dados-check-label">
              Você concorda que a PH negócios compartilhe seus dados com o banco futuro para a simulação do saque aniversário?
            </label>
          </div>
        </div>
        
        <div className="dados-button-container">
          <button
            className={`dados-simular-button ${dataShareChecked && privacyChecked ? 'dados-pulse-animation' : ''}`}
            onClick={handleSimulate}
            disabled={isLoading || !dataShareChecked || !privacyChecked}
          >
            {isLoading ? "Carregando..." : "Simular"}
          </button>
        </div>
      </form>
    </IonContent>
  </IonPage>
</>
  );
}

export default Simulation3;
