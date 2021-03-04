import React, { Component } from "react";

export default class FormDemo1 extends Component {
  state = { userName: "" , city: ""};
  onChangeHandler = (event) => {
      //event.target --> event'e sebep olan nesne
    //this.setState({ userName: event.target.value });

    let name = event.target.name;
    let value = event.target.value;

    this.setState({[name] : value})
    
  };

  onSubmitHandler = (event) => {
    //event.preventdefault olmassa sayfa refresh ediliyo
    //ve sepet sıfırlanıyor. Onu engellemek için kullandım
    event.preventDefault();
    alert(this.state.userName);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <h3>User Name</h3>
          {/* input'a bir değer girince state de tutulan 
                        değer değişmesi için onChange kullanıyoruz.
                    */}
          <input name="userName" onChange={this.onChangeHandler} type="text"></input>
          <h3>UserName is {this.state.userName}</h3>

          <h3>City</h3>
          <input name="city" onChange={this.onChangeHandler} type="text"></input>
          <h3>City is {this.state.city}</h3>
          <input type="submit" value="save"></input>
        </form>
      </div>
    );
  }
}
