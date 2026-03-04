import HeroBanner from "./HeroBanner";
import ProductCard from "../shared/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import {fetchProducts} from "../../store/actions/index";
import { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => {
    return state.products;
  });
  const { isLoading, errorMessage } = useSelector((state) => {
    return state.errors;
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 ">
      <div className="py-6">
        <HeroBanner />
      </div>
      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-slate-800 text-4xl font-bold">Products</h1>
          <span className="text-slate-700">
            Dsicover our handpicket selection of top-rated items just for you!
          </span>
        </div>
        {isLoading ? (
          <span>Loading....</span>
        ) : errorMessage ? (
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">
              {errorMessage}
            </span>
          </div>
        ) : (
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid">
            {products &&
              products.map((item, i) => {
                <ProductCard key={i} {...item} />;
              })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
