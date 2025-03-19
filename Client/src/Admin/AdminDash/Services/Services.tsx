import axios from "axios";
import React, { useEffect, useState } from "react";
import { Server } from "../../../Server";
import { toast } from "react-toastify";

import { LayersIcon, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [servicename, setServiceName] = useState<string>("");
  const [underService, setUnderservice] = useState<string | null>(null);
  const [description, setProductDescription] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [hasSubService, setHasSubService] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const navigate  = useNavigate()

  type Category = {
    _id: string;
    servicename: string;
    ServicesImages: string;
    description: string;
    underService: string | null;
    hasSubService: boolean;
  };

  const [Services, setServices] = useState<Category[]>([]);

  useEffect(() => {
    axios.get(`${Server}/get-service`).then((res) => {
      console.log(res);
      const services = res.data.serviceget;
      const underservice = services.filter(
        (item: any) => item.underService === null
      );
      setServices(underservice); // Set categories instead of undercategory
    });
  }, []);

  console.log(underService);

  // Handle multiple file selection correctly
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append new images
    }
  };

  const addServiceFun = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const data = new FormData();
    data.append("servicename", servicename);

    data.append("underService", underService ?? "");

    data.append("description", description);
    data.append("hasSubService", hasSubService.toString());

    selectedFiles.forEach((file) => {
      data.append("ServicesImages", file); // Ensure backend supports multiple images
    });

    try {
      const response = await axios.post<{
        message: string;
        serviceCreated: any;
      }>(`${Server}/create-service`, data, config);

      const serviceUpdate = response.data.serviceCreated; // Likely a single object
      if (serviceUpdate.underService === null) {
        setServices((prev) => [...prev, serviceUpdate]); // Append only if underService is null
      }

      toast.success(response.data.message || "Service created successfully");

      // Reset form fields
      setServiceName("");
      setProductDescription("");
      setSelectedFiles([]);
      setUnderservice(null);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error creating Services:", error);
      toast.error("Failed to create Services");
    }
  };



const  handleManage =(id:string)=>{
  navigate(`/admin/subservice/${id}`);
}  
const dltCate =(id:string)=>{
  if(window.confirm("Are you sure you want to delete this category?")) {
   axios.delete(`${Server}/delete-service/${id}`).then((res)=>{

     toast.success(res.data.msg)
     setServices((prevData) => prevData.filter((item) => item._id !== id));
   })
  }
}


  return (
    //
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Service List</h2>
        <button
          className="flex items-center gap-1 bg-teal-500 text-white px-3 py-1 rounded-md"
          onClick={() => setAddServiceOpen(true)}
        >
          <PlusCircle size={18} />
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        {Services && Services.length > 0 ? (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-4 px-4 text-left text-gray-700">SL NO</th>
                <th className="py-4 px-4 text-left text-gray-700">
                  Service/Subservice Name
                </th>
                <th className="py-4 px-4 text-left text-gray-700">Image</th>
                <th className="py-4 px-4 text-left text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {Services.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 text-gray-700"
                >
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4">{item.servicename}</td>

                  <td className="py-4 px-4">
                    <img
                      src={item.ServicesImages}
                      alt={item.servicename}
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
                   
                        <button
                          className="px-3 py-1 text-white rounded cursor-pointer bg-gray-700 transition-colors flex items-center gap-1"
                          onClick={() => handleManage(item._id)}
                        >
                          Manage
                          <LayersIcon size={16} />
                        </button>
                    
                     
                   
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

      {addServiceOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white w-96 p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add/Edit Category</h2>
            <form onSubmit={addServiceFun}>
              {/* Category Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Service Name:
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  value={servicename}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Service Description:
                </label>
                <textarea
                  placeholder="Enter Service description"
                  value={description}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Category Image */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Service Images:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  title="Upload product images"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedFiles.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded shadow"
                  />
                ))}
              </div>

              {/* Has Subcategory Checkbox */}
              <div className="mb-4 flex items-center">
                <input
                  title="has subcategory"
                  type="checkbox"
                  checked={hasSubService}
                  onChange={(e) => setHasSubService(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium">Has Service?</label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setAddServiceOpen(false)}
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
{loading && <div>Loading...</div>}
    </div>
  );
};

export default Services;
