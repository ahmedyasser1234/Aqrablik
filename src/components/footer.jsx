import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // أضف useEffect لتتبع تحميل الصورة
  React.useEffect(() => {
    console.log('🚀 Footer component loaded');
    console.log('📁 Image path:', '/images/footer.png');
    console.log('🌐 Current URL:', window.location.href);
    
    // تحقق إذا كانت الصورة موجودة
    const img = new Image();
    img.src = '/images/footer.png';
    
    img.onload = () => {
      console.log('✅ Footer image loaded successfully');
      console.log('📏 Image dimensions:', img.width, 'x', img.height);
    };
    
    img.onerror = () => {
      console.error('❌ Footer image failed to load');
      console.log('🔍 Trying alternative paths...');
      
      // جرب مسارات بديلة للتحقق
      const altPaths = [
        '/public/images/footer.png',
        'images/footer.png',
        './images/footer.png',
        `${window.location.origin}/images/footer.png`
      ];
      
      altPaths.forEach(path => {
        const testImg = new Image();
        testImg.src = path;
        testImg.onerror = () => console.log(`❌ Failed: ${path}`);
        testImg.onload = () => console.log(`✅ Success: ${path}`);
      });
    };
  }, []);

  return (
    <footer className="relative w-full min-h-[105vh] flex items-end pb-12 px-10 md:px-20 overflow-hidden">
      {/* خلفية الفوتر - أضفت border للاختبار */}
      <div className="absolute inset-0 z-0" style={{ border: '1px dashed rgba(255,0,0,0.5)' }}>
        <img 
          src="/images/footer.png" 
          alt="Astronaut on Moon" 
          className="w-full h-full object-cover object-bottom opacity-80"
          style={{ border: '1px solid rgba(0,255,0,0.5)' }} // حدود خضراء للرؤية
          onError={(e) => {
            console.error('❌ Image onError triggered:', e.target.src);
            console.error('❌ Error details:', e);
            
            // لا تخفي الصورة بل أظهر خلفية بديلة
            e.target.style.display = 'none';
            
            // أظهر رسالة تحذير
            const parent = e.target.parentElement;
            if (parent && !parent.querySelector('.image-fallback')) {
              const fallbackDiv = document.createElement('div');
              fallbackDiv.className = 'image-fallback w-full h-full flex items-center justify-center';
              fallbackDiv.innerHTML = `
                <div class="text-center p-8">
                  <div class="text-white/50 text-lg mb-2">⚠️ الصورة غير متوفرة</div>
                  <div class="text-white/30 text-sm">footer.png</div>
                  <div class="w-full h-full bg-gradient-to-b from-blue-900/30 to-purple-900/30 mt-4"></div>
                </div>
              `;
              parent.appendChild(fallbackDiv);
            }
          }}
          onLoad={() => {
            console.log('✅ Image onLoad triggered - Footer image is visible');
            console.log('🖼️ Image natural size:', 
              `${e.target.naturalWidth}x${e.target.naturalHeight}`);
          }}
        />
        
        {/* تأثير التدرج اللوني */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080911] via-transparent to-transparent opacity-90 h-64"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12 md:gap-0">
        
        {/* جهة اليمين: روابط التنقل الرئيسية */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-3 text-center md:text-right">
          <Link to="/" className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-all glow-text">الرئيسية</Link>
          <Link to="/services" className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-all glow-text">خدماتنا</Link>
          <Link to="#" className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-all glow-text">من نحن</Link>
          <Link to="#" className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-all glow-text">تواصل معنا</Link>
        </div>

        {/* المنتصف: اللوجو وجميع الحقوق محفوظة */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-4 text-center">
          <img 
            src="/images/Asset 3.png" 
            alt="Aqrablik Media Logo" 
            className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] mb-2" 
            onError={(e) => {
              console.error('❌ Logo image failed:', e.target.src);
            }}
            onLoad={() => {
              console.log('✅ Logo image loaded');
            }}
          />
          <div className="opacity-60 text-xs md:text-sm tracking-widest text-white/80">
            <p>© {new Date().getFullYear()} أقربلك ميديا - جميع الحقوق محفوظة</p>
          </div>
        </div>

        {/* جهة اليسار: تواصل معنا مع أرقام الهاتف والبريد وأيقونات */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end gap-2 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold text-white glow-text mb-2 text-center md:text-right">تواصل معنا</h3>
          
          <div className="flex flex-col items-center md:items-end gap-3 text-white/80 text-lg md:text-xl font-medium">
            {/* رقم الهاتف الأول */}
            <div className="flex items-center gap-3 group">
              <a href="tel:+201099822822" className="hover:text-blue-400 transition-colors order-1 md:order-none" dir="ltr">+20 10 99 822 822</a>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>

            {/* رقم الهاتف الثاني */}
            <div className="flex items-center gap-3 group">
              <a href="tel:+201014700317" className="hover:text-blue-400 transition-colors order-1 md:order-none" dir="ltr">+20 10 14 700 317</a>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>

            {/* البريد الإلكتروني */}
            <div className="flex items-center gap-3 group mt-1">
              <a href="mailto:info@aqrablik.com" className="hover:text-blue-400 transition-colors text-base md:text-lg lowercase order-1 md:order-none">info@aqrablik.com</a>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* تأثير توهج خلفي ناعم */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none"></div>
      
      {/* زر اختبار للتحقق من الصورة يدوياً */}
      <button 
        onClick={() => {
          console.log('🔍 Manual image check:');
          const img = document.querySelector('footer img[src*="footer"]');
          if (img) {
            console.log('Found image:', img);
            console.log('Current src:', img.src);
            console.log('Complete:', img.complete);
            console.log('Natural size:', img.naturalWidth, 'x', img.naturalHeight);
            
            // جرب تحميل الصورة يدوياً
            const testImg = new Image();
            testImg.src = img.src;
            testImg.onload = () => {
              console.log('✅ Manual test: Image exists');
              alert(`✅ الصورة موجودة: ${img.src}\nالحجم: ${testImg.width}x${testImg.height}`);
            };
            testImg.onerror = () => {
              console.log('❌ Manual test: Image not found');
              alert(`❌ الصورة غير موجودة في: ${img.src}`);
            };
          } else {
            console.log('No footer image found in DOM');
          }
        }}
        className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm opacity-70 hover:opacity-100 transition-all z-50"
        style={{ display: 'none' }} // اخفيه في الإنتاج
      >
        🔍 اختبار الصورة
      </button>
    </footer>
  );
};

export default Footer;