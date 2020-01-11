import React from 'react';
export interface cellProps{
    x:number;
    y:number
}

export interface cellState{
    cells: any,
    isRunning: boolean,
    interval: number,
}

const CELL_SIZE = 20;



export default class Cell extends React.Component<cellProps, cellState>{
    render() {
        const { x, y } = this.props;
        return (
            <div className="Cell" style={{
                left: `${CELL_SIZE * x + 1}px`,
                top: `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
            }} />
        );
    }
}