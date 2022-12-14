// Importing some dependencies
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Back from "../Images/car.jpg"
import Edit from "../Images/edit.png"
import Delete from "../Images/delete.png"
import axios from "axios"

// CSS styled components section
const Container = styled.div`
  width: 100%;
  min-height: 92vh;
  background-image: url(${Back});
  background-position: center;
  background-size: cover;
  padding: 20px;
  position: relative;
`

const Cancel = styled.button`
  position: absolute;
  top: 20%;
  left: 20%;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: transparent;
  font-size: 2rem;
  font-weight: 200;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  &:hover {
    background-color: white;
    cursor: pointer;
    color: crimson;
  }
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
  background-color: ${(props) => props.Isc && "orange"};
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
  border-radius: ${(props) => props.Dsp && "50%"};
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: orange;
  }
`
const Post = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  background-color: white;
  color: orange;
  font-size: 1.5rem;
  font-weight: 500;
  margin-right: 5px;
  display: ${(props) => props.Dsp && "none"};
  transition: display 2s ease;
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
  font-size: 1.3rem;
  display: ${(props) => props.Dsp && "none"};
  transition: display 2s ease;
  margin-right: 5px;
`
const AddDesc = styled.input`
  height: 48px;
  width: 250px;
  padding-left: 20px;
  border: none;
  font-size: 0.8rem;
  display: ${(props) => props.Dsp && "none"};
  transition: display 2s ease;
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
const Trigger = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100%;
  background-color: grey;
  opacity: 0.85;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: top;
  flex-direction: column;
`

// Main App Start Here
function Home() {
  // state management
  const [todo, setTodo] = useState([])
  const [addNew, setAddNew] = useState(true)
  const [update, setUpdate] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [updatedTitle, setUpdatedTitle] = useState("")
  const [updatedDesc, setUpdatedDesc] = useState("")
  const [updateId, setUpdateId] = useState("")
  // functions and declearations
  useEffect(() => {
    const getTodo = async () => {
      const res = await axios.get("http://localhost:4000/api/todo")
      setTodo(res.data)
    }
    getTodo()
  }, [todo])

  // Toggling my Todo between complete and incomplete
  const handleComplete = async (id) => {
    const Data = await axios.put("http://localhost:4000/api/complete/" + id)

    setTodo(
      todo.map((item) => {
        if (item._id === Data.data._id) {
          item.isComplete = Data.data.isComplete
        }

        return item
      })
    )
  }

  // Creating a new Todo item
  const handlePost = async () => {
    if (title && description) {
      await axios
        .post("http://localhost:4000/api/new", { heading: title, description: description })
        .then(() => {
          setTitle("")
          setDescription("")
          setTodo(todo)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      alert("Kindly provide the necessary details")
    }
  }

  // Deleting a todo item from the list of Todo.
  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:4000/api/delete/" + id)
      .then(() => {
        setTodo(todo)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Updating a Todo from the list of available todo's
  const handleUpdate = async (newID) => {
    console.log(newID)
    if (updatedTitle && updatedDesc) {
      await axios
        .put("http://localhost:4000/api/update/" + newID, { heading: updatedTitle, description: updatedDesc })
        .then(() => {
          setTodo(todo)
          setUpdate(false)
          setUpdatedTitle("")
          setUpdatedDesc("")
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      alert("kindly provide both title description")
    }
  }

  // Out Todo apllication render the following
  return (
    <Container>
      <Wrapper>
        <Title>Todo App</Title>
        <TodoList>
          {/* Mapping through my todo list items */}
          {todo.map((item) => {
            return (
              <List key={item._id}>
                {/*The box is the round shape on each todo to signify complete status, ISC is use to update css on current todo status while the handleComplete takes the item ID as parameter for further manipulation*/}
                <Box
                  Isc={item.isComplete}
                  onClick={() => {
                    handleComplete(item._id)
                  }}
                ></Box>

                {/* Its the middle section of the todo containing both the todo tittle and todo description.*/}
                <Initial>
                  <Span style={{ fontWeight: "500" }}>{item.heading}</Span>
                  <Span style={{ fontSize: "0.7rem", width: "300px" }}>{item.description}</Span>
                </Initial>

                {/* Last contain edit and delete button for updating and deleting selected Todo*/}
                <Last>
                  {/* The setUpdate-true help to trigger the update page containing a form field while the setUpdateId send the todo ID for further nanipulation*/}
                  <Change
                    onClick={() => {
                      setUpdate(true)
                      setUpdateId(item._id)
                    }}
                    src={Edit}
                  />
                  {/* This delete the todo by teiggering the handleDelete function*/}
                  <Change
                    onClick={() => {
                      handleDelete(item._id)
                    }}
                    src={Delete}
                  />
                </Last>

                {/* A popup buttton activation to update todo items and description its visibility is dependent on "UPDATE" set true*/}
                {update ? (
                  <Trigger>
                    {/* A simple title label */}
                    <Title style={{ paddingTop: "80px" }}>Update Current Todo</Title>
                    {/* The title to be updated to */}
                    <AddInput
                      style={{ zIndex: "5", marginBottom: "5px", width: "300px" }}
                      value={updatedTitle}
                      placeholder="Title"
                      onChange={(event) => {
                        setUpdatedTitle(event.target.value)
                      }}
                    />
                    {/* The description to be updated to */}
                    <AddDesc
                      style={{ zIndex: "5", marginBottom: "5px", width: "300px" }}
                      value={updatedDesc}
                      placeholder="Description"
                      onChange={(event) => {
                        setUpdatedDesc(event.target.value)
                      }}
                    />
                    {/* A Button to send information for futher manipulation */}
                    <Post
                      style={{ zIndex: "5", borderRadius: "5px", width: "70px" }}
                      onClick={() => {
                        handleUpdate(updateId)
                      }}
                    >
                      Add
                    </Post>
                    {/* A cancel button to cancel the whole process */}
                    <Cancel
                      onClick={() => {
                        setUpdate(false)
                      }}
                    >
                      x
                    </Cancel>
                  </Trigger>
                ) : (
                  ""
                )}
              </List>
            )
          })}

          {/*This is outside todo List, a add button to add new todo to list of todo */}
        </TodoList>
        <AddItem>
          <Add
            Dsp={addNew}
            onClick={() => {
              setAddNew(!addNew)
            }}
          >
            +
          </Add>
          {/* An button activated input and description field */}
          <AddInput
            Dsp={addNew}
            value={title}
            type="text"
            placeholder="Add New Item"
            onChange={(event) => {
              setTitle(event.target.value)
            }}
          />
          <AddDesc
            Dsp={addNew}
            value={description}
            type="text"
            placeholder="Description"
            onChange={(event) => {
              setDescription(event.target.value)
            }}
          />
          {/* This ost item in both input and descriptionfield for further processing */}
          <Post Dsp={addNew} style={{ marginLeft: "10px", fontSize: "1rem" }} onClick={handlePost}>
            Post
          </Post>
        </AddItem>
      </Wrapper>
    </Container>
  )
}

export default Home
