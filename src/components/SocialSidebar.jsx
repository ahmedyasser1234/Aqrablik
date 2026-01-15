import React from 'react';

const SocialSidebar = () => {
  const socialLinks = [
    { id: 'facebook', name: 'Facebook', icon: '/images/aaa.png', url: 'https://www.facebook.com/profile.php?id=61575001066937' },
    { id: 'tiktok', name: 'TikTok', icon: '/images/Asset 16.png', url: 'https://www.tiktok.com/@aqrablaak' },
    { id: 'instagram', name: 'Instagram', icon: '/images/insta.png', url: 'https://www.instagram.com/aqrablaak/' },
    { id: 'X', name: 'X', icon: '/images/Asset 17.png', url: 'https://x.com/aqrablaak' },
    { id: 'youtube', name: 'youtube', icon: '/images/Asset 18.png', url: 'https://www.youtube.com/@aqrablaak' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '/images/Asset 14.png', url: 'https://wa.me/201099822822' }, 
    { id: 'phone', name: 'Phone', icon: '/images/phon.png', url: 'tel:+201099822822' }, 
  ];

  // إضافة console.log للتحقق
  React.useEffect(() => {
    console.log('=== SocialSidebar Images Path Check ===');
    socialLinks.forEach((link, index) => {
      console.log(`Image ${index + 1} (${link.name}): ${link.icon}`);
    });
    console.log('========================================');
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[100] pointer-events-auto">
      {socialLinks.map((social, index) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-14 h-14 md:w-16 md:h-16 flex items-center justify-center 
            transition-all duration-300 
            hover:scale-125 hover:-translate-y-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]
            animate-subtle-bounce group
          "
          style={{ 
            animationDelay: `${index * 0.2}s` 
          }}
        >
          <img 
            src={social.icon} 
            alt={social.name} 
            className="w-full h-full object-contain transition-transform duration-500 group-hover:rotate-12"
            onError={(e) => {
              console.error(`❌ Failed to load image: ${social.icon}`);
              e.target.style.display = 'none';
              const parent = e.target.parentElement;
              if (parent && !parent.querySelector('.fallback')) {
                const span = document.createElement('span');
                span.className = 'fallback flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white font-bold border border-white/20';
                span.innerText = social.name[0];
                parent.appendChild(span);
              }
            }}
            onLoad={() => {
              console.log(`✅ Successfully loaded: ${social.icon}`);
            }}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;