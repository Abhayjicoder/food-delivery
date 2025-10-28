import React, { useState, useRef, useEffect } from 'react'
import './home.css'

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [videoErrors, setVideoErrors] = useState({})
  const containerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
  const videoRefs = useRef({})

  // Sample video data - replace with actual data from your backend
  const videos = [
    {
      id: 1,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/ff6b6b/ffffff?text=Pizza+Place',
      title: 'Best Pizza in Town - Fresh ingredients daily',
      description: 'Authentic Italian pizza made with fresh mozzarella and imported tomatoes. Open 24/7 for your cravings!',
      storeName: 'Mario\'s Pizza',
      storeId: 'pizza-001'
    },
    {
      id: 2,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/4ecdc4/ffffff?text=Sushi+Bar',
      title: 'Fresh Sushi & Japanese Cuisine',
      description: 'Master chef prepares authentic sushi with fresh fish delivered daily. Experience traditional Japanese flavors.',
      storeName: 'Tokyo Sushi',
      storeId: 'sushi-002'
    },
    {
      id: 3,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/45b7d1/ffffff?text=Burger+Joint',
      title: 'Gourmet Burgers & Craft Beer',
      description: 'Hand-crafted burgers with premium beef and artisanal buns. Pair with our selection of local craft beers.',
      storeName: 'Burger Craft',
      storeId: 'burger-003'
    },
    {
      id: 4,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/f9ca24/ffffff?text=Coffee+Shop',
      title: 'Artisan Coffee & Pastries',
      description: 'Single-origin coffee beans roasted in-house. Fresh pastries baked daily by our pastry chef.',
      storeName: 'Bean & Crumb',
      storeId: 'coffee-004'
    },
    {
      id: 5,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/e74c3c/ffffff?text=Taco+Truck',
      title: 'Authentic Mexican Street Tacos',
      description: 'Fresh corn tortillas filled with marinated meats, topped with cilantro, onions, and our secret salsa verde.',
      storeName: 'El Mariachi Tacos',
      storeId: 'tacos-005'
    },
    {
      id: 6,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/9b59b6/ffffff?text=Ice+Cream',
      title: 'Handmade Artisan Ice Cream',
      description: 'Creamy gelato made with organic ingredients. Try our signature flavors: lavender honey and salted caramel.',
      storeName: 'Sweet Dreams Gelato',
      storeId: 'gelato-006'
    },
    {
      id: 7,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/27ae60/ffffff?text=Salad+Bar',
      title: 'Fresh Organic Salads & Bowls',
      description: 'Farm-to-table ingredients in customizable bowls. Perfect for healthy eating with locally sourced vegetables.',
      storeName: 'Green Bowl Co.',
      storeId: 'salad-007'
    },
    {
      id: 8,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/f39c12/ffffff?text=Ramen+Shop',
      title: 'Authentic Japanese Ramen',
      description: 'Rich tonkotsu broth simmered for 12 hours. Topped with chashu pork, soft-boiled egg, and fresh vegetables.',
      storeName: 'Ramen Master',
      storeId: 'ramen-008'
    },
    {
      id: 9,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      thumbnail: 'https://via.placeholder.com/400x700/34495e/ffffff?text=Dessert+Cafe',
      title: 'Decadent Desserts & Sweet Treats',
      description: 'Artisanal cakes, macarons, and chocolate truffles. Perfect for special occasions or just satisfying your sweet tooth.',
      storeName: 'Sugar & Spice',
      storeId: 'dessert-009'
    }
  ]

  const handleWheel = (e) => {
    if (isScrolling) return
    
    e.preventDefault()
    setIsScrolling(true)
    
    if (e.deltaY > 0 && currentVideoIndex < videos.length - 1) {
      // Scroll down - next video
      setCurrentVideoIndex(prev => prev + 1)
    } else if (e.deltaY < 0 && currentVideoIndex > 0) {
      // Scroll up - previous video
      setCurrentVideoIndex(prev => prev - 1)
    }
    
    // Reset scrolling flag after animation
    clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 500)
  }

  // Enhanced keyboard navigation
  const handleKeyDown = (e) => {
    if (isScrolling) return
    
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault()
        if (currentVideoIndex < videos.length - 1) {
          setIsScrolling(true)
          setCurrentVideoIndex(prev => prev + 1)
          setTimeout(() => setIsScrolling(false), 500)
        }
        break
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault()
        if (currentVideoIndex > 0) {
          setIsScrolling(true)
          setCurrentVideoIndex(prev => prev - 1)
          setTimeout(() => setIsScrolling(false), 500)
        }
        break
      case 'Home':
        e.preventDefault()
        setIsScrolling(true)
        setCurrentVideoIndex(0)
        setTimeout(() => setIsScrolling(false), 500)
        break
      case 'End':
        e.preventDefault()
        setIsScrolling(true)
        setCurrentVideoIndex(videos.length - 1)
        setTimeout(() => setIsScrolling(false), 500)
        break
      default:
        break
    }
  }

  // Programmatic navigation functions
  const goToNextVideo = () => {
    if (currentVideoIndex < videos.length - 1 && !isScrolling) {
      setIsScrolling(true)
      setCurrentVideoIndex(prev => prev + 1)
      setTimeout(() => setIsScrolling(false), 500)
    }
  }

  const goToPreviousVideo = () => {
    if (currentVideoIndex > 0 && !isScrolling) {
      setIsScrolling(true)
      setCurrentVideoIndex(prev => prev - 1)
      setTimeout(() => setIsScrolling(false), 500)
    }
  }

  const goToVideo = (index) => {
    if (index >= 0 && index < videos.length && index !== currentVideoIndex && !isScrolling) {
      setIsScrolling(true)
      setCurrentVideoIndex(index)
      setTimeout(() => setIsScrolling(false), 500)
    }
  }

  // Video management functions
  const handleVideoError = (videoId) => {
    setVideoErrors(prev => ({ ...prev, [videoId]: true }))
  }

  const handleVideoLoad = (videoId) => {
    setVideoErrors(prev => ({ ...prev, [videoId]: false }))
  }

  const playCurrentVideo = () => {
    const currentVideo = videoRefs.current[currentVideoIndex]
    if (currentVideo) {
      currentVideo.play().catch(console.error)
    }
  }

  const pauseAllVideos = () => {
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.pause()
      }
    })
  }

  const handleTouchStart = (e) => {
    const startY = e.touches[0].clientY
    const startTime = Date.now()
    
    const handleTouchEnd = (e) => {
      const endY = e.changedTouches[0].clientY
      const endTime = Date.now()
      const deltaY = startY - endY
      const deltaTime = endTime - startTime
      
      // Only trigger if it's a quick swipe (not a scroll)
      if (deltaTime < 300 && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentVideoIndex < videos.length - 1) {
          // Swipe up - next video
          setCurrentVideoIndex(prev => prev + 1)
        } else if (deltaY < 0 && currentVideoIndex > 0) {
          // Swipe down - previous video
          setCurrentVideoIndex(prev => prev - 1)
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchend', handleTouchEnd)
  }

  const visitStore = (storeId) => {
    // Navigate to store page or open store details
    console.log(`Visiting store: ${storeId}`)
    // You can implement navigation here
  }

  const handleLike = (videoId) => {
    console.log(`Liked video: ${videoId}`)
    // Implement like functionality
  }

  const handleComment = (videoId) => {
    console.log(`Comment on video: ${videoId}`)
    // Implement comment functionality
  }

  const handleShare = (videoId) => {
    console.log(`Share video: ${videoId}`)
    // Implement share functionality
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      
      return () => {
        container.removeEventListener('wheel', handleWheel)
        container.removeEventListener('touchstart', handleTouchStart)
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [currentVideoIndex, isScrolling])

  // Add keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentVideoIndex, isScrolling])

  // Manage video playback when current video changes
  useEffect(() => {
    pauseAllVideos()
    setTimeout(() => {
      playCurrentVideo()
    }, 100) // Small delay to ensure smooth transition
  }, [currentVideoIndex])

  return (
    <div className="video-scroll-container" ref={containerRef}>
      {videos.map((video, index) => (
        <div
          key={video.id}
          className={`video-slide ${index === currentVideoIndex ? 'active' : ''}`}
          style={{
            transform: `translateY(${(index - currentVideoIndex) * 100}vh)`
          }}
        >
          {/* Video Background */}
          <div className="video-background">
            {videoErrors[video.id] ? (
              // Show fallback image if video fails to load
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="video-thumbnail"
              />
            ) : (
              <video 
                ref={(el) => { videoRefs.current[index] = el }}
                autoPlay 
                muted 
                loop 
                playsInline
                className="video-element"
                poster={video.thumbnail}
                onError={() => handleVideoError(video.id)}
                onLoadedData={() => handleVideoLoad(video.id)}
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Overlay Content */}
          <div className="video-overlay">
            {/* Store Info */}
            <div className="store-info">
              <h2 className="store-title">{video.title}</h2>
              <p className="store-description">{video.description}</p>
              <button 
                className="visit-store-btn"
                onClick={() => visitStore(video.storeId)}
              >
                Visit Store
              </button>
            </div>

            {/* Interaction Icons */}
            <div className="interaction-icons">
              <div className="icon-group">
                <button 
                  className="icon-btn like-btn"
                  onClick={() => handleLike(video.id)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 10V21H4C3.45 21 3 20.55 3 20V12C3 11.45 3.45 11 4 11H7M7 10V4C7 2.9 7.9 2 9 2H15C16.1 2 17 2.9 17 4V10M7 10H17M17 10V21H14L10 17L6 21H3V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  className="icon-btn comment-btn"
                  onClick={() => handleComment(video.id)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  className="icon-btn share-btn"
                  onClick={() => handleShare(video.id)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 6L12 2M12 2L8 6M12 2V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Controls - Only show on desktop */}
            <div className="navigation-controls">
              <button 
                className="nav-btn prev-btn"
                onClick={goToPreviousVideo}
                disabled={currentVideoIndex === 0 || isScrolling}
                title="Previous Video (↑)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M12 19L5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="nav-btn next-btn"
                onClick={goToNextVideo}
                disabled={currentVideoIndex === videos.length - 1 || isScrolling}
                title="Next Video (↓)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Video Progress Indicator */}
      <div className="video-progress-indicator">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`progress-dot ${index === currentVideoIndex ? 'active' : ''}`}
            onClick={() => goToVideo(index)}
            title={`Go to video ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Instructions */}
      <div className="scroll-instructions">
        <div className="instruction-text">
          <span className="desktop-instruction">Scroll or use ↑↓ keys to navigate</span>
          <span className="mobile-instruction">Swipe up/down to navigate</span>
        </div>
      </div>
    </div>
  )
}

export default Home