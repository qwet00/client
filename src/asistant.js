import User from './components';
import './dersSecimi.css';
import MyNavBar from './mynavbar';
import Axios from "axios";
import React, {useState,useEffect} from "react";
import pen from './images/pen.png';
import API from './config/config';
function Asistant() {

  const[loginStatus,setLoginStatus] = useState("");
  const[loginlevel,setLoginLevel] = useState("");
  const[donems,setDonems]= useState([]);

  useEffect(() => {
    if(sessionStorage.getItem("level")==='2'){
  API.get("/api/donemGoruntule").then((response) => {
    setDonems( response.data );

});

  setLoginStatus(sessionStorage.getItem("name"));
  setLoginLevel(sessionStorage.getItem("level"));
}else{
  window.location.href = '/';
  alert("Bu Sayfaya Erişmeye Yetkili Değilsiniz!\nGiriş Sayfasına Yönlendiriliyorsunuz.")
}
}, []);


const sifreDegistir= ()=>{

  if(document.getElementById("eskisifre").value.length < '1'){
    alert("Lütfen Mevcut Şifrenizi Giriniz.");}
  else if( document.getElementById("sifre1").value !== document.getElementById("sifre2").value ){
    alert("Girdiğiniz şifreler birbiri ile uyuşmuyor. Lütfen tekrar deneyiniz.");}
  else if(document.getElementById("sifre1").value.length < '8'){
    alert("En az 8 karakterli bir şifre belirleyiniz.");}
    else {

  API.post("/api/sifredegistirTest",{
userID:sessionStorage.getItem("id"),
eskiSifre:document.getElementById("eskisifre").value

}).then((response)=>{
if(response.data.message){
alert(response.data.message)
}else{
  Axios.post("http://localhost:3001/api/sifredegis",{
userID:sessionStorage.getItem("id"),
sifre:document.getElementById("sifre1").value

}).then((response)=>{
if(response.data.message){
alert(response.data.message)
}



})


}
})}}




const sec= ()=>{
  if(document.getElementById("donemSec").value.length===0){
    alert("DERS SEÇİLMEDİ")
  }else{
sessionStorage.setItem("donemId",document.getElementById("donemSec").value);
sessionStorage.setItem("isDocPage",true)
window.location.href = '/departmentdocs';}
};

function onClickEventSifredegis (evenn)  {
  document.getElementById("sifredegis").style.visibility = "visible";
  document.getElementById("sifredegis").style.opacity = '1';
  }

  return (
    <div className = "App">

        <MyNavBar role={loginlevel}/>

        <h1 className="App">HOŞGELDİNİZ {loginStatus}</h1>

        <User secim= "dönem" secimler={donems} id={"donemSec"}/>
        <div className="custom-select2">

        <a  >
        <button style={{marginRight:"5px",margin: "15px"}}onClick={sec}>Seç</button>
        </a>

        <button onClick = {onClickEventSifredegis} style = {{position: 'absolute' ,float : 'right', bottom: '60px', right: '100px'}}>
          Şifre Değiştir
        </button>
    </div>

<div id = "sifredegis" className = "bg-modal">
<div style = {{marginBottom: '100vh', height: '25%'}} className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    Şifre Değiştir
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/asistant' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
    <h4>
      Lütfen eski şifrenizi ve yeni şifrenizi giriniz.
      </h4>
      <form>
                <ul><input style = {{marginRight: '40px'}} id="eskisifre" className = "textboxdesign"  type='password' placeholder='Eski Şifre'/></ul>
                <ul><input style = {{marginRight: '40px'}} id="sifre1" className = "textboxdesign"  type='password' placeholder='Yeni Şifre'/></ul>
                <ul><input style = {{marginRight: '40px'}} id="sifre2" className = "textboxdesign"  type='password' placeholder='Yeni Şifre Tekrar'/></ul>
              </form>

              <div>
                <button style = {{marginTop: '20px'}} type="submit" className = "btnlogin" onClick={sifreDegistir}  >ONAYLA</button>
              </div>
</div>
</div>
    </div>
  );
}

export default Asistant;
