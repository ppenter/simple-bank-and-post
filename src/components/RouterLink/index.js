import { Link as RouterLink } from "react-router-dom";

export const Link = ({ children, to }) => {
  return (
    <RouterLink style={{ textDecoration: "none" }} to={to}>
      {children}
    </RouterLink>
  );
};
