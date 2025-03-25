import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryListState, categoryState, IToDo, toDoState } from "../atom";

interface ButtonProps {
  color?: string;
  hoverColor?: string;
}

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Text = styled.span`
  flex: 1;
  font-size: 1rem;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "hoverColor",
})<ButtonProps>`
  padding: 5px 10px;
  font-size: 0.9rem;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => props.color || "#ccc"};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#999"};
  }
`;

const ToDo = ({ todo, id }: IToDo) => {
  const [todoList, setTodoList] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const categoryList = useRecoilValue(categoryListState);

  const onDelete = (id: number) => {
    const index = todoList.findIndex((todo) => todo.id === id);
    setTodoList([...todoList.slice(0, index), ...todoList.slice(index + 1)]);
  };

  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setTodoList((prevState) => {
      const index = prevState.findIndex((list) => list.id === id);
      const newList: IToDo = {
        ...prevState[index],
        category: name,
      };
      return [
        ...prevState.slice(0, index),
        newList,
        ...prevState.slice(index + 1),
      ];
    });
  };

  return (
    <ListItem>
      <Text>{todo}</Text>
      <ButtonGroup>
        {Object.keys(categoryList)
          .filter((list) => list !== category)
          .map((key) => {
            return (
              <Button
                key={key}
                color="#03DAC6"
                hoverColor="#028c7e"
                name={key}
                onClick={onClickCategory}
              >
                {categoryList[key]}
              </Button>
            );
          })}
        <Button
          color="#FF0000"
          hoverColor="#C70000"
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </ButtonGroup>
    </ListItem>
  );
};

export default ToDo;
