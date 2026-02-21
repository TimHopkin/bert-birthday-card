/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Confetti from './components/Confetti';
import photo1 from './assets/photo1.png';
import photo2 from './assets/photo2.png';
import photo3 from './assets/photo3.png';
import photo4 from './assets/photo4.jpg';
import photo5 from './assets/photo5.jpg';
import music from './assets/Birthday_Echoes.mp3';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const imageMainVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
  },
};

const imageSideVariant1 = {
  hidden: { opacity: 0, x: -50, y: -50, rotate: -30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: -8,
    transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
  },
};

const imageSideVariant2 = {
  hidden: { opacity: 0, x: 50, y: 50, rotate: 30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 6,
    transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
  },
};

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  // Play on first user interaction (browsers block autoplay without it)
  useEffect(() => {
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
  }, [started]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <main className="bg-blue-600 min-h-screen flex items-center justify-center p-4 font-sans text-white relative">
      {/* Background music */}
      <audio ref={audioRef} src={music} loop />

      {/* Mute / unmute button */}
      <button
        onClick={toggleMute}
        title={muted ? 'Unmute music' : 'Mute music'}
        className="fixed bottom-4 right-4 z-50 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-11 h-11 flex items-center justify-center text-xl shadow-lg transition-colors"
      >
        {muted ? '🔇' : '🎵'}
      </button>

      <Confetti />
      <motion.div
        className="w-full max-w-4xl mx-auto my-8 flex flex-col md:flex-row z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Text section */}
        <motion.div
          className="p-8 sm:p-12 flex flex-col justify-center text-center md:text-left w-full md:w-1/2"
          variants={itemVariants}
        >
          <motion.h1
            id="title"
            className="font-serif text-5xl sm:text-7xl font-bold leading-tight"
            variants={itemVariants}
          >
            <span className="text-yellow-300">Happy</span>{' '}
            <span className="text-pink-400">Birthday</span>{' '}
            <span className="text-lime-300">Bert</span>
          </motion.h1>
          <motion.p
            id="message"
            className="mt-6 sm:mt-8 text-lg text-sky-100/90 leading-relaxed"
            variants={itemVariants}
          >
            To another spin around the sun with a year of love, growth,
            adventures and joy.
          </motion.p>
          <motion.div
            className="mt-10 sm:mt-12 text-xl text-sky-100 space-y-6"
            variants={itemVariants}
          >
            {!started && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.play().catch(() => { });
                    setStarted(true);
                  }
                }}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full font-bold text-white shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 mx-auto md:mx-0"
              >
                <span>🎵</span> Play Birthday Song
              </motion.button>
            )}

            <div>
              <p id="closing">Lots of love,</p>
              <p id="signature" className="font-script text-6xl text-yellow-300 -ml-2">
                Tim x
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Image collage section — Tighter 3+2 grid to ensure all are visible */}
        <div className="w-full md:w-1/2 p-2 grid grid-cols-6 gap-2 content-center items-center">
          {/* Row 1: 3 images */}
          <motion.img
            src={photo1}
            alt="Dad and child"
            className="col-span-2 w-full aspect-[3/4] rounded-lg object-cover shadow-lg border-2 border-white"
            style={{ rotate: '-2deg' }}
            variants={imageMainVariant}
          />
          <motion.img
            src={photo2}
            alt="Dad throwing child"
            className="col-span-2 w-full aspect-[3/4] rounded-lg object-cover shadow-lg border-2 border-white"
            style={{ rotate: '1deg' }}
            variants={imageSideVariant1}
          />
          <motion.img
            src={photo3}
            alt="Mum lifting child silhouette"
            className="col-span-2 w-full aspect-[3/4] rounded-lg object-cover shadow-lg border-2 border-white"
            style={{ rotate: '-1deg' }}
            variants={imageSideVariant2}
          />

          {/* Row 2: 2 images centered */}
          <div className="col-span-1"></div> {/* Spacer */}
          <motion.img
            src={photo4}
            alt="Family group photo"
            className="col-span-2 w-full aspect-[3/4] rounded-lg object-cover shadow-lg border-2 border-white"
            style={{ rotate: '2deg' }}
            variants={imageSideVariant1}
          />
          <motion.img
            src={photo5}
            alt="Wedding group photo"
            className="col-span-2 w-full aspect-[3/4] rounded-lg object-cover shadow-lg border-2 border-white"
            style={{ rotate: '-2deg' }}
            variants={imageMainVariant}
          />
          <div className="col-span-1"></div> {/* Spacer */}
        </div>
      </motion.div>
    </main>
  );
}
