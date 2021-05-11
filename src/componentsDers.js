import React, { Component } from 'react';
import "./components.css"
/**
 * ComponentName
 */
class UserDers extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <form>
          <div className="opener">
            <p style= {{"paddingTop":"3%"}}>Lütfen işlem yapmak istediğiniz {this.props.secim}i seçiniz</p>
          </div>

      <div className="custom-select2">
        <select className="lectures" id="dersSec">
        {this.props.secimler.map((val)=>
          <option value={val.lecture_id}>{val.lecture_code}   {val.lecture_name}</option>
      )}
          </select>
        </div>
      </form>
      </div>
    );
  }
}

export default UserDers;
