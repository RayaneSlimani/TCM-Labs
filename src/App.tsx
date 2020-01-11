import React from 'react';
import Game from './components/game/Game'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './img/Life.gif'
export interface appProps{}
export interface appState{
    start:boolean
}

export default class App extends React.Component<appProps, appState> {
    constructor(props:appProps) {
        super(props);
        this.state = {
        start:false
        }
    }
    render(){
        return (
            <div className="App">
            {!this.state.start
            ?(<header className="App-header">
                  <h1 className="display-2">Le jeu de la vie</h1>
                  <img src={logo} alt="logo"/>
                  <button className="btn" onClick={()=>this.setState({start:true})}>Start</button>
              </header>)
            :(
                <Game/>
            )}
            </div>
        )
    }
}