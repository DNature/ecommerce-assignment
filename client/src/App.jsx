import React from 'react';
import './App.css';

import {
	MdEdit,
	MdDelete,
	MdCheckBoxOutlineBlank,
	MdCheckBox,
} from 'react-icons/md';

function App() {
	const prevData = {
		id: null,
		title: '',
		completed: false,
	};

	const [todo, setTodo] = React.useState([]);
	const [active, setActive] = React.useState(prevData);

	const [editing, setEditing] = React.useState(false);

	const url = 'http://127.0.0.1:8000/api/tasks/';

	function fetchData() {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setTodo(data);
			});

		console.log('Fetching...');
		setEditing(false);
	}

	React.useEffect(() => {
		fetchData();
	}, []);

	const handleChange = (e) => {
		setActive((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (editing) {
			const newUrl = `${url}${active.id}/`;

			fetch(newUrl, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(active),
			})
				.then(() => {
					setActive(prevData);
					fetchData();
				})
				.catch((e) => console.error(e));
		} else {
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(active),
			})
				.then(() => {
					setActive(prevData);
					fetchData();
				})
				.catch((e) => console.error(e));
		}
	};

	const handleEdit = (task) => {
		setActive(task);
		setEditing(true);
	};

	const handleDelete = (task) => {
		fetch(`${url}${task.id}/`, {
			method: 'DELETE',
		})
			.then(() => {
				fetchData();
			})
			.catch((e) => console.error(e));
	};

	const handleCompleted = (task) => {
		const newUrl = `${url}${task.id}/`;

		task.completed = !task.completed;

		fetch(newUrl, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(task),
		})
			.then(() => {
				setActive(prevData);
				fetchData();
			})
			.catch((e) => console.error(e));
	};

	return (
		<div className='container'>
			<div id='task-container'>
				<form onSubmit={handleSubmit} id='form'>
					<input
						type='text'
						name='title'
						id='Add task'
						onChange={handleChange}
						placeholder='Add task...'
						className='input'
						value={active.title}
					/>
				</form>

				{todo.map((task) => (
					<div
						key={task.id}
						className={`task flex-wrapper ${
							task.completed && 'task-completed'
						}`}
					>
						<div
							style={{
								flex: 10,
							}}
							onClick={() => handleCompleted(task)}
						>
							{task.completed ? (
								<MdCheckBox
									size='1.5rem'
									className='checkbox'
									style={{
										color: task.completed && '#343434',
									}}
								/>
							) : (
								<MdCheckBoxOutlineBlank size='1.5rem' className='checkbox' />
							)}
							<span
								style={{
									textDecoration: task.completed ? 'line-through' : 'none',
									color: task.completed ? '#787878' : '#CFCFCF',
								}}
							>
								{task.title}
							</span>
						</div>
						<div className='control'>
							<button
								className='btn btn-edit'
								onClick={() => {
									handleEdit(task);
								}}
							>
								<MdEdit
									size='1.5rem'
									className='edit-icon'
									style={{
										color: task.completed && '#343434',
									}}
								/>
							</button>
							<button
								onClick={() => {
									handleDelete(task);
								}}
								className='btn'
							>
								<MdDelete
									size='1.5rem'
									className='trash-icon'
									style={{
										color: task.completed && '#343434',
									}}
								/>
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
