/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const confettiData = [
  { color: 'bg-yellow-300', top: '10%', left: '5%', rotation: '15deg', scale: '1' },
  { color: 'bg-pink-400', top: '15%', left: '90%', rotation: '-10deg', scale: '0.8' },
  { color: 'bg-teal-300', top: '80%', left: '85%', rotation: '25deg', scale: '1.2' },
  { color: 'bg-orange-400', top: '90%', left: '10%', rotation: '-5deg', scale: '1.1' },
  { color: 'bg-white', top: '5%', left: '40%', rotation: '20deg', scale: '0.7' },
  { color: 'bg-lime-300', top: '40%', left: '5%', rotation: '-15deg', scale: '0.9' },
  { color: 'bg-sky-300', top: '75%', left: '25%', rotation: '10deg', scale: '1' },
  { color: 'bg-rose-400', top: '50%', left: '95%', rotation: '5deg', scale: '0.8' },
  { color: 'bg-amber-300', top: '95%', left: '50%', rotation: '-20deg', scale: '1.3' },
  { color: 'bg-slate-300', top: '20%', left: '20%', rotation: '30deg', scale: '0.6' },
];

const Star = ({ top, left, rotation, scale }) => (
  <div
    className="absolute text-white"
    style={{ top, left, transform: `rotate(${rotation}) scale(${scale})` }}
  >
    <svg
      width="24" 
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  </div>
);

export default function Confetti() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {confettiData.map((confetti, index) => (
        <div
          key={index}
          className={`absolute w-8 h-4 rounded-full ${confetti.color}`}
          style={{
            top: confetti.top,
            left: confetti.left,
            transform: `rotate(${confetti.rotation}) scale(${confetti.scale})`,
          }}
        />
      ))}
       <Star top="20%" left="80%" rotation="10deg" scale="1.2" />
       <Star top="85%" left="5%" rotation="-15deg" scale="0.8" />
       <Star top="50%" left="50%" rotation="20deg" scale="0.6" />
       <Star top="5%" left="15%" rotation="-10deg" scale="1" />
    </div>
  );
}
