import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';

class Clock extends React.Component{
    constructor() {
        super()
        this.state = {
            time: moment().format('LTS'),
            background: {
                backgroundColor: "white"
            },
            class: ''
        }
    }
    componentDidMount() {
        setInterval(()=>{
            this.setState({
                time: moment().format('LTS')
            })
        },1000)
    }
    render() {
        return(
            <div id="clock" style={this.state.background} onClick={this.clicked}>
                <h1 className={this.state.class}>{this.state.time}</h1>
            </div>
        )
    }
}


class Button extends React.Component{
    render() {
        return (
            <div className="btnDiv" onClick={this.props.onClick}>
                <a className="btn" href="#">
                    <b>{this.props.started? "Stop" : "Start"}</b>
                </a>
            </div>
        )
    }
}

class Record extends React.Component{
    render() {
        return (<div className="record">
                <div className="recordTime">
                    <div className="recordStartTime">{this.props.startTime}</div>
                    <div className="recordEndTime">{this.props.endTime}</div>
                </div>
                <div className="recordSummary"><input type="text"/></div>
            </div>
        );
    }
}

class Records extends React.Component{

    render() {
        let list = this.props.records.slice().reverse()
        const records = list.map(
            (record) =>
                <Record
                    startTime={record.startTime}
                    endTime ={record.endTime}
                />

        );
        return (<div className="records">{ records }</div>);
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            records: [],
            hasStarted: false,
        }
    }

    track(){
        if(this.state.hasStarted){
            let element = this.state.records.pop();
            element.endTime = moment().format('LTS');
            this.state.records.push(element);
        } else {
            this.state.records.push({"startTime":moment().format('LTS')});
        }
        this.state.hasStarted = !this.state.hasStarted;
        this.setState({
            records: this.state.records,
            hasStarted: this.state.hasStarted
        });
    }

    render() {
        return(
            <div>
                <Clock/>
                <Button started={this.state.hasStarted} onClick={() => this.track()}/>
                <Records records={this.state.records}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('app'))