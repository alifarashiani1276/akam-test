import { QueryClient } from '@tanstack/react-query';

/** Shared QueryClient. Ready for future remote data; see README. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/** Central place for query keys so future queries stay consistent. */
export const queryKeys = {
  products: {
    all: ['products'] as const,
    detail: (id: string) => ['products', id] as const,
  },
};
