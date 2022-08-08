import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Back from "../Images/flower.jpg"
import Edit from "../Images/edit.png"
import Delete from "../Images/delete.png"
import Comment from "../Images/comment.png"
import axios from "axios"

const Container = styled.div`
  width: 100%;
  min-height: 92vh;
  background-image: url(${Back});
  background-position: center top;
  background-size: cover;
  padding: 20px;
`
const Wrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
`
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
`
const TodoList = styled.ul`
  text-align: center;
  margin-top: 30px;
  list-style: none;
`
const List = styled.li`
  width: 550px;
  height: 70px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Box = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid orange;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 60px;
`
const AddItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
`
const Change = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  margin-left: 10px;
  cursor: pointer;
`
const Add = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  background-color: white;
  color: orange;
  font-size: 1.5rem;
  font-weight: 500;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: orange;
  }
`
const AddInput = styled.input`
  height: 48px;
  width: 250px;
  padding-left: 20px;
  border: none;
  font-size: 1.5rem;
`
const Last = styled.div`
  margin-left: 80px;
  display: flex;
`
const Initial = styled.div`
  display: flex;
  flex-direction: column;
`
const Span = styled.div`
  font-size: 1.8;
  font-weight: 500;
`

function Home() {
  const [todo, setTodo] = useState([])
  useEffect(() => {
    const getTodo = async () => {
      const res = await axios.get("http://localhost:4000/api/todo")
      setTodo(res.data)
    }
    getTodo()
  }, [])

  const [IsComplete, setIsComplete] = useState(true)

  return (
    <Container>
      <Wrapper>
        <Title>Todo App</Title>
        <TodoList>
          {todo.map((item) => {
            return (
              <List key={item._id}>
                <Box
                  onClick={() => {
                    IsComplete ? setIsComplete(false) : setIsComplete(true)
                    console.log(IsComplete)
                  }}
                  style={{ backgroundColor: IsComplete && "orange" }}
                ></Box>
                <Initial>
                  <Span>{item.heading}</Span>
                  <Span style={{ fontSize: "0.7rem" }}>{item.description}</Span>
                </Initial>

                <Last>
                  <Change src={Comment} />
                  <Change src={Edit} />
                  <Change src={Delete} />
                </Last>
              </List>
            )
          })}
        </TodoList>
        <AddItem>
          <Add>+</Add>
          <AddInput type="text" placeholder="Add New Item" />
          <Add style={{ marginLeft: "10px", fontSize: "1rem" }}>Add</Add>
        </AddItem>
      </Wrapper>
    </Container>
  )
}

export default Home
