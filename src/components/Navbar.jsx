import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isCracked, setIsCracked] = useState(false);
  const location = useLocation();
  const { t, language, toggleLanguage } = useLanguage();

  const triggerCrack = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2215/2215-preview.mp3');
    audio.volume = 0.4;
    audio.currentTime = 0;
    audio.play().catch(() => {});

    setIsCracked(true);
    setTimeout(() => setIsCracked(false), 800);
  };

  const services = [
    { name: t('service.motion'), path: '/services/motion-graphics' },
    { name: t('service.montage'), path: '/services/montage' },
    { name: t('service.photography'), path: '/services/photography' },
    { name: t('service.studio'), path: '/services/studio-rental' },
    { name: t('service.web'), path: '/services/web-design' },
    { name: t('service.content'), path: '/services/content-writing' },
    { name: t('service.marketing'), path: '/services/marketing' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-10 py-7 flex items-center justify-between pointer-events-none">
      
      <style>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-shake {
          animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
        }
        .crack-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-crack 0.4s forwards ease-out;
        }
        @keyframes draw-crack {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* جهة اليمين: اللوجو */}
      <div className={`flex items-center ${language === 'ar' ? 'mr-12' : 'ml-12'} pointer-events-auto`}>
        <Link to="/" className="relative z-50">
          <img 
            src="/images/Asset 3.png" 
            alt="لوجو أقربلك ميديا" 
            className="h-16 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity" 
          />
        </Link>
      </div>

      {/* المنتصف: روابط التنقل */}
      <nav 
        className={`hidden lg:flex items-center glass-nav px-10 py-3 rounded-full gap-10 transition-all relative overflow-hidden pointer-events-auto ${isCracked ? 'animate-shake' : ''}`}
      >
        
        {isCracked && (
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
              <g stroke="rgba(255,255,255,0.9)" strokeWidth="0.5" fill="none">
                <path className="crack-line" d="M200 30 L180 15 L140 10 L80 0" />
                <path className="crack-line" d="M200 30 L220 45 L260 55 L350 60" />
                <path className="crack-line" d="M200 30 L160 40 L120 50 L40 55" />
                <path className="crack-line" d="M200 30 L240 20 L300 10 L380 5" />
                <path className="crack-line" d="M200 30 L210 5 L230 0" />
                <path className="crack-line" d="M200 30 L190 55 L175 60" />
                <path className="crack-line" d="M200 30 L240 40 L280 45" />
                <path className="crack-line" d="M200 30 L150 20 L110 15" />
                <path className="crack-line" d="M190 20 L210 20" strokeWidth="0.3" />
                <path className="crack-line" d="M180 35 L220 35" strokeWidth="0.3" />
                <path className="crack-line" d="M170 25 L185 15" strokeWidth="0.2" />
                <path className="crack-line" d="M230 40 L215 50" strokeWidth="0.2" />
                <circle cx="200" cy="30" r="1.5" fill="white" />
              </g>
            </svg>
            <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
          </div>
        )}

        <Link 
          to="/" 
          onClick={() => triggerCrack()}
          className={`text-base font-medium hover:text-blue-400 transition-colors relative z-10 ${location.pathname === '/' ? 'text-blue-400' : 'text-white'}`}
        >
          {t('nav.home')}
        </Link>
          
        <div className="relative group z-10">
          <Link 
            to="/services"
            onClick={() => triggerCrack()}
            className={`text-base font-medium hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer ${location.pathname.startsWith('/services') ? 'text-blue-400' : 'text-white'}`}
          >
            {t('nav.services')}
            <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </Link>
          
          <div className={`dropdown-content absolute top-full ${language === 'ar' ? 'right-0' : 'left-0'} mt-4 w-56 glass-nav rounded-2xl overflow-hidden shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}>
            <div className="flex flex-col py-2">
              <Link 
                to="/services" 
                onClick={() => triggerCrack()}
                className={`px-6 py-3 text-sm font-bold text-white hover:text-blue-400 hover:bg-white/5 transition-all ${language === 'ar' ? 'text-right' : 'text-left'} border-b border-white/10`}
              >
                {t('nav.discover')}
              </Link>
              {services.map((service, index) => (
                <Link 
                  key={index} 
                  to={service.path} 
                  onClick={() => triggerCrack()}
                  className={`px-6 py-3 text-sm text-white/80 hover:text-blue-400 hover:bg-white/5 transition-all ${language === 'ar' ? 'text-right' : 'text-left'} border-b border-white/5 last:border-0`}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link 
          to="/about" 
          onClick={() => triggerCrack()} 
          className={`text-base font-medium hover:text-blue-400 transition-colors relative z-10 ${location.pathname === '/about' ? 'text-blue-400' : 'text-white'}`}
        >
          {t('nav.about')}
        </Link>
        
        <Link 
          to="/contact" 
          onClick={() => triggerCrack()} 
          className={`text-base font-medium hover:text-blue-400 transition-colors relative z-10 ${location.pathname === '/contact' ? 'text-blue-400' : 'text-white'}`}
        >
          {t('nav.contact')}
        </Link>
      </nav>

      {/* جهة اليسار: الأيقونات */}
      <div className={`flex items-center gap-6 ${language === 'ar' ? 'ml-12' : 'mr-12'} pointer-events-auto`}>
        {/* زر تغيير اللغة */}
        <div 
          onClick={toggleLanguage}
          className="w-14 h-7 bg-white/5 border border-white/10 rounded-full p-1 flex items-center cursor-pointer relative hover:bg-white/10 transition group"
        >
          <div className={`w-5 h-5 bg-gray-400 rounded-full transition-transform duration-300 ${language === 'ar' ? 'translate-x-8' : 'translate-x-1'}`}></div>
          <span className={`absolute ${language === 'ar' ? 'left-2' : 'right-2'} text-[10px] font-bold text-white/40 uppercase pointer-events-none`}>
            {language === 'ar' ? 'EN' : 'AR'}
          </span>
        </div>

        <Link to="/contact">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;