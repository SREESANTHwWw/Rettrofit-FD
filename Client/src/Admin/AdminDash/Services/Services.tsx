import axios from "axios";
import React, { useEffect, useState } from "react";
import { Server } from "../../../Server";
import { toast } from "react-toastify";
import ProgressLoader from "../../../Components/Loading/ProgressLoader";

const Services = () => {
  const [servicename, setServiceName] = useState<string>("");
  const [underService, setUnderservice] = useState<string | null>(null);

  const [description, setProductDescription] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  type Category = {
    _id: string;
    servicename: string;
  };

  const [Services, setServices] = useState<Category[]>([]);

;

  useEffect(()=>{
      axios.get(`${Server}/get-service`).then((res) => {
        console.log(res)
              const services= res.data.serviceget
              const underservice = services.filter((item:any)=>item.underService === null)
             setServices(underservice) // Set categories instead of undercategory
        });
    },[])

    console.log(underService)
    
  // Handle multiple file selection correctly
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append new images
    }
  };

  const addProductFun = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  
    const data = new FormData();
    data.append("servicename", servicename);
   
    data.append("underService", underService ?? "")

    data.append("description", description);
  
    selectedFiles.forEach((file) => {
      data.append("ServicesImages", file); // Ensure backend supports multiple images
    });
  
    try {
      const response = await axios.post<{ message: string; serviceCreated: any }>(
        `${Server}/create-service`,
        data,
        config
      );
  
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
  

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-center items-center mb-4">
        <div className="bg-white w-96 p-6 rounded-md shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Add Services</h2>
          <form onSubmit={addProductFun}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Service Name:</label>
              <input
                type="text"
                placeholder="Enter Service Name"
                value={servicename}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Service Description:</label>
              <textarea
                placeholder="Enter Service description"
                value={description}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Multiple Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Service Images:</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                title="Upload product images"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Image Previews */}
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
            {
              loading&&(
                <ProgressLoader/>
              )
            }

            {/* Under Category Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Under Services:</label>
              <select
                value={underService ?? ""}
                onChange={(e) => setUnderservice(e.target.value || null)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="" disabled>
                  Select a Service
                </option>

                {Services.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.servicename}
                   
                  </option>
                
                )
                )
                }
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button type="submit" className="px-4 py-2 cursor-pointer bg-teal-500 text-white rounded-md hover:bg-teal-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Services;
