import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Coffee, 
  Utensils, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Check, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowDown,
  Users,
  Award,
  SendHorizontal,
  Globe,
  MessageCircle
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold text-accent tracking-tighter"
        >
          CAFE <span className="text-white">DELICIO</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-white/80 hover:text-accent transition-colors font-medium text-sm tracking-widest uppercase"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-primary px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider"
          >
            Book Table
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-dark border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-accent text-xl font-serif"
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-accent text-primary px-6 py-3 rounded-xl font-bold uppercase tracking-wider">
                Book Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Counter = ({ value, title, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center p-6 text-center">
      <div className="bg-accent/10 p-4 rounded-full mb-4">
        <Icon className="text-accent" size={32} />
      </div>
      <div className="text-4xl font-serif font-bold text-primary mb-1">{count}+</div>
      <div className="text-primary/60 font-medium uppercase tracking-widest text-xs">{title}</div>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-3xl shadow-xl shadow-primary/5 border border-primary/5 flex flex-col items-start"
  >
    <div className="bg-accent/10 p-4 rounded-2xl mb-6">
      <Icon className="text-accent" size={32} />
    </div>
    <h3 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h3>
    <p className="text-primary/70 leading-relaxed mb-6">{desc}</p>
    <button className="flex items-center text-accent font-bold group">
      Learn More <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

const MenuItem = ({ name, price, desc }) => (
  <div className="flex flex-col border-b border-primary/10 pb-6 mb-6">
    <div className="flex justify-between items-baseline mb-2">
      <h4 className="text-xl font-serif font-bold text-primary">{name}</h4>
      <span className="text-accent font-bold">₹{price}</span>
    </div>
    <p className="text-primary/60 text-sm italic">{desc}</p>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-secondary selection:bg-accent selection:text-white font-sans">
      <div className="grain" />
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
            alt="Cafe Interior"
            className="w-full h-full object-cover scale-110"
            loading="eager"
            fetchpriority="high"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 bg-accent/20 border border-accent/30 text-accent rounded-full text-sm font-bold tracking-[0.3em] uppercase mb-6 backdrop-blur-sm">
              Artisanal Coffee & Cuisine
            </span>
            <h1 className="text-6xl md:text-9xl font-serif font-light text-white mb-8 leading-[1] tracking-tighter">
              Art of <br />
              <span className="italic text-accent font-serif">Indulgence</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-wide">
              Where premium Arabica meets the soul of Ahmedabad.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-accent text-primary px-12 py-6 rounded-full font-bold text-sm uppercase tracking-[0.2em] shadow-2xl shadow-accent/20 w-full sm:w-auto transition-all"
              >
                Experience Menu
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border border-white/20 text-white px-12 py-6 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all w-full sm:w-auto"
              >
                Our Gallery
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border border-primary/5 py-12 relative z-30 -mt-16 mx-6 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl flex flex-wrap justify-around items-center gap-8 backdrop-blur-xl">
        <Counter value="12" title="Years of Passion" icon={Clock} />
        <Counter value="50000" title="Happy Guests" icon={Users} />
        <Counter value="25" title="Menu Specialties" icon={Coffee} />
        <Counter value="4.8" title="Average Rating" icon={Star} />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" 
                alt="Cafe Ambiance"
                className="rounded-[3rem] shadow-2xl relative z-10 w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl z-20 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-accent p-3 rounded-full">
                    <Award className="text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-serif font-bold text-primary">Award Winning</div>
                    <div className="text-primary/50 text-sm">Best Coffee in Sola 2024</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-accent font-bold uppercase tracking-[0.2em] text-sm mb-4">Our Legacy</h2>
              <h3 className="text-4xl md:text-6xl font-serif font-black text-primary mb-8 leading-tight">
                Where Every Sip <br />
                <span className="italic text-accent/80">Tells a Story</span>
              </h3>
              <p className="text-lg text-primary/70 mb-8 leading-relaxed">
                Founded in 2014, Cafe Delicio was born from a simple obsession: creating a space where world-class continental cuisine meets the warmth of Ahmedabad's hospitality.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  '100% Arabica Beans',
                  'Fresh Organic Produce',
                  'Skilled Master Baristas',
                  'Artisanal Bakery',
                  'Cozy Work Ambience',
                  'Continental Fusion'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-primary/80 font-medium">
                    <div className="bg-accent/10 p-1 rounded-full">
                      <Check size={16} className="text-accent" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-primary font-bold text-lg group"
              >
                Learn More About Us <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors"><ChevronRight /></div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-accent font-bold uppercase tracking-[0.2em] text-sm mb-4">What We Offer</h2>
          <h3 className="text-4xl md:text-6xl font-serif font-black mb-8">Our Specialties</h3>
          <p className="text-white/60 max-w-2xl mx-auto">From sunrise to sunset, we serve experiences that delight the senses.</p>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={Coffee}
            title="Premium Brews"
            desc="Our master baristas craft every cup with precision using locally sourced, single-origin Arabica beans."
            delay={0.1}
          />
          <ServiceCard 
            icon={Utensils}
            title="Continental Cuisine"
            desc="A curated selection of European and Mediterranean inspired dishes made with the freshest local ingredients."
            delay={0.2}
          />
          <ServiceCard 
            icon={Clock}
            title="Breakfast Club"
            desc="Start your day with our signature Eggs Benedict, fluffy pancakes, and freshly squeezed artisanal juices."
            delay={0.3}
          />
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-accent font-bold uppercase tracking-[0.2em] text-sm mb-4">Taste the Best</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-black text-primary mb-8 leading-tight">Featured <br />Delights</h3>
              <p className="text-primary/70 mb-10 leading-relaxed">
                Explore our handpicked favorites, crafted to perfection by our culinary team.
              </p>
              <div className="bg-primary p-10 rounded-[2rem] text-white">
                <h4 className="text-2xl font-serif font-bold mb-4">Happy Hours</h4>
                <p className="text-white/60 mb-6">Join us every weekday between 4 PM - 7 PM for special offers on all beverages.</p>
                <div className="flex items-center gap-3 text-accent font-bold">
                  <Clock size={20} /> Mon - Fri | 4:00 - 7:00
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-10 flex items-center gap-3">
                  <Coffee className="text-accent" /> Signature Coffee
                </h3>
                <MenuItem 
                  name="Sola Special Latte" 
                  price="245" 
                  desc="Triple shot espresso, vanilla bean, steamed organic milk." 
                />
                <MenuItem 
                  name="Hazelnut Cold Brew" 
                  price="210" 
                  desc="18-hour slow steep with hints of roasted hazelnut." 
                />
                <MenuItem 
                  name="Classic Cappuccino" 
                  price="190" 
                  desc="Balanced espresso with rich velvety foam." 
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-10 flex items-center gap-3">
                  <Utensils className="text-accent" /> Continental Classics
                </h3>
                <MenuItem 
                  name="Garden Pesto Pasta" 
                  price="380" 
                  desc="Fresh basil pesto, pine nuts, parmesan, penne pasta." 
                />
                <MenuItem 
                  name="Avocado Toast Delight" 
                  price="320" 
                  desc="Sourdough, smashed avocado, poached egg, chili flakes." 
                />
                <MenuItem 
                  name="Mediterranean Platter" 
                  price="450" 
                  desc="Hummus, pita, olives, falafel, and grilled veggies." 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary-dark relative overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-accent font-bold uppercase tracking-[0.2em] text-sm mb-4">Guest Reviews</h2>
          <h3 className="text-4xl md:text-6xl font-serif font-black text-primary">Voices of Delicio</h3>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Rahul S.", review: "The best coffee in Ahmedabad, hands down. The ambiance is perfect for work or catch-ups.", rating: 5 },
            { name: "Priya M.", review: "Their Avocado toast is legendary. Fresh, flavorful, and beautifully presented every time.", rating: 5 },
            { name: "Siddharth K.", review: "A hidden gem in Science City Road. The staff is incredibly knowledgeable and friendly.", rating: 5 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-primary/5"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => <Star key={i} size={18} className="fill-accent text-accent" />)}
              </div>
              <p className="text-primary/70 italic text-lg mb-8 leading-relaxed">"{item.review}"</p>
              <div className="font-bold text-primary">— {item.name}</div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Contact & Location */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            {/* Form */}
            <div className="lg:w-1/2 p-12 md:p-20 text-white">
              <h2 className="text-accent font-bold uppercase tracking-[0.2em] text-sm mb-4">Get In Touch</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-10">We'd Love to Hear From You</h3>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/50 text-xs uppercase tracking-widest font-bold">Full Name</label>
                    <input type="text" className="w-full bg-white/10 border-b border-white/20 px-0 py-3 focus:border-accent outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/50 text-xs uppercase tracking-widest font-bold">Phone Number</label>
                    <input type="tel" className="w-full bg-white/10 border-b border-white/20 px-0 py-3 focus:border-accent outline-none transition-colors" placeholder="+91 9712952000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-white/50 text-xs uppercase tracking-widest font-bold">Email Address</label>
                  <input type="email" className="w-full bg-white/10 border-b border-white/20 px-0 py-3 focus:border-accent outline-none transition-colors" placeholder="hello@cafedelicio.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-white/50 text-xs uppercase tracking-widest font-bold">Your Message</label>
                  <textarea rows="4" className="w-full bg-white/10 border-b border-white/20 px-0 py-3 focus:border-accent outline-none transition-colors resize-none" placeholder="Tell us about your experience..." />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-accent text-primary w-full py-5 rounded-2xl font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3"
                >
                  Send Message <SendHorizontal size={20} />
                </motion.button>
              </div>
            </div>

            {/* Info & Map */}
            <div className="lg:w-1/2 bg-white/5 p-12 md:p-20 flex flex-col justify-between border-l border-white/10">
              <div className="space-y-12">
                <div className="flex items-start gap-6">
                  <div className="bg-accent/20 p-4 rounded-2xl">
                    <MapPin className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Visit Us</h4>
                    <p className="text-white/60 leading-relaxed">
                      Ground Floor, Cafeteria, City Center, 2,<br />
                      Science City Rd, Panchamrut Bunglows II,<br />
                      Sola, Ahmedabad, Gujarat 380060
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-accent/20 p-4 rounded-2xl">
                    <Phone className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Call Us</h4>
                    <a href="tel:+919712952000" className="text-white/60 hover:text-accent transition-colors text-2xl font-serif font-bold">+91 97129 52000</a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-accent/20 p-4 rounded-2xl">
                    <Mail className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Email Us</h4>
                    <a href="mailto:hello@cafedelicio.com" className="text-white/60 hover:text-accent transition-colors">hello@cafedelicio.com</a>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-[2rem] overflow-hidden  h-64 shadow-2xl">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.714838178204!2d72.51557547520143!3d23.070913879139933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9d328914b6d1%3A0x6bf8a7db359332d9!2sCafe%20Delicio!5e0!3m2!1sen!2sin!4v1778414173364!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  loading="lazy" 
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-accent font-bold uppercase tracking-[0.2em] text-sm mb-4">Our Gallery</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-black text-primary">Moments at Delicio</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2073&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=2012&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2037&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=2070&auto=format&fit=crop"
            ].map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-[2.5rem] shadow-2xl h-[400px]"
              >
                <img 
                  src={url} 
                  alt={`Gallery image ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-primary/5">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="text-2xl font-serif font-bold text-primary tracking-tighter mb-6">
              CAFE <span className="text-accent">DELICIO</span>
            </div>
            <p className="text-primary/60 leading-relaxed mb-8">
              Elevating the cafe culture in Ahmedabad since 2014. Premium coffee, artisanal food, and soulful vibes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all"><MessageCircle size={20} /></a>
              <a href="#" className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all"><Globe size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-primary mb-8 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Menu', 'Services', 'Gallery'].map(link => (
                <li key={link}><a href={`#${link.toLowerCase()}`} className="text-primary/60 hover:text-accent transition-colors font-medium">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-primary mb-8 uppercase tracking-widest">Opening Hours</h4>
            <ul className="space-y-4 text-primary/60">
              <li className="flex justify-between"><span>Mon - Fri</span> <span className="font-bold text-primary">9:00 - 23:00</span></li>
              <li className="flex justify-between"><span>Sat - Sun</span> <span className="font-bold text-primary">8:00 - 00:00</span></li>
              <li className="pt-4 text-accent italic">Kitchen closes 30 mins early</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-primary mb-8 uppercase tracking-widest">Newsletter</h4>
            <p className="text-primary/60 mb-6 italic">Get exclusive offers & brewing tips.</p>
            <div className="relative">
              <input type="email" placeholder="Email Address" className="w-full bg-primary/5 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent/20 transition-all" />
              <button className="absolute right-2 top-2 bg-primary text-white p-2 rounded-xl hover:bg-accent transition-colors"><ChevronRight /></button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 border-t border-primary/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-primary/40 text-sm">
            © 2024 Cafe Delicio. All rights reserved. | Designed for Excellence.
          </div>
          <div className="flex gap-8 text-primary/40 text-sm">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
