import React from 'react';
import s from './map.module.css'


export type TopCarsType = {
    topCars: CarType[]
    delCar: (callId: string) => void
}
type CarType = {
    manufacturer: string
    model: string
    id: string
}
const MapTask = (props: TopCarsType) => {


    return (
        <div>
            <hr/>
            <h1>Cars</h1>
            <tr>
                {
                    props.topCars.map(t => {

                        const deleteCarHandler = () => props.delCar(t.id)

                        return <td key={t.id} className={s.cars}>
                            <div className={s.manufacturer}> {t.manufacturer} </div>
                            <div className={s.model}>{t.model}</div>
                            <button onClick={deleteCarHandler}>Delete</button>
                        </td>
                    })
                }

            </tr>

        </div>

    );
};

export default MapTask;