import React, {useState} from 'react';
import Map from "./map";
import MapTask from './map-task';
import TopCarsType from './map-task'
import {v1} from "uuid";

const Microtasks = () => {

    const [topCars, setTopCars] = useState([
        {id: v1(), manufacturer: 'BMW', model: 'm5cs'},
        {id: v1(), manufacturer: 'Mercedes', model: 'e63s'},
        {id: v1(), manufacturer: 'Audi', model: 'rs6'}
    ])


    const students = [
        {id: 1, name: 'Bob', age: 18},
        {id: 2, name: 'John', age: 26},
        {id: 3, name: 'Den', age: 23},
        {id: 4, name: 'Alex', age: 40},
        {id: 5, name: 'Viktor', age: 48},
        {id: 6, name: 'Rudy', age: 55},
    ]

    function delCar(callId: string) {
        let filteredCars = topCars.filter(t => t.id != callId);
        setTopCars(filteredCars)
    }


    return (
        <div>
            <Map students={students}/>
            <MapTask topCars={topCars}
                     delCar={delCar}
            />
        </div>
    );
};

export default Microtasks;