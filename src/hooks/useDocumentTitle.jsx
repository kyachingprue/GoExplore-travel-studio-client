import { useEffect } from "react";

/**
 * Custom hook to set the document title
 * @param {string} pageTitle - The title of the current page
 * @param {string} siteName - Your website name
 */
const useDocumentTitle = (pageTitle, siteName = "GoExplore") => {
  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} | ${siteName}`;
    } else {
      document.title = siteName;
    }
  }, [pageTitle, siteName]);
};

export default useDocumentTitle;
