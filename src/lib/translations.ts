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
  fr: {
    hero: {
      title: "Téléchargeur Vidéo Rapide",
      description: "Téléchargez n'importe quoi depuis n'importe quelle URL",
      placeholder: "Collez n'importe quel lien ici...",
      search: "RECHERCHER",
      searching: "RECHERCHE...",
      fetching: "SnapFlow",
      neuralLink: "RÉCUPÉRATION DES MÉDIAS...",
      scanning: "PRÉPARATION DU TUNNEL...",
    },
    download: {
      videoRegistry: "Registre Vidéo",
      audioArchive: "Archive Audio",
      initiateTunnel: "Initier le Tunnel",
      neuralKeyVerification: "Vérification de Clé",
      identifyKey: "Identifiez la clé pour débloquer le téléchargement.",
      targetKey: "Clé Cible",
      accessGranted: "Accès Autorisé",
      secureTunnel: "Tunnel sécurisé établi.",
      downloadNow: "Télécharger Maintenant",
      restart: "Retourner",
    },
    navbar: {
      home: "Accueil",
      reviews: "Avis",
      feedback: "Commentaires",
      advertise: "Publicité",
    },
    platforms: {
      all: "Toutes les Plateformes",
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
      anyUrl: "N'importe quelle URL",
      video: "Vidéo",
      reels: "Réels",
      photo: "Photo",
      dp: "Photo de Profil",
      stories: "Stories",
      highlights: "Highlights",
      audio: "Audio",
      shorts: "Shorts",
    },
  },
  ka: {
    hero: {
      title: "სწრაფი ვიდეო ჩამომტვირთავი",
      description: "ჩამოტვირთეთ ნებისმიერი რამ ნებისმიერი URL-დან",
      placeholder: "ჩასვით ნებისმიერი ბმული აქ...",
      search: "ძებნა",
      searching: "მიმდინარეობს ძებნა...",
      fetching: "SnapFlow",
      neuralLink: "მედიის მოძიება...",
      scanning: "გვირაბის მომზადება...",
    },
    download: {
      videoRegistry: "ვიდეო რეესტრი",
      audioArchive: "აუდიო არქივი",
      initiateTunnel: "გვირაბის დაწყება",
      neuralKeyVerification: "გასაღების ვერიფიკაცია",
      identifyKey: "იდენტიფიცირება მოახდინეთ ჩამოტვირთვის გასახსნელად.",
      targetKey: "სამიზნე გასაღები",
      accessGranted: "წვდომა დაშვებულია",
      secureTunnel: "უსაფრთხო გვირაბი დამყარებულია.",
      downloadNow: "ჩამოტვირთეთ ახლა",
      restart: "უკან დაბრუნება",
    },
    navbar: {
      home: "მთავარი",
      reviews: "მიმოხილვები",
      feedback: "უკუკავშირი",
      advertise: "რეკლამა",
    },
    platforms: {
      all: "ყველა პლატფორმა",
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
      anyUrl: "ნებისმიერი URL",
      video: "ვიდეო",
      reels: "Reels",
      photo: "ფოტო",
      dp: "პროფილის სურათი",
      stories: "სთორი",
      highlights: "ჰაილაითები",
      audio: "აუდიო",
      shorts: "Shorts",
    },
  },
  de: {
    hero: {
      title: "Schneller Video-Downloader",
      description: "Laden Sie alles von jeder URL herunter",
      placeholder: "Fügen Sie hier einen Social-Media-Link ein...",
      search: "SUCHEN",
      searching: "SUCHE...",
      fetching: "SnapFlow",
      neuralLink: "MEDIEN WERDEN GEHOLT...",
      scanning: "DOWNLOAD-TUNNEL WIRD VORBEREITET...",
    },
    download: {
      videoRegistry: "Video-Registry",
      audioArchive: "Audio-Archiv",
      initiateTunnel: "Tunnel initiieren",
      neuralKeyVerification: "Schlüsselverifizierung",
      identifyKey: "Identifizieren Sie den Schlüssel, um den Download freizuschalten.",
      targetKey: "Ziel-Schlüssel",
      accessGranted: "Zugriff gewährt",
      secureTunnel: "Sicherer Tunnel zum lokalen Gerät hergestellt.",
      downloadNow: "Jetzt herunterladen",
      restart: "Zurück",
    },
    navbar: {
      home: "Startseite",
      reviews: "Bewertungen",
      feedback: "Feedback",
      advertise: "Werbung",
    },
    platforms: {
      all: "Alle Plattformen",
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
      anyUrl: "Jede URL",
      video: "Video",
      reels: "Reels",
      photo: "Foto",
      dp: "Profilbild",
      stories: "Stories",
      highlights: "Highlights",
      audio: "Audio",
      shorts: "Shorts",
    },
  },
  ja: {
    hero: {
      title: "高速ビデオダウンローダー",
      description: "あらゆるURLから何でもダウンロード",
      placeholder: "ここにソーシャルメディアのリンクを貼り付けてください...",
      search: "検索",
      searching: "検索中...",
      fetching: "SnapFlow",
      neuralLink: "メディアを取得中...",
      scanning: "ダウンロードトンネルを準備中...",
    },
    download: {
      videoRegistry: "ビデオレジストリ",
      audioArchive: "オーディオアーカイブ",
      initiateTunnel: "トンネルを開始",
      neuralKeyVerification: "キー認証",
      identifyKey: "ダウンロードを解除するためのターゲットキーを確認してください。",
      targetKey: "ターゲットキー",
      accessGranted: "アクセス許可",
      secureTunnel: "デバイスとの安全なトンネルが確立されました。",
      downloadNow: "今すぐダウンロード",
      restart: "戻る",
    },
    navbar: {
      home: "ホーム",
      reviews: "レビュー",
      feedback: "フィードバック",
      advertise: "広告",
    },
    platforms: {
      all: "すべてのプラットフォーム",
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
      anyUrl: "任意のURL",
      video: "ビデオ",
      reels: "リール",
      photo: "写真",
      dp: "プロフィール",
      stories: "ストーリー",
      highlights: "ハイライト",
      audio: "音声",
      shorts: "ショート",
    },
  },
  pt: {
    hero: {
      title: "Download de Vídeo Rápido",
      description: "Baixe qualquer coisa de qualquer URL",
      placeholder: "Cole qualquer link de mídia social aqui...",
      search: "BUSCAR",
      searching: "BUSCANDO...",
      fetching: "SnapFlow",
      neuralLink: "OBTENDO MÍDIA...",
      scanning: "PREPARANDO TÚNEL DE DOWNLOAD...",
    },
    download: {
      videoRegistry: "Registro de Vídeo",
      audioArchive: "Arquivo de Áudio",
      initiateTunnel: "Iniciar Túnel",
      neuralKeyVerification: "Verificação de Chave",
      identifyKey: "Identifique a chave de destino para desbloquear o download.",
      targetKey: "Chave Alvo",
      accessGranted: "Acesso Concedido",
      secureTunnel: "Túnel seguro estabelecido com o dispositivo local.",
      downloadNow: "Baixar Agora",
      restart: "Voltar",
    },
    navbar: {
      home: "Início",
      reviews: "Avaliações",
      feedback: "Feedback",
      advertise: "Anunciar",
    },
    platforms: {
      all: "Todas as Plataformas",
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
      anyUrl: "Qualquer URL",
      video: "Vídeo",
      reels: "Reels",
      photo: "Foto",
      dp: "Foto de Perfil",
      stories: "Stories",
      highlights: "Destaques",
      audio: "Áudio",
      shorts: "Shorts",
    },
  },
};

export const getTranslations = (lang: string): Translations => {
  return translations[lang as LanguageCode] || translations.en!;
};
