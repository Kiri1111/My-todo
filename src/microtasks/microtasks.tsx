import React, {useState} from 'react';
import Map from "./map";
import {v1} from "uuid";
import {Student} from "./map";
import s from './microtask.module.css'

export type FilterValueType = 'all' | '1' | '2'
type List = {
    id: string
    title: string
    filter: FilterValueType
}
type StudArrType = {
    [key: string]: Student[]
}

let listId1 = v1()
let listId2 = v1()

type ListsType = Array<List>
const Microtasks = () => {
    let [lists, setLists] = useState<ListsType>([
        {id: listId1, title: 'Студенты', filter: 'all'},
        {id: listId2, title: 'Абитуриенты', filter: '1'},
    ])
    let [students, setStudents] = useState<StudArrType>({
        [listId1]: [
            {id: v1(), name: 'Bob', kurs: 2, study: true},
            {id: v1(), name: 'John', kurs: 2, study: true},
            {id: v1(), name: 'Den', kurs: 1, study: false},
            {id: v1(), name: 'Alex', kurs: 2, study: true},
            {id: v1(), name: 'Viktor', kurs: 2, study: true},
            {id: v1(), name: 'Rudy', kurs: 1, study: true}
        ],
        [listId2]: [
            {id: v1(), name: 'Bob', kurs: 2, study: true},
            {id: v1(), name: 'John', kurs: 2, study: true},
            {id: v1(), name: 'Den', kurs: 1, study: false},
            {id: v1(), name: 'Alex', kurs: 2, study: true},
            {id: v1(), name: 'Viktor', kurs: 2, study: true},
            {id: v1(), name: 'Rudy', kurs: 1, study: true}
        ]
    })

    function addStudents(listId: string, name: string) {
        let newStudent = {id: v1(), name: name, kurs: 1, study: false};
        // setStudents([student, ...students])
        setStudents({...students, [listId]: [newStudent, ...students[listId]]})
    }

    function deleteStudent(listId: string, studID: string) {
        // let filteredStudents = students.filter(st => st.id !== studID)
        // setStudents(filteredStudents)
        setStudents({...students, [listId]: students[listId].filter(s => s.id !== studID)})
    }

    function changeFilter(listsId: string, value: FilterValueType) {
        // setFilter(value);
        setLists(lists.map(s => s.id === listsId ? {...s, filter: value} : s))
    }

    function changeStudyStatus(listId: string, changeId: string, event: boolean) {
        // setStudents(students.map(st => st.id === changeId ? {...st, study: event} : st))
        const newStudents = {
            ...students, [listId]: students[listId].map(el => {
                return el.id === changeId ? {...el, study: event} : el
            })
        }
        debugger
        setStudents(newStudents)
    }

    function deleteTodo(listsId: string) {
        setLists(lists.filter(el => el.id !== listsId))
    }

    return (
        <div className={s.listAll}>
            {lists.map(ls => {
                let studentsFiltered = students[ls.id];
                if (ls.filter === '1') {
                    studentsFiltered = students[ls.id].filter(st => st.kurs === 1);
                }
                if (ls.filter === '2') {
                    studentsFiltered = students[ls.id].filter(st => st.kurs === 2);
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
                        />
                    </div>
                )
            })}

        </div>
    );
};

export default Microtasks;