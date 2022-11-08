import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './microtasks'
import UniversalButton from "./button/universalButton";
import UniversalInput from "./universalInput/universalInput";
import s from './map.module.css'

export type Student = {
    id: string
    name: string
    kurs: number
}

export type StudentsPropsType = {
    students: Student[]
    addStudents: (name: string) => void
    changeFilter: (value: FilterValueType) => void
    deleteStudent: (studID: string) => void
    // students: Array<Student>
}

function Map(props: StudentsPropsType) {
    let [name, setName] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)

    }

    const onClickHandler = () => {
        if (name !== '') {
            props.addStudents(name.trim())
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

    const onClick1Filter = () => {
        props.changeFilter('1');
    }
    const onClick2Filter = () => {
        props.changeFilter('2');
    }
    const onClickAllFilter = () => {
        props.changeFilter('all');
    }
    return (
        <div>
            <h1>Студенты:</h1>
            <div>
                {/*<input value={name} onChange={onchangeHandler}*/}
                {/*       onKeyPress={onKeyPressHandler}/>*/}
                <UniversalInput callBackInput={onchangeHandler}
                                value={name}
                                onKeyPress={onKeyPressHandler}
                                error={error}
                />
                <UniversalButton callBackButton={onClickHandler}
                                 title={'Добавить'}/>
                {error && <div className={s.errorMessage}>{error}</div>}
                <ul>
                    {
                        props.students.map(s => {
                            const deleteHandler = () => {
                                props.deleteStudent(s.id)
                            }
                            return <li key={s.id}>
                                <span>Name: {s.name},</span>
                                <span> Kurs: {s.kurs}</span>
                                <UniversalButton title={'Удалить'} callBackButton={deleteHandler}/>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <UniversalButton callBackButton={onClick1Filter} title={'1 Курс'}/>
                    <UniversalButton callBackButton={onClick2Filter} title={'2 Курс'}/>
                    <UniversalButton callBackButton={onClickAllFilter} title={'Все'}/>
                </div>
            </div>
        </div>
    );
}

export default Map;