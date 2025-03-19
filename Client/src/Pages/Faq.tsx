import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import NavBarWithOutBg from "../Components/NavBar1/NavBarWithOutBg";
import Footer from "../Components/Body/Footer";

const faqs = [
  {
    question: "What is Reverse Engineering?",
    answer:
      "Reverse engineering is the process of analyzing an existing product, system, or component to understand its design, function, and manufacturing processes.",
  },
  {
    question: "When is Reverse Engineering Necessary?",
    answer:
      "Reverse engineering is needed for obsoleted parts, lack of documentation, damaged parts, competitive analysis, and product improvement.",
  },
  {
    question: "What are the Common Methods of Reverse Engineering?",
    answer:
      "Methods include dimensional measurement, 3D scanning, material analysis, and functional analysis.",
  },
  {
    question: "What are the Benefits of Reverse Engineering?",
    answer:
      "Benefits include reduced costs, improved design, faster time-to-market, and enhanced product availability.",
  },
  {
    question: "What Industries Benefit from Reverse Engineering?",
    answer:
      "Industries include water and power, aerospace, automotive, medical, and manufacturing.",
  },
  {
    question: "What are the Ethical Considerations of Reverse Engineering?",
    answer:
      "Considerations include respecting intellectual property and ensuring data security.",
  },
  {
    question: "How to Choose a Reverse Engineering Service Provider?",
    answer:
      "Consider experience, technology, quality control, and confidentiality.",
  },
  {
    question: "What is the Cost of Reverse Engineering?",
    answer:
      "The cost varies based on part complexity, level of detail, and chosen methods.",
  },
  {
    question: "How Long Does the Reverse Engineering Process Take?",
    answer:
      "Duration depends on the complexity of the part and project requirements.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
<div className="absolute inset-0 bg-black/40 ">
    <div className="min-h-screen bg-gray-100  bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/banner1.jpeg')" }}>
        
      <NavBarWithOutBg />
      <div className="max-w-4xl mx-auto p-6 ">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow-md transition-all duration-300 hover:shadow-lg">
              <button
                className="w-full flex justify-between items-center text-left font-semibold text-gray-800 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg">{faq.question}</span>
                {openIndex === index ? <ChevronUp size={24} className="text-teal-500" /> : <ChevronDown size={24} className="text-teal-500" />}
              </button>
              {openIndex === index && (
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
    </div>
  );
}
