import { User, Mail, MapPin, Phone, Globe, Github, Linkedin, Twitter } from "lucide-react";

const AboutPage = () => {
  const personalInfo = [
    {
      icon: <User className="text-gray-700" />,
      label: "Full Name",
      value: "Abdulhakim Abdiko"
    },
    {
      icon: <Mail className="text-gray-700" />,
      label: "Email",
      value: "abdulhakimabdiko@gmail.com"
    },
    {
      icon: <MapPin className="text-gray-700" />,
      label: "Location",
      value: "Addis Ababa, Ethiopia"
    },
    {
      icon: <Phone className="text-gray-700" />,
      label: "Phone",
      value: "+251 912 345 678"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="text-gray-700" />,
      label: "GitHub",
      url: "https://github.com/abex-COM",
      color: "hover:text-gray-800"
    },
    {
      icon: <Linkedin className="text-gray-700" />,
      label: "LinkedIn",
      url: "https://linkedin.com/in/abdulhakim-abdiko",
      color: "hover:text-blue-600"
    },
    {
      icon: <Twitter className="text-gray-700" />,
      label: "Twitter",
      url: "https://twitter.com/abdulhakim_ab",
      color: "hover:text-blue-400"
    },
    {
      icon: <Globe className="text-gray-700" />,
      label: "Website",
      url: "https://abdiko.com",
      color: "hover:text-green-600"
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Me</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Passionate Computer Science graduate with expertise in React, React Native, and modern web technologies. 
            Dedicated to creating innovative solutions that make a difference.
          </p>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalInfo.map((info, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{info.label}</p>
                  <p className="text-gray-800">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Biography</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              I am a recent Computer Science graduate from Haramaya University, passionate about 
              software development and technology innovation. My journey in tech began with a curiosity 
              about how digital solutions can solve real-world problems.
            </p>
            <p>
              During my studies, I developed a strong foundation in programming fundamentals, 
              algorithms, and software engineering principles. I've worked on various projects 
              including mobile applications, web platforms, and AI-powered solutions.
            </p>
            <p>
              I believe in continuous learning and staying updated with the latest technologies. 
              My goal is to contribute to meaningful projects that have a positive impact on 
              society, particularly in areas like education, agriculture, and business solutions.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Connect With Me</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center p-4 bg-gray-50 rounded-lg transition-colors duration-200 ${social.color}`}
              >
                <div className="mb-2">
                  {social.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
