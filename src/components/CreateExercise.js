import React, {Component} from 'react'
import axios from "axios"

export default class CreateExercise extends Component{
    
    constructor(props){
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username : "",
            description: "",
            duration: 0,
            date: new Date(),
            users:[]
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/users").then(resp => {
            // console.log(resp.data.map(val => val.username))
            this.setState({
                users:resp.data.map(val => val.username),
                username:resp.data[0].username
            })
        }).catch(err => console.log("[CDM get Users]",err))
    }


    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(e){
        this.setState({
            date: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();

        const exercise = {
            username : this.state.username,
            description : this.state.description,
            duration : this.state.duration,
            date : this.state.date
        }

        // console.log(exercise);

        axios.post("http://localhost:5000/exercises/add", exercise)
        .then(res => console.log(res.data))
        .catch((err) => console.log("[Post Excercise]",err));

        window.location = "/";  
    }
    
    render(){
        return (
            <div>
                <h3>Create new Exercise Log</h3>
                <form onSubmit = {this.onSubmit} className="form">
                    <div className='form-group my-3'>
                        <label>Username: </label>
                        <select
                        required
                        className='form-control'
                        placeholder='Enter username'
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                            {
                                this.state.users.map((user) => {
                                    return <option
                                    key={user}
                                    value={user}
                                    >{user}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='form-group my-3'>
                        <label>Description: </label>
                        <input
                        type="text"
                        required
                        className='form-control'
                        value={this.state.description}
                        onChange={this.onChangeDescription}/>
                    </div>
                    <div className='form-group my-3'>
                        <label>Duration (in minutes): </label>
                        <input
                        type="text"
                        required
                        className='form-control'
                        value={this.state.duration}
                        onChange={this.onChangeDuration}/>
                    </div>
                    <div className='form-group my-3'>
                        <label>Date (in minutes): </label>
                        <div>
                            {/* <DatePicker
                            selected={this.state.date}
                            onChange={(e)=>this.onChangeDate(e)}/> */}
                            <input type="date"   onChange={this.onChangeDate}/>
                        </div>
                    </div>
                    <div className='form-group my-3'>
                        <input type="submit" value="Create Exercise Log" onClick={this.onSubmit} className='btn btn-primary'/>
                    </div>
                </form>
            </div>
        )
    }
}