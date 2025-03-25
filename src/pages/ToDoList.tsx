import styled from "styled-components";
import { useRecoilValue } from "recoil";
import CreateToDo from "../components/CreateToDo";
import ToDo from "../components/ToDo";
import SelectCategory from "../components/SelectCategory";
import { toDoSelector } from "../atom";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
`;

const ToDoList = () => {
  const currentList = useRecoilValue(toDoSelector);
  return (
    <Container>
      <Title>To Do List</Title>
      <Divider />
      <SelectCategory />
      <CreateToDo />
      <ul>
        {currentList.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </Container>
  );
};

export default ToDoList;
