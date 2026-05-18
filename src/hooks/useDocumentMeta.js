import { useEffect } from "react";

export const useDocumentMeta = (settings) => {
  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) return;

    // Update document title
    if (settings.site_title) {
      document.title = settings.site_title;
    }

    // Update favicon
    if (settings.site_logo_path) {
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        const logoUrl = settings.site_logo_path.startsWith("/uploads")
          ? `http://localhost:5000${settings.site_logo_path}`
          : settings.site_logo_path;
        favicon.setAttribute("href", logoUrl);
      }
    }

    // Update meta description
    if (settings.site_description) {
      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", settings.site_description);
      }
    }

    // Update meta keywords
    if (settings.meta_keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", settings.meta_keywords);
      }
    }

    // Update meta author
    if (settings.meta_author) {
      const metaAuthor = document.querySelector('meta[name="author"]');
      if (metaAuthor) {
        metaAuthor.setAttribute("content", settings.meta_author);
      }
    }

    // Update Open Graph title
    if (settings.site_title) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", settings.site_title);
      }
    }

    // Update Open Graph description
    if (settings.site_description) {
      const ogDescription = document.querySelector(
        'meta[property="og:description"]',
      );
      if (ogDescription) {
        ogDescription.setAttribute("content", settings.site_description);
      }
    }

    // Update Open Graph image
    if (settings.profile_image_path) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        const imageUrl = settings.profile_image_path.startsWith("/uploads")
          ? `http://localhost:5000${settings.profile_image_path}`
          : settings.profile_image_path;
        ogImage.setAttribute("content", imageUrl);
      }
    }

    // Update Twitter title
    if (settings.site_title) {
      const twitterTitle = document.querySelector(
        'meta[property="twitter:title"]',
      );
      if (twitterTitle) {
        twitterTitle.setAttribute("content", settings.site_title);
      }
    }

    // Update Twitter description
    if (settings.site_description) {
      const twitterDescription = document.querySelector(
        'meta[property="twitter:description"]',
      );
      if (twitterDescription) {
        twitterDescription.setAttribute("content", settings.site_description);
      }
    }

    // Update Twitter image
    if (settings.profile_image_path) {
      const twitterImage = document.querySelector(
        'meta[property="twitter:image"]',
      );
      if (twitterImage) {
        const imageUrl = settings.profile_image_path.startsWith("/uploads")
          ? `http://localhost:5000${settings.profile_image_path}`
          : settings.profile_image_path;
        twitterImage.setAttribute("content", imageUrl);
      }
    }
  }, [settings]);
};
