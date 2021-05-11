import React, { Component } from 'react';
import './App.css';
import ANKU_logo from './images/ANKU_logo.png';
import MUDEK from './images/MUDEK.png';
import emailjs from 'emailjs-com';

export default class Contact extends Component {

    render() {
      function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_gmail', 'template_0lt8a9s', e.target, 'user_edkykurSUwNKHfdAKTfip')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset()
            alert("Mesajınız iletildi.")
      }
        return (
          <div className="App">
            <div style={{height: '30vh', backgroundColor: "#16394e"}}>
              <br/>
              <br/>
              <div style={{color: 'white',fontSize: '4vh'}}>
                Ankara Üniversitesi Mühendislik Fakültesi
              </div>
              <div style={{color: 'white',fontSize: '4vh'}}>
                MUDEK Sistemi
              </div>
            </div> {/*Upper side finished*/}

            <div style={{backgroundColor: "#f5f5f5",height: '600px', width: '100vh',
            border: '2px solid #16394e', boxShadow: '#16394e 10px 10px 5px',position: 'relative',margin: 'auto',
            zIndex: '1', bottom: '10vh' }}>
              <div>
                <img style={{height: '100px', width: '100px', padding: '3px', margin: '5px', paddingTop: '15px' }} alt="ANKU" src={ANKU_logo} />
                <img style={{height: '80px', width: '245px', padding: '3px', margin: '5px', paddingTop: '15px', paddingBottom: '12px'}} alt="MUDEK" src={MUDEK} />
              </div>
              <form onSubmit={sendEmail}>
                    <ul><input className = "textboxdesign" type='text' placeholder='Ad' name = "name" /></ul>
                    <ul><input className = "textboxdesign" type='text' placeholder='Soyad' name = "surname"/></ul>
                    <ul><input className = "textboxdesign" type='email' placeholder='E-mail' name = "email"/></ul>
                    <ul><input className = "textboxdesign" type='text' placeholder='Unvan' name = "title"/></ul>
                <ul><textarea style={{width: '180px', height: '100px'}} type='text' name = "content" placeholder='Bizimle iletişime geçin.'/></ul>


              <div>
                <button type = "submit" className = "btnlogin">GÖNDER</button>
                <a href="/">
                  <button type = "button" className = "btnlogin">GERİ DÖN</button>
                </a>
              </div>
              </form>
            </div>
          </div>
        )
    }
}
