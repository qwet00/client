import React, {useState,useEffect,useRef} from "react";
import './dersSecimi.css';
import MyNavBar from './mynavbar';
import placeholder from './images/placeholder.JPG';
import fakulte_logo from './images/fakulte_logo.png';
import './modal.css';
import pen from './images/pen.png';
import pdf_icon from './images/pdf_icon2.JPG';
import './lecture.css';
import Axios from "axios";
import './departmentdocs.css';
import { Progress } from 'reactstrap';
import API from './config/config';


function Lecture() {
  const[donemName,setDonemName]= useState("");
  const[dersName,setDersName]= useState("");
  const[detID,setdetId]= useState("");
  const[lectureDocs,setLectureDocs]= useState([]);
  const[examDocs,setExamDocs]= useState([]);
  const[kazanimlar,setKazanimlar]= useState([]);
  const[anketDocs,setAnketDocs]= useState([]);

  const lecDocName = useRef(null);
  const lecDocSrc = useRef(null);
  const lecDocExp = useRef(null);
  const [seciliLecDoc, setSeciliLecDoc] = useState("");


  const anketDocName = useRef(null);
  const anketDocSrc = useRef(null);
  const anketDocExp = useRef(null);
  const [seciliAnketDoc, setSeciliAnketDoc] = useState("");

  const kazanimExp = useRef(null);
  const kazanimSrc = useRef(null);
  const [seciliKazanim, setSeciliKazanim] = useState("");

  const examDocType = useRef(null);
  const examDocRank = useRef(null);
  const examDocRank2 = useRef(null);
  const examDocRank3 = useRef(null);
  const examDocName = useRef(null);
  const examDocSrc = useRef(null);
  const examDocExp = useRef(null);
  const [seciliExamDoc, setSeciliExamDoc] = useState("");

  const[changedDoc,setChangedDoc]= useState(undefined);

  const [isUploding, setUploding] = useState(false);
  const [uploadedImg, setUplodedImg] = useState("");
  const [uploadProgress, setProgress] = useState(0);
  useEffect(() => {
if(sessionStorage.getItem("isDocPage")==='true'){
  API.post("/api/asistan/donemGoruntule",{
      idrequest:sessionStorage.getItem("donemId")
  }).then((response) => {
    setDonemName( response.data[0].name);

  });

  API.post("/api/egitmen/dersGoruntule",{
      idrequest:sessionStorage.getItem("dersId")
  }).then((response) => {
    setDersName( response.data[0].lecture_name);

  });

  API.post("/api/egitmen/lectureDet",{
      dersID:sessionStorage.getItem("dersId"),
      donemID:sessionStorage.getItem("donemId"),
      userID:sessionStorage.getItem("id")
  }).then((response) => {
    setdetId( response.data[0].lecture_det_id);

    API.post("/api/egitmen/lectureDocGoruntule",{
        lecDetID:response.data[0].lecture_det_id

    }).then((response) => {
      setLectureDocs( response.data);

    });

    API.post("/api/egitmen/anketDocGoruntule",{
        lecDetID:response.data[0].lecture_det_id

    }).then((response) => {
      setAnketDocs( response.data);

    });

    API.post("/api/egitmen/examDocGoruntule",{
        lecDetID:response.data[0].lecture_det_id

    }).then((response) => {
      setExamDocs( response.data);

    });

    API.post("/api/egitmen/kazanimGoruntule",{
        lecDetID:response.data[0].lecture_det_id

    }).then((response) => {
      setKazanimlar( response.data);

    });

  });

}else{
  window.location.href = '/';
  alert("Bu Sayfaya Erişmeye Yetkili Değilsiniz!\nGiriş Sayfasına Yönlendiriliyorsunuz.")
}

  }, []);

  const lectureDocInputChanged = async e =>{
    if(e.target.files.length>0){
    setChangedDoc(e.target.files[0])


  }else{

  setChangedDoc(undefined)
  }
  }

  const lectureDokumanYukle = async ()=>{
    let formData = new FormData();

    if(changedDoc){
    formData.append('file', changedDoc);
    setUploding(true);
    let { data } = await API.post('/api/lecturedocs/single-upload', formData, {
        onUploadProgress: ({ loaded, total }) => {
            let progress = ((loaded / total) * 100).toFixed(2);
            setProgress(progress);
        }
    });

      setUplodedImg(data.docPath);

      API.post("/api/instructor/lecturedocEkle",{

      lectureDetId:detID,
      path: data.docPath,
      name:document.getElementById("lecturedocname").value,
      explanation:document.getElementById("lecturedocExp").value
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


  const lecDocSil =()=>{

    API.post("/api/egitmen/lecdocsil",{
        docId:lecDocSrc.current.id,
    }).then((response)=>{
      window.location.href = '/lecture';
      if(response.data.message){
        alert(response.data.message)
      }

    })



  }

  const lecDocGuncelle=()=>{

    API.post("/api/egitmen/lecdocguncelle",{
        docId:lecDocSrc.current.id,
        desc:document.getElementById("lecdocviewname").value,
        exp:document.getElementById("lecdocViewText").value
    }).then((response)=>{

      if(response.data.message){
        alert(response.data.message)
      }

    })

      setSeciliLecDoc(document.getElementById("lecdocviewname").value)
      document.getElementById("dersiciview").style.visibility = "visible";
      document.getElementById("dersiciview").style.opacity = '1';
  }

  const examDocInputChanged = async e =>{
    if(e.target.files.length>0){
    setChangedDoc(e.target.files[0])


  }else{

  setChangedDoc(undefined)
  }
  }

  const examDokumanYukle = async ()=>{
    let formData = new FormData();
    let check=0;
    if(document.getElementById("enyuksek2").checked){
      check=1;
    }else if(document.getElementById("orta2").checked) {
      check=2;
    }else if(document.getElementById("endusuk2").checked){
      check=3;
    }
    if(changedDoc){
    formData.append('file', changedDoc);
    setUploding(true);
    let { data } = await API.post('/api/examdocs/single-upload', formData, {
        onUploadProgress: ({ loaded, total }) => {
            let progress = ((loaded / total) * 100).toFixed(2);
            setProgress(progress);
        }
    });

      setUplodedImg(data.docPath);

      API.post("/api/instructor/examDocEkle",{

      lectureDetId:detID,
      path: data.docPath,
      examRank:check,
      examType:document.getElementById("examType").value,
      name:document.getElementById("examdocname").value,
      explanation:document.getElementById("examdocExp").value
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



  const examDocSil =()=>{

    API.post("/api/egitmen/examdocsil",{
        docId:examDocSrc.current.id,
    }).then((response)=>{
      window.location.href = '/lecture';
      if(response.data.message){
        alert(response.data.message)
      }

    })



  }

  const examDocGuncelle=()=>{
    let check=0;
    if(document.getElementById("enyuksek").checked){
      check=1;
    }else if(document.getElementById("orta").checked) {
      check=2;
    }else if(document.getElementById("endusuk").checked){
      check=3;
    }
    API.post("/api/egitmen/examdocguncelle",{
        docId:examDocSrc.current.id,
        docname:document.getElementById("examdocviewname").value,
        exp:document.getElementById("examdocViewText").value,
        type:document.getElementById("examdocViewType").value,
        rank:check
    }).then((response)=>{

      if(response.data.message){
        alert(response.data.message)
      }

    })

      setSeciliExamDoc(document.getElementById("examdocviewname").value)
      document.getElementById("sinavdocview").style.visibility = "visible";
      document.getElementById("sinavdocview").style.opacity = '1';
  }

  const kazanimEkle =()=>{
    API.post("/api/instructor/kazanimEkle",{
      lectureDetId:detID,
      type:document.getElementById("attainmentsType").value,
      explanation:document.getElementById("attainmentExp").value
    }).then((response)=>{
    window.location.href = '/lecture';
      if(response.data.message){
        alert(response.data.message)
      }

    })
  }

  const kazanimSil =()=>{

    API.post("/api/egitmen/kazanimsil",{
        docId:kazanimSrc.current.id,
    }).then((response)=>{
      window.location.href = '/lecture';
      if(response.data.message){
        alert(response.data.message)
      }

    })



  }

  const kazanimGuncelle=()=>{

    API.post("/api/egitmen/kazanimguncelle",{
        docId:kazanimSrc.current.id,
        exp:document.getElementById("kazanimText").value
    }).then((response)=>{

      if(response.data.message){
        alert(response.data.message)
      }

    })


  }




  const anketDocInputChanged = async e =>{
    if(e.target.files.length>0){
    setChangedDoc(e.target.files[0])


  }else{

  setChangedDoc(undefined)
  }
  }

  const anketDokumanYukle = async ()=>{
    let formData = new FormData();

    if(changedDoc){
    formData.append('file', changedDoc);
    setUploding(true);
    let { data } = await API.post('/api/anketdocs/single-upload', formData, {
        onUploadProgress: ({ loaded, total }) => {
            let progress = ((loaded / total) * 100).toFixed(2);
            setProgress(progress);
        }
    });

      setUplodedImg(data.docPath);

      API.post("/api/instructor/anketDocEkle",{

      lectureDetId:detID,
      path: data.docPath,
      name:document.getElementById("anketdocname").value,
      explanation:document.getElementById("anketdocExp").value
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


  const anketDocSil =()=>{

    API.post("/api/egitmen/anketdocsil",{
        docId:anketDocSrc.current.id,
    }).then((response)=>{
      window.location.href = '/lecture';
      if(response.data.message){
        alert(response.data.message)
      }

    })



  }

  const anketDocGuncelle=()=>{

    API.post("/api/egitmen/anketdocguncelle",{
        docId:anketDocSrc.current.id,
        desc:document.getElementById("anketdocviewname").value,
        exp:document.getElementById("anketdocViewText").value
    }).then((response)=>{

      if(response.data.message){
        alert(response.data.message)
      }

    })

      setSeciliAnketDoc(document.getElementById("anketdocviewname").value)
      document.getElementById("anketView").style.visibility = "visible";
      document.getElementById("anketView").style.opacity = '1';
  }





  function onClickEventDersici (e)  {
    document.getElementById("dersici").style.visibility = "visible";
    document.getElementById("dersici").style.opacity = '1';
    }

  function onClickEventSinavdoc (ev)  {
     document.getElementById("sinavdoc").style.visibility = "visible";
     document.getElementById("sinavdoc").style.opacity = '1';
    }

  function onClickEventKazanim (eve)  {
     document.getElementById("kazanim").style.visibility = "visible";
     document.getElementById("kazanim").style.opacity = '1';
    }

    function onClickEventAnket (e)  {
      document.getElementById("anketEkle").style.visibility = "visible";
      document.getElementById("anketEkle").style.opacity = '1';
      }

    function onClickEventDersiciView (e)  {
      document.getElementById("dersiciview").style.visibility = "visible";
      document.getElementById("dersiciview").style.opacity = '1';
      if(e.target.value){

        API.post("/api/egitmen/lecturedocumanGoruntule",{
            docID:e.target.value,

                }).then((response) => {

                  setSeciliLecDoc(response.data[0].doc_name)
                  lecDocName.current.value=response.data[0].doc_name
                  lecDocSrc.current.src=response.data[0].path;
                  lecDocExp.current.value=response.data[0].doc_desc;
                  lecDocSrc.current.id=e.target.value
        });
      }else{
        API.post("/api/egitmen/lecturedocumanGoruntule",{
            docID:e.target.id,

                }).then((response) => {

                  setSeciliLecDoc(response.data[0].doc_name)
                  lecDocName.current.value=response.data[0].doc_name
                  lecDocSrc.current.src=response.data[0].path;
                  lecDocExp.current.value=response.data[0].doc_desc;
                  lecDocSrc.current.id=e.target.id

        });
      }
      }

    function onClickEventSinavdocView (ev)  {
       document.getElementById("sinavdocview").style.visibility = "visible";
       document.getElementById("sinavdocview").style.opacity = '1';

       if(ev.target.value){

         API.post("/api/egitmen/examdocumanGoruntule",{
             docID:ev.target.value,

                 }).then((response) => {

                   setSeciliExamDoc(response.data[0].doc_name)
                   examDocName.current.value=response.data[0].doc_name
                   examDocSrc.current.src=response.data[0].path;
                   examDocExp.current.value=response.data[0].explanation;
                   examDocSrc.current.id=ev.target.value
                   examDocType.current.value=response.data[0].exam_type;
                   if(response.data[0].exam_rank==1){
                     examDocRank.current.checked=true
                   }else if(response.data[0].exam_rank==2){
                     examDocRank2.current.checked=true
                   }else if(response.data[0].exam_rank==3){
                     examDocRank3.current.checked=true
                   }
         });
       }else{
         API.post("/api/egitmen/examdocumanGoruntule",{
             docID:ev.target.id,

                 }).then((response) => {

                   setSeciliExamDoc(response.data[0].doc_name)
                   examDocName.current.value=response.data[0].doc_name
                   examDocSrc.current.src=response.data[0].path;
                   examDocExp.current.value=response.data[0].explanation;
                   examDocSrc.current.id=ev.target.id
                   examDocType.current.value=response.data[0].exam_type;
                   if(response.data[0].exam_rank==1){
                     examDocRank.current.checked=true
                   }else if(response.data[0].exam_rank==2){
                     examDocRank2.current.checked=true
                   }else if(response.data[0].exam_rank==3){
                     examDocRank3.current.checked=true
                   }
         });
       }




      }

    function onClickEventKazanimView (eve)  {
       document.getElementById("kazanimview").style.visibility = "visible";
       document.getElementById("kazanimview").style.opacity = '1';

       if(eve.target.id){
         API.post("/api/egitmen/kazanimiGoruntule",{
             docID:eve.target.id,

                 }).then((response) => {

                   setSeciliKazanim(response.data[0].attainment_type)
                   kazanimExp.current.value=response.data[0].explanation;
                   kazanimSrc.current.id=eve.target.id

         });
}
       else {
         API.post("/api/egitmen/kazanimiGoruntule",{
             docID:eve.target.value,

                 }).then((response) => {

                   setSeciliKazanim(response.data[0].attainment_type)
                   kazanimExp.current.value=response.data[0].explanation;
                   kazanimSrc.current.id=eve.target.value
                    });
       }
      }

      function onClickEventAnketView (e)  {
        document.getElementById("anketView").style.visibility = "visible";
        document.getElementById("anketView").style.opacity = '1';
        if(e.target.value){

          API.post("/api/egitmen/anketdocumanGoruntule",{
              docID:e.target.value,

                  }).then((response) => {

                    setSeciliAnketDoc(response.data[0].doc_name)
                    anketDocName.current.value=response.data[0].doc_name
                    anketDocSrc.current.src=response.data[0].path;
                    anketDocExp.current.value=response.data[0].doc_desc;
                    anketDocSrc.current.id=e.target.value
          });
        }else{
          API.post("/api/egitmen/anketdocumanGoruntule",{
              docID:e.target.id,

                  }).then((response) => {

                    setSeciliAnketDoc(response.data[0].doc_name)
                    anketDocName.current.value=response.data[0].doc_name
                    anketDocSrc.current.src=response.data[0].path;
                    anketDocExp.current.value=response.data[0].doc_desc;
                    anketDocSrc.current.id=e.target.id

          });
        }
        }

  return (
    <div className = "App">

        <MyNavBar role={sessionStorage.getItem("level")}/>

    <div>
      <img className = "fakultelogo"  alt="fakulte_logo" src={fakulte_logo}/>
      <h2 className = "dersadi">
        {dersName}
      </h2>
      <h2 className = "donemadi" >
        {donemName}
      </h2>
    </div>
    <hr style={{width: '90%' }} />
    <div>
      <div>
        <button className = "btnekle" onClick = {onClickEventDersici}>EVRAK EKLE</button>

        <h3 className = "baslik" >
          DERS İÇİ DÖKÜMANLAR
        </h3>
      </div>
      <hr style={{width: '90%' }}/>
      <div className = "buyukkutu">
      <ul class="horizonal-slideriki" >
     {lectureDocs.map((val)=>
        <button onClick = {onClickEventDersiciView} style = {{padding: '0px'}}>
          <li value={val.lecture_doc_id} className = "koyukutu" >
            <img style={{paddingTop: '12px', width: '100px', height: '146px'}} id={val.lecture_doc_id} alt="placeholder" src={pdf_icon}/>
            <hr/>

                {val.doc_name}

          </li>
          </button>
        )}


          </ul>

      </div>
    </div>

    <div>
      <div>
        <button className = "btnekle" onClick = {onClickEventSinavdoc}>EVRAK EKLE</button>

        <h3 className = "baslik">
          SINAV DÖKÜMANLARI
        </h3>
      </div>
      <hr style={{width: '90%' }}/>
      <div className = "buyukkutu">
      <ul class="horizonal-slideriki">
           {examDocs.map((val)=>
      <button onClick = {onClickEventSinavdocView}  style = {{padding: '0px'}}>
          <li className = "koyukutu" value={val.exam_doc_id}>
            <img style={{paddingTop: '12px', width: '100px', height: '146px'}}  id={val.exam_doc_id}  alt="placeholder" src={pdf_icon}/>
            <hr/>

                {val.doc_name}

          </li>
      </button>
    )}

          </ul>
      </div>
    </div>

    <div>
      <div>
        <button className = "btnekle" onClick = {onClickEventKazanim} >KAZANIM EKLE</button>

        <h3 className = "baslik">
        DERS ÖĞRENME KAZANIMLARI
        </h3>
      </div>
      <hr style={{width: '90%' }}/>
      <div style = {{height: '200px'}} className = "buyukkutu">

        <ul class="horizonal-slideriki">
           {kazanimlar.map((val)=>
        <button onClick = {onClickEventKazanimView} style = {{padding: '0px'}}>
          <li className = "kazanimkutu" value={val.attainments_id}>
       <div className = "kazanimbaslik" id={val.attainments_id}>
          {val.attainment_type} Kazanımları
          </div>
          </li>
          </button>
        )}

          </ul>


      </div>
    </div>



    <div>
      <div>
        <button className = "btnekle" onClick = {onClickEventAnket}>EVRAK EKLE</button>

        <h3 className = "baslik" >
          ÖLÇME VE DEĞERLENDİRME EVRAKLARI
        </h3>
      </div>
      <hr style={{width: '90%' }}/>
      <div className = "buyukkutu">
      <ul class="horizonal-slideriki" >
     {anketDocs.map((val)=>
        <button onClick = {onClickEventAnketView} style = {{padding: '0px'}}>
          <li value={val.doc_id} className = "koyukutu" >
            <img style={{paddingTop: '12px', width: '100px', height: '146px'}} id={val.doc_id} alt="placeholder" src={pdf_icon}/>
            <hr/>

                {val.doc_name}

          </li>
          </button>
        )}


          </ul>

      </div>
    </div>





    <div id = "dersici" className = "bg-modal">
      <div  className = "modal-content">

        <h3 style = {{color: ' #16394e'}}>
          Yeni Döküman Ekle
          <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
          <a href = '/lecture' >
          <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
          </a>
          </h3>

        <hr/>
        <img style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px'}} alt="placeholder" src={placeholder}></img>
        <form style = {{ marginTop: '50px', marginRight: '5px', float: 'right'}} >

            <div style = {{ margin: '5px',position: 'relative', right: '79px',color: ' #16394e'}}>
              Evrak Adı :
            <input className = "textboxdesign" type = 'text' id = "lecturedocname" placeholder = 'Name' maxlength='15' ></input>
            </div>
            <div style = {{ margin: '5px',position: 'relative', right: '151px',color: ' #16394e'}}>
              Evrak Açıklaması
            </div>
            <div style = {{ margin: '5px',position: 'relative', right: '7px',color: ' #16394e'}}>
              <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '250px'}} id='lecturedocExp' maxlength='800'></textarea>
            </div>
            <div style = {{ margin: '5px',position: 'relative', right: '70px',color: ' #16394e'}}>
              Yüklemek İstediğiniz Dökümanı Seçiniz.
            </div>
            <input style = {{margin: '5px',position: 'relative', right: '87px',color: ' #16394e'}} type="file" id="myFile" name="filename" accept=".pdf"  onChange={lectureDocInputChanged}></input>
            <div style = {{ margin: '5px',position: 'relative', right: '140px'}}>
              <button type = "button" onClick={lectureDokumanYukle}>Gönder</button>
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

    <div id = "sinavdoc" className = "bg-modal">
      <div  className = "modal-content">

        <h3 style = {{color: ' #16394e'}}>
          Yeni Sınav Dökümanı Ekle
          <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
          <a href = '/lecture' >
          <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
          </a>
          </h3>

        <hr/>
        <img style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px'}} alt="placeholder" src={placeholder}></img>
        <form style= {{marginRight: '5px', float: 'right'}} >
          <div style = {{ margin: '5px',position: 'relative', right: '80px', top: '44px', color: ' #16394e'}}>
            Evrak Adı :
          <input className = "textboxdesign" type = 'text' id = "examdocname" placeholder = 'Name' ></input>
          </div>
          <div style = {{margin: '5px', float: 'center', marginTop: '50px', position: 'relative', right: '148px',color: ' #16394e'}}>
            Sınav Türü Seçiniz
          </div>
          <div>
            <select style = {{ backgroundColor:'#a3cbe3', color: '#16394e', margin: '5px', height: '30px', width:'250px',position: 'relative', right: '86px'}} id='examType'>
              <option value='1'>Sınav Soruları</option>
              <option value='2'>Cevap Anahtarı</option>
              <option value='3'>1.Vize</option>
              <option value='4'>2.Vize</option>
              <option value='5'>Final</option>
            </select>
          </div>
            <div style = {{ margin: '5px',position: 'relative', right: '132px',color: ' #16394e'}}>
              Sınav Derecesi Seçiniz
            </div>
            <div style = {{ margin: '5px',position: 'relative', right: '160px',color: ' #16394e'}}>
              <div>
              <input type="radio" id="enyuksek2" name="derece" value="1"/>
              <label style= {{margin: '8px'}} for="male">En Yüksek</label>
              </div>
              <div style = {{position: 'relative', right: '22px'}}>
              <input type="radio" id="orta2" name="derece" value="2"/>
              <label style= {{margin: '8px' }} for="female">Orta</label>
              </div>
              <div style = {{position: 'relative', right: '4px'}}>
              <input type="radio" id="endusuk2" name="derece" value="3"/>
              <label style= {{margin: '8px'}} for="other">En Düşük</label>
              </div>
            </div>
            <div style = {{ margin: '5px',position: 'relative', right: '150px',color: ' #16394e'}}>
              Evrak Açıklaması
            </div>
            <div style = {{ margin: '5px',position: 'relative', right: '6px',color: ' #16394e'}}>
              <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '160px'}} id="examdocExp" maxlength='800'></textarea>
            </div>
            <div style = {{ margin: '5px',position: 'relative', right: '70px',color: ' #16394e'}}>
              Yüklemek İstediğiniz Dökümanı Seçiniz.
            </div>
            <input style = {{margin: '5px',position: 'relative', right: '87px',color: ' #16394e'}} type="file" id="myFile" name="filename" accept=".pdf" onChange={examDocInputChanged}></input>
            <div style = {{ margin: '5px',position: 'relative', right: '137px'}}>
              <button type = "button" onClick={examDokumanYukle}>Gönder</button>
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

    <div id = "kazanim" className = "bg-modal">
      <div  className = "modal-content">

        <h3 style = {{color: ' #16394e'}}>
          Yeni Kazanım Ekle
          <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
          <a href = '/lecture' >
          <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
          </a>
          </h3>

        <hr/>
        <form >
          <div style = {{margin: '5px', float: 'center', marginTop: '50px', position: 'relative',color: ' #16394e'}}>
            Kazanım Türünü Seçiniz
          </div>
          <div>
            <select style = {{ backgroundColor:'#a3cbe3', color: '#16394e', margin: '5px', height: '30px', width:'250px',position: 'relative'}} id='attainmentsType' >
              <option value='Sınav Soruları'>Sınav Soruları</option>
              <option value='Cevap Anahtarı'>Cevap Anahtarı</option>
              <option value='1.Vize'>1.Vize</option>
              <option value='2.Vize'>2.Vize</option>
              <option value='Final'>Final</option>
            </select>
          </div>
            <div style = {{ margin: '5px',position: 'relative',color: ' #16394e'}}>
              Kazanım
            </div>
            <div style = {{ margin: '5px',position: 'relative', color: ' #16394e'}}>
              <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '500px', height: '200px'}} id='attainmentExp' maxlength='800'></textarea>
            </div>
            <div style = {{ margin: '5px',position: 'relative'}}>
              <button type = "button" onClick={kazanimEkle}>Ekle</button>
            </div>
        </form>
      </div>
    </div>




        <div id = "anketEkle" className = "bg-modal">
          <div  className = "modal-content">

            <h3 style = {{color: ' #16394e'}}>
              Yeni Döküman Ekle
              <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
              <a href = '/lecture' >
              <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
              </a>
              </h3>

            <hr/>
            <img style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px'}} alt="placeholder" src={placeholder}></img>
            <form style = {{ marginTop: '50px', marginRight: '5px', float: 'right'}} >

                <div style = {{ margin: '5px',position: 'relative', right: '79px',color: ' #16394e'}}>
                  Evrak Adı :
                <input className = "textboxdesign" type = 'text' id = "anketdocname" placeholder = 'Name' maxlength='15' ></input>
                </div>
                <div style = {{ margin: '5px',position: 'relative', right: '151px',color: ' #16394e'}}>
                  Evrak Açıklaması
                </div>
                <div style = {{ margin: '5px',position: 'relative', right: '7px',color: ' #16394e'}}>
                  <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '250px'}} id='anketdocExp' maxlength='800'></textarea>
                </div>
                <div style = {{ margin: '5px',position: 'relative', right: '70px',color: ' #16394e'}}>
                  Yüklemek İstediğiniz Dökümanı Seçiniz.
                </div>
                <input style = {{margin: '5px',position: 'relative', right: '87px',color: ' #16394e'}} type="file" id="myFileAnket" name="filename" accept=".pdf"  onChange={anketDocInputChanged}></input>
                <div style = {{ margin: '5px',position: 'relative', right: '140px'}}>
                  <button type = "button" onClick={anketDokumanYukle}>Gönder</button>
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







    <div id = "dersiciview" className = "bg-modal">
<div  className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    {seciliLecDoc}
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/lecture' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
  <iframe style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px',width: '320px', height: '470px'}} alt="placeholder" src={placeholder} ref={lecDocSrc}></iframe>

  <form style = {{ marginTop: '50px', marginRight: '5px', float: 'right'}} >
      <div style = {{ margin: '5px',position: 'relative', right: '79px',color: ' #16394e'}}>
        Evrak Adı :
        <input className = "textboxdesign" type = 'text' id = "lecdocviewname"  ref={lecDocName} maxlength='15' ></input>
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '151px',color: ' #16394e'}}>
        Evrak Açıklaması
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '7px',color: ' #16394e'}}>
        <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '320px'}}id="lecdocViewText" maxlength='800'  ref={lecDocExp}></textarea>
      </div>
      <div style = {{ marginRight: '30px'}}>
      <button type = "button" onClick={lecDocGuncelle}>Güncelle</button>

      <button type = "button"onClick={lecDocSil}>Dökümanı Sil</button>

      </div>
  </form>
