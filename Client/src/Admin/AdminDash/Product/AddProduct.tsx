import axios from "axios";
import React, { useEffect, useState } from "react";
import { Server } from "../../../Server";
import { toast } from "react-toastify";
import ProgressLoader from "../../../Components/Loading/ProgressLoader";


const AddProduct = () => {
  const [productname, setProductName] = useState<string>("");
  const [undercategory, setUnderCategory] = useState<string>("");
  const [description, setProductDescription] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
 const [loading, setLoading] = useState(false);
  type Category = {
    _id: string;
    categoryname: string;
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get(`${Server}/get-category`).then((res) => {
      setCategories(res.data.categoryget);
    });
  }, []);

  // Handle multiple file selection correctly
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append new images
    }
  };

  const addProductFun = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if (!productname || !undercategory) {
      toast.error("Please fill in all required fields");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const data = new FormData();
    data.append("productname", productname);
    data.append("undercategory", undercategory);
    data.append("description", description);

    selectedFiles.forEach((file) => {
      data.append("productimages", file); // Ensure backend accepts array
    });

    try {
      const response = await axios.post<{ message: string }>(
        `${Server}/create-product`,
        data,
        config
      );
     
      toast.success(response.data.message || "Product created");
      setProductName("");
      setProductDescription("");
      setSelectedFiles([]);
      setUnderCategory("")
      setLoading(false)

    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
      setLoading(false)
      
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-center items-center mb-4">
        <div className="bg-white w-96 p-6 rounded-md shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Add Product</h2>
          <form onSubmit={addProductFun}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Product Name:</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={productname}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Product Description:</label>
              <textarea
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Multiple Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Product Images:</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                title="Upload product images"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
                   {
                    loading &&
                 
                   
                    <ProgressLoader/>
                        
                  
                   }
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

            {/* Under Category Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Under Category:</label>
              <select
                value={undercategory}
                onChange={(e) => setUnderCategory(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.categoryname}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button type="submit" className="px-4 py-2 cursor-pointer bg-teal-500 text-white rounded-md hover:bg-teal-700">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
