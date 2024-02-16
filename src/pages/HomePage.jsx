import Card from "../components/Card";

//Bir context yapınısa abone olmamız sağlar bu hook
import { useContext } from "react";
//Abone olmak istediğimiz context'i çağırıyoruz
import { ProductContext } from "../context/productContext";
import Loader from "./../components/Loader";

const HomePage = () => {
  const { products, category } = useContext(ProductContext);

  return (
    <div className="container">
      <h2 className="my-4">{category && category}</h2>

      <div className=" d-flex flex-wrap justify-content-center justify-content-md-between gap-3 gap-md-4 my-5 p-4">
        {!products && <Loader />}

        {products?.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
