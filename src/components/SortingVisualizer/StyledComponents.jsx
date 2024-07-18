/* eslint-disable react/prop-types */
import { ChevronDown, Info } from 'lucide-react';

export const StyledButton = ({ onClick, children, disabled = false }) => (
  <div className='relative group'>
    <div
      className={`relative z-10 w-48 h-10 overflow-hidden bg-black rounded-lg opacity-90 ${
        disabled ? 'cursor-not-allowed' : ''
      }`}
    >
      <div className='absolute z-10 -translate-x-32 group-hover:translate-x-[20rem] ease-in transition-all duration-700 h-full w-32 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12'></div>
      <div className='absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-lg inset-0.5 bg-black'>
        <button
          onClick={onClick}
          disabled={disabled}
          className={`w-full h-full px-4 py-2 text-sm font-semibold font-sans text-white bg-black rounded-lg input opacity-90 ${
            disabled ? 'opacity-50' : ''
          }`}
        >
          {children}
        </button>
      </div>
      <div className='absolute duration-1000 group-hover:animate-spin w-full h-[80px] bg-gradient-to-r from-green-500 to-yellow-500 blur-[20px]'></div>
    </div>
  </div>
);

export const StyledSelect = ({
  value,
  onChange,
  options,
  disabled = false,
}) => (
  <div className='relative'>
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`py-2 pl-3 pr-10 text-white bg-gray-700 border border-gray-600 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div
      className={`absolute inset-y-0 right-0 flex items-center px-2 text-white pointer-events-none ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      <ChevronDown size={18} />
    </div>
  </div>
);

export const StyledSlider = ({ value, onChange, min, max }) => (
  <div className='relative w-32'>
    <input
      type='range'
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className='w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer'
      style={{
        background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${
          ((value - min) / (max - min)) * 100
        }%, #4B5563 ${((value - min) / (max - min)) * 100}%, #4B5563 100%)`,
      }}
    />
    <div className='absolute left-0 right-0 flex justify-between text-xs text-gray-400 -bottom-6'>
      <span>Slow</span>
      <span>Fast</span>
    </div>
  </div>
);

export const InfoButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className='inline-flex items-center justify-center w-10 h-10 ml-2 text-white transition-all duration-300 bg-gray-800 rounded-full hover:bg-gray-700 hover:scale-110'
    aria-label='Algorithm Information'
  >
    <Info size={20} />
  </button>
);
