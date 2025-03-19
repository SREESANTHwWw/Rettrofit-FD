import axios from "axios";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProgressLoader from "../../../Components/Loading/ProgressLoader";
import { Server } from "../../../Server";

type Product = {
  _id: string;
  productname: string;
  productimages: string;
  description: string;
};

const ProductCreater = () => {
  const { id } = useParams();
  const [filterData, setFilterdata] = useState<Product[]>([]);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [productname, setProductName] = useState<string>("");
  const [undercategory, setUnderCategory] = useState<string>(id || "");
  const [description, setProductDescription] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${Server}/get-category-product/${id}`).then((res) => {
      setFilterdata(res.data.productget);
    });
  }, []);
  console.log(undercategory);

  const addProductFun = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
      const response = await axios.post<{ message: string, product: any }>(
        `${Server}/create-product`,
        data,
        config
      );
    const ProductData = response.data.product;
      setFilterdata((prevData) => [...prevData, ProductData]);
 console.log(response);
 
      toast.success(response.data.message || "Product created");
      setProductName("");
      setProductDescription("");
      setSelectedFiles([]);
      setUnderCategory("");
      setLoading(false);
      setAddProductOpen(false);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
      setLoading(false);
      setAddProductOpen(false);
    }
  };
  console.log(productname, undercategory, description);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append new images
    }
  };
  
    const deleteProduct = (id: string) => {
      axios.delete(`${Server}/delete-product/${id}`).then((res) => {
        if (res.status === 200) {
          axios.get(`${Server}/get-product`).then((res) => {
            setFilterdata(res.data.productget);
          });
        }
      });
    };

  return (
    <div className="flex flex-col items-center w-full p-4">
    {/* Header */}
    <div className="w-full flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Products</h2>
      <button
        className="flex items-center gap-1 bg-teal-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-teal-600 transition"
        onClick={() => setAddProductOpen(true)}
      >
        <PlusCircle size={18} />
        Add Product
      </button>
    </div>

    {/* Table */}
    <div className="overflow-x-auto w-full">
      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr className="bg-teal-700 text-white text-left">
            <th className="p-3 border border-gray-300 text-sm">Product Name</th>
            <th className="p-3 border border-gray-300 text-sm">Product Image</th>
            <th className="p-3 border border-gray-300 text-sm">Description</th>
            <th className="p-3 border border-gray-300 text-sm text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterData && filterData.length > 0 ? (
            filterData.map((product, index) => (
              <tr key={index} className="even:bg-gray-100 hover:bg-gray-200">
                <td className="p-3 border border-gray-300">{product.productname}</td>
                <td className="p-3 border border-gray-300">
                  <img
                    className="w-24 h-24 rounded-lg object-cover border border-gray-300"
                    src={product.productimages}
                    alt={product.productname}
                  />
                </td>
                <td className="p-3 border border-gray-300">{product.description}</td>
                <td className="p-3 border border-gray-300 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="bg-teal-600 px-3 py-1 rounded-md cursor-pointer text-white font-semibold hover:bg-teal-800 transition"
                      // onClick={() => openEditBox(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 px-3 py-1 rounded-md text-white cursor-pointer font-semibold hover:bg-red-800 transition"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500 border border-gray-300">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {addProductOpen && (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
    <div className="bg-white w-96 p-6 rounded-md shadow-lg">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>
        <button
          className="cursor-pointer"
          onClick={() => setAddProductOpen(false)}
        >
          X
        </button>
      </div>

      <form onSubmit={addProductFun}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Product Name:
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            value={productname}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Product Description:
          </label>
          <textarea
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Multiple Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Product Images:
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
        {loading && <ProgressLoader />}
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

   

        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer bg-teal-500 text-white rounded-md hover:bg-teal-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  </div>
);
};
export default ProductCreater;
