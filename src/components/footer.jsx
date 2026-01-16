import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('/images/footer.png');

  useEffect(() => {
    console.log('🚀 Footer component loaded in HOME page');
    
    // الحصول على BASE_URL من Vite
    const baseUrl = import.meta.env.BASE_URL || '';
    
    // اختبار المسارات المختلفة
    const testPaths = [
      '/images/footer.png',
      './images/footer.png',
      'images/footer.png',
      `${baseUrl}/images/footer.png`,
      window.location.pathname === '/' ? './images/footer.png' : '/images/footer.png'
    ];

    console.log('🔍 Testing paths:', testPaths);
    
    // اختبار المسارات
    testPaths.forEach((path, index) => {
      const img = new Image();
      img.src = path;
      
      img.onload = () => {
        console.log(`✅ Found working path: ${path}`);
        if (imageSrc !== path) {
          setImageSrc(path);
        }
      };
      
      img.onerror = () => {
        console.log(`❌ Failed path: ${path}`);
      };
    });
  }, []);

  return (
    <footer className="relative w-full min-h-[108vh] flex items-end pb-12 px-10 md:px-20 overflow-hidden">
      {/* حاوية الصورة مع تأثيرات متعددة */}
      <div className="absolute inset-0 z-0">
        {/* صورة الفوتر الأساسية */}
        <img 
          src={imageSrc}
          alt="Astronaut on Moon" 
          className="w-full h-full object-cover object-bottom opacity-80"
          onError={(e) => {
            console.error('❌ Footer image failed in Home page:', e.target.src);
            setImageError(true);
            
            // جرب مسار آخر
            if (imageSrc === '/images/footer.png') {
              setImageSrc('./images/footer.png');
            } else if (imageSrc === './images/footer.png') {
              setImageSrc('images/footer.png');
            } else {
              // عرض بديل
              e.target.style.display = 'none';
            }
          }}
          onLoad={(e) => {
            console.log('✅ Footer image loaded successfully in Home');
            console.log('📍 Path used:', imageSrc);
            console.log('📏 Image size:', e.target.naturalWidth, 'x', e.target.naturalHeight);
            setImageError(false);
          }}
        />
        
        {/* تأثيرات خلفية */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080911] via-transparent to-transparent opacity-90 h-64"></div>
      </div>

      {/* محتوى الفوتر */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12 md:gap-0">
        
        {/* روابط التنقل */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-3 text-center md:text-right">
          <Link to="/" className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-all glow-text">الرئيسية</Link>
          <Link to="/services" className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-all glow-text">خدماتنا</Link>
          <Link to="#" className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-all glow-text">من نحن</Link>
          <Link to="#" className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-all glow-text">تواصل معنا</Link>
        </div>

        {/* اللوجو */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4 text-center">
          <img 
            src="/images/Asset 3.png" 
            alt="Aqrablik Media Logo" 
            className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] mb-2" 
          />
          <div className="opacity-60 text-xs md:text-sm tracking-widest text-white/80">
            <p>© {new Date().getFullYear()} أقربلك ميديا - جميع الحقوق محفوظة</p>
          </div>
        </div>

        {/* معلومات الاتصال */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end gap-2 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold text-white glow-text mb-2 text-center md:text-right">تواصل معنا</h3>
          
          <div className="flex flex-col items-center md:items-end gap-3 text-white/80 text-lg md:text-xl font-medium">
            <div className="flex items-center gap-3 group">
              <a href="tel:+201099822822" className="hover:text-blue-400 transition-colors order-1 md:order-none" dir="ltr">+20 10 99 822 822</a>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>

            <div className="flex items-center gap-3 group">
              <a href="tel:+201014700317" className="hover:text-blue-400 transition-colors order-1 md:order-none" dir="ltr">+20 10 14 700 317</a>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>

            <div className="flex items-center gap-3 group mt-1">
              <a href="mailto:info@aqrablik.com" className="hover:text-blue-400 transition-colors text-base md:text-lg lowercase order-1 md:order-none">info@aqrablik.com</a>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* رسالة تحذير إذا فشل تحميل الصورة */}
      {imageError && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-yellow-500/20 border border-yellow-500/40 text-yellow-200 px-4 py-2 rounded-lg text-sm">
          ⚠️ الصورة غير متوفرة في الصفحة الرئيسية
        </div>
      )}
    </footer>
  );
};

export default Footer;