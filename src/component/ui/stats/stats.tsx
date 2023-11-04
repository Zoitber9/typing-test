import { FunctionComponent, useState, useEffect } from 'react';

import './stats.css';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { increaseSeconds } from '../../../redux/store/timerSlice.ts';
import {AiFillInfoCircle} from 'react-icons/ai'

import { speedCounting, accuracyCounting } from '../../../utils/statsCounting.ts';
import {Tooltip} from "react-tooltip";

type StatsProps = {
    children?: JSX.Element | JSX.Element[];
};

const Stats:FunctionComponent<StatsProps> = ( {children} ) => {
    const dispatch = useAppDispatch();
    const mistakes = useAppSelector(state => state.textSlice.mistakes);
    const pressingCount = useAppSelector(state => state.textSlice.pressingCount);
    const seconds = useAppSelector(state => state.timerSlice.seconds);
    const isTimerOn = useAppSelector(state => state.timerSlice.isTimerOn);
    const [speed, setSpeed] = useState('0.00');
    const [accuracy, setAccuracy] = useState('0.00');

    useEffect(() => {
        const correctLetters = pressingCount - mistakes;

        setAccuracy(accuracyCounting(mistakes, pressingCount));
        setSpeed(speedCounting(correctLetters, seconds));
    }, [mistakes, pressingCount, seconds]);

    useEffect(() => {
        if (isTimerOn) {
            const timer = setTimeout(() => {
                dispatch(increaseSeconds());
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isTimerOn, seconds, dispatch]);

    return (
        <div className='stats-container'>
            <div>
                <p className='mid-header uppercase-text stat-title'>speed</p>
                <div className='uppercase-text paragraph'>
                    {speed} WPM
                    <span id={'wpm'}> <AiFillInfoCircle/> </span>
                </div>
                <Tooltip anchorSelect="#wpm" place="top">
                  Words per seconds
                </Tooltip>


            </div>
            <div>
                <p className='mid-header uppercase-text stat-title'>accuracy</p>
                <p className='uppercase-text paragraph'>{accuracy} %</p>
            </div>
            {children}
        </div>
    );
};

export default Stats;