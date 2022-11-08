import React, {useState} from 'react';
import Map from "./map";
import {v1} from "uuid";


export type FilterValueType = 'all' | '1' | '2'

const Microtasks = () => {

    let [students, setStudents] = useState([
        {id: v1(), name: 'Bob', kurs: 2},
        {id: v1(), name: 'John', kurs: 2},
        {id: v1(), name: 'Den', kurs: 1},
        {id: v1(), name: 'Alex', kurs: 2},
        {id: v1(), name: 'Viktor', kurs: 2},
        {id: v1(), name: 'Rudy', kurs: 1},
    ])

    function addStudents(name: string) {
        let student = {id: v1(), name: name, kurs: 1}
        setStudents([student, ...students])
    }

    function deleteStudent(studID: string) {
        let filteredStudents = students.filter(st => st.id !== studID)
        setStudents(filteredStudents)
    }

    let [filter, setFilter] = useState<FilterValueType>('all')
    let studentsFiltered = students;
    if (filter === '1') {
        studentsFiltered = studentsFiltered.filter(st => st.kurs === 1);
    }
    if (filter === '2') {
        studentsFiltered = studentsFiltered.filter(st => st.kurs === 2);
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    }

    return (
        <div>
            <Map students={studentsFiltered}
                 addStudents={addStudents}
                 changeFilter={changeFilter}
                 deleteStudent={deleteStudent}
            />
        </div>
    );
};

export default Microtasks;