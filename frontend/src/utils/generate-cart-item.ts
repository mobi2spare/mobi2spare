interface Item {
  id: any;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item) {
  const { _id, name, image, price } = item;
  return {
    id: _id,
    name,
    image: image,
    price,
  };
}
