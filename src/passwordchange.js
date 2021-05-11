import React, { Component } from 'react';
import './App.css';
import ANKU_logo from './images/ANKU_logo.png';
import MUDEK from './images/MUDEK.png';
import emailjs from 'emailjs-com';

export default class PasswordChange extends Component {
    render() {
      function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_gmail', 'template_xq1tfso', e.target, 'user_edkykurSUwNKHfdAKTfip')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset()
          alert("Talebiniz admine ulaştırılmıştır. Yeni şifreniz e-mail adresinize iletilecektir!")
      }
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

              <form onSubmit={sendEmail}>
                <p>Lütfen size yardımcı olabilmemiz için bizimle iletişime geçin veya parolasını değiştirmek istediğiniz kayıtlı e-mail adresinizi girin.</p>
                <ul><input style = {{marginRight: '30px'}} className = "textboxdesign" type='email' placeholder='E-mail' name='email'/></ul>        
              
         
              <div>
                <button type= "submit" className = "btnlogin">GÖNDER</button>
                <a href="/">
                  <button type= "button"  className = "btnlogin">GERİ DÖN</button>
                </a>
              </div>
              </form>
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