import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from '../map.module.css'


type PropsInputType = {
    callBackInput: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void
    error: string | null
}

const UniversalInput = (props: PropsInputType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBackInput(e)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.onKeyPress(e)
    }
    return (
        <div>
            <input
                className={props.error ? s.error : ''}
                value={props.value}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
        </div>
    );
};

export default UniversalInput;