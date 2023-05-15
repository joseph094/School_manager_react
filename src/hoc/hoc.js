import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { GetUser } from "../api/api";

const withAuth = (Component, inRole) => {
  return function AuthComponent(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      async function checkAuth() {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/signin");
          return;
        }

        try {
          const decoded = jwtDecode(token);
          const user = await GetUser(decoded.sub, decoded.roles[0]);

          if (inRole && !inRole.some((role) => user.roles.includes(role))) {
            navigate("/unauthorized");
            return;
          }

          setIsLoading(false);
        } catch (error) {
          console.error(error);
          navigate("/signin");
        }
      }

      checkAuth();
    }, [navigate, inRole]);

    if (isLoading) {
      // Render loading state
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
