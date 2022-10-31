import styles from './TaskInput.module.css'
import { Task } from './Task'
import { PlusCircle, ClipboardText } from 'phosphor-react'

import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

interface TaskProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

const initialTasks  = [
  {
    id: uuidv4(),
    title: 'estudar',
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: 'limpar sala',
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: 'academia',
    isCompleted: true
  }
]


export function TaskInput() {

 const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')

  const createdTasks = tasks.length
  
  const completedTasks = tasks.filter(task => task.isCompleted).length
  


  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    setTasks([...tasks, {
      id: uuidv4(),
      title: newTask,
      isCompleted: false, 
    }
    ])
    setNewTask('')

    console.log(tasks, newTask);
    
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')

    setNewTask(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este Campo é obrigátorio!')
  }

  function handleChangeTask(task: any) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function deleteTask(taskId: string) {
   
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskId
    })

    setTasks(tasksWithoutDeletedOne)
  }

  return (
    <div className={styles.wrapper}>
    <form onSubmit={handleCreateNewTask} className={styles.form}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={newTask}
        onChange={handleNewTaskChange}
        onInvalid={handleNewTaskInvalid}
        required
      />
      <button type="submit">
        Criar <PlusCircle size={16} />{' '}
      </button>
    </form>

    <div className={styles.intro}>

<div className={styles.tasksStages} >
<h4 className={styles.created}>Tarefas criadas</h4>
<div className={styles.result}> {createdTasks}</div>
</div>

<div className={styles.tasksStages} >
<h4 className={styles.concluded} >Concluídas</h4>
<div className={styles.result}> { completedTasks > 0 ? completedTasks : '0'} </div>
</div>

</div>


{tasks.length > 0 ? (
  <div > 
    {tasks.map(task => {
      return (
       <Task 
       task={task}
       key={task.id}
       id={task.id}
       title={task.title}
       onDeleteTask={deleteTask}
       isCompleted={task.isCompleted}
       onChange={handleChangeTask}
       />
      )
 
    })}

  </div>
  
) : (

  <div className={styles.taskList}>
  
<ClipboardText size={56} className={styles.clipboard}  />
<p>Você ainda não tem tarefas cadastradas</p>
<span>Crie tarefas e organize seus itens a fazer</span>

</div>
)

}


</div>
  )
  }
