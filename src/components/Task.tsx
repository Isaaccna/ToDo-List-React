import styles from './Task.module.css'

import { Trash, Check } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { ChangeEvent } from 'react'

interface TaskProps {
  id: string
  title: string
  isCompleted: boolean
  onDeleteTask: (taskId: string) => void
  task: any
  onChange: (task: any) => void
}

export function Task({
  title,
  id,
  onDeleteTask,
  isCompleted,
  onChange,
  task
}: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id)
  }

  return (
    <div className={ isCompleted? styles.wrapperChecked: styles.wrapper}>
      <div className={styles.description}>
        <input
          type="checkbox"
          className={styles.check}
          checked={task.isCompleted}
          onChange={e => {
            onChange({
              ...task,
              isCompleted: e.target.checked
            })
          }}
        />

        <p>{title}</p>
      </div>

      <Trash onClick={handleDeleteTask} size={24} className={styles.trash} />
    </div>
  )
}
