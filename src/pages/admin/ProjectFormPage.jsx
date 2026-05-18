import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectsAPI } from "../../services/api";
import {
  ArrowLeft,
  Plus,
  X,
  Save,
  Eye,
  Github,
  ExternalLink,
  Star,
  Image,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProjectFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    features: [],
    techStack: [],
    githubLink: "",
    liveLink: "",
    imageUrl: "",
    isFeatured: false,
    displayOrder: 0,
  });

  const [newFeature, setNewFeature] = useState("");
  const [newTech, setNewTech] = useState("");

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id, isEdit]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getById(id);
      const project = response.data.project;

      setFormData({
        title: project.title || "",
        description: project.description || "",
        fullDescription: project.full_description || "",
        features: project.features || [],
        techStack: project.tech_stack || [],
        githubLink: project.github_link || "",
        liveLink: project.live_link || "",
        imageUrl: project.image_url || "",
        isFeatured: project.is_featured || false,
        displayOrder: project.display_order || 0,
      });
    } catch (error) {
      console.error("Error fetching project:", error);
      toast.error("Failed to load project");
      navigate("/admin/projects");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const addTech = () => {
    if (newTech.trim()) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, newTech.trim()],
      });
      setNewTech("");
    }
  };

  const removeTech = (index) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await projectsAPI.update(id, formData);
        toast.success("Project updated successfully");
      } else {
        await projectsAPI.create(formData);
        toast.success("Project created successfully");
      }
      navigate("/admin/projects");
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-indigo-200 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/projects")}
          className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
            {isEdit ? "Edit Project" : "Create New Project"}
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            {isEdit
              ? "Update your project information and showcase details"
              : "Add a new project to your portfolio showcase"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Basic Information
              </h2>
              <p className="text-gray-600">
                Essential details about your project
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
                placeholder="Enter an engaging project title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Display Order
              </label>
              <input
                type="number"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
                placeholder="0"
              />
            </div>

            <div className="flex items-center">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5 text-yellow-600 bg-white border-yellow-300 rounded focus:ring-yellow-500 focus:ring-2"
                />
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <label className="text-sm font-semibold text-yellow-800">
                    Featured Project
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Short Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all resize-none"
              placeholder="Write a compelling brief description that captures the essence of your project"
            />
          </div>

          <div className="mt-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Detailed Description
            </label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all resize-none"
              placeholder="Provide a comprehensive description of your project, its goals, challenges, and solutions"
            />
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
              <p className="text-gray-600">
                Highlight the main features and capabilities
              </p>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addFeature())
              }
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 text-gray-900 transition-all"
              placeholder="Add a key feature (e.g., Real-time notifications)"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {formData.features.map((feature, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-2xl border border-green-200 group"
              >
                <span className="font-medium">{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-green-500 hover:text-green-700 hover:bg-green-200 rounded-full p-1 transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {formData.features.length === 0 && (
              <p className="text-gray-500 italic">
                No features added yet. Add some key features to highlight your
                project's capabilities.
              </p>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Technology Stack
              </h2>
              <p className="text-gray-600">
                Technologies and tools used in this project
              </p>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTech())
              }
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 text-gray-900 transition-all"
              placeholder="Add a technology (e.g., React, Node.js, PostgreSQL)"
            />
            <button
              type="button"
              onClick={addTech}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {formData.techStack.map((tech, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-2xl border border-purple-200 group"
              >
                <span className="font-medium">{tech}</span>
                <button
                  type="button"
                  onClick={() => removeTech(index)}
                  className="text-purple-500 hover:text-purple-700 hover:bg-purple-200 rounded-full p-1 transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {formData.techStack.length === 0 && (
              <p className="text-gray-500 italic">
                No technologies added yet. Add the technologies and tools you
                used to build this project.
              </p>
            )}
          </div>
        </div>

        {/* Links & Media */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Links & Media
              </h2>
              <p className="text-gray-600">Project links and visual assets</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </div>
              </label>
              <input
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
                placeholder="https://github.com/username/repository"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo URL
                </div>
              </label>
              <input
                type="url"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
                placeholder="https://your-project.abdulaki.com"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <div className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Project Image URL
                </div>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
                placeholder="https://example.com/project-screenshot.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-4 p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img
                    src={formData.imageUrl}
                    alt="Project preview"
                    className="w-full max-w-md h-48 object-cover rounded-xl border border-gray-200"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEdit ? "Update Project" : "Create Project"}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
