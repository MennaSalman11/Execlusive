
import { getSpecificBrand } from "@/lib/services/brands.services";
import Image from "next/image";

export default async function SpecificBrandPage({ params }: { params: { brandId: string } }) {
  console.log("brandId from params:", params.brandId);

  const res = await getSpecificBrand(params.brandId);
  console.log("API response:", res);

  const products = res.data || [];

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products for Brand</h1>
      {products.length === 0 ? (
        <p>No products found for this brand.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div key={product._id} className="border rounded-lg shadow p-4">
              <Image
                src={product.imageCover}
                alt={product.title}
                width={200}
                height={200}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="font-semibold">{product.title}</h2>
              <p className="text-gray-600">{product.category?.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

