import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import sMap from "../map.module.css";

type AddItemFormPropsType = {
    callBack: (newName: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    let [name, setName] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const onClickHandler = () => {
        if (name.trim() !== '') {
            props.callBack(name)
            setName('')
        } else {
            setError('Введите имя!')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            onClickHandler()
        }
    }

    return (
        <div>
            <input
                value={name}
                onChange={onchangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? sMap.error : sMap.input}
            />
            <button className={sMap.button} onClick={onClickHandler}>добавить</button>
            {error && <div className={sMap.errorMessage}>{error}</div>}
        </div>
    );
};

