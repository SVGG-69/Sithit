import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Coffee, Star, Clock, MapPin, Phone, Mail, Instagram,
  Menu as MenuIcon, X, Plus, Minus, Heart, ShoppingBag,
  ChevronDown, ChevronRight, Sparkles, Award, Gift,
  Calendar, Users, Send, ArrowRight, Leaf, Flame, Snowflake
} from 'lucide-react';

// ============ DATA ============
const menuItems = [
  { id: 1, name: 'Эспрессо', category: 'classic', price: 180, description: 'Классический крепкий кофе', emoji: '☕', calories: 5, time: '2 мин', popular: true },
  { id: 2, name: 'Капучино', category: 'classic', price: 280, description: 'Эспрессо с нежной молочной пеной', emoji: '☕', calories: 120, time: '4 мин', popular: true },
  { id: 3, name: 'Латте', category: 'classic', price: 320, description: 'Мягкий кофе с большим количеством молока', emoji: '🥛', calories: 150, time: '5 мин', popular: true },
  { id: 4, name: 'Раф', category: 'signature', price: 380, description: 'Сливочный кофе с ванильным сахаром', emoji: '✨', calories: 220, time: '6 мин', popular: true },
  { id: 5, name: 'Флэт Уайт', category: 'classic', price: 300, description: 'Двойной эспрессо с бархатным молоком', emoji: '☕', calories: 130, time: '4 мин', popular: false },
  { id: 6, name: 'Матча Латте', category: 'signature', price: 360, description: 'Японский чай матча с молоком', emoji: '🍵', calories: 180, time: '5 мин', popular: true },
  { id: 7, name: 'Какао', category: 'non-coffee', price: 280, description: 'Бельгийский шоколад с молоком', emoji: '🍫', calories: 250, time: '4 мин', popular: false },
  { id: 8, name: 'Чай Эрл Грей', category: 'non-coffee', price: 200, description: 'Чёрный чай с бергамотом', emoji: '🫖', calories: 5, time: '5 мин', popular: false },
  { id: 9, name: 'Аффогато', category: 'dessert', price: 350, description: 'Мороженое с горячим эспрессо', emoji: '🍨', calories: 280, time: '3 мин', popular: true },
  { id: 10, name: 'Круассан', category: 'food', price: 220, description: 'Свежий французский круассан с маслом', emoji: '🥐', calories: 320, time: '1 мин', popular: true },
  { id: 11, name: 'Чизкейк', category: 'dessert', price: 380, description: 'Нью-Йорк чизкейк с ягодами', emoji: '🍰', calories: 420, time: '1 мин', popular: false },
  { id: 12, name: 'Авокадо тост', category: 'food', price: 420, description: 'Тост с авокадо, яйцом пашот и микрозеленью', emoji: '🥑', calories: 380, time: '8 мин', popular: true },
];

const categories = [
  { id: 'all', name: 'Все', emoji: '📋' },
  { id: 'classic', name: 'Классика', emoji: '☕' },
  { id: 'signature', name: 'Авторские', emoji: '✨' },
  { id: 'non-coffee', name: 'Без кофе', emoji: '🍵' },
  { id: 'food', name: 'Еда', emoji: '🥐' },
  { id: 'dessert', name: 'Десерты', emoji: '🍰' },
];

const reviews = [
  { id: 1, name: 'Анна К.', text: 'Лучший кофе в городе! Атмосфера невероятная, возвращаюсь каждый день.', rating: 5, avatar: '👩' },
  { id: 2, name: 'Дмитрий М.', text: 'Отличный раф и круассаны. Бариста всегда приветливые.', rating: 5, avatar: '👨' },
  { id: 3, name: 'Елена С.', text: 'Уютное место для работы. Быстрый Wi-Fi и вкусный латте!', rating: 4, avatar: '👩‍💼' },
  { id: 4, name: 'Максим П.', text: 'Флэт уайт здесь просто божественный. Рекомендую всем!', rating: 5, avatar: '🧔' },
  { id: 5, name: 'Ольга В.', text: 'Обожаю их матча латте. Идеальное место для утреннего ритуала.', rating: 5, avatar: '👱‍♀️' },
];

