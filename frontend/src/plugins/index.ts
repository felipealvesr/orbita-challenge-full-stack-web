import vuetify from './vuetify';
import router from '../routes/router';
import stores from '../stores/pinia';
import Vue3Toastify, { toast, type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import type { App } from 'vue';

export function registerPlugins(app: App) {
  app.use(vuetify);
  app.use(router);
  app.use(stores);

  interface Definition {
    kind: string;
    operation?: string;
  }

// http link
const httpLink = new HttpLink({  
  uri: 'https://localhost:7221/graphql',
})
// subscription websocket link
const wsLink = new WebSocketLink({
  uri: "wss://localhost:7221/graphql",
  options: {
    reconnect: true,
  },
})
// error link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ extensions, message, locations, path }) => {
      const extensionMessage = extensions?.message as string;
      toast.error(extensionMessage || message);
      console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
    });
  }

  if (networkError) 
    console.log(`[Network error]: ${networkError}`);
})

  // Apollo Link
  const link = split(
    ({ query }) => {
      const { kind, operation }: Definition = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink, // Para subscriptions
    httpLink // Para queries e mutations
  );

  const apolloClient = new ApolloClient({
    link: errorLink.concat(link),
    cache: new InMemoryCache(),
    connectToDevTools: true,
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      },
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });

  app.provide(DefaultApolloClient, apolloClient);
    
  // Toast Configuration
  app.use(Vue3Toastify, {
    autoClose: 3000,
    position: "top-right",
    hideProgressBar: false,
    draggable: true,
    draggablePercent: 0.6,
    pauseOnFocusLoss: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
  } as ToastContainerOptions);
}
