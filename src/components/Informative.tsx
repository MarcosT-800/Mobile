import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonIcon,
  IonBadge,
  IonSkeletonText,
  IonChip
} from '@ionic/react';
import { 
  timeOutline, 
  newspaper, 
  linkOutline, 
  arrowForward,
  trendingUp,
  ribbonOutline
} from 'ionicons/icons';
import './Informative.css';

const NewsPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  // Simulated news data
  const news = [
    {
      id: 1,
      category: 'destaque',
      title: 'PH Negócios expande operações para novos estados',
      subtitle: 'Crescimento e Expansão',
      content: 'Com foco em crescimento sustentável, a PH Negócios anuncia expansão de suas operações...',
      image: '/informative.avif',
      date: '29/04/2024',
      featured: true,
      link: 'https://oglobo.globo.com/patrocinado/dino/noticia/2024/04/29/ph-negocios-lanca-fidc-com-objetivo-de-captar-r-200-milhoes.ghtml'
    },
    {
      id: 2,
      category: 'mercado',
      title: 'Inovação em correspondência bancária',
      subtitle: 'Tecnologia e Inovação',
      content: 'PH Negócios lança FIDC com objetivo de captar R$ 200 milhões',
      image: '/papelph.jfif',
      date: '29/04/2024',
      link: 'https://www.folhavitoria.com.br/geral/ph-negocios-lanca-fidc-com-objetivo-de-captar-r-200-milhoes/'
    },
    // Add more news items as needed
  ];

  const categories = [
    { id: 'all', name: 'Todas' },
   /*  { id: 'destaque', name: 'Destaques' },
    { id: 'mercado', name: 'Mercado' },
    { id: 'tecnologia', name: 'Tecnologia' },
    { id: 'parceiros', name: 'Parceiros' } */
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <>
      <IonHeader className="news-header">
        <IonToolbar>
          <IonTitle className="news-title">
            <IonIcon icon={newspaper} className="news-title-icon" />
            PH News
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="news-content">
        {/* Featured News Banner */}
        <div className="featured-banner">
          <div className="featured-content">
            <IonBadge color="danger" className="featured-badge">
              <IonIcon icon={ribbonOutline} /> Destaque
            </IonBadge>
            <h1>Excelência em Correspondência Bancária</h1>
            <p>Conheça nossa trajetória de sucesso e inovação no mercado financeiro</p>
            <a href='https://phng.com.br'>
            <button className="learn-more-btn">
              Saiba mais
              <IonIcon icon={arrowForward} />
            </button>
            </a>
          </div>
        </div>

        {/* Categories Scroll */}
        <div className="categories-scroll">
          {categories.map(category => (
            <IonChip
              key={category.id}
              className={`category-chip ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </IonChip>
          ))}
        </div>

        {/* News Grid */}
        <div className="news-grid">
          {loading ? (
            // Skeleton loading
            [...Array(6)].map((_, i) => (
              <IonCard key={i} className="news-card skeleton">
                <div className="skeleton-image">
                  <IonSkeletonText animated style={{ width: '100%', height: '200px' }} />
                </div>
                <IonCardHeader>
                  <IonSkeletonText animated style={{ width: '40%' }} />
                  <IonSkeletonText animated style={{ width: '80%' }} />
                </IonCardHeader>
              </IonCard>
            ))
          ) : (
            // Actual news cards
            news.map(item => (
              <IonCard key={item.id} className="news-card">
                <div className="card-image-container">
                  <img src={item.image} alt={item.title} />
                  {item.featured && (
                    <div className="trending-badge">
                      <IonIcon icon={trendingUp} />
                      Trending
                    </div>
                  )}
                </div>
                <IonCardHeader>
                  <IonCardSubtitle className="news-category">
                    <IonIcon icon={timeOutline} />
                    {item.date}
                  </IonCardSubtitle>
                  <IonCardTitle>{item.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>{item.content}</p>
                  <a href={item.link} className="read-more">
                    Ler mais <IonIcon icon={linkOutline} />
                  </a>
                </IonCardContent>
              </IonCard>
            ))
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <h2>Fique por dentro das novidades</h2>
            <p>Receba atualizações sobre o mercado financeiro e nossas soluções</p>
            <div className="subscription-form">
              <input type="email" placeholder="Seu melhor e-mail" />
              <button>Inscrever-se</button>
            </div>
          </div>
        </div>
      </IonContent>
    </>
  );
};

export default NewsPage;