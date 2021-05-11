import React, { Component } from 'react';
import './App.css';
import ANKU_logo from './images/ANKU_logo.png';
import MUDEK from './images/MUDEK.png';
import MyNavBar from './mynavbar';
import emailjs from 'emailjs-com';

export default class Contactsys extends Component {
  constructor(props){
    super(props);

    this.state={lvl:sessionStorage.getItem("level")}
  }

  anaSayfa = () => {
    if(sessionStorage.getItem("isDocPage")){
      sessionStorage.setItem("isDocPage",false)
      sessionStorage.removeItem("donemId")
      sessionStorage.removeItem("dersId")
    }

    switch (parseInt(this.state.lvl)) {
         case 0:
                 window.location.href = '/admin';
                 break;
             case 1:
                 window.location.href = '/instructor';
                 break;
             case 2:
                 window.location.href = '/asistant';
                 break;
             case 3:
                 window.location.href = '/mudek';
                 break;
             case 4:
                 window.location.href = '/pending';
                 break;
             case 5:
                 window.location.href = '/pending';
                 break;
             case 6:
                 window.location.href = '/pending';
                 break;
             case 7:
                 window.location.href = '/pending2';
                break;
             default:
             alert("HATA");
         }
 }



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

            <MyNavBar  role={this.state.lvl}/>

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
                    <ul><textarea style={{width: '180px', height: '100px'}} type='text' placeholder='Bizimle iletişime geçin.' name = "content"/></ul>


                <div>
                    <button type = "submit" className = "btnlogin">GÖNDER</button>
                    <a>
                      <button type = "reset" className = "btnlogin" onClick={this.anaSayfa}>KAPAT</button>
                    </a>
                </div>
                </form>

              </div>
          </div>
        )
    }
}
