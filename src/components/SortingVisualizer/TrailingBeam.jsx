import { useEffect, useRef } from 'react';

const TrailingBeam = () => {
  const beamRef = useRef(null);

  useEffect(() => {
    const beam = beamRef.current;
    let position = 0;
    let direction = 1;

    const animate = () => {
      if (beam) {
        position += direction;
        if (position >= 100 || position <= 0) {
          direction *= -1;
        }
        beam.style.transform = `translate(${position}%, ${position}%)`;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div
      ref={beamRef}
      className='absolute w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-70'
      style={{ top: '-8px', left: '-8px' }}
    />
  );
};

export default TrailingBeam;
