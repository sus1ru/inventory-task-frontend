export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}
export interface AddProductRequest {
  name: string;
  category: number;
  price: number;
  quantity: number;
}


export interface EditProductRequest {
  id: string;
  name: string;
  category: number;
  price: number;
  quantity: number;
}


export interface ProductsResponse {
  results: Product[];
  count: number;
  next: string | null;
 previous: string | null;
}

export interface Dashboard 
{
    total_products: number;
    total_categories: number;
    in_stock: number;
    low_stock: number;
    out_of_stock: number;
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
}

export type GetProductsQuery = 
  string | number | null ;

export interface LoginResponse {

}