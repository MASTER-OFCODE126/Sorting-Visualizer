import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms';
import { getHeapSortAnimations } from '../sortingAlgorithms/sortingAlgorithms';
import { getQuickSortAnimations } from '../sortingAlgorithms/sortingAlgorithms';
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
// const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = `#d946ef`;

// This is the color of array bars that are being compared throughout the animations.
// save = '#22d3ee'
const SECONDARY_COLOR = '#22d3ee';
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      shouldStop: false,
      isSorting: false,
      lastSort: null,
    };
    this.timeouts = [];
  }
  
 
  stopSorting = () => {
    this.setState({ shouldStop: true, stopSorting: false });
  };

  continuesorting = () => {
    if (this.state.lastSort === 'heap') this.heapSort();
    else if (this.state.lastSort === 'merge') this.mergeSort();
    else if (this.state.lastSort === 'quick') this.quickSort()

  }

  handleButtonClick = (e, action) => {
    const button = e.currentTarget;
    button.classList.add('clicked');

    setTimeout(() => {
      button.classList.remove('clicked');
    }, 600); // matches animation

    if (action === 'generate') this.resetArray();
    else if (action === 'merge') this.mergeSort();
    else if (action === 'quick') this.quickSort();
    else if (action === 'heap') this.heapSort();
    else if (action === 'stop') this.stopSorting();
    else if (action === 'continue') this.continuesorting();
    else if (action === 'resetSort') this.resetSorting();
  };

  resetSorting = () => {
    this.timeouts.forEach(clearTimeout); // clear all timeouts
    this.timeouts = [];
    this.setState({ shouldStop: false, isSorting: false }, () => {
      this.resetArray();
    });
  };
  componentDidMount() {
    this.resetArray();
  }
  resetArray() {
    const array = [];
    for (let i = 0; i < 296; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array, shouldStop: false }, () => {
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let bar of arrayBars) {
        bar.style.backgroundColor = SECONDARY_COLOR;
      }
    });
  }
  mergeSort() {
    this.setState({ shouldStop: false, isSorting: true, lastSort: 'merge' }, () => {
      const animations = getMergeSortAnimations(this.state.array.slice());
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        const timeoutId = setTimeout(() => {
          if (this.state.shouldStop) return;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          } else {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }
          if (i === animations.length - 1) {
            this.setState({ isSorting: false });
          }
        }, i * ANIMATION_SPEED_MS);
        this.timeouts.push(timeoutId);
      }
    });
  }
  quickSort() {
    this.setState({ shouldStop: false, isSorting: true, lastSort: 'quick' }, () => {
      const animations = getQuickSortAnimations(this.state.array.slice());
      const arrayBars = document.getElementsByClassName('array-bar');

      for (let i = 0; i < animations.length; i++) {
        const timeoutId = setTimeout(() => {
          if (this.state.shouldStop) return;

          const animation = animations[i];
          const action = animation[0];

          if (action === "compare" || action === "revert") {
            const [_, barOneIdx, barTwoIdx] = animation;
            const barOne = arrayBars[barOneIdx];
            const barTwo = arrayBars[barTwoIdx];

            if (barOne && barTwo) {
              const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
              barOne.style.backgroundColor = color;
              barTwo.style.backgroundColor = color;
            }
          }
          else if (action === "swap") {
            const [_, barIdx, newHeight] = animation;
            const bar = arrayBars[barIdx];
            if (bar) bar.style.height = `${newHeight}px`;
          }

          if (i === animations.length - 1) {
            this.setState({ isSorting: false });
          }
        }, i * ANIMATION_SPEED_MS);

        this.timeouts.push(timeoutId);
      }
    });
  }

  heapSort() {
    this.setState({ shouldStop: false, isSorting: true, lastSort: 'heap' }, () => {
      const animations = getHeapSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const timeoutId = setTimeout(() => {
          if (this.state.shouldStop) return; // just skip animation if stopped

          const arrayBars = document.getElementsByClassName('array-bar');
          if (!arrayBars || arrayBars.length === 0) return;
          const isColorChange = i % 4 < 2;

          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          } else {
            const [barIdx, newHeight] = animations[i];
            const barStyle = arrayBars[barIdx].style;
            barStyle.height = `${newHeight}px`;
          }

          // End sorting
          if (i === animations.length - 1) {
            this.setState({ isSorting: false });
          }
        }, i * ANIMATION_SPEED_MS);
        this.timeouts.push(timeoutId); // save timeout
      }
    });
  }

  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      for (let i = 0; i < randomIntFromInterval(1, 1000); i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations.mergeSort(array.slice());
      console.log(arrayaAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }
  render() {
    const { array } = this.state;

    return (

      <div id='visualizer' className="visualizer-frame py-3 bg-zinc-800 h-screen">
       
        <div className="array-container ">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div className="button-container ">
          <button className=' rounded lg border-2 text-xs uppercase border-fuchsia-100 px-2' onClick={(e) => this.handleButtonClick(e, 'generate')}>Generate New Array</button>
          <button className=' rounded lg border-2 text-xs uppercase border-fuchsia-100 px-2' onClick={(e) => this.handleButtonClick(e, 'merge')}>MERGE SORT</button>
          <button className=' rounded lg border-2 text-xs uppercase border-fuchsia-100 px-2' onClick={(e) => this.handleButtonClick(e, 'quick')}>QUICK SORT</button>
          <button className=' rounded lg border-2 text-xs uppercase border-fuchsia-100 px-2' onClick={(e) => this.handleButtonClick(e, 'heap')}>HEAP SORT</button>
          <button className=' rounded lg border-2 text-xs uppercase border-fuchsia-100 px-2' onClick={(e) => this.handleButtonClick(e, 'stop')}>Stop Sorting</button>
          <button className=' rounded lg border-2 text-xs uppercase border-fuchsia-100 px-2' onClick={(e) => this.handleButtonClick(e, 'continue')}>Continue</button>
          <button className=' rounded lg border-2 text-xs uppercase border-fuchsia-100 px-2' onClick={(e) => this.handleButtonClick(e, 'resetSort')}>Reset</button>

        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function arrayaAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}