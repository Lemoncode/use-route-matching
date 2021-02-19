import { match } from "react-router-dom";

export type RoutesMatches<T, P> = {
  [K in keyof T]?: T[K] extends string ? match<P> : RoutesMatches<T[K], P>;
};

export declare function useRouteMatching<T, P>(initial: T): RoutesMatches<T, P>;

export declare function createAppRouteMatching<T>(routes: T): <P>() => RoutesMatches<T, P>;