const loyaltyLevels = [
  { name: 'Зерно', min: 0, discount: 0, color: '#a0673d', icon: '🫘' },
  { name: 'Капля', min: 5, discount: 5, color: '#c4854c', icon: '💧' },
  { name: 'Чашка', min: 15, discount: 10, color: '#d4a574', icon: '☕' },
  { name: 'Кофеман', min: 30, discount: 15, color: '#e8c9a0', icon: '⭐' },
  { name: 'Мастер', min: 50, discount: 20, color: '#ffd700', icon: '👑' },
];

// ============ COMPONENTS ============

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Navbar
function Navbar({ cartCount, onCartClick, onBookingClick }: { cartCount: number; onCartClick: () => void; onBookingClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#menu', label: 'Меню' },
    { href: '#builder', label: 'Конструктор' },
    { href: '#loyalty', label: 'Лояльность' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#contacts', label: 'Контакты' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-card shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <motion.div whileHover={{ rotate: 20 }} className="text-3xl">☕</motion.div>
          <span className="text-xl font-bold text-coffee-800 tracking-tight">
            AROMA<span className="text-coffee-400">coffee</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-coffee-700 hover:text-coffee-400 transition-colors font-medium text-sm tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coffee-400 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookingClick}
            className="hidden sm:flex items-center gap-2 bg-coffee-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-coffee-700 transition-colors"
          >
            <Calendar size={14} />
            Бронь
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCartClick}
            className="relative p-2 rounded-full bg-coffee-100 text-coffee-700 hover:bg-coffee-200 transition-colors"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-coffee-700"
          >
            {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mx-4 mt-2 rounded-2xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-coffee-700 hover:text-coffee-400 py-2 px-4 rounded-lg hover:bg-coffee-50 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { onBookingClick(); setMobileOpen(false); }}
                className="bg-coffee-600 text-white py-2 px-4 rounded-lg font-medium mt-2"
              >
                Забронировать столик
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Hero
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-700" />
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(196, 133, 76, 0.4) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(212, 165, 116, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 60% 80%, rgba(160, 103, 61, 0.3) 0%, transparent 50%)`
        }}
      />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['☕', '🫘', '✨', '🍪', '🫖'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{ left: `${15 + i * 20}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-7xl sm:text-8xl mb-6 animate-float">☕</div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Каждая чашка —
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-200 to-coffee-400">
              маленькое счастье
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-coffee-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Свежеобжаренный кофе из лучших плантаций мира, авторские напитки
            и уютная атмосфера в самом сердце города
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-coffee-800 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center gap-2"
            >
              Смотреть меню <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="#builder"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles size={20} /> Собрать напиток
            </motion.a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-4 sm:gap-8"
        >
          {[
            { value: '12+', label: 'сортов зерна' },
            { value: '5000+', label: 'чашек в день' },
            { value: '4.9', label: 'рейтинг' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-coffee-300 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-white/50" size={32} />
      </motion.div>
    </section>
  );
}

// Menu Section
function MenuSection({ onAddToCart }: { onAddToCart: (item: typeof menuItems[0]) => void }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter((item) => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section id="menu" className="py-20 sm:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-coffee-400 font-medium text-sm tracking-widest uppercase">Наше меню</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-coffee-900 mt-3">
              Выберите свой идеальный напиток
            </h2>
          </div>
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection className="mb-8">
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Поиск напитка..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-white border-2 border-coffee-100 focus:border-coffee-400 outline-none text-coffee-800 placeholder-coffee-300 shadow-sm transition-colors"
            />
            <Coffee className="absolute right-5 top-1/2 -translate-y-1/2 text-coffee-300" size={20} />
          </div>
        </AnimatedSection>

        {/* Categories */}
        <AnimatedSection className="mb-10">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-coffee-600 text-white shadow-lg shadow-coffee-600/30'
                    : 'bg-white text-coffee-600 hover:bg-coffee-50 border border-coffee-100'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="menu-card bg-white rounded-2xl p-5 shadow-sm border border-coffee-50 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                {item.popular && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                    <Flame size={10} /> Хит
                  </div>
                )}

                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>

                <h3 className="font-bold text-coffee-900 text-lg mb-1">{item.name}</h3>
                <p className="text-coffee-400 text-sm mb-4 line-clamp-2">{item.description}</p>

                <div className="flex items-center gap-3 text-xs text-coffee-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {item.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Leaf size={12} /> {item.calories} ккал
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-coffee-800">{item.price} ₽</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onAddToCart(item)}
                    className="bg-coffee-100 hover:bg-coffee-600 text-coffee-600 hover:text-white p-3 rounded-full transition-colors"
                  >
                    <Plus size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-coffee-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg">Ничего не найдено</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Drink Builder Plugin
function DrinkBuilder({ onAddToCart }: { onAddToCart: (item: { name: string; price: number; emoji: string }) => void }) {
  const [base, setBase] = useState('');
  const [milk, setMilk] = useState('');
  const [syrup, setSyrup] = useState('');
  const [extras, setExtras] = useState<string[]>([]);
  const [size, setSize] = useState('medium');

  const bases = [
    { id: 'espresso', name: 'Эспрессо', price: 180, emoji: '☕' },
    { id: 'americano', name: 'Американо', price: 180, emoji: '☕' },
    { id: 'matcha', name: 'Матча', price: 220, emoji: '🍵' },
    { id: 'cacao', name: 'Какао', price: 200, emoji: '🍫' },
  ];

  const milks = [
    { id: 'classic', name: 'Обычное', price: 0, emoji: '🥛' },
    { id: 'oat', name: 'Овсяное', price: 60, emoji: '🌾' },
    { id: 'coconut', name: 'Кокосовое', price: 60, emoji: '🥥' },
    { id: 'almond', name: 'Миндальное', price: 60, emoji: '🌰' },
  ];

  const syrups = [
    { id: 'vanilla', name: 'Ваниль', price: 40, emoji: '🌼' },
    { id: 'caramel', name: 'Карамель', price: 40, emoji: '🍬' },
    { id: 'hazelnut', name: 'Фундук', price: 40, emoji: '🌰' },
    { id: 'lavender', name: 'Лаванда', price: 50, emoji: '💜' },
  ];

  const extraOptions = [
    { id: 'cream', name: 'Сливки', price: 50, emoji: '🍦' },
    { id: 'cinnamon', name: 'Корица', price: 20, emoji: '🫚' },
    { id: 'ice', name: 'Лёд', price: 0, emoji: '🧊' },
    { id: 'extra-shot', name: 'Доп. шот', price: 80, emoji: '⚡' },
  ];

  const sizes = [
    { id: 'small', name: 'S', multiplier: 0.8, label: '250мл' },
    { id: 'medium', name: 'M', multiplier: 1, label: '350мл' },
    { id: 'large', name: 'L', multiplier: 1.3, label: '450мл' },
  ];

  const calculatePrice = () => {
    const basePrice = bases.find(b => b.id === base)?.price || 0;
    const milkPrice = milks.find(m => m.id === milk)?.price || 0;
    const syrupPrice = syrups.find(s => s.id === syrup)?.price || 0;
    const extrasPrice = extras.reduce((sum, id) => sum + (extraOptions.find(e => e.id === id)?.price || 0), 0);
    const sizeMultiplier = sizes.find(s => s.id === size)?.multiplier || 1;
    return Math.round((basePrice + milkPrice + syrupPrice + extrasPrice) * sizeMultiplier);
  };

  const toggleExtra = (id: string) => {
    setExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const handleAdd = () => {
    const baseItem = bases.find(b => b.id === base);
    if (!baseItem) return;
    const name = `${baseItem.name} ${sizes.find(s => s.id === size)?.name || ''}`;
    onAddToCart({ name, price: calculatePrice(), emoji: baseItem.emoji });
  };

  return (
    <section id="builder" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-warm to-coffee-50">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-coffee-400 font-medium text-sm tracking-widest uppercase">Конструктор</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-coffee-900 mt-3">
              Собери свой напиток
            </h2>
            <p className="text-coffee-500 mt-4 max-w-lg mx-auto">
              Создайте уникальный напиток по своему вкусу из наших ингредиентов
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-xl">
            {/* Base */}
            <div className="mb-8">
              <h3 className="font-bold text-coffee-800 mb-4 flex items-center gap-2">
                <Coffee size={20} className="text-coffee-400" /> Основа
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {bases.map((b) => (
                  <motion.button
                    key={b.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setBase(b.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      base === b.id
                        ? 'border-coffee-500 bg-coffee-50 shadow-md'
                        : 'border-coffee-100 hover:border-coffee-200 bg-white'
                    }`}
                  >
                    <div className="text-2xl mb-1">{b.emoji}</div>
                    <div className="font-medium text-sm text-coffee-800">{b.name}</div>
                    <div className="text-xs text-coffee-400 mt-1">{b.price} ₽</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-8">
              <h3 className="font-bold text-coffee-800 mb-4 flex items-center gap-2">
                <Snowflake size={20} className="text-coffee-400" /> Размер
              </h3>
              <div className="flex gap-3">
                {sizes.map((s) => (
                  <motion.button
                    key={s.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSize(s.id)}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all text-center ${
                      size === s.id
                        ? 'border-coffee-500 bg-coffee-50'
                        : 'border-coffee-100 hover:border-coffee-200 bg-white'
                    }`}
                  >
                    <div className="font-bold text-lg text-coffee-800">{s.name}</div>
                    <div className="text-xs text-coffee-400">{s.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Milk */}
            <div className="mb-8">
              <h3 className="font-bold text-coffee-800 mb-4 flex items-center gap-2">
                🥛 Молоко
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {milks.map((m) => (
                  <motion.button
                    key={m.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMilk(m.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      milk === m.id
                        ? 'border-coffee-500 bg-coffee-50 shadow-md'
                        : 'border-coffee-100 hover:border-coffee-200 bg-white'
                    }`}
                  >
                    <div className="text-xl mb-1">{m.emoji}</div>
                    <div className="font-medium text-xs text-coffee-800">{m.name}</div>
                    {m.price > 0 && <div className="text-xs text-coffee-400">+{m.price} ₽</div>}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Syrup */}
            <div className="mb-8">
              <h3 className="font-bold text-coffee-800 mb-4 flex items-center gap-2">
                🍯 Сироп
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {syrups.map((s) => (
                  <motion.button
                    key={s.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSyrup(s.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      syrup === s.id
                        ? 'border-coffee-500 bg-coffee-50 shadow-md'
                        : 'border-coffee-100 hover:border-coffee-200 bg-white'
                    }`}
                  >
                    <div className="text-xl mb-1">{s.emoji}</div>
                    <div className="font-medium text-xs text-coffee-800">{s.name}</div>
                    <div className="text-xs text-coffee-400">+{s.price} ₽</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="mb-8">
              <h3 className="font-bold text-coffee-800 mb-4 flex items-center gap-2">
                ✨ Дополнительно
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {extraOptions.map((e) => (
                  <motion.button
                    key={e.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleExtra(e.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      extras.includes(e.id)
                        ? 'border-coffee-500 bg-coffee-50 shadow-md'
                        : 'border-coffee-100 hover:border-coffee-200 bg-white'
                    }`}
                  >
                    <div className="text-xl mb-1">{e.emoji}</div>
                    <div className="font-medium text-xs text-coffee-800">{e.name}</div>
                    {e.price > 0 && <div className="text-xs text-coffee-400">+{e.price} ₽</div>}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="bg-gradient-to-r from-coffee-600 to-coffee-700 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-sm opacity-80">Ваш напиток</div>
                <div className="text-2xl font-bold">{calculatePrice()} ₽</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                disabled={!base}
                className="bg-white text-coffee-700 px-6 py-3 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
              >
                <ShoppingBag size={18} /> Добавить в корзину
              </motion.button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Loyalty Plugin
function LoyaltyPlugin() {
  const [cups, setCups] = useState(0);

  const currentLevel = [...loyaltyLevels].reverse().find(l => cups >= l.min) || loyaltyLevels[0];
  const nextLevel = loyaltyLevels.find(l => cups < l.min);
  const progress = nextLevel ? ((cups - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100 : 100;

  return (
    <section id="loyalty" className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-coffee-400 font-medium text-sm tracking-widest uppercase">Программа лояльности</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-coffee-900 mt-3">
              Пейте кофе — получайте бонусы
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-xl">
            {/* Current Level */}
            <div className="text-center mb-8">
              <motion.div
                key={currentLevel.name}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl mb-3"
              >
                {currentLevel.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-coffee-800">{currentLevel.name}</h3>
              <p className="text-coffee-500 mt-1">
                {currentLevel.discount > 0 ? `Скидка ${currentLevel.discount}% на все напитки` : 'Начните собирать чашки!'}
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-coffee-500 mb-2">
                <span>{cups} чашек</span>
                <span>{nextLevel ? `${nextLevel.min} чашек → ${nextLevel.name}` : 'Максимальный уровень!'}</span>
              </div>
              <div className="h-4 bg-coffee-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-coffee-400 to-coffee-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Cup counter */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCups(Math.max(0, cups - 1))}
                className="w-12 h-12 rounded-full bg-coffee-100 text-coffee-600 flex items-center justify-center hover:bg-coffee-200 transition-colors"
              >
                <Minus size={20} />
              </motion.button>
              <div className="text-5xl font-bold text-coffee-800 min-w-[80px] text-center">{cups}</div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCups(cups + 1)}
                className="w-12 h-12 rounded-full bg-coffee-600 text-white flex items-center justify-center hover:bg-coffee-700 transition-colors"
              >
                <Plus size={20} />
              </motion.button>
            </div>

            {/* Levels */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {loyaltyLevels.map((level) => (
                <div
                  key={level.name}
                  className={`p-3 rounded-xl text-center transition-all ${
                    cups >= level.min
                      ? 'bg-coffee-50 border-2 border-coffee-300'
                      : 'bg-coffee-50/50 border-2 border-transparent opacity-60'
                  }`}
                >
                  <div className="text-2xl mb-1">{level.icon}</div>
                  <div className="font-bold text-sm text-coffee-800">{level.name}</div>
                  <div className="text-xs text-coffee-400">{level.min}+ чашек</div>
                  {level.discount > 0 && (
                    <div className="text-xs font-bold text-coffee-500 mt-1">-{level.discount}%</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Reviews
function ReviewsSection() {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-coffee-50 to-warm">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-coffee-400 font-medium text-sm tracking-widest uppercase">Отзывы</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-coffee-900 mt-3">
              Что говорят наши гости
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-3xl p-8 sm:p-12 text-center shadow-lg"
              >
                <div className="text-5xl mb-4">{reviews[activeReview].avatar}</div>
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: reviews[activeReview].rating }).map((_, i) => (
                    <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-lg sm:text-xl text-coffee-700 italic mb-4 max-w-2xl mx-auto leading-relaxed">
                  «{reviews[activeReview].text}»
                </p>
                <p className="font-bold text-coffee-800">{reviews[activeReview].name}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReview(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === activeReview ? 'bg-coffee-600 w-8' : 'bg-coffee-200 hover:bg-coffee-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Booking Plugin
function BookingPlugin({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    comment: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: '', phone: '', date: '', time: '', guests: 2, comment: '' });
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-coffee-800 mb-2">Забронировано!</h3>
                <p className="text-coffee-500">Мы ждём вас. До скорой встречи!</p>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-coffee-800">Бронирование</h3>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-coffee-50 text-coffee-400">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-coffee-700 mb-1 block">Ваше имя</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-coffee-100 focus:border-coffee-400 outline-none transition-colors"
                      placeholder="Как вас зовут?"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-coffee-700 mb-1 block">Телефон</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-coffee-100 focus:border-coffee-400 outline-none transition-colors"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-coffee-700 mb-1 block">Дата</label>
                      <input
                        required
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-coffee-100 focus:border-coffee-400 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-coffee-700 mb-1 block">Время</label>
                      <input
                        required
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-coffee-100 focus:border-coffee-400 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-coffee-700 mb-1 block">
                      <Users size={14} className="inline mr-1" /> Гостей: {formData.guests}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full accent-coffee-500"
                    />
                    <div className="flex justify-between text-xs text-coffee-400 mt-1">
                      <span>1</span><span>8</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-coffee-700 mb-1 block">Комментарий</label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-coffee-100 focus:border-coffee-400 outline-none transition-colors resize-none"
                      rows={3}
                      placeholder="Особые пожелания..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-coffee-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-coffee-700 transition-colors shadow-lg shadow-coffee-600/30"
                  >
                    Забронировать
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Cart Plugin
function CartPlugin({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQty,
  onClear,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ item: { name: string; price: number; emoji: string }; qty: number }>;
  onRemove: (index: number) => void;
  onUpdateQty: (index: number, delta: number) => void;
  onClear: () => void;
}) {
  const total = items.reduce((sum, { item, qty }) => sum + item.price * qty, 0);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => {
      setOrdered(false);
      onClear();
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-coffee-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-coffee-800 flex items-center gap-2">
                <ShoppingBag size={22} /> Корзина
              </h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-coffee-50 text-coffee-400">
                <X size={20} />
              </button>
            </div>

            {ordered ? (
              <div className="flex-1 flex items-center justify-center p-6">
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-coffee-800 mb-2">Заказ принят!</h3>
                  <p className="text-coffee-500">Готовим ваш заказ с любовью</p>
                </motion.div>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="text-5xl mb-4 opacity-50">🛒</div>
                  <p className="text-coffee-400 text-lg">Корзина пуста</p>
                  <p className="text-coffee-300 text-sm mt-1">Добавьте что-нибудь из меню</p>
                </div>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <AnimatePresence>
                    {items.map(({ item, qty }, index) => (
                      <motion.div
                        key={`${item.name}-${index}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        className="flex items-center gap-4 bg-coffee-50 rounded-xl p-4"
                      >
                        <div className="text-3xl">{item.emoji}</div>
                        <div className="flex-1">
                          <div className="font-medium text-coffee-800">{item.name}</div>
                          <div className="text-sm text-coffee-400">{item.price} ₽</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQty(index, -1)}
                            className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-coffee-600 hover:bg-coffee-100"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-coffee-800 w-6 text-center">{qty}</span>
                          <button
                            onClick={() => onUpdateQty(index, 1)}
                            className="w-7 h-7 rounded-full bg-coffee-600 flex items-center justify-center text-white hover:bg-coffee-700"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemove(index)}
                          className="p-1 text-coffee-300 hover:text-red-400 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-coffee-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-coffee-500">Итого:</span>
                    <span className="text-2xl font-bold text-coffee-800">{total} ₽</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOrder}
                    className="w-full bg-coffee-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-coffee-700 transition-colors shadow-lg shadow-coffee-600/30 flex items-center justify-center gap-2"
                  >
                    <Send size={18} /> Оформить заказ
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Contacts
function Contacts() {
  return (
    <section id="contacts" className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-coffee-400 font-medium text-sm tracking-widest uppercase">Контакты</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-coffee-900 mt-3">
              Ждём вас в гости
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <MapPin size={24} />, title: 'Адрес', text: 'ул. Кофейная, 42\nМосква, Россия', emoji: '📍' },
              { icon: <Clock size={24} />, title: 'Время работы', text: 'Пн-Пт: 7:00 — 22:00\nСб-Вс: 8:00 — 23:00', emoji: '🕐' },
              { icon: <Phone size={24} />, title: 'Телефон', text: '+7 (495) 123-45-67\nЗвоните!', emoji: '📞' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-coffee-50 text-center hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-coffee-800 mb-2">{item.title}</h3>
                <p className="text-coffee-500 whitespace-pre-line text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Map placeholder */}
        <AnimatedSection className="mt-10">
          <div className="rounded-3xl overflow-hidden h-64 sm:h-80 bg-gradient-to-br from-coffee-100 to-coffee-200 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 41px),
                                 repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 41px)`
              }}
            />
            <div className="text-center z-10">
              <div className="text-5xl mb-3">📍</div>
              <p className="font-bold text-coffee-700 text-lg">ул. Кофейная, 42</p>
              <p className="text-coffee-500 text-sm">5 минут от метро Арбатская</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-coffee-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">☕</span>
              <span className="text-xl font-bold">
                AROMA<span className="text-coffee-400">coffee</span>
              </span>
            </div>
            <p className="text-coffee-300 text-sm leading-relaxed">
              Свежеобжаренный кофе и уютная атмосфера. Мы создаём моменты счастья в каждой чашке.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Меню</h4>
            <ul className="space-y-2 text-sm text-coffee-300">
              <li><a href="#menu" className="hover:text-coffee-400 transition-colors">Классика</a></li>
              <li><a href="#menu" className="hover:text-coffee-400 transition-colors">Авторские напитки</a></li>
              <li><a href="#menu" className="hover:text-coffee-400 transition-colors">Десерты</a></li>
              <li><a href="#menu" className="hover:text-coffee-400 transition-colors">Еда</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-coffee-300">
              <li><a href="#loyalty" className="hover:text-coffee-400 transition-colors">Программа лояльности</a></li>
              <li><a href="#builder" className="hover:text-coffee-400 transition-colors">Конструктор напитков</a></li>
              <li><a href="#reviews" className="hover:text-coffee-400 transition-colors">Отзывы</a></li>
              <li><a href="#contacts" className="hover:text-coffee-400 transition-colors">Контакты</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Соцсети</h4>
            <div className="flex gap-3">
              {[
                { icon: '📸', label: 'Instagram' },
                { icon: '💬', label: 'Telegram' },
                { icon: '📱', label: 'VK' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-coffee-800 flex items-center justify-center text-lg hover:bg-coffee-700 transition-colors"
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="mt-4 text-sm text-coffee-300">
              <p className="flex items-center gap-2 mb-1">
                <Mail size={14} /> hello@aromacoffee.ru
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> +7 (495) 123-45-67
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-coffee-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-coffee-400">
          <p>© 2024 AROMAcoffee. Все права защищены.</p>
          <p>Сделано с ☕ и любовью</p>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [cart, setCart] = useState<Array<{ item: { name: string; price: number; emoji: string }; qty: number }>>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const addToCart = (item: { name: string; price: number; emoji: string }) => {
    setCart((prev) => {
      const existing = prev.findIndex((c) => c.item.name === item.name);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing].qty += 1;
        return updated;
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCartQty = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].qty += delta;
      if (updated[index].qty <= 0) return updated.filter((_, i) => i !== index);
      return updated;
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, { qty }) => sum + qty, 0);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onBookingClick={() => setBookingOpen(true)}
      />

      <Hero />
      <MenuSection onAddToCart={addToCart} />
      <DrinkBuilder onAddToCart={addToCart} />
      <LoyaltyPlugin />
      <ReviewsSection />
      <Contacts />
      <Footer />

      <CartPlugin
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateCartQty}
        onClear={clearCart}
      />

      <BookingPlugin
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      {/* Floating booking button (mobile) */}
      <motion.button
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setBookingOpen(true)}
        className="fixed bottom-6 right-6 sm:hidden bg-coffee-600 text-white p-4 rounded-full shadow-xl shadow-coffee-600/40 z-40"
      >
        <Calendar size={24} />
      </motion.button>
    </div>
  );
}
