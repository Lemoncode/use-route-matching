import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AppLayout } from "./app-layout";
import { Products } from "./pages/products.component";
import { Product } from "./pages/product.component";
import { Contact } from "./pages/contact.component";
import { routes } from "./routes";

export const AppRouter = () => (
  <BrowserRouter>
    <AppLayout>
      <Switch>
        <Route exact={true} path={routes.list}>
          <Products />
        </Route>
        <Route exact={true} path={routes.product.info}>
          <Product />
        </Route>
        <Route exact={true} path={routes.contact}>
          <Contact />
        </Route>
        <Redirect exact={false} to={routes.list} />
      </Switch>
    </AppLayout>
  </BrowserRouter>
);
