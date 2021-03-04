import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Badge,
  NavItem,
  NavLink,
} from "reactstrap";

export default class CartSummary extends Component {
  //sepet doluysa
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Your Cart - {this.props.cart.length}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.productID}>
              <Badge
                color="danger"
                onClick={() => this.props.removeFromCart(cartItem.product)}
              >
                X
              </Badge>
              {cartItem.product.name}

              {/* her üründen kaç tane eklediğimizi temsil eden bileşen. */}
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem>
            {/* Link To diyerek gidilecek yer cart demiş olduk
                cart route'na git demek yani  
            */}
            <Link to="cart">Go to cart</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  //sepet boşsa
  renderEmptyCart() {
    return (
      <NavItem>
        <NavLink>Empty Cart</NavLink>
      </NavItem>
    );
  }
  render() {
    return (
      <div>
        {/*Eğer sepette ürün yoksa tasarımda hiç görünmeyecek.*/}
        {this.props.cart.length > 0
          ? this.renderSummary()
          : this.renderEmptyCart()}
      </div>
    );
  }
}
