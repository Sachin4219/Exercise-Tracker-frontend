import React, {Component} from 'react'
import axios from "axios"

export default class CreateUser extends Component{
    
    constructor(props){
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username : ""
        }
    }

    componentDidMount(){
        this.setState({
            username:""
        })
    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault()
        const user = {
            username:this.state.username
        }
        console.log(user)
        axios.post("http://localhost:5000/users/add", user)
        .then(res => console.log(res.data))
        
        this.setState({
            username:""
        })
    }

    render(){
        return (
            <div>
                <h3>Create new User</h3>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className='form-group my-3'>
                        <label>Username: </label>
                        <input className='form-control' type="text" onChange={this.onChangeUsername} required value={this.state.username} placeholder='Username'/>
                        </div>
                        <div className='form-group my-2'>
                        <input type="submit" className='btn btn-primary'/>
                        </div>
                        </form>
            </div>
        )
    }
}