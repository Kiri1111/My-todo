import {StudArrType} from "../microtasks";
import {v1} from "uuid";
import {Student} from "../map";

export const studentsReducer = (state: StudArrType, action: ActionsType) => {
    switch (action.type) {
        case "DELETE-STUDENT": {
            return {
                ...state,
                [action.payload.idList]: state[action.payload.idList].filter(el => el.id !== action.payload.idStud)
            }
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.payload.idList]: state[action.payload.idList].map(el => el.id === action.payload.idStud ? {
                    ...el,
                    study: action.payload.event
                } : el)
            }
        }
        case 'UPDATE-NAME-STUDENT': {
            return {
                ...state,
                [action.payload.idList]: state[action.payload.idList].map(el => el.id === action.payload.idStudent ? {
                    ...el,
                    name: action.payload.updateName
                } : el)
            }
        }
        case "ADD-STUDENT": {
            const newStudent: Student = {id: v1(), name: action.payload.newTitle, kurs: '1', study: false}
            return {...state, [action.payload.idList]: [newStudent, ...state[action.payload.idList]]}
        }
        case "UPDATE-KURS": {
            return {
                ...state,
                [action.payload.idList]: state[action.payload.idList].map(el => el.id === action.payload.idStudent ? {
                    ...el,
                    kurs: action.payload.newTitle
                } : el)
            }
        }
        case 'ADD-LIST': {
            return {...state, [action.payload.newIdList]: []}
        }
        default:
            return state
    }
}
type ActionsType =
    updateKursACType
    | addStudentACType
    | deleteStudentACType
    | changeStatusACType
    | updateNameStudentACType
    | addListACType

type deleteStudentACType = ReturnType<typeof deleteStudentAC>
export const deleteStudentAC = (idList: string, idStud: string) => {
    return {
        type: 'DELETE-STUDENT',
        payload: {
            idList,
            idStud
        }
    } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (idList: string, idStud: string, event: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            idList,
            idStud,
            event
        }
    } as const
}

type updateNameStudentACType = ReturnType<typeof updateNameStudentAC>
export const updateNameStudentAC = (idList: string, idStudent: string, updateName: string) => {
    return {
        type: 'UPDATE-NAME-STUDENT',
        payload: {
            idList,
            idStudent,
            updateName,

        }
    } as const
}

type addStudentACType = ReturnType<typeof addStudentAC>
export const addStudentAC = (idList: string, newTitle: string) => {
    return {
        type: 'ADD-STUDENT',
        payload: {
            idList,
            newTitle
        }
    } as const
}

type updateKursACType = ReturnType<typeof updateKursAC>
export const updateKursAC = (idList: string, idStudent: string, newTitle: string) => {
    return {
        type: 'UPDATE-KURS',
        payload: {
            idList,
            idStudent,
            newTitle
        }
    } as const
}
type addListACType = ReturnType<typeof addListAC>
export const addListAC = (newIdList: string) => {
    return {
        type: 'ADD-LIST',
        payload: {
            newIdList

        }
    } as const
}