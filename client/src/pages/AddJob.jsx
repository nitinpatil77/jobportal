import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("pune");
  const [category, setCategory] = useState("programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);
  const [description, setDescription] = useState("");

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
      quillRef.current.on("text-change", () => {
        setDescription(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      title,
      location,
      category,
      level,
      salary,
      description,
    };

    console.log(jobData);
    

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 w-1/2">
      <div>
        <p className="text-lg mb-1 text-gray-800">Job Title</p>
        <input
          type="text"
          value={title}
          placeholder="Enter Job Title"
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg border border-gray-400 p-2 w-full focus:outline-none"
        />
      </div>

      <div>
        <p className="text-lg mb-1 text-gray-800">Job Description</p>
        <div ref={editorRef} className="border-r border-l border-b overflow-auto border-gray-400 focus:outline-none" style={{ height: "200px" }} />
      </div>

      <div className="flex justify-between items-center gap-3 my-6">
        <div className="flex-1">
          <p className="text-lg mb-1 text-gray-800">Job Category</p>
          <select className="focus:outline-none text-gray-800 px-3 py-2 border border-gray-400 appearance-none w-full" onChange={(e) => setCategory(e.target.value)}>
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <p className="text-lg mb-1 text-gray-800">Job Location</p>
          <select className="focus:outline-none text-gray-800 px-3 py-2 border border-gray-400 appearance-none w-full" onChange={(e) => setLocation(e.target.value)}>
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <p className="text-lg mb-1 text-gray-800">Job Level</p>
          <select className="focus:outline-none text-gray-800 px-3 py-2 border border-gray-400 appearance-none w-full" onChange={(e) => setLevel(e.target.value)}>
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>

      <div>
        <p className="text-lg mb-1 text-gray-800">Salary</p>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter Salary ( CTC )"
          className="border p-2 w-full border-gray-400 focus:outline-none text-lg"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-1/3"
      >
        Add Job
      </button>
    </form>
  );
};

export default AddJob;
