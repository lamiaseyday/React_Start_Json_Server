import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  //consturctor bloğu olmadan da state yazabiliriz.
  state = {
    categories: [],
  };

  componentDidMount() {
    this.getCategories();
  }

  //api den veri çekme işlemi yapılıyor.
  getCategories = () => {
    fetch("http://localhost:3333/category")
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <ListGroup>
          {/* döngü içindeki eleman sayısı kadar liste elemanı ekler 
                lambda expression ile setState: 
                () => this.setState({currentCategory:category.categoryName})
            */}
          {this.state.categories.map((category) => (
            <ListGroupItem
              active={
                category.categoryName === this.props.currentCategory
                  ? true
                  : false
              }
              key={category.id}
              onClick={() => this.props.changeCategory(category)}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* <h4>{this.props.currentCategory}</h4> */}
      </div>
    );
  }
}
