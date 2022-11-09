import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './microtasks'
import UniversalButton from "./universalButton/universalButton";
import UniversalInput from "./universalInput/universalInput";
import s from './map.module.css'

export type Student = {
    id: string
    name: string
    kurs: number
    study: boolean
}

export type StudentsPropsType = {
    students: Student[]
    addStudents: (name: string) => void
    changeFilter: (value: FilterValueType) => void
    deleteStudent: (studID: string) => void
    filter: FilterValueType
    changeStudyStatus: (changeId: string, event: boolean) => void
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
                <UniversalInput callBackInput={onchangeHandler}
                                value={name}
                                onKeyPress={onKeyPressHandler}
                                error={error}
                />
                <UniversalButton callBackButton={onClickHandler}
                                 title={'Добавить'}
                                 name={''}
                />
                {error && <div className={s.errorMessage}>{error}</div>}
                <ul>
                    {
                        props.students.map(st => {
                            const deleteHandler = () => {
                                props.deleteStudent(st.id)
                            }
                            const checkBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStudyStatus(st.id, e.currentTarget.checked)
                            }
                            return <li key={st.id} className={st.study ? s.study : ''}>
                                <input type={"checkbox"}
                                       checked={st.study}
                                       onChange={checkBoxHandler}
                                />
                                <span>Name: {st.name},</span>
                                <span> Kurs: {st.kurs}</span>
                                <UniversalButton title={'Удалить'}
                                                 callBackButton={deleteHandler}
                                                 name={''}
                                />
                            </li>
                        })
                    }
                </ul>
                <div>
                    <UniversalButton callBackButton={onClick1Filter}
                                     title={'1 Курс'}
                                     filter={props.filter}
                                     name={'1'}
                    />
                    <UniversalButton callBackButton={onClick2Filter}
                                     title={'2 Курс'}
                                     filter={props.filter}
                                     name={'2'}
                    />
                    <UniversalButton callBackButton={onClickAllFilter}
                                     title={'Все'}
                                     filter={props.filter}
                                     name={'all'}
                    />
                </div>
            </div>
        </div>
    );
}

export default Map;