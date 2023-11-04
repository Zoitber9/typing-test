import {FunctionComponent, useEffect} from 'react';

import 'src/component/ui/test/test.css'

import {useAppDispatch, useAppSelector} from 'src/redux/hooks/hooks.ts';
import {fetchText, setText, setCurrentCharIndex, increasePressingCount, setMistakes} from 'src/redux/store/textSlice.ts';
import {setIsTimerOn} from 'src/redux/store/timerSlice.ts';
import {setIsTestFinished} from 'src/redux/store/testSlice.ts';

import {getCurrentChar, compareChars} from 'src/utils/charTransform.ts';

export const Text: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const text = useAppSelector(state => state.textSlice.text);
    const isLoading = useAppSelector(state => state.textSlice.isLoading);
    const error = useAppSelector(state => state.textSlice.error);
    const currentCharIndex = useAppSelector(state => state.textSlice.currentCharIndex);
    const mistakes = useAppSelector(state => state.textSlice.mistakes);
    const pressingCount = useAppSelector(state => state.textSlice.pressingCount);
    const sentences = useAppSelector(state => state.testSlice.sentences);

    useEffect(() => {
        dispatch(fetchText(sentences));
    }, [dispatch]);

    useEffect(() => {
        const newText = getCurrentChar(text, currentCharIndex);
        dispatch(setText(newText));
    }, [dispatch]);

    useEffect(() => {
        if (pressingCount === 0 && text.length > 0) {
            dispatch(setIsTimerOn(true));
        }

        if (currentCharIndex < text.length) {
            const keyPressHandler = (event: KeyboardEvent) => {
                const [newText, newCurrentIndex, newMistakes] = compareChars(text, currentCharIndex, event.key, mistakes);

                dispatch(setCurrentCharIndex(newCurrentIndex));
                dispatch(setText(newText));
                dispatch(setMistakes(newMistakes));
                dispatch(increasePressingCount());

                if (newCurrentIndex === text.length) {
                    dispatch(setIsTimerOn(false));
                    dispatch(setIsTestFinished(true));
                }
            }

            document.addEventListener('keypress', keyPressHandler);

            return () => {
                document.removeEventListener('keypress', keyPressHandler);
            };
        }
    }, [dispatch, text]);

    return (
        <div className='test-text-wrapper'>
            {
                error &&
                <p className='error-text'>{error}</p>
            }
            {
                isLoading
                    ? <p className='test-loading-text'>Loading text...</p>
                    : <div>
                        {
                            text.map((item, index) => {
                                return (
                                    <span className={item.class} key={index}>
                    {item.char}
                    </span>
                                )
                            })
                        }
                    </div>
            }
        </div>
    );
};

