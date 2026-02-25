import React from 'react';
import { Lightbulb, Users, Smartphone, Key } from 'lucide-react';

export const SecurityTips: React.FC = () => {
  const tips = [
    {
      icon: <Key className="text-blue-500" size={24} />,
      title: "Use a Password Manager",
      description: "Generate and store unique passwords for every account safely."
    },
    {
      icon: <Smartphone className="text-green-500" size={24} />,
      title: "Enable Two-Factor Authentication",
      description: "Add an extra layer of security beyond just your password."
    },
    {
      icon: <Users className="text-purple-500" size={24} />,
      title: "Never Share Passwords",
      description: "Keep your passwords private and don't reuse them across sites."
    },
    {
      icon: <Lightbulb className="text-yellow-500" size={24} />,
      title: "Use Passphrases",
      description: "Consider using memorable phrases with random words and numbers."
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Security Best Practices</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        {tips.map((tip, index) => (
          <div 
            key={index}
            className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex-shrink-0 mt-1">
              {tip.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800 mb-1">{tip.title}</h4>
              <p className="text-sm text-gray-600">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};