import React, {ChangeEvent, KeyboardEvent, useState} from "react"

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

	const [title, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null) /* то есть там или строка (пробелы), или ничего не написано и пытаются добавить пустую таску (пустую строку) */
const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}

	const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addItem()
		}
	}
	const addItem = () => {
		if (title.trim() !== '' && 'kakashka') {
			props.addItem(title.trim())
			setTaskTitle('')
		} else {
			setError("Title is required")
		}
	}


	return <div>
	<input
		value={title}
		onChange={onChangeHandler}
		onKeyUp={onKeyPressHandler}
		className={error ? "error" : ""}
	/>
	<button onClick={addItem}>+</button>
	{error && <div className="error-message">{error}</div>}
</div>
}