import  { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,

  Users,


  // LogOut,
} from 'lucide-react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { icon: <LayoutDashboard size={23} className='text-teal-600 font-medium' />, label: 'Dashboard', section: 'dashboard' },
    { icon: <Settings size={23} className='text-teal-600 font-medium' />, label: 'Category Settings', section: 'category' },
    { icon: <Settings size={23} className='text-teal-600 font-medium' />, label: 'Product Settings', section: 'showproduct' },
    { icon: <Settings size={23} className='text-teal-600 font-medium' />, label: 'Services Settings', section: 'servicesAdd' },
    { icon: <Settings size={23} className='text-teal-600 font-medium'/>, label: ' All Services ', section: 'showservice' },
    { icon: <Users size={23} className='text-teal-600 font-medium' />, label: 'Users', section: 'users' },
   
   
  
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`h-screen  bg-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        {/* Header */}
        <div className="p-5  flex items-center gap-4">
         
          {!isCollapsed &&  <img
                src="/retro.png"
                alt="Logo"
                className={`{
                   w-32 h-20 object-contain hover:scale-105 transition-transform duration-300`}
              />}
          <button
            className="ml-auto hover:bg-gray-100 p-2 rounded-lg"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <Bars3Icon className="h-6 w-6 text-gray-800" /> : <XMarkIcon className="h-6 w-6 text-gray-800" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 ">
          {menuItems.map((item, index) => (
            <ul key={index}>
              <li className="flex items-center gap-4 py-2">
                {item.icon }
                {!isCollapsed && (
                  <Link to={`/admin/${item.section}`} className="font-medium text-gray-700 hover:text-teal-600">
                    {item.label}
                  </Link>
                )}
              </li>
            </ul>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
