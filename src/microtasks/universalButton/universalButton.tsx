import React, {FC} from 'react';
import {FilterValueType} from "../microtasks";
import s from '../map.module.css'


type PropsType = {
    callBackButton: () => void
    title: string
    filter?: FilterValueType
    name?: string

}
export const UniversalButton: FC<PropsType> = ({callBackButton, name, title, filter}) => {

    const onClickHandler = () => {
        callBackButton()
    }
    const classNameHandler = filter === name ? s.activeButton : s.button

    return (
        <div>
            <button className={classNameHandler}
                    name={name}
                    onClick={onClickHandler}>
                {title}

            </button>
        </div>
    );
};