</div>
</div>

<div id = "sinavdocview" className = "bg-modal">
<div  className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    {seciliExamDoc}
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/lecture' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
  <iframe style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px',width: '320px', height: '470px'}} alt="placeholder" src={placeholder} ref={examDocSrc}></iframe>
  <form style = {{ marginTop: '20px', marginRight: '3px', float: 'right'}} >
    <div style={{marginLeft:'95px'}}>
          <div style = {{ margin: '5px',position: 'relative', right: '80px',  color: ' #16394e'}}>
            Evrak Adı :
          <input className = "textboxdesign" type = 'text' id = "examdocviewname" ref={examDocName} maxlength='15' ></input>
          </div>
          <div style = {{margin: '5px', float: 'center', marginTop: '5px', position: 'relative', right: '148px',color: ' #16394e'}}>
            Sınav Türü Seçiniz
          </div>
          <div>
            <select style = {{ backgroundColor:'#a3cbe3', color: '#16394e', margin: '5px', height: '30px', width:'250px',position: 'relative', right: '86px'}} id='examdocViewType' ref={examDocType}>
              <option value='1'>Sınav Soruları</option>
              <option value='2' >Cevap Anahtarı</option>
              <option value='3' >1.Vize</option>
              <option value='4'>2.Vize</option>
              <option value='5'>Final</option>
            </select>
          </div>
            <div style = {{ margin: '5px',position: 'relative', right: '132px',color: ' #16394e'}}>
              Sınav Derecesi Seçiniz
            </div>
            <div style = {{ margin: '5px',position: 'relative', right: '160px',color: ' #16394e'}}>
              <div style = {{position: 'relative', right: '-1px'}}>
              <input type="radio" id="enyuksek" name="derece" value="1" ref={examDocRank}/>
              <label style= {{margin: '8px'}} for="male">En Yüksek</label>
              </div>
              <div style = {{position: 'relative', right: '21px'}}>
              <input type="radio" id="orta" name="derece" value="2" ref={examDocRank2}/>
              <label style= {{margin: '8px' }} for="female">Orta</label>
              </div>
              <div style = {{position: 'relative', right: '2px'}}>
              <input type="radio" id="endusuk" name="derece" value="3" ref={examDocRank3}/>
              <label style= {{margin: '8px'}} for="other">En Düşük</label>
              </div>
            </div>
      <div style = {{ margin: '5px',position: 'relative', right: '150px',color: ' #16394e'}}>
        Evrak Açıklaması
      </div>
      </div>

      <div style = {{ margin: '5px',position: 'relative', right: '6px',color: ' #16394e'}}>
        <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '300px'}} id="examdocViewText" maxlength='800'  ref={examDocExp}></textarea>
      </div>
      <div style = {{ marginRight: '30px'}}>
      <button type = "button" onClick={examDocGuncelle}>Güncelle</button>

      <button type = "button"onClick={examDocSil}>Dökümanı Sil</button>

      </div>
  </form>
