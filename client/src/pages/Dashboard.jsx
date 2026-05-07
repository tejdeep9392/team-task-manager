import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    try {

      const res = await API.get(
        "/tasks",
        {
          headers: {
            authorization:
              localStorage.getItem("token")
          }
        }
      );

      setTasks(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-12">

          <div>

            <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
              Team Task Manager
            </h1>

            <p className="text-white text-lg mt-3">
              Manage projects and track progress
            </p>

          </div>

          <button
            className="bg-white text-purple-600 font-bold px-6 py-3 rounded-2xl shadow-lg hover:bg-purple-100 transition"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {
            tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-300"
              >

                <div className="flex justify-between items-center mb-4">

                  <h2 className="text-2xl font-bold text-white">
                    {task.title}
                  </h2>

                  <span className={`px-4 py-1 rounded-full text-sm font-bold text-white
                    ${
                      task.status === "Completed"
                        ? "bg-green-500"
                        : task.status === "In Progress"
                        ? "bg-yellow-400 text-black"
                        : "bg-red-500"
                    }`}
                  >
                    {task.status}
                  </span>

                </div>

                <p className="text-white mb-6">
                  {task.description}
                </p>

                <div className="bg-white/20 rounded-2xl p-3">

                  <p className="text-white text-sm">
                    📅 Due:
                    {" "}
                    {
                      task.dueDate
                        ? new Date(task.dueDate)
                            .toLocaleDateString()
                        : "No Date"
                    }
                  </p>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;