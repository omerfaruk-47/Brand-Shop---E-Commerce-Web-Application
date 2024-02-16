import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useLocalStorage("basket", []);
  // sepete ürün ekler
  const addToBasket = (newProduct) => {
    //1)Bu üründen sepette var mı?
    const found = basket.find((i) => i.id === newProduct.id);

    if (found) {
      //2)Ürün sepette varsa > miktarını 1 artır
      const updated = { ...found, amount: found.amount + 1 };

      //Sepet dizisindeki eski ürünün yerine güncel halini koy
      const newBasket = basket.map((item) =>
        item.id === updated.id ? updated : item
      );

      //State güncelle
      setBasket(newBasket);

      toast.info(`Ürün miktarı artırıldı (${updated.amount})`);
    } else {
      //3)Ürün sepette yoksa > ürünü sepete ekle(miktarı 1 eşitle)
      setBasket([...basket, { ...newProduct, amount: 1 }]);

      toast.success("Ürün sepete eklendi");
    }
  };

  const removeFromBasket = (delete_id) => {
    //sepetteki ürünü bul
    const found = basket.find((i) => i.id === delete_id);

    if (found.amount > 1) {
      //miktarı 1 den fazlaysa > miktarı 1 eksiltmek
      const update = { ...found, amount: found.amount - 1 };

      const newBasket = basket.map((i) => (i.id === update.id ? update : i));

      setBasket(newBasket);

      toast.info(`Ürün miktarı azaltıldı (${update.amount})`);
    } else {
      //miktarı 1 e eşitse > ürünü diziden kaldır
      const filtred = basket.filter((i) => i.id !== delete_id);

      setBasket(filtred);

      toast.error(`Ürün sepetten kaldırıldı`);
    }
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