</div>
</div>

<div id = "kazanimview" className = "bg-modal">
<div  className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    {seciliKazanim} Kazanımı
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/lecture' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
  <img style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px'}} alt="placeholder" src={placeholder} ref={kazanimSrc} ></img>
  <form style = {{ marginTop: '50px'}} >

      <div style = {{ margin: '5px',position: 'relative', right: '20.5vh',color: ' #16394e'}}>
        Kazanım Açıklaması
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '1vh',color: ' #16394e'}}>
        <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '320px'}} id='kazanimText' ref={kazanimExp} maxlength='800'></textarea>
      </div>
      <div style = {{ marginRight: '30px'}}>
        <button type = "button" onClick={kazanimGuncelle}>Güncelle</button>

        <button type = "button" onClick={kazanimSil}>Dökümanı Sil</button>

      </div>
  </form>
</div>
</div>



<div id = "anketView" className = "bg-modal">
<div  className = "modal-content">

<h3 style = {{color: ' #16394e'}}>
{seciliAnketDoc}
<img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
<a href = '/lecture' >
<span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
</a>
</h3>

<hr/>
<iframe style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px',width: '320px', height: '470px'}} alt="placeholder" src={placeholder} ref={anketDocSrc}></iframe>

<form style = {{ marginTop: '50px', marginRight: '5px', float: 'right'}} >
  <div style = {{ margin: '5px',position: 'relative', right: '79px',color: ' #16394e'}}>
    Evrak Adı :
    <input className = "textboxdesign" type = 'text' id = "anketdocviewname"   maxlength='15' ref={anketDocName} ></input>
  </div>
  <div style = {{ margin: '5px',position: 'relative', right: '151px',color: ' #16394e'}}>
    Evrak Açıklaması
  </div>
  <div style = {{ margin: '5px',position: 'relative', right: '7px',color: ' #16394e'}}>
    <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '320px'}}id="anketdocViewText" maxlength='800' ref={anketDocExp}></textarea>
  </div>
  <div style = {{ marginRight: '30px'}}>
  <button type = "button" onClick={anketDocGuncelle}>Güncelle</button>

  <button type = "button" onClick={anketDocSil}>Dökümanı Sil</button>

  </div>
</form>
</div>
</div>



    </div>
  );
}
export default Lecture;
