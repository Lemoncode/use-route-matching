import React from "react";
import { useRouteMatching } from "use-route-matching";
import { routes } from "../routes";
import { products } from "./mock-data";
import { Products } from "./products.component";

export const Product = () => {
  const routeMatching = useRouteMatching(routes);

  console.log(JSON.stringify(routeMatching));

  const { id } = routeMatching.product.info.params;

  const item = products.find(p => p.id === parseInt(id));

  return (
    <div id="product-container">
      <Products />
      <div id="product">
        <div>Product #{item.id}</div>
        <div>{item.name}</div>
      </div>
    </div>
  );
};
