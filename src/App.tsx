/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Sun } from 'lucide-react';
import Confetti from './components/Confetti';
import photo1 from './assets/photo1.png';
import photo3 from './assets/photo3_v3.png';
import photo4 from './assets/photo4.jpg';
import photo5 from './assets/photo5.jpg';
import photo6 from './assets/photo6.png';
import music from './assets/Birthday_Echoes.mp3';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const photos = [
  { src: photo1, position: 'center' },
  { src: photo3, position: 'top' },    // Child in pink lifting
  { src: photo4, position: 'center' },
  { src: photo5, position: 'center' },
  { src: photo6, position: 'top' },    // High-throw photo
];

const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    rotate: direction > 0 ? 5 : -5,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    rotate: direction < 0 ? 5 : -5,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: [0, -2, 2, -1, 1][i % 5],
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96],
      delay: i * 0.1
    },
  }),
};

const landingVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

const sunVariants = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: "linear" }
  }
};

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);

  const photoIndex = Math.abs(page) % photos.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isOpened) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(timer);
  }, [isOpened, page]);

  // Play on first user interaction (browsers block autoplay without it)
  useEffect(() => {
    if (isOpened) return;

    const startAudio = () => {
      if (!started && audioRef.current) {
        audioRef.current.play().catch(() => { });
        setStarted(true);
      }
    };
    window.addEventListener('click', startAudio, { once: true });
    window.addEventListener('touchstart', startAudio, { once: true });
    return () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
  }, [started, isOpened]);

  const handleOpen = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => { });
      setStarted(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <main className="bg-blue-600 min-h-screen flex items-center justify-center p-4 font-sans text-white relative overflow-hidden">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]"></div>

      {/* Background music */}
      <audio ref={audioRef} src={music} loop />

      {/* Mute / unmute button - only show if opened */}
      <AnimatePresence>
        {isOpened && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={toggleMute}
            title={muted ? 'Unmute music' : 'Mute music'}
            className="fixed bottom-6 right-6 z-50 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg transition-colors border border-white/30"
          >
            {muted ? '🔇' : '🎵'}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="landing"
            variants={landingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center text-center z-10 p-4"
          >
            <motion.div
              className="bg-white/10 backdrop-blur-xl p-10 sm:p-16 rounded-[2rem] border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-lg relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Decorative sun in landing */}
              <motion.div
                className="absolute -top-10 -right-10 text-yellow-300 opacity-20"
                variants={sunVariants}
                animate="animate"
              >
                <Sun size={150} />
              </motion.div>

              <motion.h1
                className="font-serif text-6xl sm:text-8xl font-bold mb-10 leading-tight relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="text-yellow-300 block">Happy</span>
                <span className="text-pink-400 block">Birthday</span>
                <span className="text-lime-300 block font-script text-8xl sm:text-9xl -mt-4">Bert!</span>
              </motion.h1>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 30px -5px rgba(0,0,0,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="px-12 py-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full font-bold text-2xl text-white shadow-2xl flex items-center gap-3 mx-auto group relative z-10 border border-white/20"
              >
                <span>Open Card</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >✨</motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            className="w-full max-w-6xl mx-auto my-4 z-10 p-6 sm:p-8 rounded-[3rem] border-2 border-white/30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden min-h-[600px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Confetti />

            {/* Animated Sun Motif */}
            <motion.div
              className="absolute top-8 right-8 text-yellow-300/30"
              variants={sunVariants}
              animate="animate"
            >
              <Sun size={80} strokeWidth={1.5} />
            </motion.div>

            <div className="flex flex-col md:flex-row w-full gap-8 items-center">
              {/* Text section */}
              <motion.div
                className="p-4 sm:p-8 flex flex-col justify-center text-center md:text-left w-full md:w-1/2"
                variants={itemVariants}
              >
                <motion.h1
                  className="font-serif text-5xl sm:text-7xl font-bold leading-tight"
                  variants={itemVariants}
                >
                  <span className="text-yellow-300">Happy</span>{' '}
                  <span className="text-pink-400">Birthday</span>{' '}
                  <span className="text-lime-300 font-script text-7xl sm:text-9xl block -mt-2">Bert</span>
                </motion.h1>

                <motion.div className="mt-6 sm:mt-8 space-y-4" variants={itemVariants}>
                  <p className="text-xl sm:text-2xl text-white leading-relaxed font-medium">
                    A huge happy birthday as another year of incredible change begins
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed italic">
                    A new baby boy on the way, a new house, growing business
                  </p>
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <p className="text-lg text-white/90 leading-relaxed">
                      Sending huge love on this special day
                    </p>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="text-yellow-400"
                    >
                      <Sun size={24} />
                    </motion.div>
                  </div>
                  <p className="text-lg text-white/90 leading-relaxed">
                    I really would love to be spending more time with you all this year
                  </p>
                  <p className="text-lg text-white font-semibold leading-relaxed">
                    To another year of adventures, love, joy and growth
                  </p>
                </motion.div>

                <motion.div
                  className="mt-8 sm:mt-10 text-xl text-white space-y-2"
                  variants={itemVariants}
                >
                  <p className="opacity-80">Lots of love,</p>
                  <p className="font-script text-7xl text-yellow-300 -ml-2 drop-shadow-lg">
                    Tim x
                  </p>
                </motion.div>
              </motion.div>

              {/* Image Carousel Section */}
              <div className="w-full md:w-1/2 h-[400px] sm:h-[500px] relative flex shadow-inner items-center justify-center p-4">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={carouselVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute w-full h-full p-4"
                  >
                    <img
                      src={photos[photoIndex].src}
                      alt={`Memory ${photoIndex + 1}`}
                      className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white pointer-events-none"
                      style={{ objectPosition: photos[photoIndex].position }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation indicators */}
                <div className="absolute bottom-[-10px] flex gap-2 z-20">
                  {photos.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-2 w-2 rounded-full ${i === photoIndex ? 'bg-yellow-300' : 'bg-white/30'}`}
                      animate={{ scale: i === photoIndex ? 1.5 : 1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
