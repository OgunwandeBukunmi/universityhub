"use client";
import React, { FormEvent, useEffect, useState } from "react";
import useProductStore from "@/src/store/useProductStore.js"
import { ObjectId } from "mongodb";



export default function DashboardPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const[title,setTitle] = useState<string | null>("")
  const[description,setDescription] = useState<string | null>("")
  const[category,setCategory] = useState<string | null>("")
  const[faculty,setFaculty] = useState<string | null>("")
  const [currentStep, setCurrentStep] = useState<"all-posts" | "create-post">("all-posts");
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    async function fetchData() {

          setLoading(true);
      try {
        const res = await fetch("/api/docs");
        const data = await res.json();
        setPosts(data.data || []);
      
        
       
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
      return 
 
      }

   

    if (currentStep === "all-posts") fetchData();
  }, [currentStep]);

  async function Delete(id : ObjectId){
    try{
      const request = await fetch("/api/docs",{
        method : "DELETE",
        headers: {
          "Content-Type" : "application/json"
        },
        body :JSON.stringify({id})
      })
      if(request.ok){
        let filteredposts = posts.filter((item)=> item._id !== id)
        console.log(posts.length, filteredposts.length)
        setPosts(filteredposts)
      }
    }catch(err){
      console.error(err.message)
    }
  }

  async function handleSubmit (e : FormEvent){
    e.preventDefault()
    let splitcategory = category.split(" ")
    try{
      const request = await fetch("/api/docs", {
        method :"POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({title,faculty,description,splitcategory})
      })
     
      const response = await request.json();
       if(request.ok){
        const newdata = {_id:response.data.insertedId ,title,faculty,description,category : splitcategory}
        console.log(newdata)
        setPosts([...posts,newdata])
      }
      setTitle("")
      setDescription("") 
      setCategory("")
      console.log(response.data)
    }catch(err){
      console.error(err)
    }
  }
  // 🧩 Render Functions
  const renderTabs = () => (
    <div className="flex justify-center md:justify-start gap-4 px-6 py-4 border-b bg-white shadow-sm sticky top-0 z-10">
      {[
        { key: "all-posts", label: "All Books" },
        { key: "create-post", label: "Create New Post" },
      ].map((tab) => (
        <button
          key={tab.key}
          onClick={() => setCurrentStep(tab.key as "all-posts" | "create-post")}
          className={`px-5 py-2 rounded-lg font-medium transition-all ${
            currentStep === tab.key
              ? "bg-primary text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  const renderPosts = () => (
    <div className="p-6">
      {loading ? (
        <p className="text-gray-500 text-center">Loading books...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-center">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-sm p-4 border hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-800 truncate">{post.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">{post.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-gray-400">{post.category}</span>
                <button className="text-sm cursor-pointer text-red-600 hover:underline" onClick={()=>Delete(post._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCreateForm = () => (
    <div className="p-6 mt-10 max-w-lg mx-auto bg-white rounded-xl shadow-sm border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Book</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 text-gray-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
          <select name="faculty" id="" className="w-full border border-gray-300 text-gray-800  p-2 rounded-md  " onChange={(e)=> { setFaculty(e.target.value)}}>
          <option value="law">Law</option>
          <option value="art">Arts</option>
          <option value="social sciences"> Social Science</option>
          <option value="health sciences">Health Science</option>
          <option value="technology" className="p-2">Technology</option>
        </select>
        <textarea
          placeholder="Description"
          className="w-full border border-gray-300 text-gray-800  p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
      
        <input
          type="text"
          placeholder="Categories"
          className="w-full border border-gray-300 text-gray-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Publish Book
        </button>

      </form>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">📚 Book Dashboard</h1>
        <span className="text-sm text-gray-500">Admin Panel</span>
      </header>

      {renderTabs()}
      {currentStep === "all-posts" ? renderPosts() : renderCreateForm()}
    </section>
  );
}
