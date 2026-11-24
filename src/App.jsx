import { useRef } from "react";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import ReduxProvider from "./redux/ReduxProvider";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTask, editTask, removeTask } from "./redux/slice/todos.slice";
import { setNewSelected } from "./redux/slice/todo.slice";

function InputForm({ showInputForm, show }) {
    // const reduxState = useSelector((state) => state);
    const disptach = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        disptach(
            addTask({
                id: Date.now(),
                title: formData.get("title"),
                project: formData.get("project"),
                tags: [],
                deadline: formData.get("deadline"),
                done: false,
            }),
        );

        e.target.reset();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={
                "w-full absolute transition-[top] duration-100 rounded-4xl py-6 px-8 h-full bg-slate-100 items-center justify-start flex-col flex gap-6 " +
                (show ? "top-[0%]" : "top-full")
            }
        >
            <div className="w-full mb-8 justify-end flex">
                <button
                    type="button"
                    onClick={() => showInputForm(false)}
                    className="text-2xl cursor-pointer"
                >
                    <IoClose />
                </button>
            </div>

            <div className="w-full flex flex-col justify-center items-start">
                <span className="text-gray-500 font-extralight">To-do</span>
                <input
                    name="title"
                    className="w-full text-black font-semibold text-lg outline-0 py-4"
                    placeholder="Task title"
                    type="text"
                />
            </div>

            <div className="w-full flex flex-col justify-center items-start">
                <span className="text-gray-500 mb-3 font-extralight">
                    Project
                </span>
                <div className="w-full flex justify-center items-center border rounded-xl border-black/25 p-4">
                    <select
                        name="project"
                        className="w-full text-black font-semibold border-black/25 text-lg outline-0"
                    >
                        <option value="home">Home</option>
                        <option value="lms">LMS</option>
                        <option value="school">School</option>
                    </select>
                </div>
            </div>

            <div className="w-full flex flex-col justify-center items-start">
                <span className="text-gray-500 font-extralight">Tags</span>
                <button
                    type="button"
                    className="py-4 text-blue-400 flex gap-4 cursor-pointer"
                >
                    <FaPlus /> Add Tags
                </button>
            </div>

            <div className="w-full flex flex-col justify-center items-start">
                <span className="text-gray-500 mb-3 font-extralight">
                    Deadline
                </span>
                <input
                    name="deadline"
                    className="border p-4 rounded-xl border-black/25"
                    type="date"
                />
            </div>

            <button
                type="submit"
                className="w-full py-4 shadow shadow-blue-900 rounded-xl bg-blue-500 text-white text-center"
            >
                Done
            </button>
        </form>
    );
}

function EditForm({ showEditForm, show }) {
    const {id, title, project, deadline, done} = useSelector((state) => state.todo);
    const disptach = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        disptach(
            editTask({
                id,
                title: formData.get("title") || title,
                project: formData.get("project") || project,
                tags: [],
                deadline: formData.get("deadline") || deadline,
                done,
            }),
        );

        e.target.reset();
        showEditForm(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={
                "w-full absolute transition-[top] duration-100 rounded-4xl py-6 px-8 h-full bg-slate-100 items-center justify-start flex-col flex gap-6 " +
                (show ? "top-[0%]" : "top-full")
            }
        >
            <div className="w-full mb-8 justify-end flex">
                <button
                    type="button"
                    onClick={() => showEditForm(false)}
                    className="text-2xl cursor-pointer"
                >
                    <IoClose />
                </button>
            </div>

            <div className="w-full flex flex-col justify-center items-start">
                <span className="text-gray-500 font-extralight">To-do</span>
                <input
                    defaultValue={title}
                    name="title"
                    className="w-full text-black font-semibold text-lg outline-0 py-4"
                    placeholder="Task title"
                    type="text"
                />
            </div>

            <div className="w-full flex flex-col justify-center items-start">
                <span className="text-gray-500 mb-3 font-extralight">
                    Project
                </span>
                <div className="w-full flex justify-center items-center border rounded-xl border-black/25 p-4">
                    <select
                        defaultValue={project}
                        name="project"
                        className="w-full text-black font-semibold border-black/25 text-lg outline-0"
                    >
                        <option value="home">Home</option>
                        <option value="lms">LMS</option>
                        <option value="school">School</option>
                    </select>
                </div>
            </div>

            <div className="w-full flex flex-col justify-center items-start">
                <span className="text-gray-500 font-extralight">Tags</span>
                <button
                    type="button"
                    className="py-4 text-blue-400 flex gap-4 cursor-pointer"
                >
                    <FaPlus /> Add Tags
                </button>
            </div>

            <div className="w-full flex flex-col justify-center items-start">
                <span className="text-gray-500 mb-3 font-extralight">
                    Deadline
                </span>
                <input
                    defaultValue={deadline}
                    name="deadline"
                    className="border p-4 rounded-xl border-black/25"
                    type="date"
                />
            </div>

            <button
                type="submit"
                className="w-full py-4 shadow shadow-blue-900 rounded-xl bg-blue-500 text-white text-center"
            >
                Update
            </button>
        </form>
    );
}


