import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack: (newValue: string) => void
}


export const SpanInput = (props: PropsType) => {
    const [edit, setEdit] = useState(true)
    const [newValue, setNewValue] = useState(props.title)
    const onDoubleClickHandler = () => {
        setEdit(!edit)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        props.callBack(newValue)
        setEdit(!edit)
    }
    return (
        <div>
            {edit
                ? <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
                : <input value={newValue} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>}
        </div>
    );
};

