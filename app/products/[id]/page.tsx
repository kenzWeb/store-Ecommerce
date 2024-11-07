import ProductDetail from './product-detail';

export async function generateStaticParams() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  
  return products.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetail params={params} />;
}