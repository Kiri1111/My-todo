import React from 'react';

type Student = {
    id: number
    name: string
    age: number
}

type StudentsPropsType = {
    students: Student[]
    // students: Array<Student>
}

const Map = (props: StudentsPropsType) => {

    return (
        <div>
            <h1>Students</h1>
            <div>
                <ul>
                    {props.students.map((s) => {
                        return (
                            <li key={s.id}>
                                <span>{s.name}</span>
                                <span> age:{s.age}</span>
                            </li>
                        )
                    })}

                </ul>
            </div>
        </div>
    );
};

export default Map;