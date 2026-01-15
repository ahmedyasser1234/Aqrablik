import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackgroundEffects from '../components/BackgroundEffects';
import { useLanguage } from '../context/LanguageContext';

// تعريف مكونات فرعية خارج Home
const Hero = () => {
  const { t, language } = useLanguage();
  const sliderRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderData = [
    { name: t('service.motion'), path: '/services/motion-graphics', image: 'arct.png' },
    { name: t('service.montage'), path: '/services/montage', image: 'glax.png' },
    { name: t('service.photography'), path: '/services/photography', image: 'sharik.png' },
    { name: t('service.studio'), path: '/services/studio-rental', image: 'shelter.png' },
    { name: t('service.web'), path: '/services/web-design', image: 'arct.png' },
    { name: t('service.content'), path: '/services/content-writing', image: 'glax.png' },
    { name: t('service.marketing'), path: '/services/marketing', image: 'sharik.png' },
  ];

  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const targetItem = container.children[index];
      if (targetItem) {
        const targetScroll = targetItem.offsetLeft - (container.clientWidth / 2) + (targetItem.offsetWidth / 2);
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const percentage = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollPos(percentage);

      const containerCenter = scrollLeft + clientWidth / 2;
      const items = Array.from(sliderRef.current.children);
      let closestIndex = 0;
      let minDistance = Infinity;

      items.forEach((item, index) => {
        const element = item;
        const itemCenter = element.offsetLeft + element.offsetWidth / 2;
        const distance = Math.abs(containerCenter - itemCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
      
      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const nextIndex = (activeIndex + 1) % sliderData.length;
        scrollToIndex(nextIndex);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, sliderData.length]);

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: 'transparent' }}>
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
          
          {/* استخدام classes متوافقة مع الـ RTL/LTR */}
          <div className={`flex flex-col ${language === 'ar' ? 'items-start text-right' : 'items-end text-left'} w-fit relative`}>
            
            {/* الشهاب المتحرك دورانياً حول النص بالكامل */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 z-50 animate-orbit pointer-events-none">
              <img 
                src="/images/Asset 1.png" 
                alt="شهاب مداري" 
                className="w-full h-full object-contain brightness-110 contrast-125 drop-shadow-[0_0_10px_rgba(232,232,232,0.1)]"
              />
            </div>

            {/* جملة "خرجنا من الصندوق بــــ" */}
            <div className="flex items-center gap-4 mb-2 opacity-80 relative">
              <p className="text-xl md:text-2xl font-light text-white/90 whitespace-nowrap">
                {t('hero.out_of_box')}
              </p>
              <span className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-white/60 to-transparent block"></span>
            </div>

            <div className="relative mb-8">
              {/* النيزك - يظهر على الجانب المعاكس حسب اللغة */}
              <div className={`absolute ${language === 'ar' ? '-left-16 md:-left-44' : '-right-16 md:-right-44'} top-1/2 -translate-y-1/2 w-48 h-48 md:w-44 md:h-44 animate-float z-20 pointer-events-none`}>
                <img 
                  src="/images/Asset 1.png" 
                  alt="نيزك ثابت" 
                  className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.15)] brightness-90"
                  onError={(e) => {
                    e.target.src = "https://cdn-icons-png.flaticon.com/512/2534/2534124.png";
                    e.target.className += " invert opacity-10";
                  }}
                />
              </div>
              <br />
              <h1 className="text-4xl md:text-[7rem] text-white glow-text leading-[0.85]">
                {t('hero.title')}
              </h1>
            </div>

            <div className="max-w-2xl space-y-4" style={{ paddingRight: language === 'ar' ? '0.25rem' : '0' }}>
              <p className="text-lg md:text-2xl text-white/70 leading-relaxed font-light">
                {t('hero.desc1')}
              </p>
              <p className="text-lg md:text-2xl text-white/70 leading-relaxed font-light">
                {t('hero.desc2')}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-[800px] bg-blue-500/5 rounded-full blur-[180px] pointer-events-none"></div>
      </section>

      <section className="relative min-h-screen py-32 flex flex-col items-center overflow-hidden">
        <div className="z-50 mb-16">
          <Link to="/services">
            <button className="px-14 py-4 rounded-2xl bg-[#1a1b26]/60 border border-blue-500/50 text-blue-400 text-4xl font-bold shadow-[0_0_35px_rgba(59,130,246,0.3)] backdrop-blur-xl transition-all hover:scale-105 active:scale-95">
              {t('nav.discover')}
            </button>
          </Link>
        </div>

        <div className="relative w-full max-w-full flex items-center justify-center">
          {/* النيزك الأيسر - يتغير حسب اللغة */}
          <div className={`absolute ${language === 'ar' ? 'left-10' : 'right-10'} top-1/3 w-32 h-32 md:w-48 md:h-48 z-10 animate-float opacity-90 pointer-events-none`}>
            <img src="/images/Asset 1.png" className="w-full h-full object-contain -rotate-12" />
          </div>

          {/* النيزك الأيمن - يتغير حسب اللغة */}
          <div className={`absolute ${language === 'ar' ? 'right-10' : 'left-10'} top-1/2 w-28 h-28 md:w-40 md:h-40 z-10 animate-float opacity-80 pointer-events-none`} style={{ animationDelay: '1.5s' }}>
            <img src="/images/Asset 1.png" className="w-full h-full object-contain rotate-[140deg]" />
          </div>

          {/* رائد الفضاء - يتحرك في الاتجاه المعاكس حسب اللغة */}
          <div 
            className="absolute z-40 top-1/2 left-1/2 pointer-events-none transition-transform duration-500 ease-out flex flex-col items-center"
            style={{ 
              transform: `translate(calc(-50% + ${(scrollPos - 0.5) * (language === 'ar' ? 150 : -150)}px), -5%)`,
            }}
          >
            <div className="relative w-[100px] md:w-[240px] animate-float">
              <img 
                src="/images/ccc.png" 
                alt="رائد فضاء" 
                className={`w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${language === 'en' ? 'scale-x-[-1]' : ''}`}
                onError={(e) => {
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/2026/2026440.png";
                  e.target.className += " invert opacity-20";
                }}
              />
              {/* النيزك الصغير - يتغير موضعه حسب اللغة */}
              <div className={`absolute ${language === 'ar' ? '-left-12' : '-right-12'} bottom-10 w-16 h-16 animate-float opacity-90`} style={{ animationDelay: '0.5s' }}>
                <img src="/images/Asset 1.png" className="w-full h-full object-contain rotate-90" />
              </div>
            </div>
          </div>

          {/* السلايدر */}
          <div 
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto py-20 px-[35vw] scrollbar-hide snap-x snap-mandatory w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {sliderData.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <Link 
                  key={index} 
                  to={service.path}
                  className={`flex-shrink-0 w-[80vw] md:w-[550px] aspect-video rounded-2xl border-4 bg-[#161720]/40 backdrop-blur-sm overflow-hidden snap-center relative transition-all duration-500 block group ${
                    isActive 
                      ? 'border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.2)] scale-100 opacity-100' 
                      : 'border-blue-500/20 scale-95 opacity-80'
                  } hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]`}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent pointer-events-none"></div>
                  <img 
                    src={`/images/${service.image}`} 
                    alt={service.name}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      isActive 
                        ? 'opacity-70 group-hover:opacity-100 blur-0' 
                        : 'opacity-40 blur-sm'
                    }`}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  {/* النص داخل البطاقة - يتغير توجيهه حسب اللغة */}
                  <div className={`absolute inset-0 flex flex-col justify-end p-10 ${language === 'ar' ? 'text-right' : 'text-left'} bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                     <h3 className="text-2xl font-bold text-white mb-2 transition-transform group-hover:-translate-y-1">{service.name}</h3>
                     <div className={`w-12 h-1 bg-blue-500 rounded-full ${language === 'ar' ? 'mr-auto' : 'ml-auto'} transition-all group-hover:w-20`}></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* نقاط التنقل للسلايدر */}
        <div className="mt-10 flex gap-3 z-50">
          {sliderData.map((_, i) => (
            <button 
              key={i} 
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                activeIndex === i 
                ? 'w-10 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]' 
                : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            ></button>
          ))}
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-blue-900/10 blur-[180px] pointer-events-none"></div>
      </section>
    </div>
  );
};

