import React from "react";
import { useHistory } from "react-router-dom";
import { useRouteMatching } from "use-route-matching";
import { routes } from "./routes";

export const AppLayout = ({ children }) => {
  const history = useHistory();
  const routeMatching = useRouteMatching(routes);

  const handleClick = path => () => history.push(path);

  return (
    <>
      <header>
        <ul id="menu">
          <li
            onClick={handleClick(routes.list)}
            className={routeMatching.product.root || routeMatching.list ? "selected" : ""}
          >
            Products List
          </li>
          <li onClick={handleClick(routes.contact)} className={routeMatching.contact ? "selected" : ""}>
            Contact
          </li>
        </ul>
      </header>
      <main>{children}</main>
    </>
  );
};
