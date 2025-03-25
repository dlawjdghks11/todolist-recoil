import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, IToDo, toDoState } from "../atom";

interface IForm {
  todo: string;
}

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #03dac6;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #03dac6;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #028c7e;
  }
`;

const CreateToDo = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDoList = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const handleValid = ({ todo }: IForm) => {
    setToDoList((prev) => {
      const newTodo: IToDo = {
        todo,
        id: Date.now(),
        category,
      };
      return [newTodo, ...prev];
    });
    setValue("todo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("todo", { required: true })}
        placeholder="Add a new task..."
      />
      <Button>Add</Button>
    </Form>
  );
};

export default CreateToDo;
