class RecommendationCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const title = this.getAttribute('title');
        const description = this.getAttribute('description');
        const imgSrc = this.getAttribute('image-src');

        shadow.innerHTML = `
            <style>
                .recommendation-card {
                    border: 1px solid #eee;
                    border-radius: 12px;
                    padding: 24px;
                    text-align: center;
                    background-color: #fff;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .recommendation-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
                }
                img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    aspect-ratio: 16 / 9;
                    object-fit: cover;
                }
                h3 {
                    margin: 0.5rem 0;
                    color: #333;
                    font-size: 1.5rem;
                }
                p {
                    color: #666;
                    font-size: 1rem;
                    flex-grow: 1;
                }
            </style>
            <div class="recommendation-card">
                <div>
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
                <img src="${imgSrc}" alt="${title}">
            </div>
        `;
    }
}

if (!customElements.get('recommendation-card')) {
    customElements.define('recommendation-card', RecommendationCard);
}

function initRecommendations() {
    const exerciseRecommendation = document.getElementById('exercise-recommendation');
    const foodRecommendation = document.getElementById('food-recommendation');

    if (!exerciseRecommendation || !foodRecommendation) return;

    const exerciseData = {
        title: '오피스 스트레칭',
        description: '의자에 앉아 간단히 따라 할 수 있는 스트레칭으로 거북목을 예방하고 피로를 풀어보세요.',
        imageSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'
    };

    const foodData = {
        title: '건강한 점심: 퀴노아 샐러드',
        description: '슈퍼푸드 퀴노아와 신선한 채소로 비타민과 단백질을 보충하는 완벽한 점심 메뉴입니다.',
        imageSrc: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'
    };

    // 중복 추가 방지
    if (exerciseRecommendation.children.length === 0) {
        const exerciseCard = document.createElement('recommendation-card');
        exerciseCard.setAttribute('title', exerciseData.title);
        exerciseCard.setAttribute('description', exerciseData.description);
        exerciseCard.setAttribute('image-src', exerciseData.imageSrc);
        exerciseRecommendation.appendChild(exerciseCard);
    }

    if (foodRecommendation.children.length === 0) {
        const foodCard = document.createElement('recommendation-card');
        foodCard.setAttribute('title', foodData.title);
        foodCard.setAttribute('description', foodData.description);
        foodCard.setAttribute('image-src', foodData.imageSrc);
        foodRecommendation.appendChild(foodCard);
    }
}

// 스크립트가 로드되는 즉시 실행 (module은 이미 지연 실행됨)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRecommendations);
} else {
    initRecommendations();
}