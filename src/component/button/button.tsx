import {FunctionComponent, ComponentPropsWithoutRef} from 'react';
import clsx from 'clsx';
import s from './button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    btnText: string;
}

const Button: FunctionComponent<ButtonProps> = ({btnText, ...props}) => {


    return (
        <button
            className={clsx(s.uppercaseText, s.baseButton, s.darkButton)}
            {...props}
        >
            {btnText}
        </button>
    );
};

export default Button;