import { FaRegCreditCard, FaShieldAlt, FaGlobe, FaPhoneAlt } from "react-icons/fa";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <FaRegCreditCard size={30} />,
      title: "SAFE PAYMENT",
      description: "Pay with the world's most payment methods.",
    },
    {
      icon: <FaShieldAlt size={30} />,
      title: "CONFIDENCE",
      description: "Protection covers your purchase and personal data.",
    },
    {
      icon: <FaGlobe size={30} />,
      title: "WORLDWIDE DELIVERY",
      description: "FREE & fast shipping to over 200+ countries & regions.",
    },
    {
      icon: <FaPhoneAlt size={30} />,
      title: "HOTLINE",
      description: "Talk to help line for your question on 4141 456 789, 4125 666 888",
    },
  ];

  return (
    <div className="flex justify-center gap-8 py-6 t">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="text-gray-700">{benefit.icon}</div>
          <div>
            <h3 className="font-semibold">{benefit.title}</h3>
            <p className="text-sm text-gray-500">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BenefitsSection;
