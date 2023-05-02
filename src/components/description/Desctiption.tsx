import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HOME_PAGE } from '../../data';
import styles from './Description.module.css';
import { DescriptionPropsType } from '../../types/types';

export default function TaskDescription({ task, setTask }: DescriptionPropsType) {
  const { taskId } = useParams();
  const [edit, setEdit] = useState(false);

  let title = '';
  let text = '';
  if (taskId && task.map((item) => item.id).includes(taskId)) {
    title = task.find((task) => task.id === taskId)?.name ?? '';
    text =
      task.find((task) => task.id === taskId)?.description ||
      'This task has no description';
  } else {
    title = `Task ${taskId} does not exist`;
    text = '';
  }

  const [newText, setNewText] = useState(text);
  const [newTitle, setNewTitle] = useState(title);

  function handleEditText() {
    setEdit((prev) => !prev);
  }

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewText(e.target.value);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(e.target.value);
  }

  function handleSave() {
    const updatedTask = task.map((item) => {
      if (item.id === taskId) {
        return { ...item, name: newTitle, description: newText };
      } else {
        return { ...item };
      }
    });
    setTask(updatedTask);
    setEdit((prev) => !prev);
  }

  function handleRemove() {
    if (window.confirm(`Delete task?`)) {
      const removeIndex = task.findIndex((item) => item.id === taskId);
      const updatedTask = [...task];
      updatedTask.splice(removeIndex, 1);
      setTask(updatedTask);
    } else {
      setEdit((prev) => !prev);
    }
  }

  return (
    <div className={styles.description}>
      <div className={styles.description_container}>
        <div className={styles.name_container}>
          {/* если есть клик по тексту, то можно редактировать */}
          {edit ? (
            <input
              className={styles.name}
              type='text'
              value={newTitle}
              onChange={handleInputChange}
            />
          ) : (
            <h2 className={styles.name} onClick={handleEditText}>
              {title}{' '}
              <span className={styles.little_prompt}>
                (click on text to edit)
              </span>
            </h2>
          )}

          <Link to={HOME_PAGE}>
            <div className={styles.x_symbol}>&#9587;</div>
          </Link>
        </div>
        {/* если есть клик по тексту, то можно редактировать */}
        {edit ? (
          <div>
            <textarea
              className={styles.textarea}
              value={newText}
              onChange={handleTextChange}
            ></textarea>
            <div className={styles.buttons_container}>
              <button className={styles.save_button} onClick={handleSave}>
                Save
              </button>
              <Link to={HOME_PAGE} className={styles.delete_button_link}>
                <button className={styles.delete_button} onClick={handleRemove}>
                  Delete
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <p className={styles.text} onClick={handleEditText}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
}
