import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const apiClient = new ApolloClient({
  uri: process.env.REACT_APP_END_POINT || "http://localhost:4000",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const INITIAL_DATA_QUERY = gql`
  query InitialData {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

export const fetchInitialData = async () => {
  const {
    data: { categories, currencies },
  } = await apiClient.query({ query: INITIAL_DATA_QUERY });
  return { categories, currencies };
};

const CATEGORY_PRODUCTS_QUERY = gql`
  query CategoryProducts($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        brand
        inStock
        gallery
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
      }
    }
  }
`;

export const fetchCategoryProducts = async (categoryName) => {
  const res = await apiClient.query({
    query: CATEGORY_PRODUCTS_QUERY,
    variables: { title: categoryName },
  });
  return res.data.category.products;
};

const PRODUCT_INFO_QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      brand
      inStock
      gallery
      description
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
    }
  }
`;

export const fetchProductInfo = async (productId) => {
  return apiClient.query({
    query: PRODUCT_INFO_QUERY,
    variables: { id: productId },
  });
};

export default apiClient;
