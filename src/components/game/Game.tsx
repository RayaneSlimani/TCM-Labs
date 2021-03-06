import React from 'react';
import Cell from './../cell/Cell'
import rabbit from './../../img/rabbit.png'
import turtle from './../../img/turtle.png'
import {calculateNeighbors, makeEmptyBoard} from '../../rules/rules'
export interface gameProps{
}

export interface gameState{
    cells:any
    isRunning:boolean
    interval:number
    cycle:number
}

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

export default class Game extends React.Component<gameProps, gameState>{

    private boardRef = React.createRef() as any;
    timer: any;
    rows: number;
    cols: number;
    board: any;
    timeoutHandler: any;
    constructor(props:gameProps) {
        super(props);
        this.state = {
        cells: [],
        isRunning: false,
        interval: 100,
        cycle:0
    }
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = makeEmptyBoard({rows:this.rows, cols:this.cols}) as any
    // this.makeEmptyBoard = this.makeEmptyBoard.bind(this)
    this.getElementOffset = this.getElementOffset.bind(this)
    this.makeCells = this.makeCells.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.runGame = this.runGame.bind(this)
    this.stopGame = this.stopGame.bind(this)
    this.runIteration = this.runIteration.bind(this)
    this.handleIntervalChange = this.handleIntervalChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleRandom = this.handleRandom.bind(this)
    }

    // makeEmptyBoard() {
    //     let board = [] as any;
    //     for (let y = 0; y < this.rows; y++) {
    //         board[y] = [];
    //         for (let x = 0; x < this.cols; x++) {
    //             board[y][x] = false;
    //         }
    //     }
    //     return board;
    // }
    getElementOffset() {
        if(this.boardRef){
            const rect = this.boardRef.getBoundingClientRect()
            const doc = document.documentElement
            return {
                x: (rect.left + window.pageXOffset) - doc.clientLeft,
                y: (rect.top + window.pageYOffset) - doc.clientTop,
            };
        }
    }
    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }
        return cells;
    }
    handleClick(event:any) {
        const elemOffset = this.getElementOffset();
        if(elemOffset){
            const offsetX = event.clientX - elemOffset.x
            const offsetY = event.clientY - elemOffset.y
            const x = Math.floor(offsetX / CELL_SIZE)
            const y = Math.floor(offsetY / CELL_SIZE)
            if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
                this.board[y][x] = !this.board[y][x]
            }   
            this.setState({ cells: this.makeCells() })
        }
    }
    runGame() {
        this.setState({ isRunning: true },()=>{
            this.runIteration()
        })
    }
    stopGame() {
        this.setState({ isRunning: false })
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null
        }
    }
    runIteration() {
        let newBoard = makeEmptyBoard({rows:this.rows, cols:this.cols}) as any;
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = calculateNeighbors({board:this.board, x, y, cols:this.cols, rows:this.rows});
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true
                    } else {
                        newBoard[y][x] = false
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true
                    }
                }
            }
        }
        this.board = newBoard
        this.setState({ cells: this.makeCells(), cycle: this.state.cycle+1 })
        if(this.state.isRunning){
            this.timeoutHandler = window.setTimeout(() => {
                this.runIteration();
            }, this.state.interval);
        }
    }

    handleIntervalChange(event:any) {
        this.setState({ interval: event.target.value })
    }
    handleClear() {
        this.board = makeEmptyBoard({rows:this.rows, cols:this.cols}) as any;
        this.setState({ cells: this.makeCells(), cycle: 0 })
    }
    handleRandom() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x] = (Math.random() >= 0.8)
            }
        }
        this.setState({ cells: this.makeCells() });
    }
    render() {
        return (
            <div className="container">
                <h1 className="display-1"> Game Of Life</h1>
                <span>Cycles {this.state.cycle}</span>
                <div className="controls">
                    <img className="icon" src={rabbit} alt="Rabbit"/>
                    <div className="slider-container">
                        <input className="slider" type="range" value={this.state.interval} onChange={this.handleIntervalChange} />
                    </div>
                    <img className="icon" src={turtle} alt="Turtel"/>
                    <div className="button-div">
                        {this.state.isRunning ?<button className="btn" onClick={this.stopGame}>Stop</button>:<button className="btn" onClick={this.runGame}>Start</button>}
                        <button className="btn" onClick={this.handleRandom}>Random</button>
                        <button className="btn" onClick={this.runIteration}>View next step</button>
                        <button className="btn" onClick={this.handleClear}>Clear</button>
                    </div>
                </div>
                <div className="Board" style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}} onClick={this.handleClick} ref={(n:any) => { this.boardRef = n; }}>
                    {this.state.cells.map((cell:any) => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                    ))}
                </div>
            </div>
        )
    }
}