export interface TaskType {
  id: string,
  status: string,
  name: string,
  description: string
}

export interface DescriptionPropsType {
  task: TaskType[],
  setTask: React.Dispatch<React.SetStateAction<TaskType[]>>
}

export interface FooterPropsType {
  task: TaskType[];
}

export interface FormPropsType {
  title: string,
  task: TaskType[],
  setTask: React.Dispatch<React.SetStateAction<TaskType[]>>
}

export interface ListPropsType {
  title: string,
  task: TaskType[],
  setTask: React.Dispatch<React.SetStateAction<TaskType[]>>,
  dragItem: TaskType | null,
  setDragItem: React.Dispatch<React.SetStateAction<TaskType | null>>
}

export interface MainPropsType {
  task: TaskType[],
  setTask: React.Dispatch<React.SetStateAction<TaskType[]>>,
}