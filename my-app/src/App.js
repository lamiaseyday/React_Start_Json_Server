import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Col, Container, Row } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";

export default class App extends Component {
  //fonksiyon içinde olmadığı için let e gerek yok.
  state = { currentCategory: "", products: [], cart: [] };

  componentDidMount() {
    this.getProducts();
  }

  //Event
  //bunu tetiklediğimde currentCategory değiştiriliyor.
  //ancak kendi componentimizdeki datayı değiştirebiliriz.

  //kategoriden tetikleniyor.
  //tetiklenince products'ı çağrıyo ve çağırınca
  //products state'im değişiyor.
  //product list yeniden render edilmiş oluyo.

  //currentcategory mevcut olan category elemanını temsil ediyor.
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  //category id ye göre products listesi filtreleniyor.
  getProducts = (categoryID) => {
    let url = "http://localhost:3333/product";
    if (categoryID) {
      url += "?categoryID=" + categoryID;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  //sepete eleman eklemeyi sağlayan method.
  //her eleman bir kere eklenebiliyor.
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(
      (c) => c.product.productID === product.productID
    );
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      //new cart a push la yeni bir eleman ekledim 1 adediyle
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    //console.log(this.newCart);
    alertify.success(product.name + " add to cart", 2);
  };

  removeFromCart = (product) => {
    /*
      filter fonksiyonu:
      burda c sepetteki her bir elemanı temsil ediyor
      her bir elemanın product id si parametreyle gönderilen 
      product id'nin dışındakileri filtrelemiş oluyor.

    */
    let newCart = this.state.cart.filter(
      (c) => c.product.productID !== product.productID
    );
    this.setState({ cart: newCart });
    alertify.error(product.name + " removed from cart");
  };

  render() {
    console.log(this.props);
    //let titleProduct = "Product List";
    //this.props.info.title - bu şekilde ulaşmamızı sağlar.
    let productInfo = { title: "ProductList" };
    //let titleCategory = "Category List"
    let categoryInfo = { title: "CategoryList" };
    return (
      <div>
        <Container>
          {/* sepeti naviye gönderiyorum */}
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              {/* Category list e bir props ya da event yolladım */}
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                {/* Anasayfa NotFound'muş gibi 
                  exact-> direk url girildiğinde bu route açılsın demek

                  Switch ise sırasıyla route ları gezmeye yarıyor.
                  hiçbir adres olmassa NotFound çalışır
                */}
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <ProductList
                      {...props} //propların bi tane kopyasını al onu gönder
                      products={this.state.products}
                      addToCart={this.addToCart}
                      info={productInfo}
                      currentCategory={this.state.currentCategory}
                    />
                  )}
                />
                <Route
                  path="/cart"
                  render={(props) => (
                    <CartList
                      {...props} //propların bi tane kopyasını al onu gönder
                      cart={this.state.cart}
                      //filtrelediğimiz elemanları alacağımız için
                      //filtreleme(removeFromCart) metodunu ekliyoruz
                      removeFromCart={this.removeFromCart}
                    />
                  )}
                />
                <Route path="/form1" component={FormDemo1} />
                <Route path="/form2" component={FormDemo2} />
                <Route component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
