import { useState, useEffect } from "react";
import { settingsAPI } from "../../services/api";
import {
  Save,
  Settings,
  Globe,
  Mail,
  User,
  Palette,
  Info,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Phone,
} from "lucide-react";
import toast from "react-hot-toast";

// InputField component moved outside to prevent re-creation on each render
const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  rows = null,
  icon: Icon = null,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-3">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        {label}
      </div>
    </label>
    {rows ? (
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all resize-none"
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 text-gray-900 transition-all"
        placeholder={placeholder}
      />
    )}
  </div>
);

// SettingSection component moved outside to prevent re-creation
const SettingSection = ({ title, icon: Icon, children, sectionKey }) => {
  const [saving, setSaving] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600">
              Configure your portfolio {title.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
};

export default function SettingsPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    // Site Information
    site_title: "",
    site_description: "",
    hero_title: "",
    hero_subtitle: "",
    about_text: "",

    // Contact Information
    contact_email: "",
    contact_phone: "",

    // Social Links
    github_url: "",
    linkedin_url: "",
    twitter_url: "",
    website_url: "",

    // SEO & Meta
    meta_keywords: "",
    meta_author: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.getAll();
      const settingsData = response.data.settings;
      setSettings(settingsData);

      // Populate form with existing settings
      const newFormData = {
        // Site Information
        site_title: settingsData.site_title || "",
        site_description: settingsData.site_description || "",
        hero_title: settingsData.hero_title || "",
        hero_subtitle: settingsData.hero_subtitle || "",
        about_text: settingsData.about_text || "",

        // Contact Information
        contact_email: settingsData.contact_email || "",
        contact_phone: settingsData.contact_phone || "",

        // Social Links
        github_url: settingsData.github_url || "",
        linkedin_url: settingsData.linkedin_url || "",
        twitter_url: settingsData.twitter_url || "",
        website_url: settingsData.website_url || "",

        // SEO & Meta
        meta_keywords: settingsData.meta_keywords || "",
        meta_author: settingsData.meta_author || "",
      };

      setFormData(newFormData);
      console.log("Settings loaded:", settingsData);
      console.log("Form data initialized:", newFormData);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async (section) => {
    setSaving(true);

    try {
      const sectionKeys = getSectionKeys(section);
      const promises = sectionKeys.map((key) =>
        settingsAPI.update({
          key,
          value: formData[key],
          type: "text",
          description: getSettingDescription(key),
        }),
      );

      await Promise.all(promises);
      toast.success(`${section} settings saved successfully`);
      await fetchSettings(); // Refresh settings
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const getSectionKeys = (section) => {
    switch (section) {
      case "Site Information":
        return [
          "site_title",
          "site_description",
          "hero_title",
          "hero_subtitle",
          "about_text",
          "meta_keywords",
          "meta_author",
        ];
      case "Contact Information":
        return ["contact_email", "contact_phone"];
      case "Social Links":
        return ["github_url", "linkedin_url", "twitter_url", "website_url"];
      case "SEO & Meta":
        return ["meta_keywords", "meta_author"];
      default:
        return [];
    }
  };

  const getSettingDescription = (key) => {
    const descriptions = {
      site_title: "Website title displayed in browser tab",
      site_description: "Brief description of your portfolio",
      hero_title: "Main heading on homepage hero section",
      hero_subtitle: "Subtitle text on homepage hero section",
      about_text: "About section content",
      contact_email: "Primary contact email address",
      contact_phone: "Contact phone number",
      github_url: "GitHub profile URL",
      linkedin_url: "LinkedIn profile URL",
      twitter_url: "Twitter profile URL",
      website_url: "Personal website URL",
      meta_keywords: "SEO keywords for search engines",
      meta_author: "Author name for meta tags",
    };
    return descriptions[key] || "";
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
          Portfolio Settings
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Customize your portfolio content and configuration
        </p>
      </div>

      {/* Site Information */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Site Information
              </h2>
              <p className="text-gray-600">
                Configure your portfolio site information
              </p>
            </div>
          </div>
          <button
            onClick={() => handleSave("Site Information")}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InputField
              label="Site Title"
              value={formData.site_title}
              onChange={(value) => handleChange("site_title", value)}
              placeholder="Abdulaki Mohammed - Portfolio"
              icon={Globe}
            />
            <InputField
              label="Meta Author"
              value={formData.meta_author}
              onChange={(value) => handleChange("meta_author", value)}
              placeholder="Abdulaki Mohammed"
              icon={User}
            />
          </div>

          <InputField
            label="Site Description"
            value={formData.site_description}
            onChange={(value) => handleChange("site_description", value)}
            placeholder="Full Stack Developer & Software Engineer specializing in modern web technologies"
            rows={2}
            icon={Info}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InputField
              label="Hero Title"
              value={formData.hero_title}
              onChange={(value) => handleChange("hero_title", value)}
              placeholder="Hi, I'm Abdulaki Mohammed"
              icon={User}
            />
            <InputField
              label="Hero Subtitle"
              value={formData.hero_subtitle}
              onChange={(value) => handleChange("hero_subtitle", value)}
              placeholder="Full Stack Developer"
              icon={Palette}
            />
          </div>

          <InputField
            label="About Text"
            value={formData.about_text}
            onChange={(value) => handleChange("about_text", value)}
            placeholder="Write a compelling about section that describes your background, skills, and passion for development. This text will appear in the About section of your portfolio..."
            rows={6}
            icon={User}
          />

          <InputField
            label="SEO Keywords"
            value={formData.meta_keywords}
            onChange={(value) => handleChange("meta_keywords", value)}
            placeholder="full stack developer, react, node.js, web development, software engineer"
            rows={2}
            icon={Settings}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Contact Information
              </h2>
              <p className="text-gray-600">
                Configure your portfolio contact information
              </p>
            </div>
          </div>
          <button
            onClick={() => handleSave("Contact Information")}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputField
            label="Contact Email"
            value={formData.contact_email}
            onChange={(value) => handleChange("contact_email", value)}
            placeholder="contact@abdulaki.com"
            type="email"
            icon={Mail}
          />
          <InputField
            label="Phone Number"
            value={formData.contact_phone}
            onChange={(value) => handleChange("contact_phone", value)}
            placeholder="+1 (555) 123-4567"
            type="tel"
            icon={Phone}
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Social Links</h2>
              <p className="text-gray-600">
                Configure your portfolio social links
              </p>
            </div>
          </div>
          <button
            onClick={() => handleSave("Social Links")}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputField
            label="GitHub URL"
            value={formData.github_url}
            onChange={(value) => handleChange("github_url", value)}
            placeholder="https://github.com/abdulaki91"
            type="url"
            icon={Github}
          />
          <InputField
            label="LinkedIn URL"
            value={formData.linkedin_url}
            onChange={(value) => handleChange("linkedin_url", value)}
            placeholder="https://linkedin.com/in/abdulaki"
            type="url"
            icon={Linkedin}
          />
          <InputField
            label="Twitter URL"
            value={formData.twitter_url}
            onChange={(value) => handleChange("twitter_url", value)}
            placeholder="https://twitter.com/abdulaki"
            type="url"
            icon={Twitter}
          />
          <InputField
            label="Website URL"
            value={formData.website_url}
            onChange={(value) => handleChange("website_url", value)}
            placeholder="https://abdulaki.com"
            type="url"
            icon={Globe}
          />
        </div>
      </div>

      {/* Current Settings Preview */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-600" />
          Current Settings Preview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(settings)
            .slice(0, 9)
            .map(([key, value]) => (
              <div key={key} className="bg-white/80 rounded-2xl p-4">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </h4>
                <p className="text-gray-600 text-xs truncate">
                  {value || "Not set"}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Save All Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={async () => {
            setSaving(true);
            try {
              const promises = Object.keys(formData).map((key) =>
                settingsAPI.update({
                  key,
                  value: formData[key],
                  type: "text",
                  description: getSettingDescription(key),
                }),
              );

              await Promise.all(promises);
              toast.success("All settings saved successfully");
              await fetchSettings();
            } catch (error) {
              console.error("Error saving all settings:", error);
              toast.error("Failed to save settings");
            } finally {
              setSaving(false);
            }
          }}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          <Save className="w-5 h-5" />
          {saving ? "Saving All Settings..." : "Save All Settings"}
        </button>
      </div>
    </div>
  );
}
