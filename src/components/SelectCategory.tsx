import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryListState, categoryState } from "../atom";
import { useForm } from "react-hook-form";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fafafa;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  margin-right: 10px;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #03dac6;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  margin-right: 10px;
  width: 200px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #03dac6;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;

  &:hover {
    background-color: #357ab7;
    transform: scale(1.05);
  }

  &:active {
    background-color: #2f6b99;
  }

  &:disabled {
    background-color: #b0c4de;
    cursor: not-allowed;
  }
`;

const AddButton = styled(Button)`
  padding: 10px;
  background-color: #28a745;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #218838;
  }

  &:active {
    background-color: #1c7a30;
  }
`;

interface ICategory {
  newCategory: string;
}

const SelectCategory = () => {
  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const setCategory = useSetRecoilState(categoryState);
  const [categoryList, setCategoryList] = useRecoilState(categoryListState);
  const [isAdding, setIsAdding] = useState(false);

  const onChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value);
  };

  const onAddCategory = ({ newCategory }: ICategory) => {
    if (newCategory.trim() !== "") {
      const parsed = newCategory.toUpperCase().split(" ").join("_");

      if (categoryList[parsed] === undefined) {
        setCategoryList((prevCategories) => {
          return {
            ...prevCategories,
            [parsed]: newCategory.toUpperCase().trim(),
          };
        });
      } else {
        alert("Category already exists!");
      }
      setValue("newCategory", "");
    }
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit(onAddCategory)}>
      <Select onChange={onChange}>
        {Object.keys(categoryList).map((key) => (
          <option key={key} value={key}>
            {categoryList[key]}
          </option>
        ))}
      </Select>

      {isAdding ? (
        <>
          <Input
            type="text"
            {...register("newCategory")}
            placeholder="Enter new category"
          />
          <Button type="submit">Add Category</Button>
        </>
      ) : (
        <AddButton type="button" onClick={() => setIsAdding(true)}>
          +
        </AddButton>
      )}
    </Form>
  );
};

export default SelectCategory;