const Goals = () => {
  const { t, language } = useLanguage();
  return (
  <section className="relative py-40 px-6 overflow-hidden" style={{ backgroundColor: 'transparent' }}>
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-20">
      
      {/* رائد الفضاء - يتغير موضعه حسب اللغة */}
      <div className={`absolute ${language === 'ar' ? '-left-24 lg:-left-32' : '-right-24 lg:-right-32'} top-[-55%] -translate-y-1/2 w-[200px] md:w-[300px] pointer-events-none z-10 animate-float`}>
        <img 
          src="/images/cccc.png" 
          alt="رائد فضاء" 
          className={`w-full h-auto ${language === 'en' ? 'scale-x-[1]' : ''}`}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* النص المركزي */}
      <div className="relative z-30 flex flex-col items-center max-w-3xl">
        <h2 className="text-6xl md:text-[7rem] text-white glow-text mb-8 select-none leading-none">
          {t('goals.title')}
        </h2>
        <p className="text-xl md:text-3xl text-white/90 leading-relaxed text-center font-light">
          {t('goals.desc_main')}
        </p>
      </div>

      {/* لوحة الهدف والنيزك - يتغير موضعه حسب اللغة */}
      <div className={`absolute ${language === 'ar' ? '-right-20 lg:right-0' : '-left-20 lg:left-0'} top-1/2 -translate-y-1/2 w-[100px] md:w-[250px] pointer-events-none z-10`}>
        <div className="relative animate-float" style={{ animationDelay: '1s' }}>
          <img 
            src="/images/Asset 8.png" 
            alt="لوحة الهدف" 
            className={`w-full h-auto ${language === 'en' ? 'scale-x-[1]' : ''}`}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* نيزك صغير فوق الهدف */}
          <div className={`absolute -top-20 ${language === 'ar' ? 'right-1/4' : 'left-1/4'} w-20 h-20 animate-float`} style={{ animationDelay: '0.5s' }}>
            <img 
              src="/images/Asset 1.png" 
              alt="نيزك صغير" 
              className="w-full h-full object-contain rotate-45 brightness-75" 
            />
          </div>
        </div>
      </div>

    </div>

    {/* تأثيرات خلفية إضافية للسكشن */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-900/5 rounded-full blur-[150px] pointer-events-none"></div>
  </section>
  );
};

