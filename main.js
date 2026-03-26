
class RecommendationCard extends HTMLElement {
    constructor() {
        super();
        // Shadow DOM을 생성합니다.
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // 컴포넌트가 DOM에 추가될 때 이 코드가 실행됩니다.
        // 이제 속성 값에 안전하게 접근할 수 있습니다.
        const shadow = this.shadowRoot;

        const title = this.getAttribute('title');
        const description = this.getAttribute('description');
        const imgSrc = this.getAttribute('image-src');

        // 스타일과 HTML 구조를 한 번에 설정합니다.
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

// 커스텀 엘리먼트를 정의합니다.
customElements.define('recommendation-card', RecommendationCard);

// DOM이 로드되면 추천 카드를 생성합니다.
document.addEventListener('DOMContentLoaded', () => {
    const exerciseRecommendation = document.getElementById('exercise-recommendation');
    const foodRecommendation = document.getElementById('food-recommendation');

    // 표시할 데이터입니다. 이미지 URL을 더 안정적인 소스로 변경했습니다.
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

    // 운동 추천 카드를 생성하고 추가합니다.
    const exerciseCard = document.createElement('recommendation-card');
    exerciseCard.setAttribute('title', exerciseData.title);
    exerciseCard.setAttribute('description', exerciseData.description);
    exerciseCard.setAttribute('image-src', exerciseData.imageSrc);
    exerciseRecommendation.appendChild(exerciseCard);

    // 음식 추천 카드를 생성하고 추가합니다.
    const foodCard = document.createElement('recommendation-card');
    foodCard.setAttribute('title', foodData.title);
    foodCard.setAttribute('description', foodData.description);
    foodCard.setAttribute('image-src', foodData.imageSrc);
    foodRecommendation.appendChild(foodCard);
});
