import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './microtasks'
import {UniversalButton} from "./universalButton/universalButton";
import UniversalInput from "./universalInput/universalInput";
import sMap from './map.module.css'

export type Student = {
    id: string
    name: string
    kurs: number
    study: boolean
}

export type StudentsPropsType = {
    deleteTodo: (listsId: string) => void
    listsId: string
    title: string
    students: Student[]
    addStudents: (listId: string, name: string) => void
    changeFilter: (listId: string, value: FilterValueType) => void
    deleteStudent: (studID: string, listId: string) => void
    filter: FilterValueType
    changeStudyStatus: (listId: string, changeId: string, event: boolean) => void
    // students: Array<Student>

    //bla: (param1: number, param2: boolean, param3: string) => void
}

function Map(props: StudentsPropsType) {
    let [name, setName] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)

    }

    const onClickHandler = () => {
        if (name !== '') {
            props.addStudents(props.listsId, name.trim())
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
        props.changeFilter(props.listsId, '1');
    }
    const onClick2Filter = () => {
        props.changeFilter(props.listsId, '2');
    }
    const onClickAllFilter = () => {
        props.changeFilter(props.listsId, 'all');
    }

    const deleteTodoHandler = () => {
        props.deleteTodo(props.listsId)
    }
    return (
        <div className={sMap.map}>
            <h1>
                {props.title}
                <UniversalButton callBackButton={deleteTodoHandler} title={'Удалить'} name={''}/>
            </h1>
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
                {error && <div className={sMap.errorMessage}>{error}</div>}
                <ul className={sMap.ul}>
                    {
                        props.students.map(st => {
                            const deleteHandler = () => {
                                props.deleteStudent(props.listsId, st.id)
                            }
                            const checkBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                debugger
                                props.changeStudyStatus(props.listsId, st.id, e.currentTarget.checked)
                            }
                            return <li key={st.id} className={st.study ? sMap.study : ''}>
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