import { atom, selector } from "recoil";

interface Category {
  [key: string]: string;
}

const categoryList: Category = {
  TO_DO: "TO DO",
  DOING: "DOING",
  DONE: "DONE",
};

export interface IToDo {
  todo: string;
  id: number;
  category: string;
}

export const toDoState = atom<IToDo[]>({
  key: "todo",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const savedTodos = localStorage.getItem("toDoState");
      if (savedTodos) {
        setSelf(JSON.parse(savedTodos));
      }

      onSet((newToDoList) => {
        localStorage.setItem("toDoState", JSON.stringify(newToDoList));
      });
    },
  ],
});

export const categoryListState = atom({
  key: "categoryList",
  default: categoryList,
  effects: [
    ({ setSelf, onSet }) => {
      const savedCategories = localStorage.getItem("categoryListState");
      if (savedCategories) {
        setSelf(JSON.parse(savedCategories));
      }

      onSet((newCategoryList) => {
        localStorage.setItem(
          "categoryListState",
          JSON.stringify(newCategoryList)
        );
      });
    },
  ],
});

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(toDoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
