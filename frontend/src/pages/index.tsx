import axios from 'axios'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Todo } from '../types/Todo'

const HEADER = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': `${process.env.NEXT_PUBLIC_X_API_KEY}`,
}

type PropsTodo = {
  todo: Todo
}
type Props = {
  todos: Todo[]
}

const Home: NextPage = () => {
  useEffect(() => {
    getTasks()
  }, [])
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState([])
  const inputTask = (event: any) => {
    setTask(event.target.value)
  }

  async function getTasks() {
    try {
      const response = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tasks`,
        {
          headers: HEADER,
        },
      )
      setTodos(response.data)
    } catch (e) {
      console.log(`Error happened during getTasks()`)
    }
  }

  async function addTask() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tasks`,
        {
          title: task,
          state: 'Open',
        },
        {
          headers: HEADER,
        },
      )
      getTasks()
    } catch (e) {
      console.log(`Error happened during addTask()`)
    }
  }
  async function updateTask(todo: Todo) {
    try {
      const newState = (() => {
        if (todo.state == 'Open') {
          return 'In Progress'
        }
        if (todo.state == 'In Progress') {
          return 'Closed'
        }
        if (todo.state == 'Closed') {
          return 'Open'
        }
      })()
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tasks/${todo.id}`,
        {
          title: todo.title,
          state: newState,
        },
        {
          headers: HEADER,
        },
      )
      getTasks()
    } catch (e) {
      console.log(`Error happened during updateTask()`)
    }
  }
  async function removeTask(todo: Todo) {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tasks/${todo.id}`,
        {
          headers: HEADER,
        },
      )
      getTasks()
    } catch (e) {
      console.log(`Error happened during removeTask()`)
    }
  }

  return (
    <>
      {/* Header */}
      <div className='flex h-14 w-full items-center bg-gray-400 py-4 px-2 md:px-10'>
        <h1 className='text-2xl font-bold text-white'>Sample Todo APP</h1>
      </div>
      {/* Input */}
      <div className='m-4 flex items-center'>
        <input
          placeholder='Add new todo...'
          type='text'
          className='mr-4 w-full appearance-none rounded border py-2 px-3 shadow'
          onChange={(event) => inputTask(event)}
        />
        <button
          className='rounded border-2 p-2 text-gray-500'
          onClick={addTask}
        >
          Add
        </button>
      </div>
      {/* List */}
      <div>
        <div className='overflow-x-auto relative'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='py-3 px-6 w-1/3'>
                  Task
                </th>
                <th scope='col' className='py-3 px-6 w-1/3'>
                  Status
                </th>
                <th scope='col' className='py-3 px-6 w-1/3'>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo: Todo) => {
                return (
                  <tr
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                    key={todo.id}
                  >
                    <td
                      scope='row'
                      className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                    >
                      {todo.title}
                    </td>
                    <td className='py-4 px-6'>
                      <button
                        className='rounded border-2 p-2 text-gray-500'
                        onClick={() => updateTask(todo)}
                      >
                        {todo.state}
                      </button>
                    </td>
                    <td className='py-4 px-6'>
                      <button
                        className='rounded border-2 p-2 text-gray-500'
                        onClick={() => removeTask(todo)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home
