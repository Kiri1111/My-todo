import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./High";
import {AddItem} from "./AddItem";
import {SpanInput} from "./Span-Input";
import s from './TodoList.module.css'

type TodoPropsType = {
    tasks: TaskType[]
    titleTodo: string
    todoListId: string
    changeFilter: (value: FilterValueType, todoListId: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    deleteTask: (todoListId: string, taskId: string) => void
    deleteTodo: (todoListId: string) => void
    addItemToTasks: (todoListId: string, value: string) => void
    updateTaskTitle: (newValue: string, todoListId: string, taskId: string) => void

}
export const TodoList = (props: TodoPropsType) => {
    const buttonAllHandler = () => {
        props.changeFilter('all', props.todoListId)
    }
    const buttonActiveHandler = () => {
        props.changeFilter('active', props.todoListId)

    }
    const buttonCompletedHandler = () => {
        props.changeFilter('completed', props.todoListId)

    }
    const deleteTodoHandler = () => {
        props.deleteTodo(props.todoListId)
    }
    const addItemToTasks = (value: string) => {
        props.addItemToTasks(props.todoListId, value)
    }

    return (
        <div>
            <div>

                <h2>{props.titleTodo}</h2>
                <button onClick={deleteTodoHandler}>X</button>
                <AddItem callBack={addItemToTasks}/>

            </div>
            {props.tasks.map(el => {
                const checkBoxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.todoListId, el.id, e.currentTarget.checked)
                }
                const deleteTaskHandler = () => {
                    props.deleteTask(props.todoListId, el.id)
                }
                const updateTaskTitleHandler = (newValue: string) => {
                    props.updateTaskTitle(newValue, props.todoListId, el.id)
                }
                return (
                    <div key={el.id}>

                        <div className={s.spanInput}>
                            <input type={"checkbox"} onChange={checkBoxOnChangeHandler} checked={el.isDone}/>
                            <SpanInput title={el.title} callBack={updateTaskTitleHandler}/>
                            <button onClick={deleteTaskHandler}>X</button>
                        </div>

                    </div>

                )
            })}
            <div>
                <button onClick={buttonAllHandler}>All</button>
                <button onClick={buttonActiveHandler}>Active</button>
                <button onClick={buttonCompletedHandler}>Completed</button>
            </div>
        </div>
    );
};

