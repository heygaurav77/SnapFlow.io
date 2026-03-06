export type LanguageCode = "en" | "es" | "nl" | "ka" | "uk" | "fr" | "de" | "it" | "pt" | "ru" | "zh" | "ja" | "ko" | "hi" | "ar" | "tr" | "vi" | "pl";

export interface Translations {
  hero: {
    title: string;
    description: string;
    placeholder: string;
    search: string;
    searching: string;
    fetching: string;
    neuralLink: string;
    scanning: string;
  };
  download: {
    videoRegistry: string;
    audioArchive: string;
    initiateTunnel: string;
    neuralKeyVerification: string;
    identifyKey: string;
    targetKey: string;
    accessGranted: string;
    secureTunnel: string;
    downloadNow: string;
    restart: string;
  };
  navbar: {
    home: string;
    reviews: string;
    feedback: string;
    advertise: string;
  };
  platforms: {
    all: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    anyUrl: string;
    video: string;
    reels: string;
    photo: string;
    dp: string;
    stories: string;
    highlights: string;
    audio: string;
    shorts: string;
  };
}

export const translations: Partial<Record<LanguageCode, Translations>> = {
  en: {
    hero: {
      title: "Fast Video Downloader",
      description: "Download Anything from Any URL",
      placeholder: "Paste any social media link here...",
      search: "SEARCH",
      searching: "SEARCHING...",
      fetching: "SnapFlow",
      neuralLink: "FETCHING MEDIA...",
      scanning: "PREPARING DOWNLOAD TUNNEL...",
    },
    download: {
      videoRegistry: "Video Registry",
      audioArchive: "Audio Archive",
      initiateTunnel: "Initiate Neural Tunnel",
      neuralKeyVerification: "Neural Key Verification",
      identifyKey: "Identify the target neural key to unlock download.",
      targetKey: "Target Key",
      accessGranted: "Access Granted",
      secureTunnel: "Secure tunnel established with local device.",
      downloadNow: "Download Now",
      restart: "Go Back",
    },
    navbar: {
      home: "Home",
      reviews: "Reviews",
      feedback: "Feedback",
      advertise: "Advertise",
    },
    platforms: {
      all: "All Platforms",
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
      anyUrl: "Any URL",
      video: "Video",
      reels: "Reels",
      photo: "Photo",
      dp: "DP",
      stories: "Stories",
      highlights: "Highlights",
      audio: "Audio",
      shorts: "Shorts",
    },
  },
  es: {
    hero: {
      title: "Descargador de Video Rápido",
      description: "Descarga cualquier cosa desde cualquier URL",
      placeholder: "Pega cualquier enlace de redes sociales aquí...",
      search: "BUSCAR",
      searching: "BUSCANDO...",
      fetching: "SnapFlow",
      neuralLink: "OBTENIENDO MEDIOS...",
      scanning: "PREPARANDO TÚNEL DE DESCARGA...",
    },
    download: {
      videoRegistry: "Registro de Video",
      audioArchive: "Archivo de Audio",
      initiateTunnel: "Iniciar Túnel Neuronal",
      neuralKeyVerification: "Verificación de Llave Neuronal",
      identifyKey: "Identifica la llave neuronal objetivo para desbloquear la descarga.",
      targetKey: "Llave Objetivo",
      accessGranted: "Acceso Concedido",
      secureTunnel: "Túnel seguro establecido con el dispositivo local.",
      downloadNow: "Descargar ahora",
      restart: "Volver",
    },
    navbar: {
      home: "Inicio",
      reviews: "Reseñas",
      feedback: "Comentarios",
      advertise: "Anunciar",
    },
    platforms: {
      all: "Todas las plataformas",
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
      anyUrl: "Cualquier URL",
      video: "Video",
      reels: "Reels",
      photo: "Foto",
      dp: "Perfil",
      stories: "Historias",
      highlights: "Destacado",
      audio: "Audio",
      shorts: "Shorts",
    },
  },
  hi: {
    hero: {
      title: "तेज वीडियो डाउनलोडर",
      description: "किसी भी URL से कुछ भी डाउनलोड करें",
      placeholder: "यहां कोई भी सोशल मीडिया लिंक पेस्ट करें...",
      search: "खोजें",
      searching: "खोज रहे हैं...",
      fetching: "SnapFlow",
      neuralLink: "मीडिया प्राप्त किया जा रहा है...",
      scanning: "डाउनलोड टनल तैयार किया जा रहा है...",
    },
    download: {
      videoRegistry: "वीडियो रजिस्ट्री",
      audioArchive: "ऑडियो पुरालेख",
      initiateTunnel: "न्यूरल टनल शुरू करें",
      neuralKeyVerification: "न्यूरल कुंजी सत्यापन",
      identifyKey: "डाउनलोड अनलॉक करने के लिए लक्ष्य न्यूरल कुंजी की पहचान करें।",
      targetKey: "लक्ष्य कुंजी",
      accessGranted: "एक्सेस मिल गया",
      secureTunnel: "स्थानीय डिवाइस के साथ सुरक्षित टनल स्थापित।",
      downloadNow: "अभी डाउनलोड करें",
      restart: "वापस जाएं",
    },
    navbar: {
      home: "होम",
      reviews: "समीक्षाएं",
      feedback: "फीडबैक",
      advertise: "विज्ञापन दें",
    },
    platforms: {
      all: "सभी प्लेटफार्म",
      instagram: "इंस्टाग्राम",
      tiktok: "टिकटॉक",
      youtube: "यूट्यूब",
      anyUrl: "कोई भी URL",
      video: "वीडियो",
      reels: "रील्स",
      photo: "फोटो",
      dp: "प्रोफ़ाइल",
      stories: "स्टोरीज़",
      highlights: "हाइलाइट्स",
      audio: "ऑडियो",
      shorts: "शॉर्ट्स",
    },
  },
};

export const getTranslations = (lang: string): Translations => {
  return translations[lang as LanguageCode] || translations.en!;
};
