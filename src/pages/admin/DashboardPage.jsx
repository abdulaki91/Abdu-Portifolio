import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projectsAPI, skillsAPI, experiencesAPI } from "../../services/api";
import {
  FolderOpen,
  Award,
  Briefcase,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Star,
  Calendar,
  Activity,
  Users,
  BarChart3,
} from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [projectsRes, skillsRes, experiencesRes] = await Promise.all([
        projectsAPI.getAll(),
        skillsAPI.getAll(),
        experiencesAPI.getAll(),
      ]);

      setStats({
        projects: projectsRes.data.projects.length,
        skills: skillsRes.data.skills.length,
        experiences: experiencesRes.data.experiences.length,
      });

      // Get recent projects (last 3)
      const projects = projectsRes.data.projects.slice(0, 3);
      setRecentProjects(projects);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: "Total Projects",
      value: stats.projects,
      icon: FolderOpen,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      link: "/admin/projects",
      change: "+12%",
      changeType: "increase",
    },
    {
      name: "Skills",
      value: stats.skills,
      icon: Award,
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      link: "/admin/skills",
      change: "+8%",
      changeType: "increase",
    },
    {
      name: "Experiences",
      value: stats.experiences,
      icon: Briefcase,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      link: "/admin/experience",
      change: "+3%",
      changeType: "increase",
    },
    {
      name: "Portfolio Views",
      value: "2.4k",
      icon: Eye,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      link: "#",
      change: "+23%",
      changeType: "increase",
    },
  ];

  const quickActions = [
    {
      name: "Add Project",
      description: "Create a new portfolio project",
      icon: FolderOpen,
      link: "/admin/projects/new",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Add Skill",
      description: "Add a new technical skill",
      icon: Award,
      link: "/admin/skills/new",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      name: "Add Experience",
      description: "Add work or education experience",
      icon: Briefcase,
      link: "/admin/experience/new",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "View Analytics",
      description: "Check portfolio performance",
      icon: BarChart3,
      link: "#",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  if (loading) {
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Welcome back! Here's what's happening with your portfolio.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <Eye className="w-5 h-5" />
            View Portfolio
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.link}
              className="group relative overflow-hidden bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      stat.changeType === "increase"
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-red-600 bg-red-50"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 font-medium">{stat.name}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Recent Projects
                </h2>
                <p className="text-gray-600">Your latest portfolio additions</p>
              </div>
              <Link
                to="/admin/projects"
                className="text-indigo-600 hover:text-indigo-500 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All
                <TrendingUp className="w-4 h-4" />
              </Link>
            </div>

            {recentProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FolderOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No projects yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first project to get started!
                </p>
                <Link
                  to="/admin/projects/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Add Project
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group p-6 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 border border-gray-100"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-bold text-gray-900 text-lg">
                            {project.title}
                          </h3>
                          {project.is_featured && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                              <Star className="w-3 h-3 fill-current" />
                              Featured
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack
                            ?.slice(0, 3)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-white/80 text-gray-700 text-sm rounded-xl border border-gray-200"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.tech_stack?.length > 3 && (
                            <span className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-xl">
                              +{project.tech_stack.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        to={`/admin/projects/${project.id}/edit`}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Quick Actions
            </h2>
            <p className="text-gray-600 mb-6">Manage your portfolio content</p>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.name}
                    to={action.link}
                    className="group flex items-center p-4 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 transition-all duration-200 border border-transparent hover:border-gray-200"
                  >
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-r ${action.gradient} mr-4`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-gray-800">
                        {action.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Recent Activity
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Project updated</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">New skill added</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Experience updated</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
