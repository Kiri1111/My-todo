import React, {ChangeEvent, useState} from 'react';

type SpanInputPropsType = {
    callBack: (updatedName: string) => void
    name: any
    title?: string

}
export const SpanInput = (props: SpanInputPropsType) => {
    const [edit, setEdit] = useState(true)
    const [updatedName, setUpdateName] = useState(props.name)

    const onDoubleClickHandler = () => setEdit(!edit)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setUpdateName(e.currentTarget.value)

    const onBlurHandler = () => {
        props.callBack(updatedName)
        setEdit(!edit)
    }
    return (
        edit ?
            <span onDoubleClick={onDoubleClickHandler}>{props.title}{props.name},</span>
            : <input onChange={onChangeHandler} value={updatedName} onBlur={onBlurHandler} autoFocus/>
    );
};

