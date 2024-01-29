import React, { useEffect, useState } from "react";
import "./App.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

const HomePage = () => {
  const [isTableVisible, setTableVisibility] = useState(false);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  let listProducts = [
    {
      id: 1,
      name: "iPhone 15 128GB | Chính hãng VN/A",
      price: 1000,
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png",
    },
    {
      id: 2,
      name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
      price: 2000,
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png",
    },
    {
      id: 3,
      name: "Samsung Galaxy S24 Ultra 12GB 256GB",
      price: 3000,
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png",
    },
    {
      id: 4,
      name: "Samsung Galaxy Z Fold5 12GB 256GB",
      price: 4000,
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-fold-5-256gb_1.png",
    },
    {
      id: 5,
      name: "Xiaomi Redmi Note 13 6GB 128GB",
      price: 5000,
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13_1__1_1.png",
    },
    {
      id: 6,
      name: "Xiaomi Redmi Note 12 8GB 128GB",
      price: 6000,
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/t/gtt_7766_3__1_5.jpg",
    },
    {
      id: 7,
      name: "Oppo Reno 10 5G 8GB 128G",
      price: 7000,
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/r/e/reno10_5g_-_combo_product_-_blue.png",
    },
    {
      id: 8,
      name: "oppo find n3 flip 8GB 128GB",
      price: 8000,
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/f/i/find-n3-flip-vang_1.png",
    },
    {
      id: 9,
      name: "asus rog phone 6 12GB 256GB",
      price: 9000,
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/a/s/asus-rog-phone-6-12gb-256gb_1_1.png",
    },
    {
      id: 10,
      name: "asus rog phone 5 12GB 256GB",
      price: 10.0,
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/a/s/asus-rog-phone-5_0002_gsmarena_001_3_1.jpg",
    },
  ];
  localStorage.setItem("products", JSON.stringify(listProducts));
  const products = JSON.parse(localStorage.getItem("products")) || [];

  const handleAdd = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleIncrease = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="wrapper">
      <header className="container">
        <div className="container-topic">
          <h2>Trang chủ</h2>
          <h2>Danh sách sản phẩm</h2>
        </div>
        <div className="container-icon">
          <span onClick={() => setTableVisibility(!isTableVisible)}>
            <ShoppingCartIcon />
          </span>
          <p>{cart.reduce((total, item) => total + item.quantity, 0)}</p>
          {isTableVisible && (
            <table className="table">
              <thead>
                <tr>
                  <th
                    colSpan={4}
                    style={{
                      textAlign: "left",
                      fontSize: "30px",
                      padding: "20px",
                    }}
                  >
                    Cart
                    <hr />
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          border: "1px solid white",
                          padding: "5px",
                        }}
                        src={item.image}
                        alt={item.name}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <button
                        style={{
                          width: "20px",
                          marginRight: "10px",
                          marginLeft: "10px",
                          border: "1px solid white",
                          backgroundColor: "black",
                          color: "white",
                        }}
                        onClick={() => handleIncrease(item.id)}
                      >
                        +
                      </button>
                      {item.quantity}
                      <button
                        style={{
                          width: "20px",
                          marginLeft: "10px",
                          border: "1px solid white",
                          backgroundColor: "black",
                          color: "white",
                        }}
                        onClick={() => handleDecrease(item.id)}
                      >
                        -
                      </button>
                    </td>

                    <td>
                      <button
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          border: "none",
                        }}
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    style={{ fontWeight: "700", padding: "20px" }}
                    colSpan={4}
                  >
                    <hr
                      style={{
                        margin: "20px",
                      }}
                    />
                    Tổng cộng: {getTotalPrice()}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </header>
      <div>
        <h3>DANH SÁCH SẢN PHẨM</h3>
        <div className="container-items">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <div className="product-img">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <p>Giá: {product.price}</p>
                <button onClick={() => handleAdd(product)}>
                  <ShoppingCartIcon />
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
