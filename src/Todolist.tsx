import { title } from "process";
import {FilterValuesType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import { AddItemForm } from "./AddItemForm";


export type TaskType = {
	id: string
	title: string
	isDone: boolean
}


type PropsType = {
	id: string
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

/* 	const addTask = () => {
		if (title.trim() === '') {
			return;
		}
		props.addTask(title.trim())
		setTaskTitle('')
	} */

	/* const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter)
	} */


		const onAllClickHandler = () => props.changeFilter("all", props.id)
		const onActiveClickHandler = () => props.changeFilter("active", props.id)
		const onCompletedClickHandler = () => props.changeFilter("completed", props.id)


		const removeTodolist = () => {
			props.removeTodolist(props.id)
		}

		const addTask = (title: string) => {
			props.addTask(title, props.id)
		}

	return (
		<div>
			<h3>{props.title} <button onClick={removeTodolist}>x</button></h3> 
			<AddItemForm addItem={addTask} />
			<ul>
				{
					props.tasks.map(t => {
						const onClickHandler = () => props.removeTask(t.id, props.id)
						/* const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {console.log(t.id + e.currentTarget.checked)} /* for each input - for each todolist this action with input is individual. */ 
						const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeTaskStatus(t.id, e.currentTarget.checked, props.id) /* nado peredat taskId and isDone in changeTaskStatus(+++) */
						} /* for each input - for each todolist this action with input is individual. */

						return <li key={t.id} className={t.isDone === true ? "isDone" : ""}>
							<input type="checkbox"
								onChange={onChangeHandler}
								checked={t.isDone}/>
							<span>{t.title}</span>
							<button onClick={onClickHandler}>x</button>
						</li>
					})
				}
			</ul>
			<div>
				<button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
				<button className={props.filter === 'active' ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
				<button className={props.filter === 'completed' ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
			</div>
		</div>
	)
}