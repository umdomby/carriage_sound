import React, { Component } from 'react'
import JoyStick from './JoyStick'

class Canvas extends Component{
    state = {
        handleChange: this.props.onChange,
        canvasName: this.props.name
    }

    componentDidMount(){

        const canvas = document.getElementById(this.state.canvasName)

        canvas.width = canvas.getBoundingClientRect().width
        canvas.height = canvas.getBoundingClientRect().height

        console.log(canvas.getBoundingClientRect());

        let position ={
            x: canvas.width/2,
            y: canvas.height/2
        }

        this.setState({
            joystick: new JoyStick(canvas, position, 70, this.state.handleChange)

        })
    }

    render(){
        return (
            <canvas id={this.state.canvasName}></canvas>
        )
    }
}

export default Canvas
