import React from 'react';

interface LanguageToggleButtonProps {
  locale: 'en' | 'ar';
  setLocale: (locale: 'en' | 'ar') => void;
}

const LanguageToggleButton: React.FC<LanguageToggleButtonProps> = ({ locale, setLocale }) => {
  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      title="Toggle language"
      className="relative flex items-center justify-between w-20 h-8 p-1 bg-[#e6ebf4] dark:bg-gray-700 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-colors overflow-hidden"
    >
      <span
        className={`absolute top-0 left-0 w-1/2 h-full bg-primary rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          locale === 'en' ? 'translate-x-0' : 'translate-x-full'
        }`} style={{    transform:` scale(1.1)`}}
      ></span>
      <span
        className={`relative z-10 w-1/2 text-center text-xs font-bold transition-colors duration-300 ease-in-out ${
          locale === 'en' ? 'text-white' : 'text-[#0c121d] dark:text-white'
        }`}
      >
        EN
      </span>
      <span
        className={`relative z-10 w-1/2 text-center text-xs font-bold transition-colors duration-300 ease-in-out ${
          locale === 'ar' ? 'text-white' : 'text-[#0c121d] dark:text-white'
        }`}
      >
        AR
      </span>
    </button>
  );
};

export default LanguageToggleButton;

