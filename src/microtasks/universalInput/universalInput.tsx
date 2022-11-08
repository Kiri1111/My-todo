import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import s from '../map.module.css'


type PropsInputType = {
    callBackInput: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void
    error: string | null
}

const UniversalInput: FC<PropsInputType> = ({callBackInput, value, onKeyPress, error}) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBackInput(e)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress(e)
    }
    return (
        <div>
            <input
                className={error ? s.error : ''}
                value={value}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
        </div>
    );
};

export default UniversalInput;