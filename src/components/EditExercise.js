import React, {Component} from 'react'
import axios from "axios"
import {useParams} from "react-router-dom"
class EditExercise extends Component{
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
        console.log(this.props.params)
        axios.get("http://localhost:5000/exercises/"+this.props.params.id)
        .then(response => {
            this.setState({
                username:response.data.username,
                description:response.data.description,
                duration:response.data.duration,
                date: new Date(response.data.date)
            })
        })
        .catch((err) => console.log("axios exercise get error: "+err))

        axios.get("http://localhost:5000/users").then(resp => {
            // if(resp.data.length > 0)
            this.setState({
                users:resp.data.map(val => val.username)
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

        axios.post("http://localhost:5000/exercises/update/"+this.props.params.id, exercise)
        .then(res => console.log(res.data))
        .catch((err) => console.log("[Update Excercise]",err));

        window.location = "/";  
    }

    
    render(){
        return (
            <div>
                <h3>Edit Exercise Log</h3>
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
                            <input type="date" value={this.state.date}  onChange={this.onChangeDate}/>
                        </div>
                    </div>
                    <div className='form-group my-3'>
                        <input type="submit" value="Edit Exercise Log" onClick={this.onSubmit} className='btn btn-primary'/>
                    </div>
                </form>
            </div>
        )
    }
}
export default (props) => (
    <EditExercise 
        {...props}
        params={useParams()}
    />
);