const Ambition = () => {
  const { t, language } = useLanguage();
  return (
  <section className="relative py-32 px-10 md:px-20 overflow-hidden min-h-screen flex items-center justify-center" style={{ backgroundColor: 'transparent' }}>
    
    {/* النيزك على الجانب - يتغير حسب اللغة */}
    <div className={`absolute ${language === 'ar' ? '-left-20' : '-right-20'} top-1/4 w-48 md:w-[400px] h-auto animate-float pointer-events-none opacity-90 z-10`}>
      <img 
        src="/images/ambition-asteroid.png" 
        alt="Asteroid Left" 
        className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]"
        onError={(e) => {
          e.target.style.opacity = '0.1';
        }}
      />
    </div>

    {/* رائد الفضاء مع العلم - يتغير حسب اللغة */}
    <div className={`absolute ${language === 'ar' ? '-right-20 md:right-10' : '-left-20 md:left-10'} top-20 md:top-10 w-72 md:w-[600px] h-auto animate-float z-10 pointer-events-none`} style={{ animationDelay: '1.5s' }}>
      <img 
        src="/images/xxxxx.png" 
        alt="Astronaut holding flag" 
        className={`w-full h-auto drop-shadow-[0_0_60px_rgba(255,255,255,0.15)] ${language === 'en' ? 'scale-x-[-1]' : ''}`}
        onError={(e) => {
          e.target.style.opacity = '0.1';
        }}
      />
    </div>

    {/* المحتوى النصي في المنتصف */}
    <div className={`relative z-20 max-w-5xl w-full flex flex-col ${language === 'ar' ? 'md:items-start text-right md:mr-auto md:ml-40 lg:ml-60' : 'md:items-end text-left md:ml-auto md:mr-40 lg:mr-60'} items-center text-center md:text-right`}>
      <h2 className="text-7xl md:text-[11rem] glow-text mb-6">
        {t('ambition.title')}
      </h2>
      
      <div className="max-w-2xl space-y-2">
        <br />
        <p className="text-xl md:text-3xl text-white/90 leading-relaxed font-medium">
          {t('ambition.p1')}
        </p>
        <p className="text-xl md:text-3xl text-white/90 leading-relaxed font-medium">
          {t('ambition.p2')}
        </p>
        <p className="text-xl md:text-3xl text-white/90 leading-relaxed font-medium">
          {t('ambition.p3')}
        </p>
        <p className="text-xl md:text-3xl text-white/90 leading-relaxed font-medium">
          {t('ambition.p4')}
        </p>
      </div>
    </div>

    {/* تأثيرات الإضاءة الخلفية */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[200px] pointer-events-none"></div>
    <div className={`absolute bottom-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-96 h-96 bg-purple-600/5 rounded-full blur-[150px] pointer-events-none`}></div>
  </section>
  );
};

