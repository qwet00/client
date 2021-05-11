import React, { Component } from 'react'
import ANKU_logo from './images/ANKU_logo.png';
import MUDEK from './images/MUDEK.png';
import './Mynavbar.css';

class MyNavBar extends Component {

  constructor(props) {
    super(props);
  }

  anaSayfa = () => {
    if(sessionStorage.getItem("isDocPage")){
      sessionStorage.setItem("isDocPage",false)
      sessionStorage.removeItem("donemId")
      sessionStorage.removeItem("dersId")
    }

    switch (parseInt(this.props.role)) {
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
                 window.location.href = 'pending2/';
                 break;
             default:
             alert("HATA");
         }
 }

 cikis = () => {
   if(sessionStorage.getItem("isDocPage")){
     sessionStorage.setItem("isDocPage",false)
     sessionStorage.removeItem("donemId")
   }
   sessionStorage.removeItem("name")
   sessionStorage.removeItem("id")
   sessionStorage.removeItem("level")
   sessionStorage.removeItem("isDocPage")
   window.location.href = '/';
 }

    render() {
        return (
            <div>
                <div className = "upperbar">
                    <br/>
                    <br/>
                    <div>
                        <img className = "ankulogo" alt="ANKU" src={ANKU_logo} />
                        <img className = "mudeklogo" alt="MUDEK" src={MUDEK} />
                        <div className = "bartitle">
                            Ankara Üniversitesi Mühendislik Fakültesi MUDEK Sistemi
                        </div>
                        <div className = "navbuttons" >
                            <button className = "backgroundbuttons" onClick={this.anaSayfa}><b>ANASAYFA</b></button>
                            <a href = "/contactsys"><button className = "backgroundbuttons" ><b>İLETİŞİM</b></button></a>
                            <a ><button className = "backgroundbuttons" onClick={this.cikis}><b>ÇIKIŞ</b></button></a>
                        </div>
                    </div> {/*NAVBAR FİNİSHED*/ }
                </div>
            </div>
        );
    }
}
export default MyNavBar;
