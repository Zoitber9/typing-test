import { FunctionComponent } from 'react';

import './styles/typography.css';

import { useAppSelector, useAppDispatch } from './redux/hooks';
import { setIsTestStarted, setSentences } from './redux/store/testSlice';


import Test from './component/test/test.tsx';
import ModalWindow from './component/ui/modal/modal.tsx';
import Button from './component/ui/button/button.tsx';

const App:FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isTestStarted = useAppSelector(state => state.testSlice.isTestStarted);

  const testStateToggler = () => dispatch(setIsTestStarted(true));

  return (
      <>
        <main className='container main'>
          {
            isTestStarted
                ? <Test />
                : <ModalWindow title='Take a typing test'>
                  <Button btnText='start' onClick={testStateToggler} />
                </ModalWindow>
          }
        </main>

      </>
  );
};

export default App;