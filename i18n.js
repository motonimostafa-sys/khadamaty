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
  ["إعلانات مشابهة", "Similar ads", "Annonces similaires", "Anuncios similares", "Ähnliche Anzeigen", "Benzer ilanlar", "Похожие объявления"]
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
  document.title = TITLES[l] || TITLES.ar;
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
