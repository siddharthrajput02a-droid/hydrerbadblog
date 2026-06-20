"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const DAY_MS = 24 * 60 * 60 * 1000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
        gcTime: DAY_MS,
        retry: 1,
        refetchOnWindowFocus: false,
        networkMode: "offlineFirst"
      },
      mutations: {
        networkMode: "offlineFirst",
        retry: 0
      }
    }
  });
}

export function QueryProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [queryClient] = useState(makeQueryClient);
  const [persister] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return createSyncStoragePersister({
      storage: window.localStorage,
      key: "hyd-afterglow:tanstack-query"
    });
  });

  if (!persister) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: DAY_MS,
        buster: "ads-cache-v1",
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => query.state.status === "success"
        }
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
