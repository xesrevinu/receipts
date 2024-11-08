/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ReceiptIdImport } from './routes/receipt/$id'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ReceiptIdRoute = ReceiptIdImport.update({
  id: '/receipt/$id',
  path: '/receipt/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/receipt/$id': {
      id: '/receipt/$id'
      path: '/receipt/$id'
      fullPath: '/receipt/$id'
      preLoaderRoute: typeof ReceiptIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/receipt/$id': typeof ReceiptIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/receipt/$id': typeof ReceiptIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/receipt/$id': typeof ReceiptIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/receipt/$id'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/receipt/$id'
  id: '__root__' | '/' | '/receipt/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ReceiptIdRoute: typeof ReceiptIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ReceiptIdRoute: ReceiptIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/receipt/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/receipt/$id": {
      "filePath": "receipt/$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
