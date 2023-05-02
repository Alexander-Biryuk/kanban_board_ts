import List from '../list/List';
import styles from './Main.module.css';
import { BACKLOG, READY, IN_PROGRESS, FINISHED } from '../../data';
import { useState } from 'react';
import { TaskType, MainPropsType } from '../../types/types';

export default function Main({ task, setTask }: MainPropsType) {
  const [dragItem, setDragItem] = useState<TaskType | null>(null);
  return (
    <main className={styles.main}>
      <div className={styles.main_container}>
        <List
          title={BACKLOG}
          task={task}
          setTask={setTask}
          dragItem={dragItem}
          setDragItem={setDragItem}
        />
        <List
          title={READY}
          task={task}
          setTask={setTask}
          dragItem={dragItem}
          setDragItem={setDragItem}
        />
        <List
          title={IN_PROGRESS}
          task={task}
          setTask={setTask}
          dragItem={dragItem}
          setDragItem={setDragItem}
        />
        <List
          title={FINISHED}
          task={task}
          setTask={setTask}
          dragItem={dragItem}
          setDragItem={setDragItem}
        />
      </div>
    </main>
  );
}
