import {FunctionComponent} from 'react';

import s from './modal.module.css';
import clsx from "clsx";

type ModalWindowProps = {
    children: JSX.Element | JSX.Element[];
    title: string;
};

const ModalWindow: FunctionComponent<ModalWindowProps> = ({children, title}) => {
    return (
        <div className={s.modalWindowBlackout}>
            <div className={s.modalWindow}>
                <h2 className={clsx(s.bigHeader, s.modalWindowText)}>
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;