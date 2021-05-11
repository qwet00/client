import React, {useState,useEffect,useRef} from "react";
import './dersSecimi.css';
import MyNavBar from './mynavbar';
import placeholder from './images/placeholder.JPG';
import pdf_icon from './images/pdf_icon2.JPG';
import fakulte_logo from './images/fakulte_logo.png';
import './modal.css';
import pen from './images/pen.png';
import Axios from "axios";
import './departmentdocs.css';
import { Progress } from 'reactstrap';
import API from './config/config';


function DepartmentDocs() {

  const[donemName,setDonemName]= useState("");
  const[foto,setFoto]= useState([]);
  const[docs,setDocs]= useState([]);
  const[changedfoto,setChangedFoto]= useState(undefined);

  const docName = useRef(null);
  const docSrc = useRef(null);
  const docExp = useRef(null);
  const [seciliDoc, setSeciliDoc] = useState("");

  const photoIn = useRef(null);
  const photoName = useRef(null);
  const photoSrc = useRef(null);
  const photoExp = useRef(null);
  const [seciliFoto, setSeciliFoto] = useState("");
  const [downloadFoto, setDownloadFoto] = useState("");
  const [isUploding, setUploding] = useState(false);
  const [uploadedImg, setUplodedImg] = useState("");
  const [uploadProgress, setProgress] = useState(0);


  const[changedDoc,setChangedDoc]= useState(undefined);


  useEffect(() => {
    if(sessionStorage.getItem("isDocPage")===true){

  API.post("/api/asistan/donemGoruntule",{
      idrequest:sessionStorage.getItem("donemId")
  }).then((response) => {
    setDonemName( response.data[0].name);

});

API.post("/api/asistan/fotoGoruntule",{
    donemID:sessionStorage.getItem("donemId"),
    userID:sessionStorage.getItem("id")
        }).then((response) => {

  setFoto( response.data );
});


API.post("/api/asistan/docGoruntule",{
    donemID:sessionStorage.getItem("donemId"),
    userID:sessionStorage.getItem("id")
        }).then((response) => {

  setDocs( response.data );
});

}else{
  window.location.href = '/';
  alert("Bu Sayfaya Erişmeye Yetkili Değilsiniz!\nGiriş Sayfasına Yönlendiriliyorsunuz.")
}
}, [])

const docInputChanged = async e =>{
  if(e.target.files.length>0){
  setChangedDoc(e.target.files[0])


}else{

setChangedDoc(undefined)
}
}

const dokumanYukle = async ()=>{
  let formData = new FormData();

  if(changedDoc){
  formData.append('file', changedDoc);
  setUploding(true);
  let { data } = await API.post('/api/depdocs/single-upload', formData, {
      onUploadProgress: ({ loaded, total }) => {
          let progress = ((loaded / total) * 100).toFixed(2);
          setProgress(progress);
      }
  });

    setUplodedImg(data.docPath);

    API.post("/api/asistan/docEkle",{

    userId:sessionStorage.getItem("id"),
    path: data.docPath,
    donem:sessionStorage.getItem("donemId"),
    name:document.getElementById("docName").value,
    explanation:document.getElementById("docExp").value
  }).then((response)=>{
    if(response.data.message){
      alert(response.data.message)
    }})

    setUploding(false);

  setChangedDoc(undefined)
}else{
alert("Evrak Seçiniz")
}


}

  const fileChanged = async e =>{
    if(e.target.files.length>0){
    setChangedFoto(e.target.files[0])

    photoIn.current.src= URL.createObjectURL(e.target.files[0]);

}else{
  photoIn.current.src=placeholder
  setChangedFoto(undefined)
}
  }

  const fotoYukle = async ()=>{
    let formData = new FormData();

    if(changedfoto){
    formData.append('file', changedfoto);
    setUploding(true);
    let { data } = await API.post('/api/images/single-upload', formData, {
        onUploadProgress: ({ loaded, total }) => {
            let progress = ((loaded / total) * 100).toFixed(2);
            setProgress(progress);
        }
    });

      setUplodedImg(data.imagePath);

      API.post("/api/asistan/fotoEkle",{

      userId:sessionStorage.getItem("id"),
      path: data.imagePath,
      donem:sessionStorage.getItem("donemId"),
      name:document.getElementById("fotoName").value,
      explanation:document.getElementById("fotoExp").value
    }).then((response)=>{
      if(response.data.message){
        alert(response.data.message)
      }})

      setUploding(false);

    setChangedFoto(undefined)
}else{
  alert("Fotoğraf Seçiniz")
}


  }


  const docSil =()=>{

    API.post("/api/asistan/docsil",{
        docId:docSrc.current.id,
    }).then((response)=>{
      window.location.href = '/departmentdocs';
      if(response.data.message){
        alert(response.data.message)
      }

    })



  }

  const docGuncelle=()=>{

    API.post("/api/asistan/docguncelle",{
        docId:docSrc.current.id,
        desc:document.getElementById("docviewname").value,
        exp:document.getElementById("docViewText").value
    }).then((response)=>{

      if(response.data.message){
        alert(response.data.message)
      }

    })

      setSeciliDoc(document.getElementById("docviewname").value)
      document.getElementById("depdocview").style.visibility = "visible";
      document.getElementById("depdocview").style.opacity = '1';
  }




    const fotoSil =()=>{

      API.post("/api/asistan/fotosil",{
          fotoId:photoSrc.current.id,
      }).then((response)=>{
        window.location.href = '/departmentdocs';
        if(response.data.message){
          alert(response.data.message)
        }

      })



    }

    const fotoGuncelle=()=>{

      API.post("/api/asistan/fotoguncelle",{
          fotoId:photoSrc.current.id,
          desc:document.getElementById("fotoviewname").value,
          exp:document.getElementById("fotoViewText").value
      }).then((response)=>{

        if(response.data.message){
          alert(response.data.message)
        }

      })



    }



  function onClickEventDepdoc (even)  {
    document.getElementById("depdoc").style.visibility = "visible";
    document.getElementById("depdoc").style.opacity = '1';
    }

  function onClickEventFoto (evenn)  {
    document.getElementById("foto").style.visibility = "visible";
    document.getElementById("foto").style.opacity = '1';
    }

  function onClickEventDepdocView (event)  {
    document.getElementById("depdocview").style.visibility = "visible";
    document.getElementById("depdocview").style.opacity = '1';
if(event.target.value){

  API.post("/api/asistan/documanGoruntule",{
      docID:event.target.value,

          }).then((response) => {

            setSeciliDoc(response.data[0].doc_desc)
            docName.current.value=response.data[0].doc_desc
            docSrc.current.src=response.data[0].path;
            docExp.current.value=response.data[0].explanation;
            docSrc.current.id=event.target.value
  });
}else{
  API.post("/api/asistan/documanGoruntule",{
      docID:event.target.id,

          }).then((response) => {

            setSeciliDoc(response.data[0].doc_desc)
            docName.current.value=response.data[0].doc_desc
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
    photoName.current.value=evente.target.alt
    photoSrc.current.src=evente.target.src;
    setDownloadFoto(evente.target.src)
    photoExp.current.value=evente.target.name;
    photoSrc.current.id=evente.target.id
    }


  return (
    <div className = "App">

        <MyNavBar role={sessionStorage.getItem("level")}/>

      <div>
        <img className = "fakultelogo"  alt="fakulte_logo" src={fakulte_logo}/>
        <h2 className = "depname">
          Ankara Üniversitesi Bilgisayar Mühendisliği
        </h2>
        <h2 className = "donemname">
          {donemName}
        </h2>
      </div>
      <hr style={{width: '90%' }} />
      <div>
        <div>
          <button onClick = {onClickEventDepdoc} className = "evrakekle">EVRAK EKLE</button>

          <h3 style={{color: '#16394e', display: 'block', float: 'left', marginLeft: '6%'}}>
            BÖLÜM EVRAKLARI
          </h3>
        </div>
      <hr style={{width: '90%' }}/>
      </div>
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

        <div>
          <div>
            <button onClick = {onClickEventFoto} style={{display: 'block', float: 'right', marginRight: '6%', marginTop: '2vh'}}>FOTOĞRAF EKLE</button>

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

<div id = "depdoc" className = "bg-modal">
<div  className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    Yeni Evrak Ekle
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/departmentdocs' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
  <img style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px'}}  alt="placeholder" src={placeholder}></img>
  <form style = {{ marginTop: '50px', marginRight: '5px', float: 'right'}} >

      <div style = {{ margin: '5px',position: 'relative', right: '79px',color: ' #16394e'}}>
        Evrak Adı :
        <input className = "textboxdesign" type = 'text' id = "docName" placeholder = 'Name' maxlength='15' ></input>
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '151px',color: ' #16394e'}}>
        Evrak Açıklaması
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '7px',color: ' #16394e'}}>
        <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '250px'}}id='docExp' maxlength='800'></textarea>
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '82px',color: ' #16394e'}}>
        Yüklemek İstediğiniz Evrağı Seçiniz.
      </div>
      <input style = {{margin: '5px',position: 'relative', right: '87px',color: ' #16394e'}} type="file" id="myFile" name="filename" accept=".pdf"  onChange={docInputChanged}></input>
      <div style = {{ margin: '5px',position: 'relative', right: '143px'}}>
        <button type = "button" onClick={dokumanYukle}>Yükle</button>
        {
                      isUploding ? (
                          <div className="flex-grow-1 px-2">

                                <progress id="file" value={uploadProgress} max="100"> {uploadProgress} </progress>
                                {uploadProgress}%
                          </div>
                      ) : null
                  }

                  {
                      uploadedImg && !isUploding ? (
                          <div style={{ marginTop :'5px'}}>

                          Yüklendi
                          </div>

                      ) : null
                  }
      </div>
  </form>
