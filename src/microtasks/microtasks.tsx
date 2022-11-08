import React, {useState} from 'react';
import Map from "./map";
import {v1} from "uuid";


export type FilterValueType = 'all' | '1' | '2'

const Microtasks = () => {

    let [students, setStudents] = useState([
        {id: v1(), name: 'Bob', kurs: 2, study: true},
        {id: v1(), name: 'John', kurs: 2, study: true},
        {id: v1(), name: 'Den', kurs: 1, study: false},
        {id: v1(), name: 'Alex', kurs: 2, study: true},
        {id: v1(), name: 'Viktor', kurs: 2, study: true},
        {id: v1(), name: 'Rudy', kurs: 1, study: true},
    ])

    function addStudents(name: string) {
        let student = {id: v1(), name: name, kurs: 1, study: false}
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

    function changeStudyStatus(changeId: string, event: boolean) {
        setStudents(students.map(st => st.id === changeId ? {...st, study: event} : st))

    }

    return (
        <div>
            <Map students={studentsFiltered}
                 addStudents={addStudents}
                 changeFilter={changeFilter}
                 deleteStudent={deleteStudent}
                 filter={filter}
                 changeStudyStatus={changeStudyStatus}
            />
        </div>
    );
};

export default Microtasks;