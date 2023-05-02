import styles from './List.module.css';
import Form from '../form/Form';
import { Link } from 'react-router-dom';
import { TaskType, ListPropsType } from '../../types/types';

export default function List({ title, task, setTask, dragItem, setDragItem }: ListPropsType) {
  function dragStartHandler(event: React.DragEvent<HTMLElement>, item: TaskType) {
    setDragItem(item);
    (event.target as HTMLElement).style.opacity = '0.3';
  }
  
  function dragEndHandler(event: React.DragEvent<HTMLElement>) {
    (event.target as HTMLElement).style.opacity = '1';
  }

  function dragOverHandler(event: React.DragEvent<HTMLElement>) {
    event.preventDefault();
  }

  function dropHandler(title: string) {
    handleTaskMove(title);
  }

  function handleTaskMove(title: string) {
    const updatedTask = task.map((item) => {
      if (dragItem && dragItem.id === item.id) {
        return { ...item, status: title };
      } else {
        return { ...item };
      }
    });
    setTask(updatedTask);
  }

  const list = task
    .filter((item) => item.status === title)
    .map((item) => (
      <Link key={item.id} className={styles.link} to={`tasks/${item.id}`}>
        <li
          key={item.id}
          className={styles.task_item}
          draggable
          onDragStart={(e) => dragStartHandler(e, item)}
          onDragEnd={(e) => dragEndHandler(e)}
        >
          {item.name}
        </li>
      </Link>
    ));

  return (
    <div
      className={styles.container}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={() => dropHandler(title)}
    >
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.task_list}>{list}</ul>
      <Form title={title} task={task} setTask={setTask} />
    </div>
  );
}
