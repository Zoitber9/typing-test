import {FunctionComponent} from 'react';

import 'src/component/ui/stats/stats.css';

import { useAppDispatch, useAppSelector } from 'src/redux/hooks/hooks.ts';
import {resetSeconds} from "src/redux/store/timerSlice.ts";
import {resetTextState, setText} from "src/redux/store/textSlice.ts";
import {restoreText} from "src/utils/charTransform.ts";
import {resetTestState, setIsTestFinished} from "src/redux/store/testSlice.ts";
import Stats from "src/component/ui/stats/stats.tsx";
import Button from "src/component/ui/button/button.tsx";
import ModalWindow from "src/component/ui/modal/modal.tsx";
import {Text} from "src/component/ui/text/text.tsx";

const Test:FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const isTestFinished = useAppSelector(state => state.testSlice.isTestFinished);
    const text = useAppSelector(state => state.textSlice.text);

    function restart() {
        dispatch(resetSeconds());
        dispatch(resetTextState());
        dispatch(setText(restoreText(text)));

        if (isTestFinished) {
            dispatch(setIsTestFinished(false));
        }
    }

    function newTest() {
        dispatch(resetTestState());
        dispatch(resetTextState());
        dispatch(resetSeconds());
    }

    return (
        <section className='test-container'>
       <Text/>
            <Stats>
                <Button
                    btnText='restart'
                    onClick={restart}
                    onFocus={(event) => event.target.blur()}
                />
                <Button
                    btnText='choose difficult'
                    onClick={newTest}
                    onFocus={(event) => event.target.blur()}
                />
            </Stats>

            {
                isTestFinished &&
                <ModalWindow title='Test completed!'>
                    <Stats />
                    <Button btnText='restart' onClick={restart}/>
                    <Button btnText='new test' onClick={newTest}/>
                </ModalWindow>
            }
        </section>
    );
};

export default Test;
