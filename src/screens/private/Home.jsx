import React, { useRef, useState } from 'react'
import {
  Bell,
  Film,
  Home,
  Image,
  MessageCircle,
  Search,
  Send,
  User,
  Video,
} from 'lucide-react'
import styles from './Home.module.css'

const storyUsers = ['You', 'Alex', 'Mia', 'Noah', 'Zara', 'Luna', 'Jules', 'Ravi']

const postItems = [
  {
    username: 'alex_gram',
    avatar: 'A',
    caption: 'A peaceful morning by the water.',
    image:
      'https://images.unsplash.com/photo-1535893291590-a7e21d2a8dc3?auto=format&fit=crop&w=900&q=80',
  },
  {
    username: 'luna_space',
    avatar: 'L',
    caption: 'Golden hour, always the best hour.',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
  },
]

const reelItems = [
  {
    title: 'Quick cozy recipe',
    thumbnail:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Sunset skate session',
    thumbnail:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'City lights motion',
    thumbnail:
      'https://images.unsplash.com/photo-1516557070069-9ad321f8a350?auto=format&fit=crop&w=900&q=80',
  },
]

const dmThreads = [
  { name: 'Mia', lastMessage: 'Can you send that reel?', status: 'Active' },
  { name: 'Noah', lastMessage: 'Loved the story!', status: 'Sent' },
  { name: 'Zara', lastMessage: 'Let’s catch up later.', status: 'Online' },
]

