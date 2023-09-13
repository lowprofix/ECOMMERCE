import Container from "@/components/ui/container";
import Billboard from "@/components/ui/billboard";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";
import TextDescription from "@/components/ui/textDescription";

import getProducts from "@/actions/get-products";
import getCategory from "@/actions/get-category";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getAvailabilities from "@/actions/get-availlability";


import Filter from "./components/filter";
import FilterAvailability from "./components/filterAvailability";



export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
    availabilityId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);
  const availabilities = await getAvailabilities();


  
  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {products.length > 0 && category.name !== "Services" && (
              <div className="hidden sm:block">
                <Filter valueKey="sizeId" name="Sizes" data={sizes} />
                <Filter valueKey="colorId" name="Colors" data={colors} />
              </div>
            )}
            {products.length > 0 && category.name === "Services" && (
              <div className="hidden sm:block">
                <FilterAvailability valueKey="availabilityId" name="Availability" data={availabilities} />
              </div>
            )}
           
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && category.textDescription === "" && (
                <NoResults />
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
          {category.textDescription && (
            <TextDescription description={category.textDescription} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
