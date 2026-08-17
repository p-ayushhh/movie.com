import { useState, useMemo } from 'react'
///import logo from '@/imports/Frame_12.png'//

// ─── Types ────────────────────────────────────────────────────────────────────

interface Movie {
  id: number
  title: string
  year: number
  genres: string[]
  rating: number
  votes: string
  duration: string
  description: string
  poster: string
  backdrop: string
  badge?: string
  director: string
  cast: string[]
  platform: string
  featured?: boolean
  language: string
}

interface User {
  name: string
  email: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const GENRES = ['All', 'Action', 'Drama', 'Sci-Fi', 'Horror', 'Comedy', 'Thriller', 'Romance', 'Animation']

const MOVIES: Movie[] = [
  {
    id: 1,
    title: 'Dune: Part Two',
    year: 2024,
    genres: ['Sci-Fi', 'Action'],
    rating: 8.5,
    votes: '412K',
    duration: '2h 46m',
    description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Driven by visions of the future, he must choose between the love of his life and the fate of the known universe.',
    poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=580&fit=crop&auto=format',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1400&h=700&fit=crop&auto=format',
    badge: 'TRENDING',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Austin Butler'],
    platform: 'MAX',
    featured: true,
    language: 'English',
  },
  {
    id: 2,
    title: 'Oppenheimer',
    year: 2023,
    genres: ['Drama', 'Thriller'],
    rating: 8.9,
    votes: '658K',
    duration: '3h 0m',
    description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, and the political and ethical ramifications that followed.",
    poster: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=580&fit=crop&auto=format',
    backdrop: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1400&h=700&fit=crop&auto=format',
    badge: 'OSCAR WINNER',
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    platform: 'PEACOCK',
    featured: true,
    language: 'English',
  },
  {
    id: 3,
    title: 'Killers of the Flower Moon',
    year: 2023,
    genres: ['Drama', 'Thriller'],
    rating: 7.7,
    votes: '289K',
    duration: '3h 26m',
    description: 'Members of the Osage tribe in the United States are murdered under mysterious circumstances in the 1920s, sparking a major FBI investigation involving J. Edgar Hoover.',
    poster: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400&h=580&fit=crop&auto=format',
    backdrop: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=1400&h=700&fit=crop&auto=format',
    director: 'Martin Scorsese',
    cast: ['Leonardo DiCaprio', 'Robert De Niro', 'Lily Gladstone'],
    platform: 'APPLE TV+',
    language: 'English',
  },
  {
    id: 4,
    title: 'Poor Things',
    year: 2023,
    genres: ['Comedy', 'Drama'],
    rating: 8.0,
    votes: '278K',
    duration: '2h 21m',
    description: "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.",
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=580&fit=crop&auto=format',
    backdrop: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1400&h=700&fit=crop&auto=format',
    badge: 'GOLDEN LION',
    director: 'Yorgos Lanthimos',
    cast: ['Emma Stone', 'Mark Ruffalo', 'Willem Dafoe'],
    platform: 'HULU',
    language: 'English',
  },
  {
    id: 5,
    title: 'Alien: Romulus',
    year: 2024,
    genres: ['Sci-Fi', 'Horror'],
    rating: 7.3,
    votes: '198K',
    duration: '1h 59m',
    description: 'A group of young space colonizers come face to face with the most terrifying life form in the universe while scavenging the deep ends of a derelict space station between two worlds.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=580&fit=crop&auto=format',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&h=700&fit=crop&auto=format',
    badge: 'NEW',
    director: 'Fede Álvarez',
    cast: ['Cailee Spaeny', 'David Jonsson', 'Archie Renaux'],
    platform: 'HULU',
    language: 'English',
  },
  {
    id: 6,
    title: 'The Substance',
    year: 2024,
    genres: ['Horror', 'Drama'],
    rating: 7.4,
    votes: '112K',
    duration: '2h 21m',
    description: 'A mysterious substance promises to give you a better version of yourself — you, but better in every way. What could possibly go wrong?',
    poster: 'https://images.unsplash.com/photo-1581729590572-bb8c5c3e5e63?w=400&h=580&fit=crop&auto=format',
    backdrop: 'https://images.unsplash.com/photo-1581729590572-bb8c5c3e5e63?w=1400&h=700&fit=crop&auto=format',
    badge: 'CANNES',
    director: 'Coralie Fargeat',
    cast: ['Demi Moore', 'Margaret Qualley', 'Dennis Quaid'],
    platform: 'MUBI',
    language: 'English',
  },
  {
    id: 7,
    title: 'Longlegs',
    year: 2024,
    genres: ['Horror', 'Thriller'],
    rating: 6.3,
    votes: '89K',
    duration: '1h 41m',
    description: 'An FBI agent uncovers a series of deeply disturbing occult clues in her pursuit of an elusive serial killer who has left a trail of carnage across decades.',
    poster: 'https://images.unsplash.com/photo-1520637836993-5e9e5c1efad5?w=400&h=580&fit=crop&auto=format',
    backdrop: 'https://images.unsplash.com/photo-1520637836993-5e9e5c1efad5?w=1400&h=700&fit=crop&auto=format',
    badge: 'HORROR',
    director: 'Osgood Perkins',
    cast: ['Maika Monroe', 'Nicolas Cage', 'Blair Underwood'],
    platform: 'SHUDDER',
    language: 'English',
  },
  {
    id: 8,
    title: 'Inside Out 2',
    year: 2024,
    genres: ['Animation', 'Comedy'],
    rating: 7.9,
    votes: '321K',
    duration: '1h 40m',
    description: "Follow Riley in her teenage years as new Emotions join headquarters to help her navigate the complexities of growing up, while Joy and the other emotions struggle to maintain control.",
    poster: 'https://images.unsplash.com/photo-1597002973885-8c90683fa6e0?w=400&h=580&fit=crop&auto=format',
    backdrop: 'https://images.unsplash.com/photo-1597002973885-8c90683fa6e0?w=1400&h=700&fit=crop&auto=format',
    badge: 'BOX OFFICE #1',
    director: 'Kelsey Mann',
    cast: ['Amy Poehler', 'Maya Hawke', 'Kensington Tallman'],
    platform: 'DISNEY+',
    language: 'English',
  },
  {
    id: 9,
    title: 'Challengers',
    year: 2024,
    genres: ['Drama', 'Romance'],
    rating: 7.4,
    votes: '189K',
    duration: '2h 11m',
    description: 'Three players — all former friends — compete in a Grand Slam tennis tournament as their complicated history and intertwined romantic past catches up with them.',
    poster: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=580&fit=crop&auto=format',
    backdrop: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1400&h=700&fit=crop&auto=format',
    badge: 'ACCLAIMED',
    director: 'Luca Guadagnino',
    cast: ['Zendaya', "Josh O'Connor", 'Mike Faist'],
    platform: 'PRIME VIDEO',
    language: 'English',
  },
  {
    id: 10,
    title: 'Twisters',
    year: 2024,
    genres: ['Action', 'Thriller'],
    rating: 7.2,
    votes: '167K',
    duration: '2h 2m',
    description: 'Kate Cooper and Tyler Owens face terrifying forces of nature while competing storm-chasing teams descend on Oklahoma for a season of once-in-a-generation tornados.',
    poster: 'https://images.unsplash.com/photo-1511300636408-a63a89df3482?w=400&h=580&fit=crop&auto=format',
    backdrop: 'https://images.unsplash.com/photo-1511300636408-a63a89df3482?w=1400&h=700&fit=crop&auto=format',
    director: 'Lee Isaac Chung',
    cast: ['Daisy Edgar-Jones', 'Glen Powell', 'Anthony Ramos'],
    platform: 'PEACOCK',
    language: 'English',
  },
  {
    id: 11,
    title: 'A Quiet Place: Day One',
    year: 2024,
    genres: ['Horror', 'Sci-Fi'],
    rating: 7.1,
    votes: '145K',
    duration: '1h 39m',
    description: "A woman named Sam finds herself caught in the catastrophic events of Day One when New York City was overrun by alien creatures that hunt by sound.",
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=580&fit=crop&auto=format',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&h=700&fit=crop&auto=format',
    director: 'Michael Sarnoski',
    cast: ["Lupita Nyong'o", 'Joseph Quinn', 'Alex Wolff'],
    platform: 'PARAMOUNT+',
    language: 'English',
  },
  {
    id: 12,
    title: 'The Zone of Interest',
    year: 2023,
    genres: ['Drama'],
    rating: 7.9,
    votes: '120K',
    duration: '1h 45m',
    description: "The commandant of Auschwitz, Rudolf Höss, and his wife Hedwig strive to build a dream life for their family in a house and garden next to the camp's walls.",
    poster: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=580&fit=crop&auto=format',
    backdrop: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1400&h=700&fit=crop&auto=format',
    badge: 'CANNES WINNER',
    director: 'Jonathan Glazer',
    cast: ['Christian Friedel', 'Sandra Hüller'],
    platform: 'A24',
    language: 'German',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  return (
    <span className={`flex gap-0.5 ${size === 'md' ? 'text-lg' : 'text-xs'}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= Math.round(rating / 2) ? 'text-amber-400' : 'text-gray-600'}>★</span>
      ))}
    </span>
  )
}

function platformClass(p: string) {
  const m: Record<string, string> = {
    MAX: 'platform-max', HULU: 'platform-hulu', 'DISNEY+': 'platform-disney',
    'PRIME VIDEO': 'platform-prime', 'APPLE TV+': 'platform-apple',
    PEACOCK: 'platform-peacock', MUBI: 'platform-mubi', NETFLIX: 'platform-netflix',
  }
  return m[p] ?? 'platform-default'
}

// ─── MovieCard ─────────────────────────────────────────────────────────────────

function MovieCard({ movie, inWatchlist, onToggleWatchlist, onSelect }: {
  movie: Movie
  inWatchlist: boolean
  onToggleWatchlist: () => void
  onSelect: () => void
}) {
  const [hov, setHov] = useState(false)

  return (
    <div
      className="relative cursor-pointer card-lift"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gray-900 relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${hov ? 'scale-110' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-300 ${hov ? 'opacity-100' : 'opacity-50'}`} />

        {movie.badge && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#dc2626] text-white text-[9px] font-bold rounded-full tracking-wide">
            {movie.badge}
          </span>
        )}

        {hov && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-3 animate-fadeIn">
            <button
              onClick={e => { e.stopPropagation(); onSelect() }}
              className="w-12 h-12 bg-[#dc2626] hover:bg-[#b91c1c] rounded-full flex items-center justify-center text-xl transition-colors glow-red shimmer-btn"
            >
              ▶
            </button>
            <button
              onClick={e => { e.stopPropagation(); onToggleWatchlist() }}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                inWatchlist
                  ? 'bg-amber-400 text-black'
                  : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
              }`}
            >
              {inWatchlist ? '✓ Saved' : '+ Watchlist'}
            </button>
            <button
              onClick={e => { e.stopPropagation(); onSelect() }}
              className="text-[11px] text-gray-300 hover:text-white underline underline-offset-2"
            >
              More Info
            </button>
          </div>
        )}

        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          <span className="text-amber-400 text-xs">★</span>
          <span className="text-white text-xs font-bold">{movie.rating}</span>
        </div>

        <div className={`absolute bottom-2 right-2 px-1.5 py-0.5 text-[9px] font-bold rounded ${platformClass(movie.platform)} text-white`}>
          {movie.platform}
        </div>
      </div>

      <div className="mt-2">
        <p className="text-sm font-semibold text-white leading-snug truncate">{movie.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{movie.year} · {movie.genres[0]}</p>
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [watchlist, setWatchlist] = useState<number[]>([])
  const [watchlistOpen, setWatchlistOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [userOpen, setUserOpen] = useState(false)
  const [userTab, setUserTab] = useState<'login' | 'signup'>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupName, setSignupName] = useState('')
  const [heroIdx, setHeroIdx] = useState(0)
  const [subEmail, setSubEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const featured = MOVIES.filter(m => m.featured)
  const hero = featured[heroIdx % featured.length]

  const filtered = useMemo(() => MOVIES.filter(m => {
    const g = genre === 'All' || m.genres.includes(genre)
    const s = !search ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.director.toLowerCase().includes(search.toLowerCase()) ||
      m.cast.some(c => c.toLowerCase().includes(search.toLowerCase())) ||
      m.genres.some(g => g.toLowerCase().includes(search.toLowerCase()))
    return g && s
  }), [genre, search])

  const toggleWatchlist = (id: number) =>
    setWatchlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const watchlistMovies = MOVIES.filter(m => watchlist.includes(m.id))

  const handleLogin = () => {
    if (!loginEmail) return
    const name = userTab === 'signup' ? signupName || 'Movie Fan' : loginEmail.split('@')[0]
    setIsLoggedIn(true)
    setUser({ name, email: loginEmail })
    setUserOpen(false)
    setLoginEmail('')
    setLoginPassword('')
    setSignupName('')
  }

  return (
    <div className="min-h-screen font-outfit" style={{ background: '#0d0d14', color: '#f8fafc' }}>

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">

          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="CineStream" className="h-8 w-auto" />
            <span className="font-playfair font-bold text-xl tracking-tight hidden sm:block">
              <span className="text-white">Cine</span><span style={{ color: '#dc2626' }}>Stream</span>
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-auto relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search movies, directors, cast…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full text-sm pl-9 pr-4 py-2 rounded-full border transition-all focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)', color: '#f8fafc' }}
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            {/* Watchlist */}
            <button
              onClick={() => setWatchlistOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
              </svg>
              <span className="hidden sm:inline">Watchlist</span>
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: '#dc2626' }}>
                  {watchlist.length}
                </span>
              )}
            </button>

            {/* User */}
            <button
              onClick={() => setUserOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold transition-all shimmer-btn"
              style={{ background: '#dc2626' }}
            >
              {isLoggedIn ? (
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  {user?.name[0].toUpperCase()}
                </span>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              )}
              <span className="hidden sm:inline">{isLoggedIn ? user?.name.split(' ')[0] : 'Sign In'}</span>
            </button>
          </div>
        </div>

        {/* Genre tabs */}
        <div className="border-t overflow-x-auto" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 py-2 min-w-max">
            {GENRES.map(g => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                style={genre === g
                  ? { background: '#dc2626', color: '#fff' }
                  : { color: '#94a3b8' }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[640px] flex items-end overflow-hidden film-grain" style={{ paddingTop: '7rem' }}>
        {/* Backdrop */}
        <div className="absolute inset-0">
          <img
            src={hero.backdrop}
            alt={hero.title}
            className="w-full h-full object-cover"
            style={{ transition: 'opacity 0.8s ease' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0d0d14 0%, rgba(13,13,20,0.55) 45%, rgba(13,13,20,0.2) 70%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,13,20,0.85) 0%, rgba(13,13,20,0.2) 50%, transparent 100%)' }} />
          {/* Mirror shimmer */}
          <div className="absolute inset-0 mirror-shimmer pointer-events-none" />
          {/* Vignette corners */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(13,13,20,0.7) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-20 w-full">
          <div className="max-w-lg">
            {hero.badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-5" style={{ background: '#dc2626' }}>
                🔥 {hero.badge}
              </span>
            )}

            <h1 className="font-playfair font-bold leading-[1.05] mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              {hero.title}
            </h1>

            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-4 text-sm">
              <StarRating rating={hero.rating} />
              <span className="font-bold" style={{ color: '#f59e0b' }}>{hero.rating}/10</span>
              <span style={{ color: '#64748b' }}>·</span>
              <span style={{ color: '#94a3b8' }}>{hero.votes} votes</span>
              <span style={{ color: '#64748b' }}>·</span>
              <span style={{ color: '#94a3b8' }}>{hero.duration}</span>
              <span style={{ color: '#64748b' }}>·</span>
              <span style={{ color: '#94a3b8' }}>{hero.year}</span>
            </div>

            <div className="flex gap-2 flex-wrap mb-5">
              {hero.genres.map(g => (
                <span key={g} className="px-3 py-1 rounded-full text-xs font-medium border" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: '#cbd5e1' }}>
                  {g}
                </span>
              ))}
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${platformClass(hero.platform)} text-white`}>
                {hero.platform}
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-7 line-clamp-3" style={{ color: '#94a3b8', maxWidth: '38rem' }}>
              {hero.description}
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setSelectedMovie(hero)}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shimmer-btn glow-red"
                style={{ background: '#dc2626' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Watch Now
              </button>
              <button
                onClick={() => toggleWatchlist(hero.id)}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 border"
                style={watchlist.includes(hero.id)
                  ? { background: '#f59e0b', color: '#000', borderColor: '#f59e0b' }
                  : { background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#f8fafc' }}
              >
                {watchlist.includes(hero.id) ? (
                  <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg> In Watchlist</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg> Add to Watchlist</>
                )}
              </button>
              <button
                onClick={() => setSelectedMovie(hero)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 border"
                style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', color: '#f8fafc' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
                More Info
              </button>
            </div>
          </div>
        </div>

        {/* Hero dots */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              className="rounded-full transition-all duration-300"
              style={i === heroIdx % featured.length
                ? { width: '2rem', height: '0.5rem', background: '#dc2626' }
                : { width: '0.5rem', height: '0.5rem', background: 'rgba(255,255,255,0.3)' }}
            />
          ))}
        </div>
      </section>

      {/* ── Movie Grid ─────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-playfair font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
              {search ? `Results for "${search}"` : genre === 'All' ? 'All Movies' : genre}
            </h2>
            <p className="text-sm mt-1" style={{ color: '#64748b' }}>{filtered.length} titles</p>
          </div>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#94a3b8' }}
            >
              Clear search
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-28" style={{ color: '#64748b' }}>
            <div className="text-7xl mb-5">🎬</div>
            <p className="font-playfair text-2xl mb-2" style={{ color: '#94a3b8' }}>No movies found</p>
            <p className="text-sm">Try a different search or genre filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {filtered.map(m => (
              <MovieCard
                key={m.id}
                movie={m}
                inWatchlist={watchlist.includes(m.id)}
                onToggleWatchlist={() => toggleWatchlist(m.id)}
                onSelect={() => setSelectedMovie(m)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden border-t mt-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        {/* Cinema backdrop with mirror effect */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&h=600&fit=crop&auto=format"
            alt="Cinema"
            className="w-full h-full object-cover"
            style={{ opacity: 0.12 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0d0d14 0%, rgba(13,13,20,0.82) 50%, #0d0d14 100%)' }} />
          <div className="absolute inset-0 mirror-shimmer" style={{ opacity: 0.4 }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-10">
          {/* Subscribe bar */}
          <div className="text-center mb-20">
            <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#dc2626' }}>NEWSLETTER</p>
            <h3 className="font-playfair font-bold mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              Never Miss a Great Film
            </h3>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: '#64748b' }}>
              Weekly picks, new releases, director spotlights, and streaming deals — straight to your inbox.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={subEmail}
                onChange={e => setSubEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full text-sm border focus:outline-none transition-colors"
                style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', color: '#f8fafc' }}
              />
              <button
                onClick={() => { if (subEmail) setSubscribed(true) }}
                className="px-6 py-3.5 rounded-full text-sm font-bold whitespace-nowrap transition-all hover:scale-105 active:scale-95"
                style={{ background: subscribed ? '#10b981' : '#dc2626' }}
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </div>
          </div>

          {/* Footer grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="CineStream" className="h-8 w-auto" />
                <span className="font-playfair font-bold text-xl">
                  <span className="text-white">Cine</span><span style={{ color: '#dc2626' }}>Stream</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                Your global cinema companion. Discover, track, rate, and enjoy the world's finest films from every corner of the earth.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-5 tracking-wider" style={{ color: '#94a3b8' }}>BROWSE</h4>
              <div className="space-y-3 text-sm" style={{ color: '#64748b' }}>
                {['New Releases', 'Top Rated', 'Award Winners', 'Trending Now', 'Coming Soon'].map(l => (
                  <div key={l} className="hover:text-white cursor-pointer transition-colors">{l}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-5 tracking-wider" style={{ color: '#94a3b8' }}>GENRES</h4>
              <div className="space-y-3 text-sm" style={{ color: '#64748b' }}>
                {GENRES.filter(g => g !== 'All').slice(0, 5).map(g => (
                  <div key={g} onClick={() => { setGenre(g); window.scrollTo({ top: 0 }) }} className="hover:text-white cursor-pointer transition-colors">{g}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-5 tracking-wider" style={{ color: '#94a3b8' }}>CONTACT</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs mb-1" style={{ color: '#64748b' }}>Email</p>
                  <a
                    href="mailto:ayushkrprajapati@gmail.com"
                    className="hover:text-white transition-colors break-all"
                    style={{ color: '#94a3b8' }}
                  >
                    ayushkrprajapati@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: '#64748b' }}>Phone</p>
                  <a
                    href="tel:6370094797"
                    className="hover:text-white transition-colors"
                    style={{ color: '#94a3b8' }}
                  >
                    +91 6370094797
                  </a>
                </div>
                <div className="flex gap-3 pt-2">
                  {['𝕏', 'in', 'ig', 'yt'].map(s => (
                    <div key={s} className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.08)', color: '#64748b' }}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }}>
            <p>© 2024 CineStream. All rights reserved.</p>
            <p>Built with ♥ for movie lovers worldwide.</p>
          </div>
        </div>
      </footer>

      {/* ── Watchlist Drawer ────────────────────────────────────────────── */}
      {watchlistOpen && (
        <>
          <div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
            onClick={() => setWatchlistOpen(false)}
          />
          <div
            className="fixed right-0 top-0 h-full z-50 flex flex-col animate-slideLeft border-l"
            style={{ width: '100%', maxWidth: '22rem', background: '#12121f', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <h3 className="font-playfair font-bold text-xl">
                Watchlist <span className="text-sm font-normal ml-1" style={{ color: '#64748b' }}>({watchlistMovies.length})</span>
              </h3>
              <button onClick={() => setWatchlistOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-xl transition-colors hover:text-white" style={{ color: '#64748b' }}>×</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {watchlistMovies.length === 0 ? (
                <div className="text-center py-16" style={{ color: '#64748b' }}>
                  <div className="text-5xl mb-4">🎬</div>
                  <p className="font-playfair text-lg mb-1" style={{ color: '#94a3b8' }}>Empty watchlist</p>
                  <p className="text-xs">Hover over a movie card and click + Watchlist</p>
                </div>
              ) : (
                watchlistMovies.map(m => (
                  <div
                    key={m.id}
                    className="flex gap-3 rounded-xl p-3 cursor-pointer transition-colors"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                    onClick={() => { setSelectedMovie(m); setWatchlistOpen(false) }}
                  >
                    <img src={m.poster} alt={m.title} className="w-14 h-20 object-cover rounded-lg bg-gray-800 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{m.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{m.year} · {m.duration}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <StarRating rating={m.rating} />
                        <span className="text-xs font-bold ml-1" style={{ color: '#f59e0b' }}>{m.rating}</span>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); toggleWatchlist(m.id) }}
                        className="mt-2.5 text-xs transition-colors"
                        style={{ color: '#dc2626' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {watchlistMovies.length > 0 && (
              <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <button
                  onClick={() => setWatchlist([])}
                  className="w-full py-2.5 rounded-full text-sm font-semibold transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Movie Detail Modal ──────────────────────────────────────────── */}
      {selectedMovie && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="w-full rounded-2xl overflow-hidden border animate-fadeIn"
            style={{ maxWidth: '42rem', maxHeight: '90vh', background: '#12121f', borderColor: 'rgba(255,255,255,0.1)', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Backdrop */}
            <div className="relative h-60 sm:h-72">
              <img src={selectedMovie.backdrop} alt={selectedMovie.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #12121f, transparent)' }} />
              <div className="absolute inset-0 mirror-shimmer opacity-30" />
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-colors"
                style={{ background: 'rgba(0,0,0,0.6)', color: '#94a3b8' }}
              >
                ×
              </button>
              {selectedMovie.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#dc2626' }}>
                  {selectedMovie.badge}
                </span>
              )}
            </div>

            <div className="px-6 pb-8">
              <h2 className="font-playfair font-bold text-3xl sm:text-4xl mb-3">{selectedMovie.title}</h2>

              <div className="flex items-center flex-wrap gap-3 mb-4">
                <StarRating rating={selectedMovie.rating} size="md" />
                <span className="text-xl font-bold" style={{ color: '#f59e0b' }}>{selectedMovie.rating}/10</span>
                <span style={{ color: '#64748b' }}>·</span>
                <span className="text-sm" style={{ color: '#94a3b8' }}>{selectedMovie.votes} votes</span>
                <span style={{ color: '#64748b' }}>·</span>
                <span className="text-sm" style={{ color: '#94a3b8' }}>{selectedMovie.year}</span>
                <span style={{ color: '#64748b' }}>·</span>
                <span className="text-sm" style={{ color: '#94a3b8' }}>{selectedMovie.duration}</span>
                <span style={{ color: '#64748b' }}>·</span>
                <span className="text-sm" style={{ color: '#94a3b8' }}>{selectedMovie.language}</span>
              </div>

              <div className="flex gap-2 flex-wrap mb-5">
                {selectedMovie.genres.map(g => (
                  <span key={g} className="px-3 py-1 rounded-full text-xs font-medium border" style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.14)', color: '#cbd5e1' }}>
                    {g}
                  </span>
                ))}
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${platformClass(selectedMovie.platform)} text-white`}>
                  {selectedMovie.platform}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-7" style={{ color: '#94a3b8' }}>{selectedMovie.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-7 text-sm">
                <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-xs font-bold tracking-wider mb-1.5" style={{ color: '#64748b' }}>DIRECTOR</p>
                  <p className="font-semibold">{selectedMovie.director}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-xs font-bold tracking-wider mb-1.5" style={{ color: '#64748b' }}>PLATFORM</p>
                  <p className="font-bold" style={{ color: '#dc2626' }}>{selectedMovie.platform}</p>
                </div>
                <div className="col-span-2 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-xs font-bold tracking-wider mb-1.5" style={{ color: '#64748b' }}>CAST</p>
                  <p className="font-medium">{selectedMovie.cast.join(', ')}</p>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shimmer-btn glow-red"
                  style={{ background: '#dc2626' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  Watch Now
                </button>
                <button
                  onClick={() => toggleWatchlist(selectedMovie.id)}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 border"
                  style={watchlist.includes(selectedMovie.id)
                    ? { background: '#f59e0b', color: '#000', borderColor: '#f59e0b' }
                    : { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.18)', color: '#f8fafc' }}
                >
                  {watchlist.includes(selectedMovie.id) ? '✓ In Watchlist' : '+ Watchlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── User Modal ─────────────────────────────────────────────────── */}
      {userOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
          onClick={() => setUserOpen(false)}
        >
          <div
            className="w-full rounded-2xl border animate-fadeIn relative"
            style={{ maxWidth: '22rem', background: '#12121f', borderColor: 'rgba(255,255,255,0.1)', padding: '1.75rem' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setUserOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors"
              style={{ color: '#64748b' }}
            >
              ×
            </button>

            {isLoggedIn && user ? (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4" style={{ background: '#dc2626' }}>
                  {user.name[0].toUpperCase()}
                </div>
                <h3 className="font-playfair font-bold text-2xl mb-1">{user.name}</h3>
                <p className="text-sm mb-6" style={{ color: '#64748b' }}>{user.email}</p>
                <div className="space-y-0 text-sm mb-6 rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="flex justify-between items-center px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <span style={{ color: '#94a3b8' }}>Watchlist</span>
                    <span className="font-bold" style={{ color: '#f59e0b' }}>{watchlist.length} movies</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3">
                    <span style={{ color: '#94a3b8' }}>Member since</span>
                    <span className="font-semibold">2024</span>
                  </div>
                </div>
                <button
                  onClick={() => { setIsLoggedIn(false); setUser(null); setUserOpen(false) }}
                  className="w-full py-3 rounded-full text-sm font-semibold transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-playfair font-bold text-2xl mb-5">Welcome Back</h3>
                {/* Tab switch */}
                <div className="flex gap-1 rounded-xl p-1 mb-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  {(['login', 'signup'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setUserTab(t)}
                      className="flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-colors"
                      style={userTab === t ? { background: '#dc2626', color: '#fff' } : { color: '#94a3b8' }}
                    >
                      {t === 'login' ? 'Sign In' : 'Sign Up'}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {userTab === 'signup' && (
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={signupName}
                      onChange={e => setSignupName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors"
                      style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)', color: '#f8fafc' }}
                    />
                  )}
                  <input
                    type="email"
                    placeholder="Email address"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)', color: '#f8fafc' }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)', color: '#f8fafc' }}
                  />
                  <button
                    onClick={handleLogin}
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shimmer-btn mt-1"
                    style={{ background: '#dc2626' }}
                  >
                    {userTab === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
                </div>
                <p className="text-center text-xs mt-4" style={{ color: '#64748b' }}>
                  {userTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button onClick={() => setUserTab(userTab === 'login' ? 'signup' : 'login')} className="underline" style={{ color: '#dc2626' }}>
                    {userTab === 'login' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
