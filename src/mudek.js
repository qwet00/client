import UserDers from './componentsDers';
import User from './components';
import './dersSecimi.css';
import MyNavBar from './mynavbar';
import Axios from "axios";
import React, {useState,useEffect} from "react";
import API from './config/config';

function Mudek() {
  const[loginStatus,setLoginStatus] = useState("");
  const[loginlevel,setLoginLevel] = useState("");
  const[donems,setDonems]= useState([]);
  const[dersler,setDersler]= useState([]);
  useEffect(() => {
    if(sessionStorage.getItem("level")==='3'){
  API.get("/api/donemGoruntule").then((response) => {
    setDonems( response.data );

});
API.post("/api/admin/dersGoruntuleAnaSayfa",{
    donem_id: 1,


}).then((response)=>{
  setDersler(response.data)

})
  setLoginStatus(sessionStorage.getItem("name"));
  setLoginLevel(sessionStorage.getItem("level"));
}else{
  window.location.href = '/';
  alert("Bu Sayfaya Erişmeye Yetkili Değilsiniz!\nGiriş Sayfasına Yönlendiriliyorsunuz.")
}


}, []);

const myFunction = () => {

  API.post("/api/admin/dersGoruntuleAnaSayfa",{
      donem_id: document.getElementById("donemSec").value,


  }).then((response)=>{
    setDersler(response.data)

  })


};

const secLec= ()=>{
  if(document.getElementById("donemSec").value.length===0){
    alert("DÖNEM SEÇİLMEDİ")
  }else if(document.getElementById("dersSec").value.length===0){
    alert("DERS SEÇİLMEDİ")
  }else{
sessionStorage.setItem("donemId",document.getElementById("donemSec").value);
sessionStorage.setItem("dersId",document.getElementById("dersSec").value);
sessionStorage.setItem("isDocPage",true)
window.location.href = '/lecture_mudek';}
};



const secDoc= ()=>{
  if(document.getElementById("donemSec3").value.length===0){
    alert("DERS SEÇİLMEDİ")
  }else{
sessionStorage.setItem("donemId",document.getElementById("donemSec3").value);
sessionStorage.setItem("isDocPage",true)
window.location.href = '/depdocs_mudek';}
};


  return (
    <div className = "App">

      <MyNavBar role={loginlevel}/>

        <h1 className="App">HOŞGELDİNİZ MÜDEK YETKİLİSİ</h1>

        <div style={{marginTop: '5%' , width: '100%'}}>
            <hr style={{width: '50%' }} />
            </div>
          <div >
            <h3>Ders Görüntüle</h3>
          </div>
          <User secim= "dönem"secimler={donems} id={"donemSec"} myFunction={myFunction}/>
          <UserDers secim= "ders" secimler={dersler} id={"dersSec"} />
          <button style={{marginRight:"5px",margin: "15px"}} onClick={secLec}>Göster</button>
          <hr style={{width: '50%' }} />
          <div style = {{marginTop: '1%'}}>
            <h3>Bölüm Evrakları Görüntüle</h3>
          </div>
            <User secim= "dönem" secimler={donems} id={"donemSec3"}/>
          <div className="custom-select2">
          <button style={{marginRight:"5px",margin: "15px"}}onClick={secDoc}>Göster</button>
            <hr style={{width: '50%' }} />
          </div>

    </div>
  );
}

export default Mudek;
