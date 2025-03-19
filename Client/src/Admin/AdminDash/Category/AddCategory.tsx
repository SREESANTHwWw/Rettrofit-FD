import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Server } from '../../../Server'
import { toast } from 'react-toastify'
import {  useNavigate } from 'react-router-dom'

import { Pencil, Trash2, LayersIcon, PlusCircle, } from "lucide-react";


type Category = {
  _id: string;
  categoryname: string;
  categoryimage: string;
  hasSubcategory: boolean;
};


const AddCategory = () => {
  const navigate = useNavigate()
  const [categoryname,setCategoryName] =useState<string>("")
  const [currentData, setCurrentData] = useState<Category[]>([]);
  const [addCategoryOpen,setAddCategoryOpen] = useState<boolean>(false)
  const [hasSubcategory,setHasSubcategory] = useState<boolean>(false)
  const [categoryimage, setcategoryimage] = useState<null| File>(null)




   const fethcategory = ()=>{
    axios.get(`${Server}/get-category`).then((res)=>{
      const categoriesWithoutSubcategory = res.data.categoryget.filter(
        (category:any) =>
          !category.subcategory || category.subcategory.trim() === ""
      );
      setCurrentData(categoriesWithoutSubcategory)
    })

   }

   useEffect(()=>{
    fethcategory()
   },[])


   const handleManage =(id:string)=>{
    navigate(`/admin/subcategory/${id}`);
   }


  const addCategoryFun = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!categoryimage) {
      alert("Please select a file before uploading.");
      return;
    }
  
    const formData = new FormData();
    formData.append("categoryname", categoryname);
    formData.append("categoryimage", categoryimage); // Ensure field name matches backend
  formData.append("hasSubcategory", hasSubcategory.toString());
  
  
    axios
      .post(`${Server}/create-category`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
       
        toast.success("Category created");
        setCurrentData((prevData) => [...prevData, res.data.categoryCreate]);
      })
      .catch((error) => {
        toast.error("Category Creation failed");
        console.error("Upload Error:", error.response ? error.response.data : error);
      });
  };
  
  const dltCate =(id:string)=>{
       if(window.confirm("Are you sure you want to delete this category?")) {
        axios.delete(`${Server}/delete-category/${id}`).then((res)=>{

          toast.success(res.data.msg)
          setCurrentData((prevData) => prevData.filter((item) => item._id !== id));
        })
       }
  }

const  handleViewProduct =(id:string)=>{
  navigate(`/admin/addProduct/${id}`)

}

console.log(currentData)
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
    {/* Header Section */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-700">Category List</h2>
      <button
        className="flex items-center gap-1 bg-teal-500 text-white px-3 py-1 rounded-md"
        onClick={()=>setAddCategoryOpen(true)}
      >
        <PlusCircle size={18} />
        Add Category
      </button>
    </div>

    <div className="overflow-x-auto">
      {currentData && currentData.length > 0 ? (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-4 px-4 text-left text-gray-700">SL NO</th>
              <th className="py-4 px-4 text-left text-gray-700">
                Category/Subcategory Name
              </th>
              <th className="py-4 px-4 text-left text-gray-700">Image</th>
              <th className="py-4 px-4 text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 text-gray-700"
              >
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">
                  {item.categoryname}
                </td>
             
                <td className="py-4 px-4">
                  <img
                    src={item.categoryimage}
                    alt={item.categoryname}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    <button
                      className="px-3 py-1 text-white bg-red-500 rounded cursor-pointer hover:bg-red-600 transition-colors flex items-center gap-1"
                      onClick={() => dltCate(item._id)}
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                    <button
                      className="px-3 py-1 text-white bg-yellow-500 rounded cursor-pointer hover:bg-yellow-600 transition-colors flex items-center gap-1"
                      // onClick={()=>openEdit(item)}
                    >
                      <Pencil size={16} />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    {item.hasSubcategory === true ? (
                      <button
                        className="px-3 py-1 text-white rounded cursor-pointer bg-gray-700 transition-colors flex items-center gap-1"
                        onClick={() => handleManage(item._id)}
                      >
                        Manage
                        <LayersIcon size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleViewProduct(item._id)}
                        className="px-3 py-1 text-white bg-teal-500 cursor-pointer rounded hover:bg-teal-600 transition-colors flex items-center gap-1"
                      >
                       View Product
                      </button>
                      
                    )}  
                  </div>
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-gray-500 text-center py-10">
          No Category Available
        </div>
      )}
    </div>

    {addCategoryOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white w-96 p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add/Edit Category</h2>
            <form onSubmit={addCategoryFun}>
              {/* Category Name */}
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

              {/* Category Image */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Category Image:
                </label>
                <input
                title='categoryimages'
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setcategoryimage(e.target.files[0]);
                    }
                  }}
                  className="w-full"
                />
                {/* Preview */}
                {categoryimage && categoryimage instanceof File && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <img
                      src={URL.createObjectURL(categoryimage)}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded shadow"
                    />
                  </div>
                )}
              </div>

              {/* Has Subcategory Checkbox */}
              <div className="mb-4 flex items-center">
                <input
                title='has subcategory'
                  type="checkbox"
                  checked={hasSubcategory}
                  onChange={(e) => setHasSubcategory(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium">Has Subcategory?</label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setAddCategoryOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Close
                </button>
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
      )}
  {/* {openEditmodal && (
<div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
  <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
    <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
    <form onSubmit={updateCategory}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category Name:</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
<label className="block text-sm font-medium mb-2">Category Image:</label>
<input
  type="file"
  accept=".jpg, .jpeg, .png"
  onChange={(e) => setCategoryImg(e.target.files[0])}
  className="w-full"
/>
{categoryImg && categoryImg instanceof File ? (
<img
  src={URL.createObjectURL(categoryImg)}
  alt="Preview"
  className="mt-2 w-32 h-32 object-cover"
/>
) : (
editCategoryImg && <img src={editCategoryImg} alt="Existing" className="mt-2 w-32 h-32 object-cover" />
)}

</div>


      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={hasSubcategory}
          onChange={(e) => setHasSubcategory(e.target.checked)}
          className="mr-2"
        />
        <label className="text-sm font-medium">Has Subcategory?</label>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={closeEditModal}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</div>
)} */}

  </div>
  )
}

export default AddCategory