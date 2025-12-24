import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const bgRef = useRef(null);

  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [noShake, setNoShake] = useState(false);
  const [fadeText, setFadeText] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const [rain, setRain] = useState([]);

  const noTexts = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Last chance!",
    "Okay fine... 😢"
  ];
  const [noTextIndex, setNoTextIndex] = useState(0);

  // Append static stars/moons into bgRef once
  useEffect(() => {
    const created = [];

    function createStar(x, y, color, filled, size) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.position = 'absolute';
      star.style.left = x + '%';
      star.style.top = y + '%';
      const s = Math.max(size, 14);
      star.style.width = s + 'px';
      star.style.height = s + 'px';
      star.style.pointerEvents = 'none';
      star.style.transform = 'translate(-50%, -50%)';
      star.style.animationDelay = Math.random() * 4 + 's';

      if (filled) {
        star.innerHTML = `
          <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        `;
      } else {
        star.innerHTML = `
          <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        `;
      }

      return star;
    }

    function createMoon(x, y, size) {
      const moon = document.createElement('div');
      moon.className = 'moon';
      moon.style.position = 'absolute';
      moon.style.left = x + '%';
      moon.style.top = y + '%';
      moon.style.width = size + 'px';
      moon.style.height = size + 'px';
      moon.style.pointerEvents = 'none';
      moon.style.transform = 'translate(-50%, -50%)';
      moon.style.animationDelay = Math.random() * 5 + 's';
      moon.innerHTML = `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="rgba(255,255,255,0.95)"/>
        </svg>
      `;
      return moon;
    }

    const stars = [
      {x: 8, y: 10, color: '#e8f5a0', filled: true, size: 22},
      {x: 18, y: 18, color: '#f0f5d0', filled: false, size: 20},
      {x: 60, y: 2, color: '#e8d5f0', filled: false, size: 24},
      {x: 85, y: 6, color: '#f0d5e8', filled: false, size: 20},
      {x: 88, y: 16, color: '#daea81ff', filled: true, size: 20},
      {x: 40, y: 20, color: '#fbc2eaff', filled: false, size: 22},
      {x: 70, y: 24, color: '#f5f0f0', filled: true, size: 18},
      {x: 38, y: 32, color: '#96b9e1ff', filled: false, size: 26},
      {x: 82, y: 34, color: '#f0f5d0', filled: true, size: 20},
      {x: 85, y: 48, color: '#e8e8e8', filled: false, size: 28},
      {x: 10, y: 58, color: '#82a1d1ff', filled: false, size: 22},
      {x: 32, y: 58, color: '#ca6494ff', filled: false, size: 20},
      {x: 68, y: 58, color: '#d792c2ff', filled: false, size: 20},
      {x: 18, y: 74, color: '#f0f0f5', filled: true, size: 16},
      {x: 8, y: 88, color: '#cbdd65ff', filled: false, size: 26},
      {x: 38, y: 88, color: '#f0d5e8', filled: false, size: 20},
      {x: 78, y: 88, color: '#a9c775ff', filled: false, size: 22},
      {x: 60, y: 95, color: '#f0d5e8', filled: false, size: 20},
      {x: 90, y: 92, color: '#87beecff', filled: true, size: 20},
      {x: 50, y: 40, color: '#de97caff', filled: true, size: 24},
    ];

    const moons = [
      {x: 12, y: 12, size: 18},
      {x: 32, y: 14, size: 16},
      {x: 58, y: 14, size: 20},
      {x: 18, y: 38, size: 22},
      {x: 56, y: 42, size: 18},
      {x: 88, y: 68, size: 24},
      {x: 22, y: 74, size: 18},
      {x: 60, y: 80, size: 16},
    ];

    const container = bgRef.current || document.body;

    stars.forEach(s => {
      const el = createStar(s.x, s.y, s.color, s.filled, s.size);
      container.appendChild(el);
      created.push(el);
    });

    moons.forEach(m => {
      const el = createMoon(m.x, m.y, m.size);
      container.appendChild(el);
      created.push(el);
    });

    return () => {
      created.forEach(n => n.remove());
    };
  }, []);
  const handleFlipClick = () => {
    setIsFlipped(prev => !prev);
  };

  const handleNoClick = () => {
    setNoShake(true);
    setTimeout(() => setNoShake(false), 400);

    setFadeText(true);
    setTimeout(() => {
      setNoTextIndex(prev => (prev + 1) % noTexts.length);
      setFadeText(false);
    }, 200);

    setNoScale(prev => (prev - 0.2 < 0 ? 0 : prev - 0.2));
    setYesScale(prev => prev + 0.2);

    // 🌧️ Tạo hiệu ứng mưa
    const newDrops = Array.from({ length: 40 }, () => ({
      id: Date.now() + Math.random(),
      left: Math.random() * 100,
      duration: Math.random() * 2 + 3,
      delay: Math.random() * 1
    }));
    setRain(prev => [...prev, ...newDrops]);

    // Tự động xóa hạt mưa sau vài giây
    setTimeout(() => {
      setRain([]);
    }, 4000);
  };

  
  const handleYesClick = () => {
    setIsBoxOpen(true);
    setTimeout(() => {
      setShowBlackScreen(true);
    }, 1000);
  };

  useEffect(() => {
    if (showBlackScreen) {
      const timer = setTimeout(() => {
        window.location.href = 'birthday-cake.html';
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showBlackScreen]);

  return (
    <div className="container fade-in">
      <div ref={bgRef} className="bg-decor" aria-hidden="true" />
    
     <div className="hero-image-wrap" aria-hidden="false">
       <img src="5c54acae29f3ad2eaf6fdea5c1d5d681-removebg-preview.png" alt="card" className="hero-image" />
     </div>
     <div className="cat-image-wrap" aria-hidden="false">
       <img src="ece263745c2c213602467068b7c7f127-removebg-preview.png" alt="cat" className="cat-image" />
     </div>
     <div className={`fall-image-wrap ${isFlipped ? 'flipped' : ''}`} onClick={handleFlipClick}>
  <div className="flip-card-inner">
    <div className="flip-card-front">
      <img src="ec335e0a3434b96ae025-removebg-preview.png" alt="fall" className="fall-image" />
    </div>
    <div className="flip-card-back">
      <img src="010a293c4302ce5c9713-removebg-preview.png" alt="grateful" className="fall-image" />
    </div>
  </div>
</div>
    
      <h1 className="question">Someone has sent you a gift. Wanna open it?</h1>

      <div className="button-group">
        <button
          className="btn yes-btn"
          onClick={handleYesClick}
          style={{
            transform: `scale(${yesScale})`,
            transition: 'transform 0.3s ease'
          }}
          
        >
          {/* Thêm 2 dòng này để tạo sao */}
  <span className="star-left">✦</span>
  <span className="star-right">✦</span>
          Yes
        </button>

        {noScale > 0 && (
          <button
            className={`btn no-btn ${noShake ? 'shake' : ''}`}
            onClick={handleNoClick}
            style={{
              transform: `scale(${noScale})`,
              opacity: noScale,
              transition: 'transform 0.3s ease, opacity 0.3s ease'
            }}
          >
            <span className="star-right">✦</span>
            <span className={`no-text ${fadeText ? 'fade' : ''}`}>
              {noTexts[noTextIndex]}
            </span>
          </button>
        )}
      </div>

      <div className="row">
        <div className="col-12 mt-5 d-flex justify-content-center">
          <div className="box floating">
            <div className={`box-body${isBoxOpen ? ' open' : ''}`}>
              <div className={`box-lid${isBoxOpen ? ' open' : ''}`}>
                <div className="box-bowtie"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🌧️ Hiệu ứng mưa */}
      {rain.map(drop => (
        <div
          key={drop.id}
          className="raindrop"
          style={{
            left: `${drop.left}%`,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`
          }}
        />
      ))}

      

      {showBlackScreen && <div className="black-screen" />}

    </div>
  );
}

export default App;