import React, { Component } from 'react';
import "./components.css"
/**
 * ComponentName
 */
class User extends Component { // eslint-disable-line react/prefer-stateless-function

componentDidMount(){

}

  render() {
    return (
      <div>
        <form>
          <div className="opener">
            <p style= {{"paddingTop":"2%"}}>Lütfen işlem yapmak istediğiniz {this.props.secim}i seçiniz</p>
          </div>
          <div className="custom-select2">
            <select className="lectures" id={this.props.id} onChange={this.props.myFunction}>
              {this.props.secimler.map((val)=>
                <option value={val.semester_id}>{val.name}</option>
              )}
            </select>
          </div>
        </form>
      </div>
    );
  }
}

export default User;
