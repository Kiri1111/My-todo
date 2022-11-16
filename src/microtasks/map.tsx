import React, {ChangeEvent} from 'react';
import {FilterValueType} from './microtasks'
import {UniversalButton} from "./universalButton/universalButton";
import sMap from './map.module.css'
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {SpanInput} from "./SpanInput/SpanInput";

export type Student = {
    id: string
    name: string
    kurs: string
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
    updateNameStudent: (liId: string, listId: string, updatedName: string) => void
    UpdateKurs: (liId: string, listId: string, updateName: string) => void
    UpdateTitleLists: (listId: string, updateName: string) => void
}

function Map(props: StudentsPropsType) {

    const onClick1Filter = () => props.changeFilter(props.listsId, '1')
    const onClick2Filter = () => props.changeFilter(props.listsId, '2')
    const onClickAllFilter = () => props.changeFilter(props.listsId, 'all');
    const deleteTodoHandler = () => props.deleteTodo(props.listsId)
    const addStudentHandler = (newName: string) => props.addStudents(props.listsId, newName)
    const updateTitleListsHandler = (updateName: string) => {
        props.UpdateTitleLists(props.listsId, updateName)
    }
    return (
        <div className={sMap.map}>
            <h1>
                <SpanInput callBack={updateTitleListsHandler} name={props.title}/>
                <UniversalButton callBackButton={deleteTodoHandler} title={'Удалить'} name={''}/>
            </h1>
            <div>
                <AddItemForm callBack={addStudentHandler}/>

                <ul className={sMap.ul}>
                    {
                        props.students.map(st => {
                            const deleteHandler = () => props.deleteStudent(props.listsId, st.id)
                            const checkBoxHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStudyStatus(props.listsId, st.id, e.currentTarget.checked)
                            const updateNameHandler = (updatedName: string) => {
                                props.updateNameStudent(st.id, props.listsId, updatedName)
                            }
                            const updateKursHandler = (updateName: string) => {
                                props.UpdateKurs(st.id, props.listsId, updateName)
                            }
                            return <li key={st.id} className={st.study ? sMap.study : ''}>
                                <input type={"checkbox"}
                                       checked={st.study}
                                       onChange={checkBoxHandler}
                                />
                                {/*<span>Name: {st.name},</span>*/}
                                <SpanInput name={st.name} callBack={updateNameHandler} title={' Название: '}/>
                                <SpanInput callBack={updateKursHandler} name={st.kurs} title={' Кол-во: '}/>
                                <UniversalButton title={'Удалить'}
                                                 callBackButton={deleteHandler}
                                                 name={''}
                                />
                            </li>
                        })
                    }
                </ul>
                <div className={sMap.filter}>
                    <UniversalButton callBackButton={onClick1Filter}
                                     title={'Готово'}
                                     filter={props.filter}
                                     name={'1'}
                    />
                    <UniversalButton callBackButton={onClick2Filter}
                                     title={'Не готово'}
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