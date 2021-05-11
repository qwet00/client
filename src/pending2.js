import React, { Component } from 'react';
import './App.css';
import MyNavBar from './mynavbar';


export default class Pending extends Component {

    render() {
        return (
          <div className="App">

            <MyNavBar role={sessionStorage.getItem("level")}/>

              <div style={{backgroundColor: "#f5f5f5",height: '400px', width: '100vh',
              border: '2px solid #16394e', boxShadow: '#16394e 10px 10px 5px',position: 'relative',margin: 'auto',
              zIndex: '1',top: '10vh' }}>
                <div>
                  <h3 style={{color: '#16394e'}}>
                  Ankara Üniversitesi MUDEK sistemine Hoşgeldiniz!
                  </h3>
                </div>
                <hr/>
                <div style={{padding: '7vh' ,margin: '10px'}}>
                  Üyeliğiniz admin tarafından iptal edilmiştir.

                </div>
                <div>
                <a href="/contactsys"><button className = "btnlogin">ILETISIM</button></a>
                </div>
              </div>
            </div>
        )
    }
}
