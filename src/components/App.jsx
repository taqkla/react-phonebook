import React, { Component } from 'react'
import Header from './header'
import Create from './create-task'
import Tasks from './tasks'
import Guess from './guess'
import Deleteall from './delete-all'
import Link from './link'
import ModalAlert from './modal'
import Name from './name'

import '../styles/App.css'

export default class App extends Component {
  state = {
    tasks: [],
    name:[],
    selectedTask: undefined
  }

  componentDidMount = () => {
    try {
        const json = localStorage.getItem('tasks')
        const json1 = localStorage.getItem('name')
        const tasks = JSON.parse(json)
        const name = JSON.parse(json1)

        if (tasks) {
            this.setState(() => ({tasks}))
        }
        if (name) {
          this.setState(() => ({tasks}))
      }
    } catch(e) {
        this.setState(() => ({selectedTask: 'Something went wrong!'}))
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
      if(prevState.tasks.length !== this.state.tasks.length) {
          const json = JSON.stringify(this.state.tasks)
          const json1 = JSON.stringify(this.state.name)
          localStorage.setItem('tasks', json)
          
      }
  }

  deleteTask = (taskTodelete) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => taskTodelete !== task),
      name: prevState.name.filter((name) => taskTodelete !== name)
    }))
  }

  whatTodo = () => {
    const randNum = Math.floor(Math.random() * this.state.tasks.length)
    const task = this.state.tasks[randNum]
    this.setState(() => ({selectedTask: task}))
  }

  deleteAll = () => {
    this.setState(() => ({tasks: []}))
    this.setState(() => ({name: []}))
  }

  closeModal = () => {
    this.setState(() => ({selectedTask: undefined}))
  }

  onSubmit = (event) => {
    event.preventDefault()
    const singletask = event.target.elements.singletask.value.trim().toLowerCase()
    const singlename = event.target.elements.singlename.value.trim().toLowerCase()
    const n ="Name:"
    const nn= " Number:"
    if(!singletask) {
        this.setState(() => ({selectedTask: 'Please enter a number'}))
    } else if(this.state.tasks.indexOf(singletask) > -1) {
        this.setState(() => ({selectedTask: 'This number already exists!'}))
    } else this.setState((prevState) => ({ tasks: [...prevState.tasks, ((n.concat(singlename)).concat(nn)).concat(singletask)] }))

    if(!singlename) {
      this.setState(() => ({selectedTask: 'Please enter a number'}))
  } else if(this.state.name.indexOf(singlename) > -1) {
      this.setState(() => ({selectedTask: 'This number already exists!'}))
  } else this.setState((prevState) => ({ name: [...prevState.name, singlename] }))
    event.target.elements.singletask.value = ''
    event.target.elements.singlename.value = ''
  }
  render() {
    return (
      <div>
        <Header />
        <Create 
        onSubmit={this.onSubmit} 
        />
        { this.state.tasks.length > 0 ?
          <Guess
            whatTodo={this.whatTodo}
          />
          : null
        }
        {
          this.state.tasks.length === 0 &&
          <div className="center-text">
            
          </div>
        }
        { this.state.tasks.length > 0 ?

          <Tasks
            tasks={this.state.tasks}
            name={this.state.name}
           
            deleteTask={this.deleteTask}
          />
          : null
        }

        {/* { this.state.name.length > 0 ?

        <Name
          
          name={this.state.name}
          deleteTask={this.deleteTask}
        />
        : null
        } */}
        { this.state.tasks.length > 0 ?
          <Deleteall
            deleteAll={this.deleteAll}
          />
          : null
        }
        <ModalAlert
            selectedTask={this.state.selectedTask}
            closeModal={this.closeModal}
        />
        <Link />
      </div>
    )
  }
}