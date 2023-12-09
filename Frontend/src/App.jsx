import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [allTasks, setTasks] = useState([]);
  const [taskToAdd, addTask] = useState({ todo: null });

  const getAllTasks = async () => {
    const tasks = await axios
      .get("http://localhost:2012/all")
      .then((response) => setTasks(response.data));
  };
  useEffect(() => {
    getAllTasks();
  }, [allTasks]);
  console.log(allTasks);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = e.target.task.value;
    addTask({ todo: task });
    try {
      const response = await axios.post("http://localhost:2012/add", taskToAdd);
      console.log("Response:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(taskToAdd);
  return (
    <div className="flex justify-center items-center">
      <div className="h-auto max-h-72 w-auto">
        <form
          className="flex w-full items-center space-x-2 md:w-1/3 h-56 justify-center ms-56"
          onSubmit={handleSubmit}
        >
          <input
            className="flex h-10 max-w-[25vw] min-w-[25vw] rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Your Today's Target"
            name="task"
          />
          <button
            type="submit"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add
          </button>
        </form>
        {allTasks.map((tasks) => (
          <div
            className="rounded-md border-l-4 border-black bg-gray-100 p-4 mb-5 w-56 ms-[13vw]"
            key={tasks._id}
          >
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium">{tasks.toDo}</p>
              </div>
              <div className="flex justify-between w-10">
                <button type="button">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button type="button">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
