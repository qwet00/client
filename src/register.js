import React, { Component } from 'react';
import './App.css';
import ANKU_logo from './images/ANKU_logo.png';
import MUDEK from './images/MUDEK.png';
import Axios from "axios";
import API from './config/config';

export default class Register extends Component {
  onClickEvent = (e) => {

    if(!document.getElementById("email").value.includes('@') || !document.getElementById("email").value.includes('.'))
      alert("Lütfen geçerli bir e-mail adresi giriniz.");

    else if(document.getElementById("pass1").value === "")
      alert("Bir şifre belirlemediniz.");

    else if(document.getElementById("pass1").value.length < '8')
      alert("En az 8 karakterli bir şifre belirleyiniz.");

    else if( document.getElementById("pass1").value !== document.getElementById("pass2").value )
      alert("Girdiğiniz şifreler birbiri ile uyuşmuyor. Lütfen tekrar deneyiniz.");

    else{

      /**/

      var idCo;

      var role=4;
      if(document.getElementById("roleSelect").value==="Asistan")
      role=5;
      else if(document.getElementById("roleSelect").value==="Egitmen")
      role=4;
      else if(document.getElementById("roleSelect").value==="Mudekyetkilisi")
      role=6;


        API.get("/api/kayitOl2").then((response)=>{

          idCo=response.data;
          var bosid=0;
          var idcount=1;
          var j=0;
          while(bosid===0){
            bosid=1;
            j=0;
            while(j<idCo.length){
            if(idCo[j].user_id===idcount){
              bosid=0;
            }
            j++;
            }
      idcount= idcount+1;
}

      API.post("/api/kayitOl",{
  id:idcount-1,
  eMail:document.getElementById("email").value,
  password:document.getElementById("pass1").value,
  level:role,
  uname:document.getElementById("isim").value

}).then((response)=>{
  if(response.data.message){
    alert(response.data.message)
  }

})

});

}
      /**/
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

            <div style={{backgroundColor: "#f5f5f5",height: '500px', width: '100vh',
            border: '2px solid #16394e', boxShadow: '#16394e 10px 10px 5px',position: 'relative',margin: 'auto',
            zIndex: '1', bottom: '10vh' }}>
              <div>
                <img className = "loginAnku" alt="ANKU" src={ANKU_logo} />
                <img className = "loginMudek" alt="MUDEK" src={MUDEK} />
              </div>

              <form>
                <select style={{width: '188px', height: '20px',marginLeft: '40px'}} id="roleSelect" name="role">
                  <option value="Asistan">Asistan</option>
                  <option value="Egitmen">Eğitmen</option>
                  <option value="Mudekyetkilisi">Müdek Yetkilisi</option>
                </select>
                <ul><input className = "textboxdesign" id="email" type='text' placeholder='E-mail*'/></ul>
                <ul><input className = "textboxdesign" id="isim" type='text' placeholder='İsim*'/></ul>
                <ul><input className = "textboxdesign" id= "pass1" type='password' placeholder='Şifre*'/></ul>
                <ul><input className = "textboxdesign" id= "pass2" type='password' placeholder='Şifre tekrar*'/></ul>
              </form>

              <div>
                <button type="submit" className = "btnlogin" onClick = {this.onClickEvent.bind(this)} >KAYIT OL</button>

                <a href="/">
                  <button className = "btnlogin">GERİ DÖN</button>
                </a>
              </div>

              <div>
                <a href="contact">
                  <button className = "btnlogin">ILETISIM</button>
                </a>
              </div>
            </div>
          </div>
        )
    }
}
