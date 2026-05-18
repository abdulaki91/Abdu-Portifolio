import { useState, useEffect } from "react";
import { settingsAPI, uploadAPI } from "../../services/api";
import baseUrl from "../../baseURL/baseUrl";
import {
  Upload,
  File,
  Image,
  FileText,
  Download,
  Trash2,
  Eye,
  Save,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

export default function MediaPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const [fileSettings, setFileSettings] = useState({
    cv_file_path: "",
    profile_image_path: "",
    site_logo_path: "",
    hero_background_path: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.getAll();
      setSettings(response.data.settings);

      // Extract file-related settings
      const fileKeys = Object.keys(fileSettings);
      const currentFileSettings = {};
      fileKeys.forEach((key) => {
        currentFileSettings[key] = response.data.settings[key] || "";
      });
      setFileSettings(currentFileSettings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load media settings");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file, settingKey) => {
    if (!file) return;

    setUploading(true);
    setUploadProgress({ [settingKey]: 0 });

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => ({
          ...prev,
          [settingKey]: Math.min((prev[settingKey] || 0) + 10, 90),
        }));
      }, 100);

      const fieldName = getFieldName(settingKey);
      const response = await uploadAPI.uploadSingle(fieldName, file);

      clearInterval(progressInterval);

      if (response.data.success) {
        // Update the setting with the new file path
        await settingsAPI.update({
          key: settingKey,
          value: response.data.file.url,
          type: "file",
          description: getSettingDescription(settingKey),
        });

        setFileSettings((prev) => ({
          ...prev,
          [settingKey]: response.data.file.url,
        }));

        setUploadProgress({ [settingKey]: 100 });
        toast.success(`${getDisplayName(settingKey)} uploaded successfully`);

        // Refresh settings
        await fetchSettings();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        `Failed to upload ${getDisplayName(settingKey)}: ${error.response?.data?.message || error.message}`,
      );
    } finally {
      setUploading(false);
      setTimeout(() => {
        setUploadProgress({});
      }, 1000);
    }
  };

  const getFieldName = (settingKey) => {
    const fieldMap = {
      cv_file_path: "cv",
      profile_image_path: "profile",
      site_logo_path: "icon",
      hero_background_path: "photo",
    };
    return fieldMap[settingKey] || "document";
  };

  const getDisplayName = (settingKey) => {
    const nameMap = {
      cv_file_path: "CV/Resume",
      profile_image_path: "Profile Image",
      site_logo_path: "Site Logo",
      hero_background_path: "Hero Background",
    };
    return nameMap[settingKey] || settingKey;
  };

  const getSettingDescription = (settingKey) => {
    const descMap = {
      cv_file_path: "CV/Resume file for download",
      profile_image_path: "Profile image displayed on the site",
      site_logo_path: "Site logo/icon",
      hero_background_path: "Background image for hero section",
    };
    return descMap[settingKey] || "";
  };

  const getAcceptedTypes = (settingKey) => {
    if (settingKey === "cv_file_path") return ".pdf,.doc,.docx";
    if (settingKey.includes("image") || settingKey.includes("background"))
      return ".jpg,.jpeg,.png,.webp";
    if (settingKey.includes("logo") || settingKey.includes("icon"))
      return ".svg,.png,.ico,.jpg,.jpeg";
    return ".pdf,.doc,.docx,.jpg,.jpeg,.png,.svg";
  };

  const getFileIcon = (settingKey) => {
    if (settingKey === "cv_file_path") return FileText;
    if (
      settingKey.includes("image") ||
      settingKey.includes("background") ||
      settingKey.includes("logo")
    )
      return Image;
    return File;
  };

  const handleRemoveFile = async (settingKey) => {
    try {
      await settingsAPI.update({
        key: settingKey,
        value: "",
        type: "file",
        description: getSettingDescription(settingKey),
      });

      setFileSettings((prev) => ({
        ...prev,
        [settingKey]: "",
      }));

      toast.success(`${getDisplayName(settingKey)} removed successfully`);
      await fetchSettings();
    } catch (error) {
      console.error("Remove error:", error);
      toast.error(`Failed to remove ${getDisplayName(settingKey)}`);
    }
  };

  const isImage = (path) => {
    if (!path) return false;
    const ext = path.split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "webp", "svg"].includes(ext);
  };

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
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
          Media Management
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Upload and manage your portfolio files and images
        </p>
      </div>

      {/* File Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(fileSettings).map((settingKey) => {
          const Icon = getFileIcon(settingKey);
          const currentFile = fileSettings[settingKey];
          const progress = uploadProgress[settingKey];
          const fileUrl = currentFile.startsWith("/uploads") ? `${baseUrl}${currentFile}` : currentFile;

          return (
            <div
              key={settingKey}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {getDisplayName(settingKey)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {getSettingDescription(settingKey)}
                  </p>
                </div>
              </div>

              {/* Current File Display with Thumbnail */}
              {currentFile && (
                <div className="mb-4 space-y-3">
                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span className="text-sm font-medium text-green-800 truncate">
                          {currentFile.split("/").pop()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {currentFile && (
                          <button
                            onClick={() => isImage(currentFile) ? setPreviewImage(fileUrl) : window.open(fileUrl, "_blank")}
                            className="p-1.5 bg-white text-indigo-600 hover:text-indigo-800 rounded-lg shadow-sm border border-indigo-100 transition-colors"
                            title="View File"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveFile(settingKey)}
                          className="p-1.5 bg-white text-red-600 hover:text-red-800 rounded-lg shadow-sm border border-red-100 transition-colors"
                          title="Remove File"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Image Thumbnail */}
                  {isImage(currentFile) && (
                    <div 
                      className="relative w-full h-32 rounded-2xl overflow-hidden border border-gray-100 group cursor-pointer"
                      onClick={() => setPreviewImage(fileUrl)}
                    >
                      <img 
                        src={fileUrl} 
                        alt={getDisplayName(settingKey)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Upload Progress */}
              {progress !== undefined && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Uploading...
                    </span>
                    <span className="text-sm text-gray-600">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* File Upload Input */}
              <div className="relative">
                <input
                  type="file"
                  accept={getAcceptedTypes(settingKey)}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleFileUpload(file, settingKey);
                    }
                  }}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-200">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    {getAcceptedTypes(settingKey)
                      .replace(/\./g, "")
                      .toUpperCase()}{" "}
                    files (max 10MB)
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage Guidelines */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              File Upload Guidelines
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • <strong>CV/Resume:</strong> PDF format recommended for best
                compatibility
              </li>
              <li>
                • <strong>Profile Image:</strong> Square aspect ratio (1:1)
                works best, minimum 400x400px
              </li>
              <li>
                • <strong>Site Logo:</strong> SVG format preferred for
                scalability, or PNG with transparent background
              </li>
              <li>
                • <strong>Hero Background:</strong> High resolution (1920x1080
                or larger) for best quality
              </li>
              <li>
                • <strong>File Size:</strong> Maximum 10MB per file
              </li>
              <li>
                • <strong>Security:</strong> Only upload files you own and trust
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current Media Overview */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <File className="w-5 h-5 text-indigo-600" />
          Current Media Files
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(fileSettings).map(([key, value]) => {
             const fileUrl = value.startsWith("/uploads") ? `${baseUrl}${value}` : value;
             return (
            <div key={key} className="p-4 bg-gray-50 rounded-2xl group transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 text-sm">
                  {getDisplayName(key)}
                </h4>
                {value && (
                  <button 
                    onClick={() => isImage(value) ? setPreviewImage(fileUrl) : window.open(fileUrl, "_blank")}
                    className="p-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Thumbnail in overview */}
              {value && isImage(value) ? (
                <div 
                  className="w-full h-24 rounded-xl overflow-hidden mb-2 cursor-pointer"
                  onClick={() => setPreviewImage(fileUrl)}
                >
                  <img src={fileUrl} alt="" className="w-full h-full object-cover" />
                </div>
              ) : value ? (
                <div className="w-full h-24 bg-white rounded-xl flex items-center justify-center mb-2 border border-gray-200">
                   <FileText className="w-10 h-10 text-gray-300" />
                </div>
              ) : null}

              <p className="text-xs text-gray-600 truncate">
                {value || "No file uploaded"}
              </p>
              
              {value && (
                <div className="mt-2 flex items-center gap-2">
                  <a
                    href={fileUrl}
                    download
                    className="text-xs text-green-600 hover:text-green-800 flex items-center gap-1 font-medium"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </a>
                </div>
              )}
            </div>
          )})}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setPreviewImage(null)}
        >
          <button 
            onClick={() => setPreviewImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 text-white hover:bg-white/20 rounded-full transition-all z-[110]"
          >
            <X className="w-8 h-8" />
          </button>
          <div 
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
