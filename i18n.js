/* Zilx i18n: ar (الأصل) + en fr es de tr ru
   الفكرة: النصوص في الكود بالعربي، وهنا جدول ترجمة بتتطبق على الصفحة أوتوماتيك.
   لإضافة جملة: ضيف صف جديد [العربي, en, fr, es, de, tr, ru] */
(function () {
const BASE = ["ar", "en", "fr", "es", "de", "tr", "ru"];
const ORDER = BASE.concat(["zh", "ms", "uz", "ps", "fa"]);
const RTL = ["ar", "ps", "fa"];
const NAMES = { ar: "العربية", en: "English", fr: "Français", es: "Español", de: "Deutsch", tr: "Türkçe", ru: "Русский", zh: "中文", ms: "Bahasa Melayu", uz: "Oʻzbekcha", ps: "پښتو", fa: "دری" };
const LOCS = { ar: "ar-EG", en: "en-US", fr: "fr-FR", es: "es-ES", de: "de-DE", tr: "tr-TR", ru: "ru-RU", zh: "zh-CN", ms: "ms-MY", uz: "uz-UZ", ps: "ps-AF", fa: "fa-AF" };
const TITLES = {
  ar: "Zilx خدمات | إعلانات مبوبة: عربيات، شقق، موبايلات وخدمات",
  en: "Zilx Services | Classifieds: cars, apartments, phones and services",
  fr: "Zilx Services | Petites annonces : voitures, appartements, téléphones",
  es: "Zilx Servicios | Anuncios clasificados: coches, pisos, teléfonos",
  de: "Zilx Dienstleistungen | Kleinanzeigen: Autos, Wohnungen, Handys",
  tr: "Zilx Hizmetler | İlanlar: arabalar, daireler, telefonlar",
  ru: "Zilx Услуги | Объявления: авто, квартиры, телефоны",
  zh: "Zilx 服务 | 分类广告：汽车、公寓、手机和服务",
  ms: "Zilx Perkhidmatan | Iklan baris: kereta, pangsapuri, telefon dan perkhidmatan",
  uz: "Zilx Xizmatlar | E'lonlar: avtomobillar, kvartiralar, telefonlar va xizmatlar",
  ps: "Zilx خدمتونه | طبقه‌بندي شوي اعلانونه: موټرې، اپارتمانونه، ټلیفونونه",
  fa: "Zilx خدمات | آگهی‌های طبقه‌بندی‌شده: موتر، آپارتمان، تلفن و خدمات"
};
const ROWS = [
["خدمات","Services","Services","Servicios","Dienstleistungen","Hizmetler","Услуги"],
["اعرض اللي عندك أو دوّر على اللي محتاجه: عربيات، موتوسيكلات، شقق، موبايلات، لابتوبات، مواقع وتطبيقات وخدمات.","List what you have or find what you need: cars, motorcycles, apartments, phones, laptops, websites, apps and services.","Publiez ce que vous avez ou trouvez ce qu'il vous faut : voitures, motos, appartements, téléphones, ordinateurs, sites, applications et services.","Publica lo que tienes o encuentra lo que necesitas: coches, motos, pisos, teléfonos, portátiles, webs, apps y servicios.","Biete an, was du hast, oder finde, was du brauchst: Autos, Motorräder, Wohnungen, Handys, Laptops, Websites, Apps und Dienstleistungen.","Elinizdekini ilan verin ya da ihtiyacınızı bulun: arabalar, motosikletler, daireler, telefonlar, dizüstüler, web siteleri, uygulamalar ve hizmetler.","Размещайте своё или находите нужное: авто, мотоциклы, квартиры, телефоны, ноутбуки, сайты, приложения и услуги."],
["ابحث عن أي حاجة…","Search for anything…","Rechercher n'importe quoi…","Busca lo que quieras…","Wonach suchst du?…","Her şeyi ara…","Поиск по объявлениям…"],
["بحث","Search","Rechercher","Buscar","Suchen","Ara","Найти"],
["المدينة / البلد","City / Country","Ville / Pays","Ciudad / País","Stadt / Land","Şehir / Ülke","Город / страна"],
["المدينة","City","Ville","Ciudad","Stadt","Şehir","Город"],
["أقل سعر","Min price","Prix min.","Precio mín.","Mindestpreis","En düşük fiyat","Цена от"],
["أعلى سعر","Max price","Prix max.","Precio máx.","Höchstpreis","En yüksek fiyat","Цена до"],
["الترتيب","Sort","Trier","Ordenar","Sortierung","Sıralama","Сортировка"],
["الأحدث","Newest","Plus récents","Más recientes","Neueste","En yeni","Новые"],
["الأرخص","Cheapest","Moins chers","Más baratos","Günstigste","En ucuz","Дешевле"],
["الأغلى","Most expensive","Plus chers","Más caros","Teuerste","En pahalı","Дороже"],
["من نحن","About us","À propos","Quiénes somos","Über uns","Hakkımızda","О нас"],
["اتصل بنا","Contact us","Nous contacter","Contáctanos","Kontakt","Bize ulaşın","Контакты"],
["سياسة الخصوصية","Privacy policy","Politique de confidentialité","Política de privacidad","Datenschutz","Gizlilik politikası","Политика конфиденциальности"],
["شروط الاستخدام","Terms of use","Conditions d'utilisation","Términos de uso","Nutzungsbedingungen","Kullanım şartları","Условия использования"],
["خدمة العملاء:","Customer support:","Service client :","Atención al cliente:","Kundenservice:","Müşteri hizmetleri:","Поддержка:"],
["اتصال","Call","Appeler","Llamar","Anrufen","Ara","Позвонить"],
["اتصل","Call","Appeler","Llamar","Anrufen","Ara","Позвонить"],
["واتساب","WhatsApp","WhatsApp","WhatsApp","WhatsApp","WhatsApp","WhatsApp"],
["إيميل","Email","E-mail","Correo","E-Mail","E-posta","Эл. почта"],
["جميع الحقوق محفوظة.","All rights reserved.","Tous droits réservés.","Todos los derechos reservados.","Alle Rechte vorbehalten.","Tüm hakları saklıdır.","Все права защищены."],
["نستخدم ملفات الارتباط لتحسين الموقع وعرض الإعلانات.","We use cookies to improve the site and show ads.","Nous utilisons des cookies pour améliorer le site et afficher des annonces.","Usamos cookies para mejorar el sitio y mostrar anuncios.","Wir verwenden Cookies, um die Seite zu verbessern und Werbung anzuzeigen.","Siteyi geliştirmek ve reklam göstermek için çerezler kullanıyoruz.","Мы используем cookie для улучшения сайта и показа рекламы."],
["المزيد","More","En savoir plus","Más","Mehr","Daha fazla","Подробнее"],
["موافق","Accept","Accepter","Aceptar","Akzeptieren","Kabul et","Принять"],
["رفض","Decline","Refuser","Rechazar","Ablehnen","Reddet","Отклонить"],
["واتساب خدمة العملاء","WhatsApp support","Support WhatsApp","Soporte por WhatsApp","WhatsApp-Support","WhatsApp destek","Поддержка в WhatsApp"],
["الكل","All","Tout","Todo","Alle","Tümü","Все"],
["عربيات للبيع","Cars for sale","Voitures à vendre","Coches en venta","Autos zu verkaufen","Satılık arabalar","Продажа авто"],
["عربيات للإيجار","Cars for rent","Voitures à louer","Coches en alquiler","Autos zu vermieten","Kiralık arabalar","Аренда авто"],
["موتوسيكلات للبيع","Motorcycles for sale","Motos à vendre","Motos en venta","Motorräder zu verkaufen","Satılık motosikletler","Продажа мотоциклов"],
["موتوسيكلات للإيجار","Motorcycles for rent","Motos à louer","Motos en alquiler","Motorräder zu vermieten","Kiralık motosikletler","Аренда мотоциклов"],
["شقق للبيع","Apartments for sale","Appartements à vendre","Pisos en venta","Wohnungen zu verkaufen","Satılık daireler","Продажа квартир"],
["شقق للإيجار","Apartments for rent","Appartements à louer","Pisos en alquiler","Wohnungen zu vermieten","Kiralık daireler","Аренда квартир"],
["موبايلات","Phones","Téléphones","Teléfonos","Handys","Telefonlar","Телефоны"],
["لابتوبات","Laptops","Ordinateurs portables","Portátiles","Laptops","Dizüstü bilgisayarlar","Ноутбуки"],
["مواقع ويب","Websites","Sites web","Sitios web","Websites","Web siteleri","Сайты"],
["تطبيقات وأنظمة","Apps & systems","Applications et systèmes","Apps y sistemas","Apps & Systeme","Uygulamalar ve sistemler","Приложения и системы"],
["أخرى","Other","Autre","Otros","Sonstiges","Diğer","Другое"],
["القاهرة","Cairo","Le Caire","El Cairo","Kairo","Kahire","Каир"],
["الجيزة","Giza","Gizeh","Guiza","Gizeh","Giza","Гиза"],
["الإسكندرية","Alexandria","Alexandrie","Alejandría","Alexandria","İskenderiye","Александрия"],
["المطرية","Matareya","Matariya","Matariya","Matariya","Matariya","Матария"],
["مدينة نصر","Nasr City","Nasr City","Ciudad Nasr","Nasr City","Nasr City","Наср-Сити"],
["أكتوبر","October","Octobre","Octubre","Oktober","Ekim","Октября"],
["الشيخ زايد","Sheikh Zayed","Cheikh Zayed","Sheikh Zayed","Sheikh Zayed","Şeyh Zayed","Шейх-Зайед"],
["طنطا","Tanta","Tanta","Tanta","Tanta","Tanta","Танта"],
["المنصورة","Mansoura","Mansourah","Mansura","Mansura","Mansura","Мансура"],
["أسيوط","Asyut","Assiout","Asiut","Assiut","Asyut","Асьют"],
["الرياض","Riyadh","Riyad","Riad","Riad","Riyad","Эр-Рияд"],
["جدة","Jeddah","Djeddah","Yeda","Dschidda","Cidde","Джидда"],
["دبي","Dubai","Dubaï","Dubái","Dubai","Dubai","Дубай"],
["أبوظبي","Abu Dhabi","Abou Dabi","Abu Dabi","Abu Dhabi","Abu Dabi","Абу-Даби"],
["الكويت","Kuwait","Koweït","Kuwait","Kuwait","Kuveyt","Кувейт"],
["الدوحة","Doha","Doha","Doha","Doha","Doha","Доха"],
["عمّان","Amman","Amman","Amán","Amman","Amman","Амман"],
["لندن","London","Londres","Londres","London","Londra","Лондон"],
["نيويورك","New York","New York","Nueva York","New York","New York","Нью-Йорк"],
["نصب أو احتيال","Scam or fraud","Arnaque ou fraude","Estafa o fraude","Betrug","Dolandırıcılık","Мошенничество"],
["إعلان مكرر أو وهمي","Duplicate or fake ad","Annonce en double ou fausse","Anuncio duplicado o falso","Doppelte oder gefälschte Anzeige","Tekrarlanan veya sahte ilan","Дубликат или фейк"],
["محتوى مخالف","Inappropriate content","Contenu inapproprié","Contenido inapropiado","Unzulässiger Inhalt","Uygunsuz içerik","Недопустимый контент"],
["تم بيعه بالفعل","Already sold","Déjà vendu","Ya vendido","Bereits verkauft","Zaten satıldı","Уже продано"],
["سبب آخر","Other reason","Autre raison","Otro motivo","Anderer Grund","Başka sebep","Другая причина"],
["ج.م","EGP","EGP","EGP","EGP","EGP","EGP"],
["ر.س","SAR","SAR","SAR","SAR","SAR","SAR"],
["د.إ","AED","AED","AED","AED","AED","AED"],
["د.ك","KWD","KWD","KWD","KWD","KWD","KWD"],
["ر.ق","QAR","QAR","QAR","QAR","QAR","QAR"],
["السعر بالتواصل","Contact for price","Prix à discuter","Precio a consultar","Preis auf Anfrage","Fiyat için iletişime geçin","Цена по запросу"],
["الماركة والموديل","Make & model","Marque et modèle","Marca y modelo","Marke & Modell","Marka ve model","Марка и модель"],
["السنة","Year","Année","Año","Baujahr","Yıl","Год"],
["الكيلومترات","Mileage (km)","Kilométrage","Kilometraje","Kilometerstand","Kilometre","Пробег (км)"],
["ناقل الحركة","Transmission","Boîte de vitesses","Transmisión","Getriebe","Vites","Коробка передач"],
["أوتوماتيك","Automatic","Automatique","Automático","Automatik","Otomatik","Автомат"],
["مانيوال","Manual","Manuelle","Manual","Manuell","Manuel","Механика"],
["الوقود","Fuel","Carburant","Combustible","Kraftstoff","Yakıt","Топливо"],
["بنزين","Petrol","Essence","Gasolina","Benzin","Benzin","Бензин"],
["سولار","Diesel","Diesel","Diésel","Diesel","Dizel","Дизель"],
["غاز","Gas","Gaz","Gas","Gas","Gaz","Газ"],
["كهرباء","Electric","Électrique","Eléctrico","Elektro","Elektrik","Электро"],
["هايبرد","Hybrid","Hybride","Híbrido","Hybrid","Hibrit","Гибрид"],
["السعة (سي سي)","Engine size (cc)","Cylindrée (cc)","Cilindrada (cc)","Hubraum (ccm)","Motor hacmi (cc)","Объём (куб. см)"],
["المساحة (م²)","Area (m²)","Surface (m²)","Superficie (m²)","Fläche (m²)","Alan (m²)","Площадь (м²)"],
["عدد الغرف","Rooms","Pièces","Habitaciones","Zimmer","Oda sayısı","Комнаты"],
["الحمامات","Bathrooms","Salles de bain","Baños","Badezimmer","Banyolar","Санузлы"],
["الدور","Floor","Étage","Planta","Etage","Kat","Этаж"],
["التشطيب","Finishing","Finitions","Acabado","Ausstattung","Tadilat","Отделка"],
["سوبر لوكس","Super deluxe","Très luxueux","Súper lujo","Super Deluxe","Süper lüks","Супер-люкс"],
["لوكس","Deluxe","Luxe","Lujo","Deluxe","Lüks","Люкс"],
["نصف تشطيب","Semi-finished","Semi-fini","Semiacabado","Teilweise fertig","Yarı bitmiş","Черновая отделка"],
["على الطوب","Shell only","Gros œuvre","En bruto","Rohbau","Kaba inşaat","Без отделки"],
["الحالة","Condition","État","Estado","Zustand","Durum","Состояние"],
["جديد","New","Neuf","Nuevo","Neu","Yeni","Новый"],
["مستعمل - ممتاز","Used - excellent","Occasion - excellent","Usado - excelente","Gebraucht - ausgezeichnet","İkinci el - mükemmel","Б/у - отличное"],
["مستعمل - جيد","Used - good","Occasion - bon","Usado - bueno","Gebraucht - gut","İkinci el - iyi","Б/у - хорошее"],
["التقنية المستخدمة","Technology used","Technologie utilisée","Tecnología utilizada","Verwendete Technologie","Kullanılan teknoloji","Используемые технологии"],
["إغلاق","Close","Fermer","Cerrar","Schließen","Kapat","Закрыть"],
["إنشاء حساب","Create account","Créer un compte","Crear cuenta","Konto erstellen","Hesap oluştur","Создать аккаунт"],
["تسجيل الدخول","Log in","Connexion","Iniciar sesión","Anmelden","Giriş yap","Вход"],
["التسجيل برقم موبايلك مطلوب عشان تضيف إعلان أو تشوف رقم المعلن.","A phone number is required to post an ad or see the seller's number.","Un numéro de téléphone est requis pour publier une annonce ou voir le numéro du vendeur.","Se requiere un número de teléfono para publicar o ver el número del anunciante.","Für das Aufgeben einer Anzeige oder das Sehen der Nummer des Anbieters ist eine Telefonnummer nötig.","İlan vermek veya satıcının numarasını görmek için telefon numarası gerekir.","Для подачи объявления и просмотра номера продавца нужен номер телефона."],
["دخول","Log in","Connexion","Entrar","Anmelden","Giriş","Войти"],
["حساب جديد","New account","Nouveau compte","Cuenta nueva","Neues Konto","Yeni hesap","Новый аккаунт"],
["الاسم","Name","Nom","Nombre","Name","Ad","Имя"],
["رقم الموبايل","Phone number","Numéro de téléphone","Número de teléfono","Telefonnummer","Telefon numarası","Номер телефона"],
["أو","or","ou","o","oder","veya","или"],
["كلمة السر","Password","Mot de passe","Contraseña","Passwort","Şifre","Пароль"],
["الإيميل (اختياري)","Email (optional)","E-mail (facultatif)","Correo (opcional)","E-Mail (optional)","E-posta (isteğe bağlı)","Эл. почта (необязательно)"],
["بالتسجيل أنت موافق على","By signing up you agree to:","En vous inscrivant, vous acceptez :","Al registrarte aceptas:","Mit der Registrierung akzeptierst du:","Kayıt olarak kabul edersiniz:","Регистрируясь, вы принимаете:"],
["و","and","et","y","und","ve","и"],
["إنشاء الحساب","Create account","Créer le compte","Crear la cuenta","Konto erstellen","Hesabı oluştur","Создать аккаунт"],
["نسيت كلمة السر؟","Forgot your password?","Mot de passe oublié ?","¿Olvidaste tu contraseña?","Passwort vergessen?","Şifreni mi unuttun?","Забыли пароль?"],
["كلّم خدمة العملاء","Contact support","Contacter le support","Habla con soporte","Support kontaktieren","Destekle iletişime geç","Связаться с поддержкой"],
["اكتب رقم صحيح: رقم مصري (01xxxxxxxxx) أو دولي بكود الدولة (+971…).","Enter a valid number: Egyptian (01xxxxxxxxx) or international with country code (+971…).","Entrez un numéro valide : égyptien (01xxxxxxxxx) ou international avec indicatif (+971…).","Introduce un número válido: egipcio (01xxxxxxxxx) o internacional con prefijo (+971…).","Gib eine gültige Nummer ein: ägyptisch (01xxxxxxxxx) oder international mit Landesvorwahl (+971…).","Geçerli bir numara girin: Mısır (01xxxxxxxxx) veya ülke kodlu uluslararası (+971…).","Введите корректный номер: египетский (01xxxxxxxxx) или международный с кодом страны (+971…)."],
["كلمة السر لازم تكون 6 حروف أو أرقام على الأقل.","Password must be at least 6 characters.","Le mot de passe doit contenir au moins 6 caractères.","La contraseña debe tener al menos 6 caracteres.","Das Passwort muss mindestens 6 Zeichen lang sein.","Şifre en az 6 karakter olmalı.","Пароль должен быть не короче 6 символов."],
["اكتب اسمك.","Enter your name.","Entrez votre nom.","Escribe tu nombre.","Gib deinen Namen ein.","Adınızı yazın.","Введите ваше имя."],
["الرقم ده مسجّل قبل كده. جرّب تدخل.","This number is already registered. Try logging in.","Ce numéro est déjà enregistré. Essayez de vous connecter.","Este número ya está registrado. Prueba a iniciar sesión.","Diese Nummer ist bereits registriert. Versuche dich anzumelden.","Bu numara zaten kayıtlı. Giriş yapmayı deneyin.","Этот номер уже зарегистрирован. Попробуйте войти."],
["الرقم أو كلمة السر غلط.","Wrong number or password.","Numéro ou mot de passe incorrect.","Número o contraseña incorrectos.","Falsche Nummer oder falsches Passwort.","Numara veya şifre hatalı.","Неверный номер или пароль."],
["حصلت مشكلة:","Something went wrong:","Un problème est survenu :","Ocurrió un problema:","Es ist ein Fehler aufgetreten:","Bir sorun oluştu:","Произошла ошибка:"],
["الوضع","Theme","Thème","Tema","Design","Tema","Тема"],
["أضف إعلان","Post an ad","Publier une annonce","Publicar anuncio","Anzeige aufgeben","İlan ver","Подать объявление"],
["المفضلة","Favorites","Favoris","Favoritos","Favoriten","Favoriler","Избранное"],
["إعلاناتي","My ads","Mes annonces","Mis anuncios","Meine Anzeigen","İlanlarım","Мои объявления"],
["خروج","Log out","Déconnexion","Salir","Abmelden","Çıkış","Выйти"],
["دخول / حساب جديد","Log in / Sign up","Connexion / Inscription","Entrar / Registrarse","Anmelden / Registrieren","Giriş / Kayıt","Вход / Регистрация"],
["جاري التحميل…","Loading…","Chargement…","Cargando…","Wird geladen…","Yükleniyor…","Загрузка…"],
["لسه ما ضفتش حاجة للمفضلة.","You haven't added anything to favorites yet.","Vous n'avez encore rien ajouté aux favoris.","Aún no has añadido nada a favoritos.","Du hast noch nichts zu den Favoriten hinzugefügt.","Henüz favorilere bir şey eklemediniz.","Вы ещё ничего не добавили в избранное."],
["مفيش إعلانات هنا لسه. كن أول واحد يضيف إعلان!","No ads here yet. Be the first to post one!","Aucune annonce pour l'instant. Soyez le premier à en publier une !","Aún no hay anuncios. ¡Sé el primero en publicar uno!","Noch keine Anzeigen. Sei der Erste, der eine aufgibt!","Henüz ilan yok. İlk ilanı siz verin!","Пока нет объявлений. Станьте первым!"],
["عرض المزيد","Load more","Voir plus","Ver más","Mehr anzeigen","Daha fazla göster","Показать ещё"],
["تعذّر التحميل:","Failed to load:","Échec du chargement :","Error al cargar:","Laden fehlgeschlagen:","Yüklenemedi:","Не удалось загрузить:"],
["الاتصال بطيء أو فيه مشكلة في الإعداد. اعمل Refresh، ولو فضلت افتح F12 وابعت الخطأ.","Slow connection or a setup problem. Refresh the page; if it persists, open F12 and send the error.","Connexion lente ou problème de configuration. Actualisez la page ; si cela persiste, ouvrez F12 et envoyez l'erreur.","Conexión lenta o problema de configuración. Actualiza la página; si continúa, abre F12 y envía el error.","Langsame Verbindung oder Konfigurationsproblem. Seite neu laden; falls es bleibt, F12 öffnen und den Fehler senden.","Yavaş bağlantı veya ayar sorunu. Sayfayı yenileyin; sürerse F12'yi açıp hatayı gönderin.","Медленное соединение или ошибка настройки. Обновите страницу; если не помогло, откройте F12 и отправьте ошибку."],
["تم","Sold","Vendu","Vendido","Verkauft","Satıldı","Продано"],
["مخفي","Hidden","Masqué","Oculto","Ausgeblendet","Gizli","Скрыто"],
["مفضلة","Favorite","Favori","Favorito","Favorit","Favori","В избранное"],
["مميز","Featured","En vedette","Destacado","Hervorgehoben","Öne çıkan","Рекомендуем"],
["أهلاً، بخصوص إعلانك على Zilx:","Hello, regarding your ad on Zilx:","Bonjour, au sujet de votre annonce sur Zilx :","Hola, sobre tu anuncio en Zilx:","Hallo, zu deiner Anzeige auf Zilx:","Merhaba, Zilx'teki ilanınız hakkında:","Здравствуйте, по поводу вашего объявления на Zilx:"],
["سجّل دخولك لعرض رقم المعلن","Log in to see the seller's number","Connectez-vous pour voir le numéro du vendeur","Inicia sesión para ver el número del anunciante","Melde dich an, um die Nummer des Anbieters zu sehen","Satıcının numarasını görmek için giriş yapın","Войдите, чтобы увидеть номер продавца"],
["المعلن:","Seller:","Annonceur :","Anunciante:","Anbieter:","İlan sahibi:","Продавец:"],
["مشاركة","Share","Partager","Compartir","Teilen","Paylaş","Поделиться"],
["تعديل","Edit","Modifier","Editar","Bearbeiten","Düzenle","Изменить"],
["إعادة الإعلان","Reactivate ad","Réactiver l'annonce","Reactivar anuncio","Anzeige reaktivieren","İlanı yeniden aç","Возобновить"],
["تم البيع / التأجير","Mark as sold / rented","Marquer vendu / loué","Marcar vendido / alquilado","Als verkauft / vermietet markieren","Satıldı / kiralandı olarak işaretle","Продано / сдано"],
["حذف","Delete","Supprimer","Eliminar","Löschen","Sil","Удалить"],
["إبلاغ عن الإعلان","Report this ad","Signaler l'annonce","Denunciar anuncio","Anzeige melden","İlanı bildir","Пожаловаться"],
["تحذف الإعلان؟","Delete this ad?","Supprimer cette annonce ?","¿Eliminar este anuncio?","Diese Anzeige löschen?","Bu ilan silinsin mi?","Удалить объявление?"],
["تعديل الإعلان","Edit ad","Modifier l'annonce","Editar anuncio","Anzeige bearbeiten","İlanı düzenle","Редактировать объявление"],
["إعلان جديد","New ad","Nouvelle annonce","Nuevo anuncio","Neue Anzeige","Yeni ilan","Новое объявление"],
["القسم","Category","Catégorie","Categoría","Kategorie","Kategori","Категория"],
["عنوان الإعلان","Ad title","Titre de l'annonce","Título del anuncio","Anzeigentitel","İlan başlığı","Заголовок"],
["السعر (اختياري)","Price (optional)","Prix (facultatif)","Precio (opcional)","Preis (optional)","Fiyat (isteğe bağlı)","Цена (необязательно)"],
["التفاصيل","Details","Détails","Detalles","Details","Detaylar","Описание"],
["صور (حتى 4)","Photos (up to 4)","Photos (jusqu'à 4)","Fotos (hasta 4)","Fotos (bis zu 4)","Fotoğraflar (en fazla 4)","Фото (до 4)"],
["لو اخترت صور جديدة هتستبدل القديمة","new photos replace the old ones","les nouvelles photos remplacent les anciennes","las fotos nuevas reemplazan a las anteriores","neue Fotos ersetzen die alten","yeni fotoğraflar eskilerin yerini alır","новые фото заменят старые"],
["حفظ التعديل","Save changes","Enregistrer","Guardar cambios","Änderungen speichern","Değişiklikleri kaydet","Сохранить"],
["نشر الإعلان","Publish ad","Publier l'annonce","Publicar anuncio","Anzeige veröffentlichen","İlanı yayınla","Опубликовать"],
["اكتب عنوان واضح للإعلان.","Enter a clear ad title.","Saisissez un titre clair.","Escribe un título claro.","Gib einen klaren Titel ein.","Net bir ilan başlığı yazın.","Введите понятный заголовок."],
["جاري الحفظ…","Saving…","Enregistrement…","Guardando…","Wird gespeichert…","Kaydediliyor…","Сохранение…"],
["حسابك موقوف ومش تقدر تضيف إعلانات. كلّم خدمة العملاء.","Your account is suspended and cannot post ads. Contact support.","Votre compte est suspendu et ne peut pas publier. Contactez le support.","Tu cuenta está suspendida y no puede publicar. Contacta con soporte.","Dein Konto ist gesperrt und kann keine Anzeigen aufgeben. Kontaktiere den Support.","Hesabınız askıya alındı ve ilan veremez. Destekle iletişime geçin.","Ваш аккаунт заблокирован и не может публиковать. Свяжитесь с поддержкой."],
["إبلاغ عن إعلان","Report an ad","Signaler une annonce","Denunciar un anuncio","Anzeige melden","İlan bildir","Пожаловаться на объявление"],
["السبب","Reason","Raison","Motivo","Grund","Sebep","Причина"],
["تفاصيل (اختياري)","Details (optional)","Détails (facultatif)","Detalles (opcional)","Details (optional)","Detaylar (isteğe bağlı)","Подробности (необязательно)"],
["إرسال البلاغ","Submit report","Envoyer le signalement","Enviar denuncia","Meldung senden","Bildirimi gönder","Отправить жалобу"],
["شكرًا ليك","Thank you","Merci","Gracias","Danke","Teşekkürler","Спасибо"],
["وصلنا البلاغ وهنراجع الإعلان.","We received your report and will review the ad.","Nous avons reçu votre signalement et allons examiner l'annonce.","Recibimos tu denuncia y revisaremos el anuncio.","Wir haben deine Meldung erhalten und prüfen die Anzeige.","Bildiriminizi aldık, ilanı inceleyeceğiz.","Мы получили вашу жалобу и проверим объявление."],
["تم نسخ رابط الإعلان","Ad link copied","Lien copié","Enlace copiado","Link kopiert","Bağlantı kopyalandı","Ссылка скопирована"],
["انسخ الرابط:","Copy the link:","Copiez le lien :","Copia el enlace:","Link kopieren:","Bağlantıyı kopyalayın:","Скопируйте ссылку:"],
  ["وصلت للحد الأقصى لعرض الأرقام. جرّب بعد ساعة.", "You've reached the limit for viewing numbers. Try again in an hour.", "Vous avez atteint la limite d'affichage des numéros. Réessayez dans une heure.", "Has alcanzado el límite de números visibles. Inténtalo de nuevo en una hora.", "Du hast das Limit für die Anzeige von Nummern erreicht. Versuche es in einer Stunde erneut.", "Numara görüntüleme sınırına ulaştınız. Bir saat sonra tekrar deneyin.", "Вы достигли лимита просмотра номеров. Попробуйте через час."],
  ["منتهي", "Expired", "Expirée", "Caducado", "Abgelaufen", "Süresi doldu", "Истекло"],
  ["تجديد الإعلان", "Renew ad", "Renouveler l'annonce", "Renovar anuncio", "Anzeige verlängern", "İlanı yenile", "Продлить объявление"],
  ["ينتهي في", "Expires on", "Expire le", "Caduca el", "Läuft ab am", "Bitiş tarihi:", "Истекает"],
  ["تم تجديد الإعلان لمدة 60 يومًا.", "Ad renewed for 60 days.", "Annonce renouvelée pour 60 jours.", "Anuncio renovado por 60 días.", "Anzeige für 60 Tage verlängert.", "İlan 60 gün için yenilendi.", "Объявление продлено на 60 дней."],
  ["إعلانات مشابهة", "Similar ads", "Annonces similaires", "Anuncios similares", "Ähnliche Anzeigen", "Benzer ilanlar", "Похожие объявления"],
  ["تصفية", "Filters", "Filtres", "Filtros", "Filter", "Filtrele", "Фильтры"],
  ["آخر تحديث: نوفمبر 2026. خصوصيتك تهمنا، والصفحة دي بتوضّح إيه البيانات اللي بنجمعها وإزاي بنستخدمها.", "Last updated: November 2026. Your privacy matters to us. This page explains what data we collect and how we use it.", "Dernière mise à jour : novembre 2026. Votre vie privée nous importe. Cette page explique quelles données nous collectons et comment nous les utilisons.", "Última actualización: noviembre de 2026. Tu privacidad nos importa. Esta página explica qué datos recopilamos y cómo los usamos.", "Zuletzt aktualisiert: November 2026. Deine Privatsphäre ist uns wichtig. Diese Seite erklärt, welche Daten wir erfassen und wie wir sie verwenden.", "Son güncelleme: Kasım 2026. Gizliliğiniz bizim için önemlidir. Bu sayfa hangi verileri topladığımızı ve nasıl kullandığımızı açıklar.", "Последнее обновление: ноябрь 2026 г. Ваша конфиденциальность важна для нас. На этой странице объясняется, какие данные мы собираем и как их используем."],
  ["البيانات التي نجمعها", "Data we collect", "Données que nous collectons", "Datos que recopilamos", "Daten, die wir erfassen", "Topladığımız veriler", "Данные, которые мы собираем"],
  ["عند إنشاء حساب: الاسم ورقم الموبايل، والإيميل (اختياري).", "When creating an account: your name, phone number, and email (optional).", "Lors de la création d'un compte : votre nom, votre numéro de téléphone et votre e-mail (facultatif).", "Al crear una cuenta: tu nombre, número de teléfono y correo electrónico (opcional).", "Bei der Kontoerstellung: dein Name, deine Telefonnummer und E-Mail (optional).", "Hesap oluştururken: adınız, telefon numaranız ve e-posta (isteğe bağlı).", "При создании аккаунта: имя, номер телефона и эл. почта (по желанию)."],
  ["عند نشر إعلان: عنوان الإعلان ووصفه وسعره ومدينته والصور اللي بترفعها.", "When posting an ad: the ad title, description, price, city, and the photos you upload.", "Lors de la publication d'une annonce : titre, description, prix, ville et les photos que vous téléversez.", "Al publicar un anuncio: título, descripción, precio, ciudad y las fotos que subas.", "Beim Veröffentlichen einer Anzeige: Titel, Beschreibung, Preis, Stadt und die von dir hochgeladenen Fotos.", "İlan yayınlarken: ilan başlığı, açıklaması, fiyatı, şehri ve yüklediğiniz fotoğraflar.", "При публикации объявления: заголовок, описание, цена, город и загруженные вами фото."],
  ["بيانات تقنية بسيطة مثل نوع المتصفح لتحسين الأداء.", "Basic technical data, such as browser type, to improve performance.", "Données techniques de base, comme le type de navigateur, pour améliorer les performances.", "Datos técnicos básicos, como el tipo de navegador, para mejorar el rendimiento.", "Grundlegende technische Daten, z. B. der Browsertyp, zur Verbesserung der Leistung.", "Performansı iyileştirmek için tarayıcı türü gibi temel teknik veriler.", "Базовые технические данные, например тип браузера, для улучшения работы сайта."],
  ["كيف نستخدم بياناتك", "How we use your data", "Comment nous utilisons vos données", "Cómo usamos tus datos", "Wie wir deine Daten verwenden", "Verilerinizi nasıl kullanıyoruz", "Как мы используем ваши данные"],
  ["تشغيل الحساب وتسجيل الدخول.", "Operating your account and signing you in.", "Gérer votre compte et votre connexion.", "Gestionar tu cuenta y el inicio de sesión.", "Betrieb deines Kontos und Anmeldung.", "Hesabınızı çalıştırmak ve oturum açmanızı sağlamak.", "Работа аккаунта и вход в систему."],
  ["عرض رقم المعلن للمستخدمين المسجّلين اللي عايزين يتواصلوا معاه.", "Showing the advertiser's number to registered users who want to contact them.", "Afficher le numéro de l'annonceur aux utilisateurs inscrits qui souhaitent le contacter.", "Mostrar el número del anunciante a los usuarios registrados que quieran contactarle.", "Anzeige der Nummer des Anbieters für registrierte Nutzer, die Kontakt aufnehmen möchten.", "İletişim kurmak isteyen kayıtlı kullanıcılara ilan sahibinin numarasını göstermek.", "Показ номера продавца зарегистрированным пользователям, которые хотят с ним связаться."],
  ["مراجعة البلاغات ومنع الإساءة والنصب.", "Reviewing reports and preventing abuse and fraud.", "Examiner les signalements et prévenir les abus et les fraudes.", "Revisar denuncias y prevenir abusos y fraudes.", "Bearbeitung von Meldungen sowie Verhinderung von Missbrauch und Betrug.", "Bildirimleri incelemek, kötüye kullanımı ve dolandırıcılığı önlemek.", "Рассмотрение жалоб и предотвращение злоупотреблений и мошенничества."],
  ["كلمات السر بتتخزن مشفّرة ولا يمكن لنا قراءتها. ولا نبيع بياناتك الشخصية لأي جهة.", "Passwords are stored encrypted and we cannot read them. We do not sell your personal data to anyone.", "Les mots de passe sont stockés sous forme chiffrée et nous ne pouvons pas les lire. Nous ne vendons vos données personnelles à personne.", "Las contraseñas se almacenan cifradas y no podemos leerlas. No vendemos tus datos personales a nadie.", "Passwörter werden verschlüsselt gespeichert und wir können sie nicht lesen. Wir verkaufen deine persönlichen Daten an niemanden.", "Parolalar şifrelenmiş olarak saklanır ve biz okuyamayız. Kişisel verilerinizi hiç kimseye satmayız.", "Пароли хранятся в зашифрованном виде, и мы не можем их прочитать. Мы не продаём ваши персональные данные никому."],
  ["التخزين والأمان", "Storage and security", "Stockage et sécurité", "Almacenamiento y seguridad", "Speicherung und Sicherheit", "Depolama ve güvenlik", "Хранение и безопасность"],
  ["بياناتنا بتتخزن على منصة Supabase، وبنستخدم سياسات أمان على مستوى قاعدة البيانات لحماية الحسابات.", "Our data is stored on the Supabase platform, and we use database-level security policies to protect accounts.", "Nos données sont stockées sur la plateforme Supabase et nous utilisons des politiques de sécurité au niveau de la base de données pour protéger les comptes.", "Nuestros datos se almacenan en la plataforma Supabase y usamos políticas de seguridad a nivel de base de datos para proteger las cuentas.", "Unsere Daten werden auf der Plattform Supabase gespeichert, und wir verwenden Sicherheitsrichtlinien auf Datenbankebene, um Konten zu schützen.", "Verilerimiz Supabase platformunda saklanır ve hesapları korumak için veritabanı düzeyinde güvenlik politikaları kullanırız.", "Наши данные хранятся на платформе Supabase, а для защиты аккаунтов мы используем политики безопасности на уровне базы данных."],
  ["ملفات الارتباط (Cookies) والإعلانات", "Cookies and advertising", "Cookies et publicité", "Cookies y publicidad", "Cookies und Werbung", "Çerezler ve reklamlar", "Файлы cookie и реклама"],
  ["ممكن نعرض إعلانات من أطراف خارجية مثل Google AdSense. جوجل وشركاؤها بيستخدموا ملفات الارتباط لعرض إعلانات بناءً على زياراتك السابقة لموقعنا أو مواقع أخرى. تقدر تلغي الإعلانات المخصصة من ", "We may show ads from third parties such as Google AdSense. Google and its partners use cookies to show ads based on your previous visits to our site or other sites. You can opt out of personalized ads from ", "Nous pouvons afficher des annonces de tiers, comme Google AdSense. Google et ses partenaires utilisent des cookies pour diffuser des annonces selon vos visites précédentes sur notre site ou d'autres sites. Vous pouvez désactiver les annonces personnalisées depuis ", "Podemos mostrar anuncios de terceros, como Google AdSense. Google y sus socios usan cookies para mostrar anuncios según tus visitas anteriores a nuestro sitio u otros sitios. Puedes desactivar los anuncios personalizados desde ", "Wir zeigen möglicherweise Anzeigen von Drittanbietern wie Google AdSense. Google und seine Partner verwenden Cookies, um Anzeigen auf Grundlage deiner früheren Besuche auf unserer Website oder anderen Websites auszuspielen. Personalisierte Werbung kannst du deaktivieren unter ", "Google AdSense gibi üçüncü taraflardan reklamlar gösterebiliriz. Google ve ortakları, sitemize veya diğer sitelere yaptığınız önceki ziyaretlere göre reklam göstermek için çerezler kullanır. Kişiselleştirilmiş reklamları şuradan kapatabilirsiniz: ", "Мы можем показывать рекламу третьих сторон, например Google AdSense. Google и его партнёры используют файлы cookie для показа рекламы на основе ваших прошлых посещений нашего и других сайтов. Персонализированную рекламу можно отключить в "],
  ["إعدادات إعلانات جوجل", "Google Ads Settings", "Paramètres des annonces Google", "Configuración de anuncios de Google", "Google-Anzeigeneinstellungen", "Google Reklam Ayarları", "Настройки рекламы Google"],
  ["، أو تعرف أكتر من ", ", or learn more from ", ", ou en savoir plus sur ", ", o conoce más en ", " oder erfahre mehr in ", ", veya daha fazlasını şuradan öğrenin: ", ", или узнайте больше в "],
  ["سياسة جوجل للإعلانات", "Google's advertising policy", "Politique publicitaire de Google", "Política de publicidad de Google", "Werberichtlinien von Google", "Google'ın reklam politikası", "Рекламная политика Google"],
  ["حقوقك", "Your rights", "Vos droits", "Tus derechos", "Deine Rechte", "Haklarınız", "Ваши права"],
  ["تقدر تطلب تعديل بياناتك أو حذف حسابك في أي وقت بالتواصل معانا من صفحة ", "You can ask us to edit your data or delete your account at any time through the page ", "Vous pouvez demander à tout moment la modification de vos données ou la suppression de votre compte via la page ", "Puedes solicitar en cualquier momento la modificación de tus datos o la eliminación de tu cuenta desde la página ", "Du kannst jederzeit die Änderung deiner Daten oder die Löschung deines Kontos über die Seite ", "Verilerinizin düzenlenmesini veya hesabınızın silinmesini istediğinizde bizimle şu sayfadan iletişime geçebilirsiniz: ", "Вы можете в любое время запросить изменение данных или удаление аккаунта на странице "],
  ["الأطفال", "Children", "Enfants", "Menores", "Kinder", "Çocuklar", "Дети"],
  ["الموقع غير موجّه للأطفال دون 13 سنة ولا نجمع بياناتهم عن قصد.", "The site is not directed at children under 13, and we do not knowingly collect their data.", "Le site ne s'adresse pas aux enfants de moins de 13 ans et nous ne collectons pas sciemment leurs données.", "El sitio no está dirigido a menores de 13 años y no recopilamos sus datos de forma intencionada.", "Die Website richtet sich nicht an Kinder unter 13 Jahren, und wir erfassen deren Daten nicht wissentlich.", "Site 13 yaşın altındaki çocuklara yönelik değildir ve bilerek verilerini toplamayız.", "Сайт не предназначен для детей младше 13 лет, и мы сознательно не собираем их данные."],
  ["تغيير السياسة", "Changes to this policy", "Modifications de cette politique", "Cambios en esta política", "Änderungen dieser Richtlinie", "Politikadaki değişiklikler", "Изменения политики"],
  ["ممكن نحدّث السياسة دي من وقت للتاني، وهنكتب تاريخ آخر تحديث أعلى الصفحة.", "We may update this policy from time to time, and we will show the last update date at the top of the page.", "Nous pouvons mettre à jour cette politique de temps à autre et indiquerons la date de dernière mise à jour en haut de la page.", "Podemos actualizar esta política de vez en cuando e indicaremos la fecha de la última actualización en la parte superior de la página.", "Wir können diese Richtlinie von Zeit zu Zeit aktualisieren und zeigen das Datum der letzten Aktualisierung oben auf der Seite an.", "Bu politikayı zaman zaman güncelleyebiliriz; son güncelleme tarihi sayfanın üst kısmında belirtilecektir.", "Мы можем время от времени обновлять эту политику и будем указывать дату последнего обновления в верхней части страницы."],
  ["الرئيسية", "Home", "Accueil", "Inicio", "Startseite", "Ana sayfa", "Главная"],
  ["باستخدامك موقع Zilx خدمات فإنت موافق على الشروط التالية:", "By using the Zilx Services website, you agree to the following terms:", "En utilisant le site Zilx Services, vous acceptez les conditions suivantes :", "Al usar el sitio Zilx Servicios, aceptas los siguientes términos:", "Mit der Nutzung der Website Zilx Dienste stimmst du den folgenden Bedingungen zu:", "Zilx Hizmetler sitesini kullanarak aşağıdaki şartları kabul etmiş olursunuz:", "Используя сайт Zilx Услуги, вы соглашаетесь со следующими условиями:"],
  ["1. طبيعة الموقع", "1. Nature of the site", "1. Nature du site", "1. Naturaleza del sitio", "1. Art der Website", "1. Sitenin niteliği", "1. Характер сайта"],
  ["Zilx منصة بتعرض إعلانات ينشرها مستخدمون. إحنا مش طرف في عملية البيع أو الإيجار، ولا بنضمن جودة أو صحة أي سلعة أو خدمة معروضة.", "Zilx is a platform that displays ads published by users. We are not a party to any sale or rental, and we do not guarantee the quality or authenticity of any item or service listed.", "Zilx est une plateforme qui affiche des annonces publiées par des utilisateurs. Nous ne sommes partie à aucune vente ou location et ne garantissons ni la qualité ni l'authenticité des biens ou services proposés.", "Zilx es una plataforma que muestra anuncios publicados por usuarios. No somos parte de ninguna venta o alquiler y no garantizamos la calidad ni la autenticidad de ningún artículo o servicio publicado.", "Zilx ist eine Plattform, die von Nutzern veröffentlichte Anzeigen zeigt. Wir sind an keinem Kauf oder keiner Vermietung beteiligt und garantieren weder Qualität noch Echtheit der angebotenen Waren oder Dienstleistungen.", "Zilx, kullanıcıların yayınladığı ilanları gösteren bir platformdur. Herhangi bir satış veya kiralama işleminin tarafı değiliz; listelenen ürün veya hizmetlerin kalitesini ya da gerçekliğini garanti etmeyiz.", "Zilx — это платформа, на которой размещаются объявления пользователей. Мы не являемся стороной продажи или аренды и не гарантируем качество или подлинность каких-либо товаров или услуг."],
  ["2. الحساب", "2. Account", "2. Compte", "2. Cuenta", "2. Konto", "2. Hesap", "2. Аккаунт"],
  ["لازم تدخل رقم موبايل صحيح يخصك.", "You must enter a valid phone number that belongs to you.", "Vous devez saisir un numéro de téléphone valide vous appartenant.", "Debes introducir un número de teléfono válido que te pertenezca.", "Du musst eine gültige Telefonnummer angeben, die dir gehört.", "Size ait geçerli bir telefon numarası girmelisiniz.", "Необходимо указать действительный номер телефона, принадлежащий вам."],
  ["إنت مسؤول عن سرية كلمة السر وعن كل نشاط على حسابك.", "You are responsible for keeping your password confidential and for all activity on your account.", "Vous êtes responsable de la confidentialité de votre mot de passe et de toute activité sur votre compte.", "Eres responsable de mantener la confidencialidad de tu contraseña y de toda la actividad en tu cuenta.", "Du bist für die Geheimhaltung deines Passworts und für alle Aktivitäten auf deinem Konto verantwortlich.", "Parolanızın gizliliğinden ve hesabınızdaki tüm faaliyetlerden siz sorumlusunuz.", "Вы несёте ответственность за конфиденциальность пароля и за любые действия в вашем аккаунте."],
  ["الحد الأقصى 5 إعلانات في اليوم للمستخدم.", "The maximum is 5 ads per day per user.", "Le maximum est de 5 annonces par jour et par utilisateur.", "El máximo es de 5 anuncios al día por usuario.", "Maximal 5 Anzeigen pro Tag und Nutzer.", "Kullanıcı başına günde en fazla 5 ilan verilebilir.", "Максимум — 5 объявлений в день на пользователя."],
  ["3. المحتوى الممنوع", "3. Prohibited content", "3. Contenu interdit", "3. Contenido prohibido", "3. Verbotene Inhalte", "3. Yasaklı içerik", "3. Запрещённый контент"],
  ["إعلانات وهمية أو مضللة أو مكررة.", "Fake, misleading, or duplicate ads.", "Annonces fausses, trompeuses ou en double.", "Anuncios falsos, engañosos o duplicados.", "Gefälschte, irreführende oder doppelte Anzeigen.", "Sahte, yanıltıcı veya tekrarlanan ilanlar.", "Фейковые, вводящие в заблуждение или повторяющиеся объявления."],
  ["سلع مسروقة أو ممنوعة قانونًا، من مخدرات وأسلحة وغيرها.", "Stolen or legally prohibited goods, including drugs, weapons, and the like.", "Marchandises volées ou interdites par la loi, notamment drogues, armes, etc.", "Artículos robados o prohibidos por la ley, incluidos drogas, armas y similares.", "Gestohlene oder gesetzlich verbotene Waren, einschließlich Drogen, Waffen und Ähnlichem.", "Çalıntı veya yasalarca yasaklanmış mallar; uyuşturucu, silah vb.", "Краденые или запрещённые законом товары, включая наркотики, оружие и т. п."],
  ["محتوى مسيء أو يخالف الآداب العامة.", "Offensive content or content that violates public decency.", "Contenu offensant ou contraire aux bonnes mœurs.", "Contenido ofensivo o contrario a la moral pública.", "Anstößige Inhalte oder Inhalte, die gegen die öffentliche Moral verstoßen.", "Saldırgan veya genel ahlaka aykırı içerik.", "Оскорбительный контент или контент, нарушающий общественную мораль."],
  ["أي محاولة نصب أو سرقة بيانات.", "Any attempt at fraud or data theft.", "Toute tentative de fraude ou de vol de données.", "Cualquier intento de fraude o robo de datos.", "Jeder Betrugs- oder Datendiebstahlsversuch.", "Her türlü dolandırıcılık veya veri hırsızlığı girişimi.", "Любые попытки мошенничества или кражи данных."],
  ["4. حقوقنا", "4. Our rights", "4. Nos droits", "4. Nuestros derechos", "4. Unsere Rechte", "4. Haklarımız", "4. Наши права"],
  ["من حقنا حذف أي إعلان وإيقاف أي حساب يخالف الشروط من غير إنذار مسبق.", "We have the right to delete any ad and suspend any account that violates the terms, without prior notice.", "Nous avons le droit de supprimer toute annonce et de suspendre tout compte enfreignant les conditions, sans préavis.", "Tenemos derecho a eliminar cualquier anuncio y suspender cualquier cuenta que infrinja los términos, sin previo aviso.", "Wir sind berechtigt, jede Anzeige zu löschen und jedes Konto, das gegen die Bedingungen verstößt, ohne Vorankündigung zu sperren.", "Şartları ihlal eden herhangi bir ilanı silme ve herhangi bir hesabı önceden haber vermeden askıya alma hakkına sahibiz.", "Мы вправе удалить любое объявление и заблокировать любой аккаунт, нарушающий условия, без предварительного уведомления."],
  ["5. نصائح للأمان", "5. Safety tips", "5. Conseils de sécurité", "5. Consejos de seguridad", "5. Sicherheitstipps", "5. Güvenlik ipuçları", "5. Советы по безопасности"],
  ["اتعامل وإنت شايف السلعة وجهًا لوجه في مكان عام.", "Deal in person, seeing the item face to face in a public place.", "Traitez en personne, en voyant l'article en face à face dans un lieu public.", "Haz el trato en persona, viendo el artículo cara a cara en un lugar público.", "Triff dich persönlich an einem öffentlichen Ort und sieh dir die Ware vor Ort an.", "Ürünü yüz yüze, halka açık bir yerde görerek işlem yapın.", "Совершайте сделку лично, осматривая товар в общественном месте."],
  ["متحوّلش فلوس مقدمًا لشخص متعرفوش.", "Do not transfer money in advance to someone you do not know.", "Ne transférez pas d'argent à l'avance à une personne que vous ne connaissez pas.", "No transfieras dinero por adelantado a alguien que no conoces.", "Überweise kein Geld im Voraus an jemanden, den du nicht kennst.", "Tanımadığınız birine peşin para göndermeyin.", "Не переводите деньги вперёд незнакомому человеку."],
  ["اتأكد من أوراق العربية والشقة قبل الدفع.", "Verify the car and apartment documents before paying.", "Vérifiez les papiers de la voiture et de l'appartement avant de payer.", "Verifica los documentos del coche y del piso antes de pagar.", "Prüfe die Unterlagen für Auto und Wohnung, bevor du bezahlst.", "Ödeme yapmadan önce araç ve daire belgelerini kontrol edin.", "Проверьте документы на автомобиль и квартиру перед оплатой."],
  ["6. حدود المسؤولية", "6. Limitation of liability", "6. Limitation de responsabilité", "6. Limitación de responsabilidad", "6. Haftungsbeschränkung", "6. Sorumluluk sınırı", "6. Ограничение ответственности"],
  ["الموقع بيشتغل \"كما هو\"، ومش مسؤولين عن أي خسارة ناتجة عن التعامل بين المستخدمين.", "The site is provided “as is”, and we are not responsible for any loss arising from dealings between users.", "Le site est fourni « tel quel » et nous ne sommes pas responsables des pertes résultant des transactions entre utilisateurs.", "El sitio se ofrece «tal cual» y no somos responsables de ninguna pérdida derivada de los tratos entre usuarios.", "Die Website wird „wie besehen“ bereitgestellt; wir haften nicht für Verluste aus Geschäften zwischen Nutzern.", "Site “olduğu gibi” sunulur ve kullanıcılar arasındaki işlemlerden doğan hiçbir kayıptan sorumlu değiliz.", "Сайт предоставляется «как есть», и мы не несём ответственности за убытки, возникшие при взаимодействии пользователей."],
  ["7. التواصل", "7. Contact", "7. Contact", "7. Contacto", "7. Kontakt", "7. İletişim", "7. Связь"],
  ["لأي استفسار: ", "For any inquiries: ", "Pour toute question : ", "Para cualquier consulta: ", "Bei Fragen: ", "Her türlü soru için: ", "По любым вопросам: "]
];

const maps = {};
BASE.slice(1).forEach((l, i) => { maps[l] = new Map(ROWS.map(r => [r[0], r[i + 1]])); });
const EX = window.ZL_EXTRA || {};
ORDER.slice(BASE.length).forEach(l => { maps[l] = new Map(EX[l] || []); });
const keys = ROWS.map(r => r[0]).sort((a, b) => b.length - a.length);
const rx = s => s.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&");
const RE = new RegExp("(?<![\\u0600-\\u06FF])(?:" + keys.map(rx).join("|") + ")(?![\\u0600-\\u06FF])", "g");
const AR = /[\u0600-\u06FF]/;
const SKIP = '[translate="no"],script,style,textarea,input';
const ATTRS = ["placeholder", "aria-label", "title"];
let LANG = "ar";
const store = new WeakMap(), astore = new WeakMap();

function trText(s) { s = String(s); if (LANG === "ar") return s; const m = maps[LANG]; return s.replace(RE, k => m.get(k) ?? k); }
function trNode(n) {
  const p = n.parentElement; if (!p || p.closest(SKIP)) return;
  let rec = store.get(n); if (rec && n.nodeValue !== rec.t) rec = null;
  const o = rec ? rec.o : n.nodeValue;
  if (!rec && !AR.test(o)) return;
  const t = trText(o); store.set(n, { o, t }); if (n.nodeValue !== t) n.nodeValue = t;
}
function trAttrs(el) {
  let rec = astore.get(el); if (!rec) { rec = {}; astore.set(el, rec); }
  for (const a of ATTRS) {
    const cur = el.getAttribute(a); if (cur == null) continue;
    let r = rec[a]; if (r && cur !== r.t) r = null;
    const o = r ? r.o : cur; if (!r && !AR.test(o)) continue;
    const t = trText(o); rec[a] = { o, t }; if (cur !== t) el.setAttribute(a, t);
  }
}
function walk(n) {
  if (n.nodeType === 3) return trNode(n);
  if (n.nodeType !== 1 || (n.closest && n.closest(SKIP))) return;
  trAttrs(n); n.childNodes.forEach(walk);
}
function setLang(l) {
  if (!ORDER.includes(l)) l = "ar";
  LANG = l;
  try { localStorage.setItem("zl", l); } catch (e) {}
  const h = document.documentElement; h.lang = l; h.dir = RTL.includes(l) ? "rtl" : "ltr";
  window.__ot = window.__ot || document.title;
  document.title = document.documentElement.hasAttribute('data-keep-title') ? trText(window.__ot) : (TITLES[l] || TITLES.ar);
  const sel = document.getElementById("lang"); if (sel) sel.value = l;
  walk(document.body);
}
window.trText = trText;
window.curLoc = () => LOCS[LANG];
window.setLang = setLang;
window.getLang = () => LANG;

function init() {
  const sel = document.getElementById("lang");
  if (sel) { sel.innerHTML = ORDER.map(l => `<option value="${l}">${NAMES[l]}</option>`).join(""); sel.onchange = () => setLang(sel.value); }
  new MutationObserver(ms => { for (const m of ms) { if (m.type === "childList") m.addedNodes.forEach(walk); else if (m.type === "characterData") trNode(m.target); } })
    .observe(document.body, { childList: true, subtree: true, characterData: true });
  const _a = window.alert, _c = window.confirm, _p = window.prompt;
  window.alert = m => _a.call(window, trText(m));
  window.confirm = m => _c.call(window, trText(m));
  window.prompt = (m, d) => _p.call(window, trText(m), d);
  let l = null; try { l = localStorage.getItem("zl"); } catch (e) {}
  if (!l) { const b = (navigator.language || "ar").slice(0, 2).toLowerCase(); l = ORDER.includes(b) ? b : "ar"; }
  setLang(l);
}
init();
})();