const StudioShowcase = () => (
  <section className="relative w-full py-20 px-0 overflow-hidden" style={{ backgroundColor: 'transparent' }}>
    <div className="max-w-[1920px] mx-auto relative group">
      {/* حاوية الصورة الرئيسية */}
      <div className="relative aspect-[21/9] w-full overflow-hidden border-y border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        <img 
          src="/images/zzzz.png" 
          alt="Studio Preview" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.style.backgroundColor = '#1a1b26';
          }}
        />
        
        {/* تأثيرات الإضاءة والظلال */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080911] via-transparent to-[#080911] opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080911] via-transparent to-[#080911] opacity-40"></div>
        
        {/* لمسات تقنية */}
        <div className="absolute top-10 left-10 border-l border-t border-blue-500/30 w-20 h-20 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 border-r border-b border-purple-500/30 w-20 h-20 pointer-events-none"></div>
      </div>

    </div>

    {/* توهج خلفي للسكشن */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[150px] pointer-events-none"></div>
  </section>
);

const IdeaPlanting = () => {
  const { t, language } = useLanguage();
  return (
  <section className="relative py-40 px-10 md:px-20 overflow-hidden flex flex-col items-center justify-center text-center" style={{ backgroundColor: 'transparent' }}>
    
    {/* المحتوى النصي */}
    <div className="relative z-10 max-w-4xl">
      <h2 className="text-7xl md:text-[9rem] font-black text-white glow-text mb-12 tracking-tight leading-none">
        {t('idea.title')}
      </h2>
      
      <div className="space-y-4 max-w-3xl mx-auto">
        <p className="text-xl md:text-3xl text-white/90 leading-relaxed font-medium">{t('idea.p1')}</p>
        <p className="text-xl md:text-3xl text-white/90 leading-relaxed font-medium">{t('idea.p2')}</p>
        <p className="text-xl md:text-3xl text-white/90 leading-relaxed font-medium">{t('idea.p3')}</p>
      </div>
    </div>

    {/* تأثيرات خلفية ناعمة */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-white/5 blur-[120px] rounded-full pointer-events-none opacity-30"></div>
    
    {/* نيزك صغير بعيد */}
    <div className={`absolute ${language === 'ar' ? 'right-1/4' : 'left-1/4'} top-1/4 w-12 h-12 bg-white/10 blur-xl rounded-full animate-pulse`}></div>
  </section>
  );
};

// مكون Home الرئيسي
const Home = () => {
  return (
    <div style={{ 
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      {/* الخلفية المتحركة */}
      <BackgroundEffects />
      
      {/* المحتوى الرئيسي */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Goals />
        <Ambition />
        <StudioShowcase />
        <IdeaPlanting />
      </div>
    </div>
  );
};

export default Home;