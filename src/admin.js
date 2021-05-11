import User from './components';
import UserDers from './componentsDers';
import './dersSecimi.css';
import MyNavBar from './mynavbar';
import './admin.css';
import './modal.css';
import pen from './images/pen.png';
import Axios from "axios";
import React, {useState,useEffect} from "react";
import API from './config/config';

function Admin() {

    const[loginStatus,setLoginStatus] = useState("");
    const[loginlevel,setLoginLevel] = useState("");
    const[donems,setDonems]= useState([]);
    const[dersler,setDersler]= useState([]);

    const[kaldirilacakDersler,setKaldirilacakDersler]= useState([]);
    const[egitmenAtaDersler,setEgitmenAtaDersler]= useState([]);
    const[tumUyeler,setTumUyeler]= useState([]);
    const[egitmenler,setEgitmenler]= useState([]);
    const[bekleyenler,setBekleyenler]= useState([]);
    const[bekleyen,setBekleyen]= useState([]);
    useEffect(() => {
      if(sessionStorage.getItem("level")==='0'){
    API.get("/api/donemGoruntule").then((response) => {
      setDonems( response.data );
      API.post("/api/admin/dersGoruntuleAnaSayfa",{
        donem_id: response.data[0].semester_id,

      }).then((response)=>{
        setDersler(response.data)
      })

      API.post("/api/admin/egitmenatabosders",{
        donem_id: response.data[0].semester_id,

      }).then((response)=>{
        setEgitmenAtaDersler(response.data)
      })

      API.post("/api/admin/dersGoruntuleAnaSayfa",{
        donem_id: response.data[0].semester_id,

      }).then((response)=>{
        setKaldirilacakDersler(response.data)
      })
    });



    API.get("/api/egitmenler").then((response) => {
      setEgitmenler( response.data );
    });

    API.get("/api/tumUyeler").then((response) => {
      setTumUyeler( response.data );
    });

    API.get("/api/admin/uyeOnay").then((response) => {
      setBekleyenler( response.data );
      if(response.data.length>0){
        alert("ONAYLANMAYI BEKLEYEN YENİ ÜYELER VAR!")
      }
    });

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

  function onClickEventUyeekle (e)  {
    document.getElementById("uyeekle").style.visibility = "visible";
    document.getElementById("uyeekle").style.opacity = '1';
    }
    function onClickEventUyekaldir (ev)  {
      document.getElementById("uyekaldir").style.visibility = "visible";
      document.getElementById("uyekaldir").style.opacity = '1';
      }
      function onClickEventDonemekle (eve)  {
        document.getElementById("donemekle").style.visibility = "visible";
        document.getElementById("donemekle").style.opacity = '1';
        }
        function onClickEventDonemkaldir (even)  {
          document.getElementById("donemkaldir").style.visibility = "visible";
          document.getElementById("donemkaldir").style.opacity = '1';
          }
          function onClickEventSifredegis (evenn)  {
            document.getElementById("sifredegis").style.visibility = "visible";
            document.getElementById("sifredegis").style.opacity = '1';
            }
            function onClickEventDersekle (event)  {
              document.getElementById("dersekle").style.visibility = "visible";
              document.getElementById("dersekle").style.opacity = '1';
              }
              function onClickEventDerskaldir (eventt)  {
                document.getElementById("derskaldir").style.visibility = "visible";
                document.getElementById("derskaldir").style.opacity = '1';
                }
                function onClickEventEgitmenata (eventte)  {
                  document.getElementById("egitmenata").style.visibility = "visible";
                  document.getElementById("egitmenata").style.opacity = '1';
                  }
                  function onClickEventUyeOnayla (eventtee)  {
                    document.getElementById("uyeonayla").style.visibility = "visible";
                    document.getElementById("uyeonayla").style.opacity = '1';
                    }

                  const  uyeEkleKaydet = (e) => {

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


                        var role=1;
                        if(document.getElementById("roleSelect").value==="Asistan")
                        role=2;
                        else if(document.getElementById("roleSelect").value==="Egitmen")
                        role=1;
                        else if(document.getElementById("roleSelect").value==="Mudekyetkilisi")
                        role=3;

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

                        API.post("/api/admin/uyeEkle",{
                    id:idcount-1,
                    eMail:document.getElementById("email").value,
                    password:document.getElementById("pass1").value,
                    level:role,
                    uname:document.getElementById("name").value

                  }).then((response)=>{
                    window.location.href = '/admin';
                    if(response.data.message){
                      alert(response.data.message)
                    }

                  })

                  });

                  }
                        /**/
                      }

            const donemEkle= ()=>{
              API.post("/api/Admin/donemEkle",{
                  donemName: document.getElementById("donem").value,
                  donemStartDate:document.getElementById("donemStart").value,
                  donemEndDate:document.getElementById("donemEnd").value
              }).then((response)=>{
                window.location.href = '/admin';
                if(response.data.message){
                  alert(response.data.message)
                }

              })
            };

            const dersEkle= ()=>{
              API.post("/api/Admin/dersEkle",{
                  dersName: document.getElementById("dersAdı").value,
                  dersCode:document.getElementById("dersKodu").value,

              }).then((response)=>{
                window.location.href = '/admin';
                if(response.data.message){
                  alert(response.data.message)
                }

              })
            };

            const egitmenAta= ()=>{
              if(document.getElementById("egitmenAtaDonem").value.length===0){
                alert("Dönem Seçiniz!")
              }else if(document.getElementById("egitmenAtaDers").value.length===0){
                alert("Ders Seçiniz!")
              }else if(document.getElementById("egitmenAtaUser").value.length===0){
                alert("Eğitmen Seçiniz!")
              }else{
              API.post("/api/Admin/egitmenAta",{
                  donemId: document.getElementById("egitmenAtaDonem").value,
                  dersId:document.getElementById("egitmenAtaDers").value,
                  egitmenId:document.getElementById("egitmenAtaUser").value,

              }).then((response)=>{
                window.location.href = '/admin';
                if(response.data.message){
                  alert(response.data.message)
                }

              })}
            };



          const donemDegis= ()=>{
            API.post("/api/admin/egitmenatabosders",{
                donem_id: document.getElementById("egitmenAtaDonem").value,

            }).then((response)=>{
              setEgitmenAtaDersler(response.data)

            })

            document.getElementById("egitmenata").style.visibility = "visible";
            document.getElementById("egitmenata").style.opacity = '1';

          }

            const uyeOnay= ()=>{
              if(document.getElementById("bekleyenler").value.length>0){
              API.post("/api/Admin/uyeOnayGet",{
                  bekleyenId: document.getElementById("bekleyenler").value,

              }).then((response)=>{

                window.location.href = '/admin';

                if(response.data.message){
                  alert(response.data.message)
                }

              })
}else{

  window.location.href = '/admin';
}

            };


            const uyeReddet= ()=>{

              if(document.getElementById("bekleyenler").value.length>0){
              API.post("/api/Admin/uyeRed",{
                  bekleyenId: document.getElementById("bekleyenler").value,

              }).then((response)=>{

                window.location.href = '/admin';

                if(response.data.message){
                  alert(response.data.message)
                }

              })
            }else{

              window.location.href = '/admin';
            }



            }

            const uyeKaldir= ()=>{
              if(document.getElementById("uyeKaldirsel").value.length===0){
                alert("KALDIRILACAK ÜYEYİ SEÇİNİZ!")
              }else{
              API.post("/api/Admin/uyeKaldir",{
                  uyeId: document.getElementById("uyeKaldirsel").value,

              }).then((response)=>{
                window.location.href = '/admin';
                if(response.data.message){
                  alert(response.data.message)
                }

              })}
            };

            const donemKaldir= ()=>{
              if(document.getElementById("donemKaldirsel").value.length===0){
                alert("KALDIRILACAK DÖNEMİ SEÇİNİZ!")
              }else{
              API.post("/api/Admin/donemKaldir",{
                  donemId: document.getElementById("donemKaldirsel").value,

              }).then((response)=>{
                window.location.href = '/admin';
                if(response.data.message){
                  alert(response.data.message)
                }

              })}
            };

            const dersKaldir= ()=>{
              if(document.getElementById("dersKaldirsel").value.length===0){
                alert("DERS SEÇİNİZ!")
              }else{
              API.post("/api/Admin/dersKaldir",{
                  donem_Id: document.getElementById("dersKaldirDonemsel").value,
                  ders_Id: document.getElementById("dersKaldirsel").value
              }).then((response)=>{
                window.location.href = '/admin';
                if(response.data.message){
                  alert(response.data.message)
                }

              })}
            };


              const dersKaldirDonemDegis= ()=>{

                API.post("/api/admin/dersGoruntuleAnaSayfa",{
                    donem_id: document.getElementById("dersKaldirDonemsel").value,

                }).then((response)=>{
                  setKaldirilacakDersler(response.data)

                })

                document.getElementById("derskaldir").style.visibility = "visible";
                document.getElementById("derskaldir").style.opacity = '1';


              }

            const sifreDegistir= ()=>{
              if(document.getElementById("sifre1").value === "")
                alert("Bir şifre belirlemediniz.");

              else if(document.getElementById("sifre1").value.length < '8')
                alert("En az 8 karakterli bir şifre belirleyiniz.");

              else if( document.getElementById("sifre1").value !== document.getElementById("sifre2").value )
                alert("Girdiğiniz şifreler birbiri ile uyuşmuyor. Lütfen tekrar deneyiniz.");

              else{
              API.post("/api/Admin/sifreDegistir",{
                  sifreDegistirMail: document.getElementById("sifreDegistirMail").value,
                  sifre: document.getElementById("sifre1").value
              }).then((response)=>{
                window.location.href = '/admin';
                if(response.data.message){
                  alert(response.data.message)
                }
              })
              }
            };

  return (

    <div className = "App">

      <MyNavBar role={loginlevel}/>

      <h1 >ADMİN KONTROL PANELİ</h1>

      <div style = {{float: 'right', right: '15%', bottom: '55px'}} className="dropdown">
          <button className="dropbtn">MENU</button>
          <div className="dropdown-content">
            <button className="dropdownbuttons" onClick = {onClickEventUyeekle}><a>Üye Ekle</a></button>
            <button className="dropdownbuttons" onClick = {onClickEventUyekaldir}><a>Üye Kaldır</a></button>
            <button className="dropdownbuttons" onClick = {onClickEventDonemekle}><a>Dönem Ekle</a></button>
            <button className="dropdownbuttons" onClick = {onClickEventDonemkaldir}><a>Dönem Kaldır</a></button>
            <button className="dropdownbuttons" onClick = {onClickEventSifredegis}><a>Şifre Değişikliği</a></button>
            <button className="dropdownbuttons" onClick = {onClickEventDersekle}><a>Ders Ekle</a></button>
            <button className="dropdownbuttons" onClick = {onClickEventEgitmenata}><a>Eğitmen Ata</a></button>
            <button className="dropdownbuttons" onClick = {onClickEventDerskaldir}><a>Ders Kaldır</a></button>
            <button className="dropdownbuttons" onClick = {onClickEventUyeOnayla}><a>Üye Onayla</a></button>
          </div>
        </div>

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

{/*
      <User secim= "dönem" secimler={donems} id={"donemSec"}/>
      <UserDers secim= "ders" id={"dersSec"}/>
      <div className="custom-select2">

        <button style={{marginRight:"5px",margin: "15px"}}>Seç</button>


      </div>
*/
}

<div  id = "uyeekle" className = "bg-modal">
<div  style = {{marginBottom: '85vh', height: '30%'}} className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    Üye Ekle
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/admin' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
    <div style = {{marginRight: '40px'}}>
              <form>
                <select style={{width: '190px', height: '24px',marginLeft: '38px'}} name="role" id="roleSelect">
                  <option value="Asistan">Asistan</option>
                  <option value="Egitmen">Eğitmen</option>
                  <option value="Mudekyetkilisi">Müdek Yetkilisi</option>
                </select>
                <ul><input className = "textboxdesign" id="email" type='text' placeholder='E-mail*'/></ul>
                <ul><input className = "textboxdesign" id="name" type='text' placeholder='İsim*'/></ul>
                <ul><input className = "textboxdesign" id= "pass1" type='password' placeholder='Şifre*'/></ul>
                <ul><input className = "textboxdesign" id= "pass2" type='password' placeholder='Şifre tekrar*'/></ul>
              </form>

              <div>
                <button style = {{marginLeft: '30px'}} type="submit" className = "btnlogin" onClick={uyeEkleKaydet} >KAYDET</button>
              </div>
    </div>
</div>
</div>

<div id = "uyekaldir" className = "bg-modal">
<div style = {{marginBottom: '85vh', height: '20%'}} className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    Üye Kaldır
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/admin' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>

  <form>
    <h4>
      Kaldırmak istediğiniz üyeyi seçiniz.
      </h4>
                <select style={{width: '280px', height: '24px'}} name="role" id="uyeKaldirsel">
                {tumUyeler.map((val)=>

                  <option value={val.user_id}>{val.name_m}   ---   {val.email_m}</option>

                )}
                </select>
              </form>

              <div>
                <button style = {{marginTop: '20px'}} type="submit" className = "btnlogin" onClick={uyeKaldir} >KALDIR</button>
              </div>
</div>
</div>

<div id = "donemekle" className = "bg-modal">
<div style = {{marginBottom: '100vh', height: '25%'}} className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    Dönem Ekle
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/admin' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>

  <form>
    <h4>
      Eklemek istediğiniz dönemi giriniz.
      </h4>
              <ul>Dönem ismi :<input style = {{marginLeft: '30px', marginRight: '16px'}} className = "textboxdesign" id="donem" type='text' placeholder='2020 - 2021 Güz gibi'/></ul>
              <ul>Başlangıç Tarihi :<input style = {{marginRight: '15px'}} className = "textboxdesign" id="donemStart" type='date' /></ul>
              <ul>Bitiş Tarihi :<input style = {{marginLeft: '38px' ,marginRight: '14.5px'}} className = "textboxdesign" id="donemEnd" type='date' /></ul>
              </form>

              <div>
                <button style = {{marginTop: '20px'}} type="submit" className = "btnlogin" onClick={donemEkle}>KAYDET</button>
              </div>
</div>
</div>

<div id = "donemkaldir" className = "bg-modal">
<div style = {{marginBottom: '100vh', height: '20%'}} className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    Dönem Kaldır
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/admin' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>

  <form>
    <h4>
      Kaldırmak istediğiniz dönemi seçiniz.
      </h4>
      <select style={{width: '200px', height: '24px'}} name="role" id= "donemKaldirsel">
      {donems.map((val)=>

        <option value={val.semester_id}>{val.name}</option>

      )}
                </select>
              </form>

              <div>
                <button style = {{marginTop: '20px'}} type="submit" className = "btnlogin" onClick={donemKaldir}>KALDIR</button>
              </div>
</div>
</div>

<div id = "sifredegis" className = "bg-modal">
<div style = {{marginBottom: '100vh', height: '25%'}} className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    Şifre Değiştir
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/admin' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
    <h4>
      Şifre değiştireceğiniz hesaba ait e-mail adresini ve yeni şifreyi giriniz.
      </h4>
      <form>
                <ul><input style = {{marginRight: '40px'}} id="sifreDegistirMail" className = "textboxdesign"  type='text' placeholder='E-mail'/></ul>
                <ul><input style = {{marginRight: '40px'}} id="sifre1" className = "textboxdesign"  type='password' placeholder='Şifre'/></ul>
                <ul><input style = {{marginRight: '40px'}} id="sifre2" className = "textboxdesign"  type='password' placeholder='Şifre Tekrar'/></ul>
              </form>

              <div>
                <button style = {{marginTop: '20px'}} type="submit" className = "btnlogin" onClick={sifreDegistir} >GÖNDER</button>
              </div>
</div>
</div>

<div id = "dersekle" className = "bg-modal">
<div style = {{marginBottom: '100vh', height: '38%'}} className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    Ders Ekle
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/admin' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
    <h4>
      Eklemek istediğiniz dersin ismini ve ders kodunu giriniz.
      </h4>
      <form>

          <div style = {{marginTop: '10px'}}>
          Ders Adı
          </div>


                <ul><input style = {{marginRight: '40px'}} className = "textboxdesign" id="dersAdı" type='text' placeholder='Araştırma Teknikleri I gibi'/></ul>
                <div style = {{marginTop: '10px'}}>
                Ders Kodu
               </div>
                <ul><input style = {{marginRight: '40px'}} className = "textboxdesign" id="dersKodu" type='text' placeholder='BLM - 461 gibi'/></ul>
              </form>
              <div>
                <button style = {{marginTop: '10px'}} type="submit" className = "btnlogin" onClick={dersEkle} >EKLE</button>
              </div>
</div>
</div>

<div id = "derskaldir" className = "bg-modal">
<div style = {{marginBottom: '100vh', height: '25%'}} className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    Ders Kaldır
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/admin' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
    <h4>
      Kaldırmak istediğiniz dersin dönemini ve dersi seçiniz.
      </h4>
      <form>
        <div style = {{marginBottom: '10px'}}>
        Dönem
        </div>
              <div>
               <select style={{width: '250px', height: '24px'}} name="donemler" onChange={dersKaldirDonemDegis} id="dersKaldirDonemsel">
               {donems.map((val)=>

                 <option value={val.semester_id}>{val.name}</option>

               )}
                </select>
              </div>
          <div style = {{marginTop: '10px'}}>
          Ders Adı
          </div>
              <div>
                <select style={{marginTop: '10px'  ,width: '250px', height: '24px'}} name="derskalk" id="dersKaldirsel">
                {kaldirilacakDersler.map((val)=>
                  <option value={val.lecture_id}>{val.lecture_code}   {val.lecture_name}</option>
                )}
                </select>
              </div>
              </form>
              <div>
                <button style = {{marginTop: '20px'}} type="submit" className = "btnlogin" onClick ={dersKaldir}>KALDIR</button>
              </div>
</div>
</div>

<div id = "egitmenata" className = "bg-modal">
<div style = {{marginBottom: '100vh', height: '30%'}} className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    Eğitmen Ata
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/admin' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
    <h4>
      Atamak istediğiniz öğretmeni dersi ve dönemini seçiniz.
      </h4>
      <form>
        <div style = {{marginBottom: '10px'}}>
        Dönem
        </div>
              <div>
               <select style={{width: '250px', height: '24px'}} onChange={donemDegis} name="donemler" id="egitmenAtaDonem">
               {donems.map((val)=>

                 <option value={val.semester_id}>{val.name}</option>

               )}
                </select>
              </div>
          <div style = {{marginTop: '10px'}}>
          Ders Adı
          </div>
              <div>

                <select style={{marginTop: '10px'  ,width: '250px', height: '24px'}} name="derskalk" id="egitmenAtaDers">
                {egitmenAtaDersler.map((val)=>

                  <option value={val.lecture_id}>{val.lecture_name}</option>

                )}
                </select>

              </div>
              <div style = {{marginTop: '10px',marginBottom: '10px'}}>
              Eğitmen
              </div>
              <div>
               <select style={{width: '250px', height: '24px'}} name="egitmenler" id="egitmenAtaUser">
               {egitmenler.map((val)=>

                 <option value={val.user_id}>{val.name_m}</option>

               )}
                </select>
              </div>

              </form>
              <div>
                <button style = {{marginTop: '20px'}} type="submit" className = "btnlogin" onClick={egitmenAta} >KAYDET</button>
              </div>
</div>
</div>

<div id = "uyeonayla" className = "bg-modal">
<div style = {{marginBottom: '100vh', height: '25%'}} className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    Üye Onayla
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/admin' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
    <h4>
      Onaylamak istediğiniz üyeyi seçiniz.
      </h4>
      <form>
        <div style = {{marginBottom: '10px'}}>
        Üyeler
        </div>
              <div>
               <select style={{width: '255px', height: '24px'}} name="bekleyenUyeler" id="bekleyenler">
               {bekleyenler.map((val)=>

                 <option value={val.user_id} >{val.email_m} - {val.name_m}</option>

               )}
                </select>
              </div>

              </form>
              <div>
                <button style = {{marginTop: '20px'}} type="submit" className = "btnlogin" onClick={uyeOnay}>ONAYLA</button>
                <button style = {{marginTop: '20px'}} type="submit" className = "btnlogin" onClick={uyeReddet}>REDDET</button>
              </div>
</div>
</div>

    </div>

  );
}
export default Admin;
