import axios from "axios";
import { createContext, useEffect, useState } from "react";

/*
  * Context API
  * Uygulamada birden çok bileşin ihtiyacı olan verileri
  * Bileşlnlerden bağımsız bir şekilde konumlanan merkezerlde
  * yönetmeye yarar.
  
  * Context yapısı içerisinde verilerin state'ini ve verileri değiştirmeye
  * yarayan fonksiyonlar tutulabilir.
  * 
  * Context, tutuğumuz değişkenleri bileşenler doğrudan aktarım yapabilen
  * Merkezi state yönetim aracıdır.

*/

//!Context yapısının temelini oluşturma
export const ProductContext = createContext();

//!Sağlayıcı ve onun tuttuğu verileri tanımla
export function ProductProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setProducts(null); //? Yüklenmeden onceki verileri sil
    //hangi url istek atılacağını belirledik
    const url =
      category === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${category}`;

    //api isteği at
    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [category]);

  //context yapısında tuttuğumuz verileri bileşen sağlar
  //Value olarak eklenen veriler projedeki bütün bileşenlertarafında kullanbilir
  return (
    <ProductContext.Provider value={{ products, category, setCategory }}>
      {children}
    </ProductContext.Provider>
  );
}
