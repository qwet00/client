import React, { Component } from 'react';
import './App.css';
import ANKU_logo from './images/ANKU_logo.png';
import MUDEK from './images/MUDEK.png';
import Axios from "axios"
import API from './config/config';

export default class Login extends Component {


  onClickEvent = (e) => {
Axios.default.withcredentals = true;

  API.post("/api/giris",{

  eMail:document.getElementById("eMail").value,
  password:document.getElementById("passW").value,

}).then((response)=>{
  if(response.data.message){
    alert(response.data.message);
  }else{
    sessionStorage.setItem("name",response.data[0].name_m)
    sessionStorage.setItem("id",response.data[0].user_id)
    sessionStorage.setItem("level",response.data[0].authlevel_m)
    sessionStorage.setItem("isDocPage",false)

    switch (response.data[0].authlevel_m) {
         case 0:
                 window.location.href = 'admin/';
                 break;
             case 1:
                 window.location.href = 'instructor/';
                 break;
             case 2:
                 window.location.href = 'asistant/';
                 break;
             case 3:
                 window.location.href = 'mudek/';
                 break;
             case 4:
                 window.location.href = 'pending/';
                 break;
             case 5:
                 window.location.href = 'pending/';
                 break;
             case 6:
                 window.location.href = 'pending/';
                 break;
             case 7:
                 window.location.href = 'pending2/';
                 break;
             default:
             alert("MÜDEK sistemini kullanmak için gerekli izne sahip değilsiniz");
         }

  }
}
)

}

    render() {
        return (
          <div className="App">
            <div className = "loginupper">
              <br/>
              <br/>
              <div className = "logintitle">
                Ankara Üniversitesi Mühendislik Fakültesi
              </div>
              <div className = "logintitle">
                MUDEK Sistemi
              </div>
            </div> {/*Upper side finished*/}

            <div className = "squarelogin">
              <div>
                <img className = "loginAnku" alt="ANKU" src={ANKU_logo} />
                <img className = "loginMudek" alt="MUDEK" src={MUDEK} />
              </div>
              <form>
              <ul><input className = "textboxdesign" type='text' id="eMail" placeholder='E-mail'/></ul>
              <ul><input className = "textboxdesign" type='password' id="passW" placeholder='Şifre'/></ul>
              </form>

              <div>
                <a>
                  <button type="submit" className = "btnlogin" onClick={this.onClickEvent.bind(this)} >GİRİŞ YAP</button>
                </a>

                <a href="./register">
                  <button className = "btnlogin">ÜYE OL</button>
                </a>
              </div>

              <div>
                <a href="./passwordchange">
                  <button style={{backgroundColor: "#16394e", color: '#f5f5f5',
                  padding: '3px', margin: '5px', borderRadius: '4px'}}>Şifremi Unuttum</button>
                </a>
              </div>
            </div>
          </div>
        )
    }
}
