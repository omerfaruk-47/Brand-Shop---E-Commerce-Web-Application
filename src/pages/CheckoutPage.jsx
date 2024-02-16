import { useContext } from "react";
import { BasketContext } from "../context/basketContext";
import BasketItem from "../components/BasketItem";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { basket, addToBasket, removeFromBasket } = useContext(BasketContext);

  const totalAmount = basket.reduce((total, i) => total + i.amount, 0);

  const totalPrice = basket.reduce((total, i) => total + i.price * i.amount, 0);
  return (
    <div className="container my-5">
      <div className="d-flex  flex-column gap-5">
        {/*Sepette ürün yoksa */}
        {basket.length === 0 && (
          <p className="text-center my-5">
            <span className="mx-3">Öncelikle sepete bir ürün ekleyiniz.</span>
            <Link to={"/"}> Ürünler</Link>
          </p>
        )}

        {/*Sepette ürün varsa */}
        {basket.map((item) => (
          <BasketItem
            key={item.id}
            item={item}
            addToBasket={addToBasket}
            removeFromBasket={removeFromBasket}
          />
        ))}
      </div>

      <div className="border p-5 rounded my-5 fs-4">
        <p>
          Sepetteki Ürün: <span className="text-warning">{totalAmount}</span>{" "}
          Pieces
        </p>
        <p>
          Toplam Fiyat :{" "}
          <span className="text-success">{totalPrice.toFixed(2)}$</span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
