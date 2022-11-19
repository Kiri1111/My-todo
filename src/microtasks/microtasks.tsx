import React, {useState} from 'react';
import Map from "./map";
import {v1} from "uuid";
import {Student} from "./map";
import s from './microtask.module.css'
import {AddItemForm} from "./AddItemForm/AddItemForm";

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
        // {id: listId1, title: 'Студенты', filter: 'all'},
        // {id: listId2, title: 'Абитуриенты', filter: 'all'},
    ])
    let [students, setStudents] = useState<StudArrType>({
        [listId1]: [
            // {id: v1(), name: 'Bob', kurs: '2', study: true},
            // {id: v1(), name: 'John', kurs: '2', study: true},
            // {id: v1(), name: 'Den', kurs: '1', study: false},
        ],
        [listId2]: [
            // {id: v1(), name: 'Bob', kurs: '2', study: true},
            // {id: v1(), name: 'John', kurs: '2', study: true},
            // {id: v1(), name: 'Den', kurs: '1', study: false},

        ]
    })
//     <script>   Глубокое копирование!!!!!!!!!
//     let a = {
//         name: 'Vas9n',
//         age: 22,
//         addres: {
//             city: 'Minsk',
//             street: 'Nezalezhnasti',
//             house: [{color: 'grey'}, {step: 19}]
//         }
//     }
//     let b = {...a, addres: {...a.addres, house: [...a.addres.house]}}
//     b.addres.city = 'New-york'
//     b.addres.house = ['ssssssssss']
//     // b.addres = {...a.addres}
//     // b.addres.house = [...a.addres.house]
//     b.addres.house.map(el => el)
//     b.age = 30;
//
//     console.log(a);
//     console.log(b);
//
//
// </script>
    // setStudents({...students, [listId]: [newStudent, ...students[listId]]})
    function addStudents(listId: string, name: string) {
        let newStudent = {id: v1(), name: name, kurs: '1', study: false};
        setStudents({...students, [listId]: [newStudent, ...students[listId]]})
    }

    function deleteStudent(listId: string, studID: string) {
        setStudents({...students, [listId]: students[listId].filter(s => s.id !== studID)})
    }

    function changeFilter(listsId: string, value: FilterValueType) {
        setLists(lists.map(s => s.id === listsId ? {...s, filter: value} : s))
    }

    function changeStudyStatus(listId: string, changeId: string, event: boolean) {
        const newStudents = {
            ...students, [listId]: students[listId].map(el => {
                return el.id === changeId ? {...el, study: event} : el
            })
        }
        setStudents(newStudents)
    }

    function deleteTodo(listsId: string) {
        setLists(lists.filter(el => el.id !== listsId))
    }

    function addListHandler(newName: string) {
        const newListId = v1()
        const newList: List = {id: newListId, filter: "all", title: newName}
        setLists([newList, ...lists])
        setStudents({...students, [newListId]: []})
    }

    function updateNameStudent(liId: string, listId: string, updateName: string) {
        setStudents({
            ...students,
            [listId]: students[listId].map(el => el.id === liId ? {...el, name: updateName} : el)
        })
    }

    function UpdateKurs(liId: string, listId: string, updateName: string) {
        setStudents({
            ...students,
            [listId]: students[listId].map(el => el.id === liId ? {...el, kurs: updateName} : el)
        })

    }

    function UpdateTitleLists(listId: string, updateName: string) {
        setLists(lists.map(el => el.id === listId ? {...el, title: updateName} : el))
    }

    return (
        <div className={s.listAll}>
            <AddItemForm callBack={addListHandler}/>
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
                            UpdateKurs={UpdateKurs}
                            UpdateTitleLists={UpdateTitleLists}
                        />
                    </div>
                )
            })}

        </div>
    );
};

export default Microtasks;