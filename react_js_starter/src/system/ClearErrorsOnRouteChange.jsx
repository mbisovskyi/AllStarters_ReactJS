// React imports
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Context imports
import ErrorContext from "../contexts/ErrorContext";

export function ClearErrorsOnRouteChange() {
  const { resetErrors } = useContext(ErrorContext);
  const location = useLocation();

  useEffect(() => {
    resetErrors();
  }, [location.pathname]);

  return null;
}
