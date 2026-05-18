import { useState, useEffect } from "react";
import { experiencesAPI } from "../../services/api";
import {
  Plus,
  Edit,
  Trash2,
  Briefcase,
  GraduationCap,
  Code,
  Search,
  Filter,
  Calendar,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    icon: "briefcase",
    type: "work",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    displayOrder: 0,
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await experiencesAPI.getAll();
      setExperiences(response.data.experiences);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      toast.error("Failed to load experiences");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const experienceData = {
        ...formData,
        startDate: formData.startDate || null,
        endDate: formData.isCurrent ? null : formData.endDate || null,
      };

      if (editingExperience) {
        await experiencesAPI.update(editingExperience.id, experienceData);
        toast.success("Experience updated successfully");
      } else {
        await experiencesAPI.create(experienceData);
        toast.success("Experience created successfully");
      }

      await fetchExperiences();
      resetForm();
    } catch (error) {
      console.error("Error saving experience:", error);
      toast.error("Failed to save experience");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setFormData({
      title: experience.title,
      subtitle: experience.subtitle,
      icon: experience.icon || "briefcase",
      type: experience.type || "work",
      startDate: experience.start_date
        ? experience.start_date.split("T")[0]
        : "",
      endDate: experience.end_date ? experience.end_date.split("T")[0] : "",
      isCurrent: experience.is_current || false,
      description: experience.description || "",
      displayOrder: experience.display_order || 0,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await experiencesAPI.delete(id);
      setExperiences(experiences.filter((exp) => exp.id !== id));
      toast.success("Experience deleted successfully");
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("Failed to delete experience");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      icon: "briefcase",
      type: "work",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
      displayOrder: 0,
    });
    setEditingExperience(null);
    setShowAddForm(false);
  };

  const filteredExperiences = experiences.filter((exp) => {
    const matchesSearch =
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.subtitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterBy === "all" || exp.type === filterBy;

    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "education":
        return GraduationCap;
      case "project":
        return Code;
      default:
        return Briefcase;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "education":
        return "from-green-500 to-emerald-500";
      case "project":
        return "from-purple-500 to-pink-500";
      default:
        return "from-blue-500 to-cyan-500";
    }
  };

  if (loading && experiences.length === 0) {
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
            Experience & Education
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage your professional journey and educational background
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search experiences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
            >
              <option value="all">All Types</option>
              <option value="work">Work Experience</option>
              <option value="education">Education</option>
              <option value="project">Projects</option>
            </select>
          </div>
        </div>
      </div>

      {/* Experiences Timeline */}
      {filteredExperiences.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {searchTerm || filterBy !== "all"
              ? "No experiences found"
              : "No experiences yet"}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {searchTerm || filterBy !== "all"
              ? "Try adjusting your search terms or filters."
              : "Start building your professional timeline by adding your first experience."}
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="space-y-8">
            {filteredExperiences.map((experience, index) => {
              const Icon = getTypeIcon(experience.type);
              return (
                <div key={experience.id} className="relative">
                  {/* Timeline Line */}
                  {index < filteredExperiences.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-transparent"></div>
                  )}

                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${getTypeColor(experience.type)} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl p-6 hover:from-indigo-50 hover:to-purple-50 transition-all duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {experience.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {experience.subtitle}
                          </p>

                          {/* Date Range */}
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {experience.start_date &&
                                new Date(
                                  experience.start_date,
                                ).toLocaleDateString()}
                              {experience.start_date && " - "}
                              {experience.is_current
                                ? "Present"
                                : experience.end_date
                                  ? new Date(
                                      experience.end_date,
                                    ).toLocaleDateString()
                                  : ""}
                            </span>
                            {experience.is_current && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                Current
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          {experience.description && (
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {experience.description}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(experience)}
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(experience.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-3 py-1 bg-gradient-to-r ${getTypeColor(experience.type)} text-white text-xs font-medium rounded-full`}
                        >
                          {experience.type.charAt(0).toUpperCase() +
                            experience.type.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Order: {experience.display_order}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingExperience ? "Edit Experience" : "Add New Experience"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
                    placeholder="e.g., Senior Developer, BSc Computer Science"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subtitle *
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
                    placeholder="e.g., Company Name - Location, University Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
                  >
                    <option value="work">Work Experience</option>
                    <option value="education">Education</option>
                    <option value="project">Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        displayOrder: parseInt(e.target.value),
                      })
                    }
                    min="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    disabled={formData.isCurrent}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all disabled:opacity-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <input
                      type="checkbox"
                      checked={formData.isCurrent}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isCurrent: e.target.checked,
                          endDate: e.target.checked ? "" : formData.endDate,
                        })
                      }
                      className="w-5 h-5 text-green-600 bg-white border-green-300 rounded focus:ring-green-500 focus:ring-2"
                    />
                    <label className="text-sm font-semibold text-green-800">
                      This is my current position/education
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all resize-none"
                    placeholder="Describe your role, responsibilities, achievements, or what you learned..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editingExperience
                      ? "Update Experience"
                      : "Add Experience"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Delete Experience
              </h3>
              <p className="text-gray-600 mb-8">
                Are you sure you want to delete this experience? This action
                cannot be undone.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200"
                >
                  Delete Experience
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