</div>
</div>

<div id = "foto" className = "bg-modal">
<div  className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    Yeni Fotoğraf Ekle
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/departmentdocs' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
  <img style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px' ,width: '320px', height: '470px'}} alt="placeholder" ref={photoIn} src={placeholder}></img>
  <form style = {{ marginTop: '50px', marginRight: '5px', float: 'right'}} >



      <div style = {{ margin: '5px',position: 'relative', right: '68px',color: ' #16394e'}}>
        Fotoğraf Adı :
        <input className = "textboxdesign" type = 'text' id = "fotoName" placeholder = 'Name' maxlength='15' ></input>
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '140px',color: ' #16394e'}}>
        Fotoğraf Açıklaması
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '6px',color: ' #16394e'}}>
        <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '250px'}} placeholder = 'En fazla 500 karakter' maxlength="500" id='fotoExp'></textarea>
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '70px',color: ' #16394e'}}>
        Yüklemek İstediğiniz Fotoğrafı Seçiniz.
      </div>
      <input style = {{margin: '5px',position: 'relative', right: '84px',color: ' #16394e'}} type="file" id="myFoto" accept="image/*" onChange={fileChanged} ></input>
      <div style = {{ margin: '5px',position: 'relative', right: '140px'}}>
        <button type = "button" onClick={fotoYukle}>Yükle</button>
        {
                      isUploding ? (
                          <div className="flex-grow-1 px-2">

                                <progress id="file" value={uploadProgress} max="100"> {uploadProgress} </progress>
                                {uploadProgress}%
                          </div>
                      ) : null
                  }

                  {
                      uploadedImg && !isUploding ? (
                          <div style={{ marginTop :'5px'}}>

                          Yüklendi
                          </div>

                      ) : null
                  }

      </div>

  </form>
