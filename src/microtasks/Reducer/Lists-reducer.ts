import {FilterValueType, ListType} from "../microtasks";

export const listsReducer = (state: ListType[], action: ActionsType): ListType[] => {
    switch (action.type) {
        case "DELETE-LIST": {
            return state.filter(el => el.id !== action.payload.idList)
        }
        case 'CHANGE-FILTER': {
            return state.map(el => el.id === action.payload.idList ? {...el, filter: action.payload.value} : el)
        }
        case 'UPDATE-TITLE-LIST': {
            return state.map(el => el.id === action.payload.idList ? {...el, title: action.payload.updateName} : el)
        }
        case "ADD-LIST": {
            const newList: ListType = {id: action.payload.newIdList, title: action.payload.newTitle, filter: 'all'}
            return [newList, ...state]
        }

        default:
            return state
    }
}
type ActionsType = addListACType | deleteListACType | changeFilterACType | updateTitleListsACType

type deleteListACType = ReturnType<typeof deleteListAC>
export const deleteListAC = (idList: string) => {
    return {
        type: 'DELETE-LIST',
        payload: {
            idList
        }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (idList: string, value: FilterValueType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            idList,
            value
        }
    } as const
}

type updateTitleListsACType = ReturnType<typeof updateTitleListsAC>
export const updateTitleListsAC = (idList: string, updateName: string) => {
    return {
        type: 'UPDATE-TITLE-LIST',
        payload: {
            idList,
            updateName
        }
    } as const
}

type addListACType = ReturnType<typeof addListAC>
export const addListAC = (newIdList: string, newTitle: string) => {
    return {
        type: 'ADD-LIST',
        payload: {
            newIdList,
            newTitle
        }
    } as const
}
