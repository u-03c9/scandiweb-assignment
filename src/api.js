import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const apiClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const CATEGORY_NAMES_QUERY = gql`
  query {
    categories {
      name
    }
  }
`;
export const fetchCategoryNames = async () => {
  const res = await apiClient.query({ query: CATEGORY_NAMES_QUERY });
  return res.data.categories;
};

const CURRENCY_OPTIONS_QUERY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
export const fetchCurrencyOptions = async () => {
  const res = await apiClient.query({ query: CURRENCY_OPTIONS_QUERY });
  return res.data.currencies;
};

export default apiClient;
