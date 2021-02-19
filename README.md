# use-route-matching

## Features

Retrieves an object with the same structure as the application routes, with the match information about the current location.

## Usage

> **Important** It is necessary to use it in Router's child components.

For example, if you have the following routes object:

```
const routes = {
  list: "/products",
  product: {
    root: "/product/:id",
    info: "/product/:id/info",
    gallery: "/product/:id/gallery",
    details: "/product/:id/details",
  },
  contact: "/contact",
};
```

You can use the hook in your product info component (ie: _/product/1955/info_):

```javascript
const routeMatching = useRouteMatching(routes);
```

You have the following result:

```javascript
routeMatching = {
  list: null,
  product: {
    root: { path: "/product/:id", url: "/product/1955", isExact: false, params: { id: "1955" } },
    info: { path: "/product/:id/info", url: "/product/1955/info", isExact: true, params: { id: "1955" } },
    gallery: null,
    details: null,
  },
  contact: null,
};
```

## Installing

Using npm:

```bash
$ npm install use-route-matching
```

Using yarn:

```bash
$ yarn install use-route-matching
```

## Peer dependencies

**use-route-matching** needs the following peer dependencies:

```
"react": ">=16.8.6",
"react-dom": ">=16.8.6",
"react-router-dom": ">=5.1.2"
```

## Typescript

**use-route-matching** includes TypeScript definitions.

## Example

```javascript
import React from "react";
import { useHistory } from "react-router-dom";
import { useRouteMatching } from "use-route-matching";
import { routes } from "./routes";

const routes = {
  list: "/products",
  profile: {
    root: "/user-profile",
    account: "/user-profile/account",
    settings: "/user-profile/settings",
  },
  contact: "/contact",
};

export const AppLayout = ({ children }) => {
  const history = useHistory();
  const routeMatching = useRouteMatching(routes);

  const handleClick = path => () => history.push(path);

  return (
    <>
      <header>
        <ul>
          <li onClick={handleClick(routes.list)} className={routeMatching.list ? "selected" : ""}>
            Products List
          </li>
          <li onClick={handleClick(routes.contact)} className={routeMatching.contact ? "selected" : ""}>
            Contact
          </li>
          <li className={routeMatching.profile.root ? "selected" : ""}>
            Profile
            <ul>
              <li
                onClick={handleClick(routes.profile.account)}
                className={routeMatching.profile.account ? "selected" : ""}
              >
                Account
              </li>
              <li
                onClick={handleClick(routes.profile.settings)}
                className={routeMatching.profile.settings ? "selected" : ""}
              >
                Settings
              </li>
            </ul>
          </li>
        </ul>
      </header>
      <main>{children}</main>
    </>
  );
};
```

## Credits

[Link to author github](https://github.com/v-borrego)