const discoverTiles = [
  {
    label: 'Reels',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Nature',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Travel',
    image:
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Portrait',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  },
]

const profilePhotos = [
  'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80',
]

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('home')
  const [homeSubTab, setHomeSubTab] = useState('posts')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState(null)
  const dragRef = useRef(null)
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 })

  // Nav items - allow reorder via drag
  const initialNav = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'reels', label: 'Reels', icon: Film },
    { id: 'dm', label: 'DM', icon: MessageCircle },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'profile', label: 'Profile', icon: User },
  ]
  const [navItems, setNavItems] = useState(initialNav)
  const navDragIndex = useRef(null)

  const handleNavDragStart = (e, index) => {
    navDragIndex.current = index
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleNavDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleNavDrop = (e, index) => {
    e.preventDefault()
    const from = navDragIndex.current
    const to = index
    if (from === null || from === to) return
    setNavItems((prev) => {
      const copy = [...prev]
      const [moved] = copy.splice(from, 1)
      copy.splice(to, 0, moved)
      return copy
    })
    navDragIndex.current = null
  }

  // Photos reorderable
  const [photos, setPhotos] = useState(profilePhotos)
  const photoDragIndex = useRef(null)

  const handlePhotoDragStart = (e, index) => {
    photoDragIndex.current = index
    e.dataTransfer.effectAllowed = 'move'
  }

  const handlePhotoDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handlePhotoDrop = (e, index) => {
    e.preventDefault()
    const from = photoDragIndex.current
    const to = index
    if (from === null || from === to) return
    setPhotos((prev) => {
      const copy = [...prev]
      const [moved] = copy.splice(from, 1)
      copy.splice(to, 0, moved)
      return copy
    })
    photoDragIndex.current = null
  }

  const handleDragStart = (event) => {
    const slider = event.currentTarget
    slider.setPointerCapture(event.pointerId)
    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: slider.scrollLeft,
    }
  }

  const handleDragMove = (event) => {
    const slider = event.currentTarget
    if (!dragState.current.active) return
    const dx = event.clientX - dragState.current.startX
    slider.scrollLeft = dragState.current.scrollLeft - dx
  }

  const handleDragEnd = () => {
    dragState.current.active = false
  }

  return (
    <div className={styles.homePage}>
      <header className={styles.navBar}>
        <div className={styles.navLogo}>
          <Home size={20} />
          <span>InstaHome</span>
        </div>
        <div className={styles.navActions}>
          <button className={styles.navActionBtn} aria-label="Notifications">
            <Bell size={18} />
          </button>
          <button className={styles.navActionBtn} aria-label="Direct messages">
            <Send size={18} />
          </button>
        </div>
      </header>

      <div className={styles.storiesBar}>
        {storyUsers.map((user) => (
          <div key={user} className={styles.storyItem}>
            <div className={styles.storyAvatar}>{user.slice(0, 1)}</div>
            <div className={styles.storyName}>{user}</div>
          </div>
        ))}
      </div>

      <main className={styles.contentPanel}>
        {activeTab === 'home' && (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Home</h2>
            </div>
            <div className={styles.tabGroup}>
              <button
                type="button"
                className={`${styles.tabButton} ${homeSubTab === 'posts' ? styles.active : ''}`}
                onClick={() => setHomeSubTab('posts')}
              >
                Posts
              </button>
              <button
                type="button"
                className={`${styles.tabButton} ${homeSubTab === 'reels' ? styles.active : ''}`}
                onClick={() => setHomeSubTab('reels')}
              >
                Reels
              </button>
            </div>

            {homeSubTab === 'posts' &&
              postItems.map((post) => (
                <article key={post.username} className={styles.postCard}>
                  <div className={styles.postHeader}>
                    <div className={styles.postHeaderAvatar}>{post.avatar}</div>
                    <div className={styles.postHeaderText}>
                      <strong>{post.username}</strong>
                      <span>1h ago</span>
                    </div>
                  </div>
                  <img className={styles.postImage} src={post.image} alt={post.caption} />
                  <div className={styles.postBody}>{post.caption}</div>
                  <div className={styles.postActions}>
                    <span className={styles.actionLabel}>Like</span>
                    <span className={styles.actionLabel}>Comment</span>
                    <span className={styles.actionLabel}>Share</span>
                  </div>
                </article>
              ))}

            {homeSubTab === 'reels' && (
              <div className={styles.horizontalScroll} onPointerDown={handleDragStart} onPointerMove={handleDragMove} onPointerUp={handleDragEnd} onPointerLeave={handleDragEnd}>
                {reelItems.map((reel) => (
                  <div key={reel.title} className={styles.reelCard}>
                    <img className={styles.reelImage} src={reel.thumbnail} alt={reel.title} />
                    <div className={styles.reelContent}>
                      <div className={styles.reelLabel}>
                        <Film size={16} />
                        {reel.title}
                      </div>
                      <div>Short clip for quick inspiration.</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Trending Reels</h3>
            </div>
            <div className={styles.horizontalScroll} onPointerDown={handleDragStart} onPointerMove={handleDragMove} onPointerUp={handleDragEnd} onPointerLeave={handleDragEnd}>
              {reelItems.map((reel) => (
                <div key={`trending-${reel.title}`} className={styles.defaultCard}>
                  <img className={styles.postImage} src={reel.thumbnail} alt={reel.title} />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'reels' && (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Reels</h2>
            </div>
            <div className={styles.horizontalScroll} onPointerDown={handleDragStart} onPointerMove={handleDragMove} onPointerUp={handleDragEnd} onPointerLeave={handleDragEnd}>
              {reelItems.map((reel) => (
                <div key={reel.title} className={styles.reelCard}>
                  <img className={styles.reelImage} src={reel.thumbnail} alt={reel.title} />
                  <div className={styles.reelContent}>
                    <div className={styles.reelLabel}>
                      <Film size={16} />
                      {reel.title}
                    </div>
                    <p>Swipe through short clips.</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'dm' && (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Messages</h2>
            </div>
            <section className={styles.dmCard}>
              {dmThreads.map((thread) => (
                <div key={thread.name} className={styles.dmRow}>
                  <div className={styles.dmAvatar}>{thread.name.slice(0, 1)}</div>
                  <div className={styles.dmDetails}>
                    <strong>{thread.name}</strong>
                    <span className={styles.dmPreview}>{thread.lastMessage}</span>
                  </div>
                  <span className={styles.dmStatus}>{thread.status}</span>
                </div>
              ))}
            </section>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Suggested Reels & Photos</h3>
            </div>
            <div className={styles.horizontalScroll} onPointerDown={handleDragStart} onPointerMove={handleDragMove} onPointerUp={handleDragEnd} onPointerLeave={handleDragEnd}>
              {discoverTiles.map((tile) => (
                <div key={tile.label} className={styles.defaultCard}>
                  <img className={styles.postImage} src={tile.image} alt={tile.label} />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'search' && (
          <div className={styles.searchSection}>
            <div className={styles.searchInputWrapper}>
              <Search size={18} />
              <input className={styles.searchInput} placeholder="Search reels, photos, profiles" />
            </div>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Discover</h2>
            </div>
            <div className={styles.horizontalScroll} onPointerDown={handleDragStart} onPointerMove={handleDragMove} onPointerUp={handleDragEnd} onPointerLeave={handleDragEnd}>
              {discoverTiles.map((tile) => (
                <div key={`search-${tile.label}`} className={styles.defaultCard}>
                  <img className={styles.postImage} src={tile.image} alt={tile.label} />
                </div>
              ))}
            </div>
            <div className={styles.photoGrid}>
              {photos.slice(0, 6).map((photo, index) => (
                <div
                  key={index}
                  className={styles.photoTile}
                  draggable
                  onDragStart={(e) => handlePhotoDragStart(e, index)}
                  onDragOver={handlePhotoDragOver}
                  onDrop={(e) => handlePhotoDrop(e, index)}
                >
                  <img className={styles.profilePhoto} src={photo} alt={`Explore ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className={styles.profileSection}>
            <div className={styles.profileInfo}>
              <div className={styles.profileAvatarLarge}>U</div>
              <div className={styles.statsBox}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>24</span>
                  <span className={styles.statLabel}>Posts</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>3.4k</span>
                  <span className={styles.statLabel}>Followers</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>182</span>
                  <span className={styles.statLabel}>Following</span>
                </div>
              </div>
            </div>
            <div className={styles.profileBio}>
              <p className={styles.profileName}>Your Name</p>
              <p>Creative storyteller • sharing reels, photos, and authentic moments.</p>
            </div>
            <div className={styles.photoGrid}>
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className={styles.photoTile}
                  draggable
                  onDragStart={(e) => handlePhotoDragStart(e, index)}
                  onDragOver={handlePhotoDragOver}
                  onDrop={(e) => handlePhotoDrop(e, index)}
                >
                  <img
                    className={styles.profilePhoto}
                    src={photo}
                    alt={`Profile ${index + 1}`}
                    onClick={() => { setModalImage(photo); setModalOpen(true); }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') { setModalImage(photo); setModalOpen(true); } }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <nav className={styles.bottomNav}>
        {navItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              className={`${styles.navButton} ${activeTab === item.id ? styles.active : ''}`}
              onClick={() => setActiveTab(item.id)}
              draggable
              onDragStart={(e) => handleNavDragStart(e, index)}
              onDragOver={handleNavDragOver}
              onDrop={(e) => handleNavDrop(e, index)}
            >
              <Icon size={20} />
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setModalOpen(false)} aria-label="Close preview">✕</button>
            <img className={styles.modalImage} src={modalImage} alt="Profile preview" />
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
