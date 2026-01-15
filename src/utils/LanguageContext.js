import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar'); // اللغة الافتراضية العربية

  // ترجمة النصوص
  const translations = {
    ar: {
      // Navbar
      'nav.home': 'الرئيسية',
      'nav.services': 'خدماتنا',
      'nav.about': 'من نحن',
      'nav.contact': 'تواصل معنا',
      'nav.discover': 'إكتشف خدماتنا',
      
      // Hero
      'hero.out_of_box': 'خرجنا من الصندوق بــــ',
      'hero.title': 'أفكـــار خــار ج الكوكــب',
      'hero.desc1': 'بإنطلاقة جديدة خرجنا خارج نطاق الفكر المحدود لننطلق بك في رحلة مليئة بالإبداع خارج الكوكب.',
      'hero.desc2': 'ولأن الخروج خارج الكوكب لا يصلح للجميع، فلدينا إمكانيات تدفعنا للمغامرة بكل أريحية وثقة.',
      
      // Services names
      'service.motion': 'موشن جرافيك',
      'service.montage': 'مونتاج',
      'service.photography': 'تصوير إحترافي',
      'service.studio': 'تأجير إستوديو',
      'service.web': 'تصميم الويب',
      'service.content': 'كتابة المحتوى',
      'service.marketing': 'التسويق',
      
      // Goals
      'goals.title': 'أهــدافنـــــا',
      'goals.desc_main': 'نعيد صياغة المحتوى المرئي والأفكار لنقدم كل ما هو جديد، ونعبر بصدق عن رؤية مستقبلية تنطلق من خطوات الماضي المليئة بالخبرة، والحاضر المعزز بالثقة.',
      
      // Ambition
      'ambition.title': 'طموحنــــــا',
      'ambition.p1': 'الطموح بدون انطلاق لا يوصلك إلى ما تتمنى،',
      'ambition.p2': 'ونحن نصل ونطمح أكثر لأننا بالفعل انطلقنا،',
      'ambition.p3': 'فنحن في طريقنا قدمًا إلى المستقبل بإصرار',
      'ambition.p4': 'وعزيمة، فكن معنا شريكًا في الرحلة.',
      
      // Idea Planting
      'idea.title': 'نزرع الفكرة',
      'idea.p1': 'البذرة لا تنمو إلا في أرض صالحة للزراعة، وكذلك الفكرة',
      'idea.p2': 'لا تزدهر إلا في بيئة مناسبة لنموها. ونحن نعرف جيدًا',
      'idea.p3': 'أين نزرع الفكرة وكيف نرعاها حتى تكبر وتؤتي ثمارها.',
      
      // Footer
      'footer.rights': 'أقربلك ميديا - جميع الحقوق محفوظة',
      'footer.contact_us': 'تواصل معنا'
    },
    en: {
      // Navbar
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.about': 'About Us',
      'nav.contact': 'Contact',
      'nav.discover': 'Discover Our Services',
      
      // Hero
      'hero.out_of_box': 'Out of the box with...',
      'hero.title': 'Off-Planet Ideas',
      'hero.desc1': 'With a new launch, we moved beyond limited thinking to take you on a journey full of off-planet creativity.',
      'hero.desc2': 'Since leaving the planet is not for everyone, we have the capabilities to adventure with full comfort and confidence.',
      
      // Services names
      'service.motion': 'Motion Graphics',
      'service.montage': 'Montage',
      'service.photography': 'Professional Photography',
      'service.studio': 'Studio Rental',
      'service.web': 'Web Design',
      'service.content': 'Content Writing',
      'service.marketing': 'Marketing',
      
      // Goals
      'goals.title': 'Our Goals',
      'goals.desc_main': 'We redefine visual content and ideas to present everything new, sincerely expressing a future vision stemming from experienced steps of the past and a confident present.',
      
      // Ambition
      'ambition.title': 'Our Ambition',
      'ambition.p1': 'Ambition without action won\'t get you where you want,',
      'ambition.p2': 'And we aim higher because we have already launched,',
      'ambition.p3': 'We are pushing forward to the future with persistence',
      'ambition.p4': 'And determination. Join us as a partner in this journey.',
      
      // Idea Planting
      'idea.title': 'Planting the Idea',
      'idea.p1': 'A seed only grows in fertile soil, and likewise, an idea',
      'idea.p2': 'Only flourishes in an environment suitable for its growth. We know well',
      'idea.p3': 'Where to plant the idea and how to nurture it to bear fruit.',
      
      // Footer
      'footer.rights': 'Aqrablik Media - All Rights Reserved',
      'footer.contact_us': 'Contact Us'
    }
  };

  // دالة لتبديل اللغة
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'ar' ? 'en' : 'ar');
  };

  // دالة للترجمة
  const t = (key) => {
    return translations[language][key] || key;
  };

  // تغيير إتجاه الصفحة عند تغيير اللغة
  useEffect(() => {
    // تغيير اتجاه document
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // تغيير الخطوط إذا أردت
    if (language === 'en') {
      document.body.style.fontFamily = "'Inter', 'Cairo', sans-serif";
    } else {
      document.body.style.fontFamily = "'Cairo', sans-serif";
    }
  }, [language]);

  const value = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook لاستخدام Context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};