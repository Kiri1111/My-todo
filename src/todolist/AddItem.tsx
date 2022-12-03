import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callBack: (value: string) => void
}
export const AddItem = (props: PropsType) => {
    const [value, setValue] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onClickHandler = () => {
        props.callBack(value.trim())
        setValue('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callBack(value)
            setValue('')
        }
    }
    return (
        <div>

            <input onKeyDown={onKeyDownHandler} onChange={onChangeHandler} value={value}/>
            <button onClick={onClickHandler}>Add</button>
        </div>
    );
};

