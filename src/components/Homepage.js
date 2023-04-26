import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./HomePage.css";
const HomePage = (props) => {
  const [task, setTask] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [updateTask, setUpdateTask] = useState("");
  let navigate = useNavigate();
  ///////////
  useEffect(() => {
    retriveAllTasks();
  }, []);
  //////
  const handleAdd = async () => {
    if (task.trim() === "") {
      return;
    } else {
      try {
        const newTask = await fetch("http://localhost:7000/taskRoutes/new", {
          method: "POST",
          body: JSON.stringify({
            todo: task,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        setTask("");
        retriveAllTasks();
      } catch (error) {
        console.log(error);
        alert("error creating task");
      }
    }
  };
  /////////

  const retriveAllTasks = async () => {
    try {
      let allData = await fetch("http://localhost:7000/taskRoutes/all", {
        method: "GET",
      });
      const response = await allData.json();
      setToDoList(response);
    } catch (error) {
      console.log(error);
      alert("Errror retrving data");
    }
  };
  ///////////////////////
  const handleComplete = async (task) => {
    try {
      const dataToUpdate = await fetch(
        `http://localhost:7000/taskRoutes/edit/${task._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            isComplete: !task.isComplete,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      retriveAllTasks();
      if (!task.isComplete) {
        swal("Congratulions for completing your task");
      }
    } catch (error) {
      console.log(error);
      swal("error updating data", "error");
    }
  };

  const handleDelete = async (task) => {
    try {
      const dataToDelete = await fetch(
        `http://localhost:7000/taskRoutes/remove/${task._id}`,
        {
          method: "DELETE",
        }
      );
      retriveAllTasks();
      swal("Removed successfully");
    } catch (error) {
      console.log(error);
      swal("error removing data", "error");
    }
  };
  /////////////////////

  const handleUpdate = async () => {
    try {
      const dataToUpdate = await fetch(
        `http://localhost:7000/taskRoutes/edit/${task._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
           todo: updateTask,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      retriveAllTasks();
      swal("Updated successfully");
    } catch (error) {
      console.log(error);
      swal("error updating data", "error");
    }
  };
  return (
    <div className="container-xl ">
      <div className="addTask">
        <input
          type="text"
          placeholder="Add New Task..."
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <button onClick={() => handleAdd()}>Add - Task</button>
      </div>


      <div className="row taskList">
        {toDoList.map((task, index) => {
          return (
            <div key={index} className="col-lg-10">
              <span>
                <i className={task.isComplete ? "fa-solid fa-check" : ""}></i>
                <span
                  className={(task.isComplete ? "taskcomplete addon" : "addon") }
                  onClick={() => {
                    handleComplete(task);
                  }}
                >
                  {task.todo}
                </span>
                <i
                  className="fa-solid fa-pen close"
                  onClick={() => {
                   navigate(`/update`,{state:task._id})
                  }}
                ></i>
                <i
                  className="fa-solid fa-xmark close"
                  onClick={() => {
                    handleDelete(task);
                  }}
                ></i>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HomePage;
