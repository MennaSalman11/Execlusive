import CategoriesSection from "@/components/Home/CategoriesSection";
import MainSlider from "@/components/Home/MainSlider";
import ProductSection from "@/components/Home/ProductSection";
import GridSkelton from "@/components/Home/shared/GridSkelton";
import { Suspense } from "react";
// import Image from "next/image";

export default function Home() {
  return (<>

  <MainSlider/>

<Suspense fallback={<GridSkelton/>}>
  <CategoriesSection/>
</Suspense>

<Suspense fallback={<GridSkelton/>}>
  <ProductSection/>
</Suspense>
  </>

  );
}
