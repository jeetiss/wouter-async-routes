import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useCallback,
  createContext,
  useContext
} from 'react'

import { Link as WLink, useRoute } from 'wouter'

const PathsContext = createContext(new Map())
const usePaths = () => useContext(PathsContext)

// TODO: not an actual switch!
const LazySwitch = ({ children, fallback }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>
}

const Route = ({ path, factory }) => {
  const paths = usePaths()
  const [matches] = useRoute(path)
  const Component = useMemo(() => lazy(factory), [factory])

  useEffect(() => {
    paths.set(path, factory)

    return () => paths.delete(path)
  }, [paths, path, factory])

  return matches && <Component />
}

const Link = ({ to, ...props }) => {
  const paths = usePaths()
  const prefetch = useCallback(() => {
    console.log('try prefetch route: ', to)

    if (paths.has(to)) {
      let fetcher = paths.get(to)

      // hack for run lazy promise
      fetcher().then(v => v)
    }
  }, [paths, to])

  return <WLink to={to} {...props} onMouseEnter={prefetch} />
}

export { Link, Route, LazySwitch }