function TodoCard({ title, id, done, project, deadline, tags, deleteFn, showEditForm }) {
    const titleRef = useRef();
    const dispatch = useDispatch();

    function checkChange(e) {
        if (e.target.checked) {
            titleRef.current.style.textDecorationLine = "line-through";
            titleRef.current.style.color = "gray";
        } else {
            titleRef.current.style.textDecorationLine = "none";
            titleRef.current.style.color = "black";
        }
        dispatch(editTask({id, title, done: e.target.checked, project, tags}))
    }

    return (
        <div className="w-full shadow-sm shadow-slate-200 bg-white rounded-xl p-4 h-fit flex items-center flex-row justify-center gap-6">
            <div className="h-full w-fit items-center justify-start">
                <input
                    defaultChecked={done}
                    onChange={checkChange}
                    type="checkbox"
                />
            </div>
            <div className="grow flex justify-start items-start flex-col gap-2">
                <div className="w-full flex items-start flex-col gap-1">
                    <span
                        ref={titleRef}
                        className={
                            "text-black text-xl font-semibold " +
                            (done ? "line-through text-gray-500" : "")
                        }
                    >
                        {title}
                    </span>
                    <span className="text-slate-600">{project}</span>
                </div>
                {tags.map((t, i) => {
                    return (
                        <span key={"tags-" + i} className="text-sm">
                            {t}
                        </span>
                    );
                })}
            </div>
            <div className="h-full items-center flex gap-4">
                <MdEdit onClick={() => {
                    dispatch(setNewSelected({title, id, done, project, tags, deadline}));
                    showEditForm(true);
                }} className="text-lg cursor-pointer" />
                <FaTrash
                    onClick={deleteFn}
                    className="cursor-pointer text-red-400"
                />
            </div>
        </div>
    );
}

function Home({ showInputForm, showEditForm }) {
    const reduxState = useSelector((state) => state);
    const disptach = useDispatch();

    function deleteTodo(id) {
        disptach(removeTask(id));
    }


    return (
        <div className="py-6 px-8 w-full flex h-full justify-start items-center flex-col relative">
            <h1 className="w-full text-5xl font-bold py-6">Today</h1>
            <div className="w-full py-4 h-fit flex justify-start scrollbar-thin pb-25 overflow-y-auto items-center flex-col gap-4">
                {reduxState.todos.length === 0 && (
                    <div className="w-full p-4 text-lg">
                        Add new todo with clicking the right bottom button
                    </div>
                )}
                {reduxState.todos.length > 0 &&
                    reduxState.todos.map((d, i) => {
                        return (
                            <TodoCard
                                // checkedFn={(checked) => { }}
                                showEditForm={showEditForm}
                                deleteFn={() => deleteTodo(d.id)}
                                {...d}
                                key={"card-" + i}
                            />
                        );
                    })}
            </div>
            <button
                onClick={() => showInputForm(true)}
                className="font-bold text-3xl cursor-pointer flex justify-center items-center absolute right-8 bottom-8 w-[70px] h-[70px] rounded-2xl bg-blue-400 text-white"
            >
                <FaPlus />
            </button>
        </div>
    );
}

export default function App() {
    const [showInputForm, setShowInputForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    return (
        <ReduxProvider>
            <div className="w-full h-screen items-center justify-center flex flex-col">
                <div className="w-110 overflow-hidden shadow-lg relative bg-slate-100 rounded-4xl h-175 flex justify-start flex-col items-center">
                    <Home showEditForm={setShowEditForm} showInputForm={setShowInputForm} />
                    <InputForm
                        showInputForm={setShowInputForm}
                        show={showInputForm}
                    />
                    <EditForm
                        showEditForm={setShowEditForm}
                        show={showEditForm}
                    />
                </div>
            </div>
        </ReduxProvider>
    );
}
