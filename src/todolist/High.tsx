import React, {useState} from 'react';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {AddItem} from "./AddItem";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TasksType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const High = () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to bye', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksType>({
            [todoListId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "JS", isDone: false}
            ],
            [todoListId2]: [
                {id: v1(), title: "Beer", isDone: false},
                {id: v1(), title: "Milk", isDone: true}
            ]
        }
    )
    const changeFilter = (value: FilterValueType, todoListId: string) => {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, filter: value} : el))
    }
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }
    const deleteTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskId)})
    }
    const deleteTodo = (todoListId: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoListId))
    }
    const addItemToTasks = (todoListId: string, value: string) => {
        const newTask = {id: v1(), title: value, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const addItemToTodo = (value: string) => {
        const newId = v1()
        const newTodo = {id: newId, title: value, filter: 'all'}
        setTodoLists([newTodo, ...todoLists])
        setTasks({[newId]: [], ...tasks})
    }
    const updateTaskTitle = (newValue: string, todoListId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, title: newValue} : el)
        })
    }
    return (

        <div>
            <AddItem callBack={addItemToTodo}/>
            {todoLists.map(el => {
                let allTasks = tasks[el.id]
                let tasksForTodoList = allTasks
                if (el.filter == 'active') {
                    tasksForTodoList = allTasks.filter(t => !t.isDone)
                }
                if (el.filter === 'completed') {
                    tasksForTodoList = allTasks.filter(t => t.isDone)
                }
                return (
                    <div>

                        <TodoList
                            key={el.id}
                            todoListId={el.id}
                            tasks={tasksForTodoList}
                            titleTodo={el.title}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}
                            deleteTask={deleteTask}
                            deleteTodo={deleteTodo}
                            addItemToTasks={addItemToTasks}
                            updateTaskTitle={updateTaskTitle}

                        />
                    </div>)
            })}


        </div>
    );
};

