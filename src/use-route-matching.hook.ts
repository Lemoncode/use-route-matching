import { match, useLocation, matchPath } from "react-router-dom";

export type RoutesMatches<T, P> = {
  [K in keyof T]?: T[K] extends string ? match<P> : RoutesMatches<T[K], P>;
};

const useMatchPath = <P>(path: string) => {
  const location = useLocation();

  return matchPath<P>(location.pathname, {
    path,
    exact: false,
    strict: false,
  });
};

export const useRouteMatching = <T, P>(initial: T): RoutesMatches<T, P> =>
  Object.keys(initial).reduce(
    (a, c) =>
      typeof initial[c] === "string"
        ? { ...a, [c]: useMatchPath<P>(initial[c]) }
        : { ...a, [c]: useRouteMatching(initial[c]) },
    {}
  );

export const createAppRouteMatching = <T>(routes: T) => <P>() => useRouteMatching<T, P>(routes);
