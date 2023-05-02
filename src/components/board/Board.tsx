import { useEffect, useState } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Main from '../main/Main';
import styles from './Board.module.css';
import { HOME_PAGE, mockData } from '../../data';
import Description from '../description/Desctiption';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from '../no_page_found/PageNotFound';
import Profile from '../profile/Profile';
import { TaskType } from '../../types/types';

export default function Board() {
  const initialTask: TaskType[] =
    JSON.parse(window.localStorage.getItem('task') as string) || mockData; // начальные данные из localStorage или пустой массив

  const [task, setTask] = useState(initialTask);

  useEffect(() => {
    window.localStorage.setItem('task', JSON.stringify(task));
  }, [task]);

  return (
    <BrowserRouter>
      <div className={styles.board}>
        {/* <Header task={task} /> */}
        <Header />
        <Routes>
          <Route
            path={HOME_PAGE}
            element={<Main task={task} setTask={setTask} />}
          />
          <Route
            path={`${HOME_PAGE}/tasks/:taskId`}
            element={<Description task={task} setTask={setTask} />}
          />
          <Route path={`${HOME_PAGE}/profile`} element={<Profile />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer task={task} />
      </div>
    </BrowserRouter>
  );
}
