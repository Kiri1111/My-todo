import React from 'react';
import Map from "./map";

const Microtasks = () => {

    const students = [
        {id: 1, name: 'Bob', age: 18},
        {id: 2, name: 'John', age: 26},
        {id: 3, name: 'Den', age: 23},
        {id: 4, name: 'Alex', age: 4},
        {id: 5, name: 'Viktor', age: 48},
    ]


    return (
        <div>
            <Map students={students}/>
        </div>
    );
};

export default Microtasks;