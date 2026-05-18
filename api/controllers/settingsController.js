import {
  getAllSettings,
  getSettingByKey,
  upsertSetting,
  deleteSetting,
} from "../models/settingsModel.js";

// Get all settings (public - for frontend)
export const listSettings = async (req, res, next) => {
  try {
    const result = await getAllSettings();
    // Convert to key-value object for easier frontend consumption
    const settings = {};
    result.rows.forEach((row) => {
      settings[row.setting_key] = row.setting_value;
    });
    res.json({ settings });
  } catch (err) {
    next(err);
  }
};

// Get single setting (public)
export const getSetting = async (req, res, next) => {
  try {
    const result = await getSettingByKey(req.params.key);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.json({ setting: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

// Update or create setting (admin only)
export const updateSetting = async (req, res, next) => {
  try {
    const { key, value, type, description } = req.body;

    if (!key || value === undefined) {
      return res.status(400).json({ message: "Key and value are required" });
    }

    const result = await upsertSetting(key, value, type || "text", description);
    res.json({
      message: "Setting updated successfully",
      setting: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

// Delete setting (admin only)
export const removeSetting = async (req, res, next) => {
  try {
    const result = await deleteSetting(req.params.key);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Setting not found" });
    }

    res.json({ message: "Setting deleted successfully" });
  } catch (err) {
    next(err);
  }
};
