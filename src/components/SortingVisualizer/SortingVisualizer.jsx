import { useEffect, useState, useRef } from 'react';
import {
  InfoButton,
  StyledButton,
  StyledSelect,
  StyledSlider,
} from './StyledComponents';
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  mergeSort,
} from './SortingAlgorithms';
import TrailingBeam from './TrailingBeam';
import Footer from './Footer';
import HeaderUnderline from './HeaderUnderline';
import SocialButton from './SocialButton';
import {
  BARS,
  SPEED,
  barWidth,
  ORGINAL_COLOR,
  sortOptions,
  sizeOptions,
} from '../../utils/constants';
import { Github, Linkedin } from 'lucide-react';
import InfoOverlay from './InfoOverlay';

function SortingVisualizer() {
  const [bar, setBar] = useState([80, 40, 20, 70, 30]);
  // const [speed, setSpeed] = useState(SPEED);
  const [speed, setSpeed] = useState(SPEED);
  const speedRef = useRef(SPEED);
  const [sortID, setSortID] = useState(3);
  const [isSorting, setIsSorting] = useState(false);
  const stopSortingRef = useRef(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    generateNewArray();
  }, []);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const swap = (i, j, newBars) => {
    document.getElementById('bar-' + i).style.height = newBars[j] + 'px';
    document.getElementById('bar-' + j).style.height = newBars[i] + 'px';

    var tmp = newBars[i];
    newBars[i] = newBars[j];
    newBars[j] = tmp;
  };

  const startSortingHandle = async () => {
    setIsSorting(true);
    stopSortingRef.current = false;

    var newBars = [...bar];
    switch (sortID) {
      case 1:
        await selectionSort(newBars, swap, stopSortingRef, speedRef);
        break;
      case 2:
        await insertionSort(newBars, swap, stopSortingRef, speedRef);
        break;
      case 3:
        await quickSort(
          0,
          newBars.length - 1,
          newBars,
          swap,
          stopSortingRef,
          speedRef
        );
        break;
      case 4:
        await mergeSort(
          0,
          newBars.length - 1,
          newBars,
          swap,
          stopSortingRef,
          speedRef
        );
        break;
      default:
        await bubbleSort(newBars, swap, stopSortingRef, speedRef);
        break;
    }

    setIsSorting(false);
    stopSortingRef.current = false;
  };

  const resetHandle = () => {
    stopSortingRef.current = true;
    setIsSorting(false);
    generateNewArray();
  };

  const generateNewArray = () => {
    var arr = Array.from({ length: BARS }, () =>
      Math.floor(Math.random() * 440)
    );
    for (let i = 0; i < bar.length; i++) {
      var dom = document.getElementById('bar-' + i);
      if (dom) dom.style.backgroundColor = ORGINAL_COLOR;
    }
    setBar(arr);
  };

  return (
    <div className='min-h-screen p-8 pb-0 text-white bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'>
      <div className='mx-auto max-w-7xl'>
        <div className='relative mb-6'>
          <div className='absolute top-0 right-0 flex items-center mt-2'>
            <SocialButton
              icon={Github}
              href='https://github.com/itsadi-24'
              label='GitHub Profile'
            />
            <SocialButton
              icon={Linkedin}
              href='https://www.linkedin.com/in/adi-prasan-khuntia-3944072a5/'
              label='LinkedIn Profile'
            />
            <InfoButton onClick={() => setIsInfoOpen(true)} />
          </div>
          <h1
            className='text-5xl font-bold text-center'
            style={{ fontFamily: 'Classic Bold, sans-serif' }}
          >
            Sorting Visualizer
          </h1>
          <HeaderUnderline />
        </div>
        <div className='relative p-8 mt-6 bg-gray-800 bg-opacity-30 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-filter backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden'>
          <TrailingBeam />
          <div className='flex flex-wrap items-center justify-between mb-10'>
            <div className='flex gap-4 mb-4 sm:mb-0'>
              <StyledButton onClick={startSortingHandle} disabled={isSorting}>
                Start Sorting
              </StyledButton>
              <StyledButton onClick={resetHandle}>Reset</StyledButton>
              <StyledButton onClick={generateNewArray} disabled={isSorting}>
                Generate New
              </StyledButton>
            </div>
            <div className='flex items-center gap-6'>
              <div className='flex items-center gap-3'>
                <span className='text-sm font-medium'>Algorithm:</span>
                <StyledSelect
                  value={sortID}
                  onChange={(e) => {
                    setSortID(parseInt(e.target.value));
                    generateNewArray();
                  }}
                  options={sortOptions}
                />
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-sm font-medium'>Speed:</span>
                <StyledSlider
                  value={speed}
                  onChange={(e) => {
                    const newSpeed = parseInt(e.target.value);
                    setSpeed(newSpeed);
                  }}
                  min={1}
                  max={1000}
                />
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-sm font-medium'>Size:</span>
                <StyledSelect
                  value={bar.length}
                  onChange={(e) => {
                    const newSize = parseInt(e.target.value);
                    setBar(
                      Array.from({ length: newSize }, () =>
                        Math.floor(Math.random() * 440)
                      )
                    );
                  }}
                  options={sizeOptions}
                />
              </div>
            </div>
          </div>
          <div className='flex items-end justify-center h-[420px]'>
            {bar.map((item, id) => (
              <div
                className='bar'
                id={'bar-' + id}
                key={id}
                style={{
                  width: barWidth,
                  height: item,
                  backgroundColor: ORGINAL_COLOR,
                  margin: '0 1px',
                  transition: 'height 0.1s ease-in-out',
                }}
              ></div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
      <InfoOverlay isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}

export default SortingVisualizer;
