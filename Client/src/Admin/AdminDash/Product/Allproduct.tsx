import axios from "axios";
import React, { useEffect, useState } from "react";
import { Server } from "../../../Server";

const Allproduct = () => {
  const [productFilter, setProductFilter] = useState([]);
  const [productname, setProductname] = useState("");
  const [description, setDescription] = useState("");
  const [productImages, setProductImages] = useState<(string | File)[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [product_id, setProduct_id] = useState<string>("");

  useEffect(() => {
    axios.get(`${Server}/get-product`).then((res) => {
      setProductFilter(res.data.productget);
    });
  }, []);

  const openEditBox = (product: any) => {
    setProductname(product.productname);
    setDescription(product.description);
    setProductImages(product.productimages);
    setProduct_id(product._id);
    setOpenEdit(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || selectedImage === null) return;

    const newFile = e.target.files[0];

    setProductImages((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[selectedImage] = newFile; // Replace selected image
      return updatedFiles;
    });

    setSelectedImage(null);
  };

  const saveChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const formData = new FormData();

    formData.append("productname", productname);
    formData.append("description", description);

    if (selectedImage !== null && productImages[selectedImage] instanceof File) {
      formData.append("productimages", productImages[selectedImage]);
    }

    axios
      .patch(`${Server}/update-product/${product_id}`, formData, config)
      .then((res) => console.log("Updated successfully", res.data))
      .catch((err) => console.error("Error updating", err));
  };

  const deleteProduct = (id: string) => {
    axios.delete(`${Server}/delete-product/${id}`).then((res) => {
      if (res.status === 200) {
        axios.get(`${Server}/get-product`).then((res) => {
          setProductFilter(res.data.productget);
        });
      }
    });
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="w-full flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <input
          type="text"
          placeholder="Search product..."
          className="w-64 h-10 px-4 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-teal-700 text-white text-center">
              <th className="p-2 border text-sm">Product Name</th>
              <th className="p-2 border text-sm">Product Image</th>
              <th className="p-2 border text-sm">Description</th>
              <th className="p-2 border text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productFilter.length > 0 ? (
              productFilter.map((product: any, index) => (
                <tr key={index} className="even:bg-gray-100 text-center">
                  <td className="p-2 border">{product.productname}</td>
                  <td className="p-2 border">
                    <img src={product.productimages[0]} alt="Product" className="w-20 h-20 object-cover rounded-md" />
                  </td>
                  <td className="p-2 border">{product.description}</td>
                  <td className="p-2 border">
                    <div className="flex flex-col space-y-2">
                      <button className="bg-green-600 w-[70px] h-[30px] rounded-md text-white font-bold hover:bg-green-950" onClick={() => openEditBox(product)}>
                        Edit
                      </button>
                      <button className="bg-red-600 w-[70px] h-[30px] rounded-md text-white font-bold hover:bg-red-950" onClick={() => deleteProduct(product._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  No Product found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openEdit && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-3xl relative">
            <button onClick={() => setOpenEdit(false)} className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-2xl font-bold">
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

            <form className="space-y-6 w-full" onSubmit={saveChange}>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                <input
                  className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Product Name"
                  value={productname}
                  onChange={(e) => setProductname(e.target.value)}
                />

                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  title="Upload product image"
                  className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {productImages.map((file, index) => (
                  <img
                    key={index}
                    src={file instanceof File ? URL.createObjectURL(file) : file}
                    onClick={() => setSelectedImage(index)}
                    alt="Preview"
                    className={`w-24 h-24 object-cover rounded shadow cursor-pointer ${
                      selectedImage === index ? "border-4 border-blue-500" : ""
                    }`}
                  />
                ))}
              </div>

              <textarea
                className="w-full h-20 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <button className="w-full h-12 bg-blue-800 text-white rounded-md hover:bg-blue-950 transition duration-300">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allproduct;
