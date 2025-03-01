import axios from 'axios'
import React, { useState } from 'react'
import { Server } from '../../../Server'
import { toast } from 'react-toastify'

const AddCategory = () => {
  const [categoryname,setCategoryName] =useState<string>("")

  const addCategoryFun=(e :React.FormEvent)=>{
    e.preventDefault()
    axios.post(`${Server}/create-category`,{
        categoryname
    }).then((res)=>{
      if(res.data.msg === "category created success"){
        toast.success("Category created")
      }
           
       
    }).catch((error)=>{
        toast.error("Category Creation failed",)
        console.log(error)
    })



  }

  return (
  <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
   
        <div className="bg-white w-96 p-6 rounded-md shadow-lg">
          <h2 className="text-lg font-semibold mb-4">
            Add/Edit Category
          </h2>
          <form onSubmit={addCategoryFun}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Category Name:
              </label>
              <input
                type="text"
                placeholder="Name"
                value={categoryname}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

           
          

            <div className="flex justify-end gap-4">
          
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default AddCategory