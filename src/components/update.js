import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import "./update.css"

const Update = () => {
  let location = useLocation();
  const [todo, setTodo] = useState("");
  let navigate = useNavigate();
  let id = location.state;
  const getTodo = async () => {
    try {
      let res = await fetch(`http://localhost:7000/taskRoutes/${id}`, {
        method: "GET",
      });
      let response = await res.json();
      setTodo(response.todo);
    } catch (error) {
      swal({ title: "Error Retriving", icon: "warning", dangerMode: true });
      console.log(error);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const updateTodo = async () => {
    try {
      await fetch(`http://localhost:7000/taskRoutes/edit/${location.state}`, {
        method: "PUT",
        body: JSON.stringify({
          todo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      swal("updated successfully");
      navigate("/");
    } catch (error) {
      swal({ title: "Error updating", icon: "warning", dangerMode: true });
      console.log(error);
    }
  };
  return (
    <div className="updateTask">
      <input
        type="text"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
      />
      <button onClick={() => updateTodo()}>Save Changes</button>
    </div>
  );
};
export default Update;
