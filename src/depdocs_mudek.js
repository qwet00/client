  import React, {useState,useEffect,useRef} from "react";
import './dersSecimi.css';
import MyNavBar from './mynavbar';
import placeholder from './images/placeholder.JPG';
import pdf_icon from './images/pdf_icon2.JPG';
import fakulte_logo from './images/fakulte_logo.png';
import pen from './images/pen.png';
import Axios from "axios";
import './departmentdocs.css';
import API from './config/config';

function Depdocs_Mudek() {

  const[donemName,setDonemName]= useState("");
  const[foto,setFoto]= useState([]);
  const[docs,setDocs]= useState([]);

  const docSrc = useRef(null);
  const docExp = useRef(null);
  const [seciliDoc, setSeciliDoc] = useState("");

  const [downloadFoto, setDownloadFoto] = useState("");
  const photoIn = useRef(null);
  const photoSrc = useRef(null);
  const photoExp = useRef(null);
  const [seciliFoto, setSeciliFoto] = useState("");
  useEffect(() => {
if(sessionStorage.getItem("isDocPage")==='true'){
  API.post("/api/asistan/donemGoruntule",{
      idrequest:sessionStorage.getItem("donemId")
  }).then((response) => {
    setDonemName( response.data[0].name);

});

API.get("/api/fotoGoruntule").then((response) => {

  setFoto( response.data );
});

API.post("/api/mudek/fotoGoruntule",{
    donemID:sessionStorage.getItem("donemId"),

        }).then((response) => {

  setFoto( response.data );
});


API.post("/api/mudek/docGoruntule",{
    donemID:sessionStorage.getItem("donemId"),

        }).then((response) => {

  setDocs( response.data );
});
}else{
  window.location.href = '/';
  alert("Bu Sayfaya Erişmeye Yetkili Değilsiniz!\nGiriş Sayfasına Yönlendiriliyorsunuz.")
}
}, []);

function onClickEventDepdocView (event)  {
  document.getElementById("depdocview").style.visibility = "visible";
  document.getElementById("depdocview").style.opacity = '1';
  if(event.target.value){

    API.post("/api/asistan/documanGoruntule",{
        docID:event.target.value,

            }).then((response) => {

              setSeciliDoc(response.data[0].doc_desc)
              docSrc.current.src=response.data[0].path;
              docExp.current.value=response.data[0].explanation;
              docSrc.current.id=event.target.value
    });
  }else{
    API.post("/api/asistan/documanGoruntule",{
        docID:event.target.id,

            }).then((response) => {

              setSeciliDoc(response.data[0].doc_desc)
              docSrc.current.src=response.data[0].path;
              docExp.current.value=response.data[0].explanation;
              docSrc.current.id=event.target.id
    });
  }
  }

function onClickEventFotoView (evente)  {

  document.getElementById("fotoview").style.visibility = "visible";
  document.getElementById("fotoview").style.opacity = '1';
  setSeciliFoto(evente.target.alt)
  photoSrc.current.src=evente.target.src;
  setDownloadFoto(evente.target.src)
  photoExp.current.value=evente.target.name;
  photoSrc.current.id=evente.target.id
  }

  return (
    <div className = "App">

        <MyNavBar role={sessionStorage.getItem("level")}/>

        <div>
        <img style={{margin: '10px' ,display: 'block', float: 'left', width: '70px', height: '70px'}}  alt="fakulte_logo" src={fakulte_logo}/>
        <h2 style= {{paddingTop: '10px', display: 'block', float: 'left', color: '#16394e'}}>
          Ankara Üniversitesi Bilgisayar Mühendisliği
        </h2>
        <h2 style= {{color: '#16394e', paddingTop: '10px', display: 'block', float: 'right', marginRight: '6%'}}>
        {donemName}
        </h2>
      </div>
      <hr style={{width: '90%' }} />
      <div>
        <div>

          <h3 style={{color: '#16394e', display: 'block', float: 'left', marginLeft: '6%'}}>
            BÖLÜM EVRAKLARI
          </h3>
        </div>
      <hr style={{width: '90%' }}/>
        <div className = "mavikutu">
         <ul class="horizonal-slideriki">
         {docs.map((val)=>
         <button onClick = {onClickEventDepdocView}  style = {{padding: '0px'}}>
           <li  value={val.department_doc_id} className = "koyukutu">
             <img style={{paddingTop: '12px', width: '100px', height: '146px'}} id={val.department_doc_id} alt= {val.doc_desc}  name={val.explanation} src={pdf_icon}/>
             <hr/>

                 {val.doc_desc}

           </li>
         </button>
       )}
          </ul>
        </div>
      </div>

        <div>
          <div>

            <h3 style={{color: '#16394e', display: 'block', float: 'left', marginLeft: '6%'}}>
              FOTOĞRAFLAR
            </h3>
          </div>
          <hr style={{width: '90%' }}/>
          <div className = "mavikutu">
          <ul class="horizonal-slider">
            {foto.map((val)=>
          <button onClick = {onClickEventFotoView}  style = {{padding: '0px'}}>
            <li  style = {{backgroundColor: '#16394e', width: '280px', height: '200px', borderRadius: '5px'}}>
              <img style={{padding: '15px', width: '250px', height: '170px'}} id={val.photos_id} alt= {val.doc_desc}  name={val.explanation} src={val.path}/>
            </li>
          </button>
        )}
            </ul>

          </div>
        </div>

        <div id = "depdocview" className = "bg-modal">
<div  className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    {seciliDoc}
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/depdocs_mudek' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
    <iframe style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px',width: '320px', height: '470px'}} alt="placeholder" src={placeholder} ref={docSrc}></iframe>
  <form style = {{ marginTop: '50px', marginRight: '5px', float: 'right'}} >

      <div style = {{ margin: '5px',position: 'relative', right: '20.5vh',color: ' #16394e'}}>
        Evrak Açıklaması
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '1vh',color: ' #16394e'}}>
        <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '320px'}}ref={docExp} readonly='true'></textarea>
      </div>

  </form>
</div>
</div>

<div id = "fotoview" className = "bg-modal">
<div  className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    {seciliFoto}
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/depdocs_mudek' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
  <a href={downloadFoto} target="_blank" download>
  <img style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px',width: '320px', height: '470px'}} ref={photoSrc} alt="placeholder" src={placeholder}></img>
  </a>
  <form style = {{ marginTop: '50px', marginRight: '5px', float: 'right'}} >

      <div style = {{ margin: '5px',position: 'relative', right: '19vh',color: ' #16394e'}}>
        Fotoğraf Açıklaması
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '1vh',color: ' #16394e'}}>
        <textarea readonly='true' style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '320px'}} ref={photoExp}></textarea>
      </div>

  </form>
</div>
</div>

    </div>
  );
}

export default Depdocs_Mudek;