</div>
</div>

<div id = "depdocview" className = "bg-modal">
<div  className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    {seciliDoc}
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/departmentdocs' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>

  <iframe style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px',width: '320px', height: '470px'}} alt="placeholder" src={placeholder} ref={docSrc}></iframe>

  <form style = {{ marginTop: '50px',marginRight:'5px',float:'right'}} >
      <div style = {{ margin: '5px',position: 'relative', right: '79px', color: ' #16394e'}}>
        Evrak Adı :
        <input className = "textboxdesign" type = 'text' id = "docviewname"  ref={docName} maxlength='15'></input>
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '151px',color: ' #16394e'}}>
        Evrak Açıklaması
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '7px',color: ' #16394e'}}>
        <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '320px'}} id="docViewText" maxlength='800'  ref={docExp}></textarea>
      </div>
      <div style = {{ marginRight: '30px'}}>
        <button type = "button" onClick={docGuncelle}>Güncelle</button>

        <button type = "button"onClick={docSil}>Dökümanı Sil</button>

      </div>
  </form>
</div>
</div>

<div id = "fotoview" className = "bg-modal">
<div  className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    {seciliFoto}
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/departmentdocs' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
  <a href={downloadFoto} target="_blank" download>
  <img style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px',width: '320px', height: '470px'}} ref={photoSrc} alt="placeholder" src={placeholder}></img>
  </a>
  <form style = {{ marginTop: '50px', marginRight: '5px', float: 'right'}} >
      <div style = {{ margin: '5px',position: 'relative', right: '68px',color: ' #16394e'}}>
        Fotoğraf Adı :
        <input className = "textboxdesign" type = 'text' id = "fotoviewname"  ref={photoName} maxlength='15'  ></input>
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '140px',color: ' #16394e'}}>
        Fotoğraf Açıklaması
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '6px',color: ' #16394e'}}>
        <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '320px'}} id="fotoViewText" maxlength='500' ref={photoExp}></textarea>
      </div>

      <div style = {{ marginRight: '30px'}}>

        <button type = "button" onClick={fotoGuncelle}>Güncelle</button>

        <button type = "button" onClick={fotoSil}>Fotoğrafı Sil</button>


      </div>
  </form>
</div>
</div>

</div>
  );
}

export default DepartmentDocs;
