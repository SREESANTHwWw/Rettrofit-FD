import  { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Sidebar from './Sidebar';
import AddCategory from './Category/AddCategory';
import AddProduct from './Product/AddProduct';
import Allproduct from './Product/Allproduct';

const Admin = () => {
  
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      };
  return (
<div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow-md p-4">
          {/* Page Title */}
          <h1 className="text-xl font-semibold text-teal-700">Admin Dashboard</h1>

          {/* User Account Dropdown */}
          <div className="relative dropdown">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              title="User Account"
            >
              <UserCircleIcon className="h-8 w-8 text-teal-700" />
              <ChevronDownIcon className="h-5 w-5 text-gray-700" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <button
                //   onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="dashboard" element={<div>Dashboard</div>} />
            <Route path="category" element={<AddCategory/>} />
            <Route path="product" element={<AddProduct/>} />
            <Route path="showproduct" element={<Allproduct/>} />
         
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin