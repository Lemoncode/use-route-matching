import React from "react";
import { useHistory, generatePath } from "react-router-dom";
import { useRouteMatching } from "use-route-matching";
import { routes } from "../routes";
import { products } from "./mock-data";

export const Products = () => {
  const history = useHistory();

  const routeMatching = useRouteMatching(routes);

  const handleClick = id => () => history.push(generatePath(routes.product.info, { id }));

  return (
    <ul id="products">
      {products.map(item => (
        <li
          key={item.id}
          onClick={handleClick(item.id)}
          className={routeMatching.product.root?.params?.id === item.id.toString() ? "selected" : ""}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};
