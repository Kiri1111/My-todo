import React, {useReducer, useState} from 'react';
import Map from "./map";
import {v1} from "uuid";
import {Student} from "./map";
import s from './microtask.module.css'
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {addListAC, changeFilterAC, deleteListAC, listsReducer, updateTitleListsAC} from "./Reducer/Lists-reducer";
import {
    addStudentAC,
    changeStatusAC,
    deleteStudentAC,
    studentsReducer, updateKursAC,
    updateNameStudentAC
} from "./Reducer/Students-reducer";

export type FilterValueType = 'all' | '1' | '2'
export type ListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type StudArrType = {
    [key: string]: Array<Student>
}

let listId1 = v1()
let listId2 = v1()

const Microtasks = () => {
    let [lists, dispatchLists] = useReducer(listsReducer, [
        // {id: listId1, title: 'Студенты', filter: 'all'},
        // {id: listId2, title: 'Абитуриенты', filter: 'all'},
    ])
    let [students, dispatchStudents] = useReducer(studentsReducer, {
        // [listId1]: [
        //     {id: v1(), name: 'Bob', kurs: '2', study: true},
        //     {id: v1(), name: 'John', kurs: '2', study: true},
        //     {id: v1(), name: 'Den', kurs: '1', study: false},
        // ],
        // [listId2]: [
        //     {id: v1(), name: 'Bob', kurs: '2', study: true},
        //     {id: v1(), name: 'John', kurs: '2', study: true},
        //     {id: v1(), name: 'Den', kurs: '1', study: false},
        //
        // ]
    })

    function addStudents(listId: string, name: string) {
        dispatchStudents(addStudentAC(listId, name))
    }

    function deleteStudent(listId: string, studID: string) {
        dispatchStudents(deleteStudentAC(listId, studID))
    }

    function changeFilter(listsId: string, value: FilterValueType) {
        // setLists(lists.map(s => s.id === listsId ? {...s, filter: value} : s))
        dispatchLists(changeFilterAC(listsId, value))
    }

    function changeStudyStatus(listId: string, changeId: string, event: boolean) {
        // const newStudents = {
        //     ...students, [listId]: students[listId].map(el => {
        //         return el.id === changeId ? {...el, study: event} : el
        //     })
        // }
        // setStudents(newStudents)
        dispatchStudents(changeStatusAC(listId, changeId, event))
    }

    function deleteTodo(listsId: string) {
        // setLists(lists.filter(el => el.id !== listsId))
        dispatchLists(deleteListAC(listsId))
    }

    function addListHandler(newName: string) {
        const newListId = v1()
        // const newList: ListType = {id: newListId, filter: "all", title: newName}
        // setLists([newList, ...lists])
        // setStudents({...students, [newListId]: []})
        dispatchLists(addListAC(newListId, newName))
        dispatchStudents(addListAC(newListId, newName))
    }

    function updateNameStudent(liId: string, listId: string, updateName: string) {
        // setStudents({
        //     ...students,
        //     [listId]: students[listId].map(el => el.id === liId ? {...el, name: updateName} : el)
        // })
        dispatchStudents(updateNameStudentAC(listId, liId, updateName))
    }

    function updateKurs(liId: string, listId: string, updateName: string) {
        // setStudents({
        //     ...students,
        //     [listId]: students[listId].map(el => el.id === liId ? {...el, kurs: updateName} : el)
        // })
        dispatchStudents(updateKursAC(listId, liId, updateName))
    }

    function updateTitleLists(listId: string, updateName: string) {
        // setLists(lists.map(el => el.id === listId ? {...el, title: updateName} : el))
        dispatchLists(updateTitleListsAC(listId, updateName))
    }

    return (
        <div className={s.listAll}>
            <div className={s.addList}>
                <AddItemForm callBack={addListHandler}/>
            </div>
            {lists.map(ls => {
                let studentsFiltered = students[ls.id];
                if (ls.filter === '1') {
                    studentsFiltered = students[ls.id].filter(st => st.study);
                }
                if (ls.filter === '2') {
                    studentsFiltered = students[ls.id].filter(st => st.study === false);
                }

                return (
                    <div>
                        <Map
                            deleteTodo={deleteTodo}
                            listsId={ls.id}
                            key={ls.id}
                            title={ls.title}
                            students={studentsFiltered}
                            addStudents={addStudents}
                            changeFilter={changeFilter}
                            deleteStudent={deleteStudent}
                            filter={ls.filter}
                            changeStudyStatus={changeStudyStatus}
                            updateNameStudent={updateNameStudent}
                            UpdateKurs={updateKurs}
                            UpdateTitleLists={updateTitleLists}
                        />
                    </div>
                )
            })}

        </div>
    );
};

export default Microtasks;