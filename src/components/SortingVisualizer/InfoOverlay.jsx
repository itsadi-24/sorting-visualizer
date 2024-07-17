/* eslint-disable react/prop-types */
import { X, ExternalLink } from 'lucide-react';

const algorithmInfo = {
  bubbleSort: {
    name: 'Bubble Sort',
    description:
      'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    link: 'https://en.wikipedia.org/wiki/Bubble_sort',
  },
  selectionSort: {
    name: 'Selection Sort',
    description:
      'An in-place comparison sorting algorithm that divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    link: 'https://en.wikipedia.org/wiki/Selection_sort',
  },
  insertionSort: {
    name: 'Insertion Sort',
    description:
      'Builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    link: 'https://en.wikipedia.org/wiki/Insertion_sort',
  },
  quickSort: {
    name: 'Quick Sort',
    description:
      'An efficient, recursive divide-and-conquer approach to sorting an array. Picks an element as a pivot and partitions the given array around the picked pivot.',
    timeComplexity: 'O(n log n) average, O(n²) worst case',
    spaceComplexity: 'O(log n)',
    link: 'https://en.wikipedia.org/wiki/Quicksort',
  },
  mergeSort: {
    name: 'Merge Sort',
    description:
      'An efficient, stable sorting algorithm that makes use of the divide and conquer strategy. Conceptually, it works as follows: divide the unsorted list into n sublists, each containing one element, then repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    link: 'https://en.wikipedia.org/wiki/Merge_sort',
  },
};

const InfoOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto'>
        <button
          onClick={onClose}
          className='absolute text-gray-400 top-2 right-2 hover:text-white'
        >
          <X size={24} />
        </button>
        <h2 className='mb-4 text-2xl font-bold text-white'>
          Sorting Algorithms Information
        </h2>
        <div className='space-y-6'>
          {Object.values(algorithmInfo).map((algo) => (
            <div key={algo.name} className='p-4 bg-gray-700 rounded-lg'>
              <h3 className='mb-2 text-xl font-semibold text-white'>
                {algo.name}
              </h3>
              <p className='mb-2 text-gray-300'>{algo.description}</p>
              <p className='mb-2 text-sm text-gray-400'>
                Time Complexity: {algo.timeComplexity} | Space Complexity:{' '}
                {algo.spaceComplexity}
              </p>
              <a
                href={algo.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center text-blue-400 transition-colors duration-200 hover:text-blue-300'
              >
                Learn More <ExternalLink size={16} className='ml-1' />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoOverlay;
