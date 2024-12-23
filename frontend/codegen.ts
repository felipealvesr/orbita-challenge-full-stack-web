import type { CodegenConfig } from '@graphql-codegen/cli';

const graphqlUrl = 'https://localhost:7221/graphql';

const config: CodegenConfig = {
  schema: graphqlUrl,
  documents: ['src/graphql/**/*.graphql'],

  ignoreNoDocuments: true, 
  generates: {
    './src/graphql/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        skipTypename: true,
        useTypeImports: true,
        scalars: {
          DateTime: 'string | Date',
          Decimal: 'number',
          Long: 'number',
          Short: 'number',
        },
      },
    },
    // './src/graphql/file.json': {
    //   plugins: ['fragment-matcher'],
    //   config: {
    //     useExplicitTyping: true,
    //   },
    // },
  },
};

export default config;
