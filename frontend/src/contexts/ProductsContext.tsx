import { createContext, useContext, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Product A', price: 100 },
  { id: 2, name: 'Product B', price: 200 },
  { id: 3, name: 'Product C', price: 300 },
];

const ProductsContext = createContext<Product[]>(products);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
