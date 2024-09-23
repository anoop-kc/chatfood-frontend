export interface CategoryWithDish {
  id: string;
  name: string;
  items: Dishitem[];
}

export interface Dishitem {
  id: string;
  name: string;
  url?: string;
  price: number;
  discount_rate?: number;
  stock: Stock;
  description: string;
  photo?: string;
  category_id: string;
}

interface Stock {
  availability: number;
}
