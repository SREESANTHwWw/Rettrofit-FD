import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Server } from '../../../Server';



const Allproduct = () => {

const [productFilter, setproductFilter] = useState([]);
const [productname, setProductname] = useState("");
const [description, setDescription] = useState("");
const [productImages, setProductImages] = useState<(string | File)[]>([]);
const [openEdit, setOpenEdit] = useState(false);
const [images, setImages] = useState<string[]>([]);
const [selectedImage, setselectedImage] = useState<number| null>(null);
const [product_id, setProduct_id] = useState<string>("");

useEffect(()=>{
    axios.get(`${Server}/get-product`).then((res)=>{

        setproductFilter(res.data.productget)
    })

},[])


const openEditBox = (product:any) => {
    setProductname(product.productname);
    setDescription(product.description);
    setProductImages(product.productimages)
    setProduct_id(product._id);
    setOpenEdit(true);

    // setProductImages(product.productimages);
}
console.log(images)

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || e.target.files.length === 0 || selectedImage === null) return;

  const newFile = e.target.files[0];

  // Convert the file to a preview URL
  const fileUrl = URL.createObjectURL(newFile);

  setProductImages((prevFiles) => {
    const updatedFiles = [...prevFiles];
    updatedFiles[selectedImage] = newFile; // Replace selected image
    return updatedFiles;
  });

  setImages((prev) => {
    const updated = [...prev];
    updated[selectedImage] = fileUrl; // Update preview
    return updated;
  });

  setselectedImage(null);
};



  console.log(selectedImage)
  const savechange= (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",}
  }
  const FORMDATA = new FormData();
  FORMDATA.append("productname", productname);
  FORMDATA.append("description", description);
  if (selectedImage !== null) {
    FORMDATA.append("selectedIndex", selectedImage.toString()); // Send index
  }
  if (selectedImage !== null && productImages[selectedImage] instanceof File) {
    FORMDATA.append("productimages", productImages[selectedImage]);
  }
  
  axios.patch(`${Server}/update-product/${product_id}`, FORMDATA, config)
    .then((res) => {
      console.log("Updated successfully", res.data);
    })
    .catch((err) => console.error("Error updating", err));
  
  }

  const deleteProduct = (id: string) => {
    axios.delete(`${Server}/delete-product/${id}`).then((res) => {
      if (res.status === 200) {
        axios.get(`${Server}/get-product`).then((res) => {
          setproductFilter(res.data.productget);
        });
      }
    });
  };


  return (
    <div className="flex flex-col items-center w-full p-4">
    <div className="w-full flex justify-between">
    <h2 className="text-2xl font-bold mb-4">Products</h2>
    <div className="flex items-center mb-4 space-x-2">
<input
  type="text"
//   value={searchQuery}
//   onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
  placeholder="Search product..."
  className="w-64 h-10 px-4 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
/>

</div>
</div>

    

    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse">
        <thead className="rounded-md">
          <tr className="bg-blue-900 text-white ">
            <th className="p-2 border text-sm">Productname</th>
            <th className="p-1 border  text-sm">Product image</th>
         
            <th className="p-1 border  text-sm">Description</th>
        
           
            
           
            <th className="p-1 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productFilter && productFilter.length > 0 ? (
            productFilter.map((product:any, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="p-2 border">{product.productname}</td>
                <td className="p-2 border">
                {/* <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="rounded-xl shadow-lg"
      >
        <SwiperSlide>
          <img
            src={product.productimages}
            alt="Slide 1"
            className="w-28 h-28 rounded-lg object-cover"
          />
        </SwiperSlide>
      
     
      </Swiper>
                  */}

                    <img src={product.productimages[0]} alt="" />

                  </td>
       
                <td className="p-2 border">{product.description}</td>
          
               
              
               
                <div className="w-[150px] flex-col flex justify-center gap-5 items-center ">
                  <button
                    className="bg-green-600 w-[70px] h-[30px] rounded-md text-white font-bold hover:bg-green-950"
                    onClick={() => openEditBox(product)}
                  >
                    Edit
                  </button>
                 
                  <button
                    className="bg-red-600 w-[70px] h-[30px] rounded-md text-white font-bold hover:bg-red-950"
                    onClick={() => deleteProduct(product._id)}
                  >
                    {" "}
                    Delete
                  </button>
                </div>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={11} className="p-4 text-center">
                No Product found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {openEdit &&  (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50  backdrop-blur-sm flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-3xl relative">
      {/* Close Button */}
      <button
        onClick={() => setOpenEdit(false)}
        className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-2xl font-bold"
        title="Close"
      >
    
      </button>

      <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

      <div className="w-full sm:h-full h-[900px] flex flex-col justify-center   items-center bg-gray-50 py-10">
        <form
          className="space-y-6 w-full sm:w-[80%] md:w-[60%] lg:w-[100%] px-5 shadow-lg rounded-lg"
          onSubmit={savechange}
        >
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
            <input
              className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Product Name"
              value={productname}
              name="productname"
              onChange={(e)=>setProductname(e.target.value)}
            />
            <div className="relative">
              <input
                className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
                placeholder="Upload Product Image"
                type="file"
                name="product_img"
                accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
            {productImages.map((file, index) => (
  <img
    key={index}
    src={file instanceof File ? URL.createObjectURL(file) : file}
    onClick={() => setselectedImage(index)}
    alt="Preview"
    className={`w-24 h-24 object-cover rounded shadow cursor-pointer ${
      selectedImage === index ? "border-4 border-blue-500" : ""
    }`}
  />
))}
            </div>

         
          
            <input
              className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
        
         
           
         
          
           
          </div>
          <div className="w-full flex justify-center items-center">
            <button className="w-[300px] h-12 bg-blue-800 text-white rounded-md hover:bg-blue-950 transition duration-300 mt-4" type="submit" >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
  
    </div>
  </div>
  
  )
}

export default Allproduct