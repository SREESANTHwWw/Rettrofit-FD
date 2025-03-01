
import Contact from './Contact'
import FeaturesSection from '../Body/FeaturesSection'
import { FeaturesSection2 } from '../Body/FeaturesSection2'

import Footer from '../Body/Footer'

const ContactForm = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center  scroll-smooth">
  <div className="w-full">
       <Contact/>
      </div>
      <div className="w-full   px-4 mt-[90vh]">
       <FeaturesSection/>
      </div>
      <div className="w-full   px-4 mt-[10vh] ">
       <FeaturesSection2/>
      </div>
      <div className="w-full   px-4 mt-[10vh] ">
       <Footer/>
      </div>

    </div>
  )
}

export default ContactForm