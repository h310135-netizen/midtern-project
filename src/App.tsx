import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Twitter, Search, ChevronRight, ArrowLeft } from 'lucide-react';
import content from './data/content.json';

const theme = content.theme;


export default function App() {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<{type: string, value?: string}>({ type: 'home' });
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 2;

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-accent', theme.accentColor);
    root.style.setProperty('--color-bg', theme.backgroundColor);
    root.style.setProperty('--color-footer-bg', theme.footerBackground);
    root.style.setProperty('--color-sidebar-bg', theme.sidebarBackground);
  }, []);

  // Scroll to top when changing views or pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePostId, activeView, currentPage]);

  const allPosts = [content.heroPost, ...content.posts];
  const activePost = activePostId ? allPosts.find(p => p.id === activePostId) : null;

  const handleNavClick = (item: {type: string, value?: string}) => {
    setActivePostId(null);
    setActiveView({ type: item.type, value: item.value });
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(content.posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = content.posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const SocialIcons = ({ size = 16, strokeWidth = 1.5, className = "text-gray-400 hover:text-black transition-colors" }: { size?: number, strokeWidth?: number, className?: string }) => (
    <>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className={className}><Instagram size={size} strokeWidth={strokeWidth} /></a>
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className={className}><Facebook size={size} strokeWidth={strokeWidth} /></a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className={className}><Twitter size={size} strokeWidth={strokeWidth} /></a>
    </>
  );

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: theme.backgroundColor, color: theme.primaryColor }}>
      {/* Top Bar */}
      <div className="w-full border-b border-gray-100 py-3 px-6 flex justify-between items-center text-sm text-gray-500">
        <div className="flex gap-4">
          <SocialIcons size={16} className="text-gray-500 hover:text-black transition-colors" />
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
          <Search size={16} />
          <span className="uppercase tracking-widest text-xs">Search</span>
        </div>
      </div>

      {/* Header */}
      <header className="py-16 text-center cursor-pointer" onClick={() => handleNavClick({type: 'home'})}>
        <h1 className="font-serif text-5xl md:text-6xl tracking-widest mb-4 blue-neon-title transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,255,0.2)]">
          {content.siteName}
        </h1>
        <p className="text-gray-500 tracking-[0.2em] text-xs uppercase">
          {content.subtitle}
        </p>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 backdrop-blur-sm z-50 border-y border-gray-100" style={{ backgroundColor: `${theme.backgroundColor}ee` }}>
        <div className="max-w-4xl mx-auto px-6 py-5 flex justify-center gap-8 md:gap-12 text-xs font-medium tracking-[0.15em] uppercase">
          {content.nav.map((item, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(item)}
              className={`hover:text-gray-400 transition-colors uppercase tracking-[0.15em] ${activeView.type === item.type && activeView.value === item.value && !activePostId ? 'font-bold' : 'text-gray-500'}`}
              style={activeView.type === item.type && activeView.value === item.value && !activePostId ? { color: theme.primaryColor } : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {activePost ? (
          /* Single Post View */
          <article className="max-w-3xl mx-auto animate-in fade-in duration-700">
            <button
              onClick={() => setActivePostId(null)}
              className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-gray-500 hover:text-black transition-colors mb-12"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div className="text-center mb-12">
              <span className="text-xs font-medium tracking-[0.2em] text-gray-400 uppercase mb-6 block">
                {activePost.category} <span className="mx-2">|</span> {activePost.date}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight blue-neon-title">
                {activePost.title}
              </h2>
            </div>

            <div className="mb-12">
              <img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none font-light text-gray-600 leading-loose space-y-8">
              {activePost.content?.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
              <div className="flex gap-4">
                <span className="text-xs tracking-widest uppercase text-gray-400">Share:</span>
                <a href="#" className="text-gray-400 hover:text-black"><Facebook size={16} /></a>
                <a href="#" className="text-gray-400 hover:text-black"><Twitter size={16} /></a>
              </div>
            </div>
          </article>
        ) : activeView.type === 'category' ? (
          /* Category View */
          <div className="animate-in fade-in duration-700">
            <div className="mb-16 text-center border-b border-gray-100 pb-16">
              <h2 className="font-serif text-4xl tracking-widest uppercase blue-neon-title">{activeView.value}</h2>
              <p className="text-gray-500 mt-4 tracking-[0.2em] text-xs uppercase">Category Archives</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {allPosts.filter(p => p.category === activeView.value).map((post, i) => (
                <article key={i} className="group cursor-pointer" onClick={() => setActivePostId(post.id)}>
                  <div className="overflow-hidden mb-6">
                    <img src={post.image} alt={post.title} className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                  </div>
                  <div className="text-center px-2">
                    <span className="text-xs font-medium tracking-[0.2em] text-gray-400 uppercase mb-3 block">
                      {post.date}
                    </span>
                    <h3 className="font-serif text-xl mb-4 transition-colors duration-300 blue-neon-title">
                      {post.title}
                    </h3>
                    <button className="text-[10px] font-medium tracking-[0.2em] uppercase border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">
                      Read More
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {allPosts.filter(p => p.category === activeView.value).length === 0 && (
              <p className="text-center text-gray-400 font-light py-20">目前這個分類還沒有文章喔！</p>
            )}
          </div>
        ) : activeView.type === 'about' ? (
          /* About View */
          <div className="max-w-3xl mx-auto text-center animate-in fade-in duration-700 py-10">
            <h2 className="font-serif text-4xl tracking-widest uppercase mb-12 blue-neon-title">{content.sidebar.about.title}</h2>
            <img src={content.sidebar.about.image} alt={content.sidebar.about.name} className="w-full max-w-md mx-auto mb-10 object-cover aspect-[4/5]" />
            <h3 className="font-serif text-3xl mb-6 blue-neon-title">{content.sidebar.about.name}</h3>
            <p className="text-gray-600 leading-loose font-light text-lg">
              {content.sidebar.about.description}
            </p>
            <p className="text-gray-600 leading-loose font-light text-lg mt-6">
              {content.sidebar.aboutExtended}
            </p>
            <div className="mt-16 flex justify-center gap-6">
              <SocialIcons size={24} />
            </div>
          </div>
        ) : (
          /* Home View (List of Posts) */
          <div className="animate-in fade-in duration-700">
            {/* Hero Post */}
            <section className="mb-24">
              <div className="group cursor-pointer" onClick={() => setActivePostId(content.heroPost.id)}>
                <div className="overflow-hidden mb-8">
                  <img
                    src={content.heroPost.image}
                    alt={content.heroPost.title}
                    className="w-full h-[50vh] md:h-[70vh] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                </div>
                <div className="text-center max-w-3xl mx-auto px-4">
                  <span className="text-xs font-medium tracking-[0.2em] text-gray-400 uppercase mb-4 block">
                    {content.heroPost.category} <span className="mx-2">|</span> {content.heroPost.date}
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl mb-6 transition-colors duration-300 leading-tight blue-neon-title">
                    {content.heroPost.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-8 font-light">
                    {content.heroPost.excerpt}
                  </p>
                  <button className="text-xs font-medium tracking-[0.2em] uppercase border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">
                    Read More
                  </button>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Main Content - Posts List */}
              <div className="lg:col-span-8 space-y-24">
                {paginatedPosts.map((post, i) => (
                  <article key={i} className="group cursor-pointer" onClick={() => setActivePostId(post.id)}>
                    <div className="overflow-hidden mb-8">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-[300px] md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                    </div>
                    <div className="text-center px-4">
                      <span className="text-xs font-medium tracking-[0.2em] text-gray-400 uppercase mb-4 block">
                        {post.category} <span className="mx-2">|</span> {post.date}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl mb-5 transition-colors duration-300 blue-neon-title">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed mb-6 text-sm font-light">
                        {post.excerpt}
                      </p>
                      <button className="text-xs font-medium tracking-[0.2em] uppercase border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">
                        Read More
                      </button>
                    </div>
                  </article>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-3 pt-12 border-t border-gray-100">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 flex items-center justify-center border text-sm font-medium transition-colors ${currentPage === i + 1 ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    {currentPage < totalPages && (
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black cursor-pointer transition-colors"
                      >
                        <ChevronRight size={18} strokeWidth={1.5} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-16">
                {/* About Widget */}
                <div className="text-center">
                  <h4 className="font-serif text-xl mb-8 tracking-[0.15em] uppercase relative after:content-[''] after:block after:w-8 after:h-[1px] after:bg-black after:mx-auto after:mt-4 blue-neon-title">
                    {content.sidebar.about.title}
                  </h4>
                  <div className="overflow-hidden mb-6 cursor-pointer" onClick={() => handleNavClick({type: 'about'})}>
                    <img
                      src={content.sidebar.about.image}
                      alt={content.sidebar.about.name}
                      className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <h5 className="font-serif text-2xl mb-3 blue-neon-title">{content.sidebar.about.name}</h5>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">
                    {content.sidebar.about.description}
                  </p>
                  <button onClick={() => handleNavClick({type: 'about'})} className="mt-8 text-xs font-medium tracking-[0.2em] uppercase border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">
                    Read More
                  </button>
                </div>

                {/* Categories Widget */}
                <div>
                  <h4 className="font-serif text-xl mb-8 tracking-[0.15em] uppercase text-center relative after:content-[''] after:block after:w-8 after:h-[1px] after:bg-black after:mx-auto after:mt-4 blue-neon-title">
                    Categories
                  </h4>
                  <ul className="space-y-4">
                    {content.sidebar.categories.map((cat, i) => (
                      <li key={i} onClick={() => handleNavClick({type: 'category', value: cat.value})} className="flex justify-between items-center text-sm text-gray-500 hover:text-black cursor-pointer group font-light transition-colors">
                        <span className="group-hover:translate-x-1 transition-transform">{cat.name}</span>
                        <span className="text-gray-400 text-xs">({cat.count})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Follow Me Widget */}
                <div className="text-center p-10 border border-gray-100" style={{ backgroundColor: theme.primaryColor }}>
                  <h4 className="font-serif text-xl mb-8 tracking-[0.15em] uppercase blue-neon-title">
                    Follow Me
                  </h4>
                  <div className="flex justify-center gap-6">
                    <SocialIcons size={20} />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-white py-20 text-center mt-20" style={{ backgroundColor: theme.footerBackground }}>
        <h2 className="font-serif text-3xl tracking-[0.2em] mb-10 blue-neon-title">{content.siteName}</h2>
        <div className="flex justify-center gap-8 mb-12">
          <SocialIcons size={20} className="text-gray-400 hover:text-white transition-colors" />
        </div>
        <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">
          {content.footer.text}
        </p>
      </footer>
    </div>
  );
}
