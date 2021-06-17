import React, {useState,useEffect,useRef} from "react";
import './dersSecimi.css';
import MyNavBar from './mynavbar';
import placeholder from './images/placeholder.JPG';
import fakulte_logo from './images/fakulte_logo.png';
import pdf_icon from './images/pdf_icon2.JPG';
import Axios from "axios";
import pen from './images/pen.png';
import API from './config/config';

function Lecture_Mudek() {
  const[donemName,setDonemName]= useState("");
  const[dersName,setDersName]= useState("");
  const[lectureDocs,setLectureDocs]= useState([]);
  const[examDocs,setExamDocs]= useState([]);
  const[kazanimlar,setKazanimlar]= useState([]);
  const[detID,setdetId]= useState("");
  const[anketDocs,setAnketDocs]= useState([]);

  const lecDocSrc = useRef(null);
  const lecDocExp = useRef(null);
  const [seciliLecDoc, setSeciliLecDoc] = useState("");

  const kazanimExp = useRef(null);
  const kazanimSrc = useRef(null);
  const [seciliKazanim, setSeciliKazanim] = useState("");


    const anketDocSrc = useRef(null);
    const anketDocExp = useRef(null);
    const [seciliAnketDoc, setSeciliAnketDoc] = useState("");

  const examDocName = useRef(null);
  const examDocSrc = useRef(null);
  const examDocExp = useRef(null);
  const [seciliExamDoc, setSeciliExamDoc] = useState("");
  const [examRank, setExamRank] = useState("");
  const [examType, setExamType] = useState("");
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

  API.post("/api/mudek/lectureDet",{
      dersID:sessionStorage.getItem("dersId"),
      donemID:sessionStorage.getItem("donemId"),
  }).then((response) => {
    setdetId( response.data[0].lecture_det_id);

    API.post("/api/egitmen/lectureDocGoruntule",{
        lecDetID:response.data[0].lecture_det_id

    }).then((response) => {
      setLectureDocs( response.data);

    });

    API.post("/api/egitmen/examDocGoruntule",{
        lecDetID:response.data[0].lecture_det_id

    }).then((response) => {
      setExamDocs( response.data);

    });

    API.post("/api/egitmen/anketDocGoruntule",{
        lecDetID:response.data[0].lecture_det_id

    }).then((response) => {
      setAnketDocs( response.data);

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

  function onClickEventDersiciView (e)  {
    document.getElementById("dersiciview").style.visibility = "visible";
    document.getElementById("dersiciview").style.opacity = '1';
    if(e.target.value){

      API.post("/api/egitmen/lecturedocumanGoruntule",{
          docID:e.target.value,

              }).then((response) => {

                setSeciliLecDoc(response.data[0].doc_name)
                lecDocSrc.current.src=response.data[0].path;
                lecDocExp.current.value=response.data[0].doc_desc;
                lecDocSrc.current.id=e.target.value
      });
    }else{
      API.post("/api/egitmen/lecturedocumanGoruntule",{
          docID:e.target.id,

              }).then((response) => {

                setSeciliLecDoc(response.data[0].doc_name)
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
               examDocSrc.current.src=response.data[0].path;
               examDocExp.current.value=response.data[0].explanation;
               examDocSrc.current.id=ev.target.value
               if(response.data[0].exam_rank==1){
                 setExamRank("En Yüksek")
               }else if(response.data[0].exam_rank==2){
                 setExamRank("Orta")
               }else if(response.data[0].exam_rank==3){
                  setExamRank("En Düşük")
               }else{
                 setExamRank("Belirsiz")
               }
               if(response.data[0].exam_type==1){
                 setExamType("Sınav Soruları")
               }else if(response.data[0].exam_type==2){
                 setExamType("Cevap Anahtarı")
               }else if(response.data[0].exam_type==3){
                  setExamType("1.Vize")
               }else if(response.data[0].exam_type==4){
                 setExamType("2.Vize")
               }else if(response.data[0].exam_type==5){
                  setExamType("Final")
               }
     });
   }else{
     API.post("/api/egitmen/examdocumanGoruntule",{
         docID:ev.target.id,

             }).then((response) => {

               setSeciliExamDoc(response.data[0].doc_name)
               examDocSrc.current.src=response.data[0].path;
               examDocExp.current.value=response.data[0].explanation;
               examDocSrc.current.id=ev.target.id
               if(response.data[0].exam_rank==1){
                 setExamRank("En Yüksek")
               }else if(response.data[0].exam_rank==2){
                 setExamRank("Orta")
               }else if(response.data[0].exam_rank==3){
                  setExamRank("En Düşük")
               }else{
                 setExamRank("Belirsiz")
               }
               if(response.data[0].exam_type==1){
                 setExamType("Sınav Soruları")
               }else if(response.data[0].exam_type==2){
                 setExamType("Cevap Anahtarı")
               }else if(response.data[0].exam_type==3){
                  setExamType("1.Vize")
               }else if(response.data[0].exam_type==4){
                 setExamType("2.Vize")
               }else if(response.data[0].exam_type==5){
                  setExamType("Final")
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

      document.getElementById("anketview").style.visibility = "visible";
      document.getElementById("anketview").style.opacity = '1';
      if(e.target.value){

        API.post("/api/egitmen/anketdocumanGoruntule",{
            docID:e.target.value,

                }).then((response) => {

                  setSeciliAnketDoc(response.data[0].doc_name)

                  anketDocSrc.current.src=response.data[0].path;
                  anketDocExp.current.value=response.data[0].doc_desc;
                  anketDocSrc.current.id=e.target.value
        });
      }else{
        API.post("/api/egitmen/anketdocumanGoruntule",{
            docID:e.target.id,

                }).then((response) => {

                  setSeciliAnketDoc(response.data[0].doc_name)

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

        <h3 className = "baslik" >
          DERS İÇİ DÖKÜMANLAR
        </h3>
      </div>
      <hr style={{width: '90%' }}/>
      <div className = "buyukkutu">
      <ul class="horizonal-slideriki">
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

        <h3 className = "baslik" >
        ÖLÇME VE DEĞERLENDİRME EVRAKLARI
        </h3>
      </div>
      <hr style={{width: '90%' }}/>
      <div className = "buyukkutu">
      <ul class="horizonal-slideriki">
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

    <div id = "dersiciview" className = "bg-modal">
<div  className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    {seciliLecDoc}
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/lecture_mudek' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
  <iframe style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px',width: '320px', height: '470px'}} alt="placeholder" src={placeholder} ref={lecDocSrc}></iframe>
  <form style = {{ marginTop: '50px' , marginRight: '5px', float: 'right'}} >

      <div style = {{ margin: '5px',position: 'relative', right: '20.5vh',color: ' #16394e'}}>
        Evrak Açıklaması
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '1vh',color: ' #16394e'}}>
        <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '320px'}} ref={lecDocExp} readonly='true'></textarea>
      </div>
      <div style = {{ marginRight: '30px'}}>

      </div>
  </form>
</div>
</div>

<div id = "sinavdocview" className = "bg-modal2">
<div  className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    {seciliExamDoc}
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/lecture_mudek' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
  <iframe style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px',width: '320px', height: '470px'}} alt="placeholder" src={placeholder} ref={examDocSrc}></iframe>
  <form style = {{ marginTop: '50px', marginRight: '5px', float: 'right'}} >
      <div style = {{ margin: '5px',position: 'relative', right: '20.5vh',color: ' #16394e'}}>
        Sınav Türü : {examType}
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '17vh',color: ' #16394e'}}>
        Sınav Derecesi : {examRank}
      </div>

      <div style = {{ margin: '5px',position: 'relative', right: '20.5vh',color: ' #16394e'}}>
        Evrak Açıklaması
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '1vh',color: ' #16394e'}}>
        <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '320px'}}ref={examDocExp} readonly='true'></textarea>
      </div>
      <div style = {{ marginRight: '30px'}}>

      </div>
  </form>
</div>
</div>

<div id = "kazanimview" className = "bg-modal">
<div  className = "modal-content">

  <h3 style = {{color: ' #16394e'}}>
    {seciliKazanim} Kazanımı
    <img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
    <a href = '/lecture_mudek' >
    <span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
    </a>
    </h3>

  <hr/>
  <img style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px'}} alt="placeholder" src={placeholder} ref={kazanimSrc}></img>
  <form style = {{ marginTop: '50px', marginRight: '5px', float: 'right'}} >

      <div style = {{ margin: '5px',position: 'relative', right: '20.5vh',color: ' #16394e'}}>
        Evrak Açıklaması
      </div>
      <div style = {{ margin: '5px',position: 'relative', right: '1vh',color: ' #16394e'}}>
        <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '320px'}}ref={kazanimExp} readonly='true'></textarea>
      </div>
      <div style = {{ marginRight: '30px'}}>

      </div>
  </form>
</div>
</div>

<div id = "anketview" className = "bg-modal">
<div  className = "modal-content">

<h3 style = {{color: ' #16394e'}}>
{seciliAnketDoc}
<img style = {{ color: '#16394e'}} alt="pen" src={pen}/>
<a href = '/lecture_mudek' >
<span style = {{color: '#aaa', float: 'right', fontSize: '28px',fontWeight: 'bold', marginTop: '0px', marginRight: '5px', boxSizing: 'border-box'}}>x</span>
</a>
</h3>

<hr/>
<iframe style={{ margin: '5vh', float: 'left' ,border: 'solid 1px', borderRadius: '5px',width: '320px', height: '470px'}} alt="placeholder" src={placeholder} ref={anketDocSrc}></iframe>
<form style = {{ marginTop: '50px' , marginRight: '5px', float: 'right'}} >

  <div style = {{ margin: '5px',position: 'relative', right: '20.5vh',color: ' #16394e'}}>
    Evrak Açıklaması
  </div>
  <div style = {{ margin: '5px',position: 'relative', right: '1vh',color: ' #16394e'}}>
    <textarea style = {{backgroundColor:'#a3cbe3', color: '#16394e',width: '400px', height: '320px'}} ref={lecDocExp} readonly='true' ref={anketDocExp}></textarea>
  </div>
  <div style = {{ marginRight: '30px'}}>

  </div>
</form>
</div>
</div>



    </div>
  );
}

export default Lecture_Mudek;
