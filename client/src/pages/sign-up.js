import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
	state = {
		username: '',
		password: '',
		email: '',
		isChecked: false,
		className: "test"
		// confirmPassword: '', // do this later
	}

	handleChange = event => {
		console.log(event.target)
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleCheck = event => {
		this.setState(({ isChecked }) => {
			return {
				isChecked: !isChecked
			}
		}, function () {
			console.log(this.state.isChecked, "updated value");
		});
		console.log(event.target.checked)
	}


	handleSubmit = event => {
		// console.log('sign-up handleSubmit, username: ')
		// console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/api/user', {
			username: this.state.username,
			password: this.state.password,
			email: this.state.email

		})
			.then(response => {
				// console.log(response)
				// if(response.data.errors){
				// 	console.log(response.data.errors);
				// }
				if (!response.data.errors) {
					// console.log('successful signup')
					axios
						.post('/api/user/login', {
							username: this.state.username,
							password: this.state.password,

						})
						.then(response => {
							// console.log('login response: ')
							// console.log(response)
							if (response.status === 200) {
								// update App.js state
								this.props.updateUser({
									loggedIn: true,
									username: response.data.username
								})
								// update the state to redirect to home
								window.location.assign('/')
							}
						}).catch(error => {
							console.log('login error: ')
							console.log(error);

						})
				} else {
					// console.log(response.data.errors)
					if (response.data.errors.email) {
						console.log("Email is required")
						this.setState({
							email: '',
							// redirectTo: '/signup'
						})
					}
					if (response.data.errors.password) {
						console.log("Password is required")
					}
					// if (this.state.isChecked == false) {
					// 	console.log("Check the box")
					// }
					
					// if (response.data.errors.username) {
					// 	console.log("Username is required")
					// 	this.setState({
					// 		className: "asdf"
					// 	})
					// 	console.log(this.state)
					// }

				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)
			})
	}

	render() {
		return (
			<div className="SignupForm">

				<form className="form-horizontal">

					<div className="form-group">
						<div className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="username">Username</label>
						</div>
						<div className="col-3 col-mr-auto">
							<input className="form-input"
								type="text"
								id="username"
								name="username"
								placeholder="Username"
								value={this.state.username}
								onChange={this.handleChange}
							/>
						</div>
					</div>

					<div className="form-group">
						<div className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="email">Email: </label>
						</div>
						<div className="col-3 col-mr-auto">
							<input className="form-input"
								placeholder="email (required)"
								type="text"
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
						</div>
					</div>

					<div className="form-group">
						<div className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="password">Password: </label>
						</div>
						<div className="col-3 col-mr-auto">
							<input className="form-input"
								placeholder="password"
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</div>
					</div>

					<div className="form-group">
						<div className="col-1 col-ml-auto">
							<label className="form-check-label" htmlFor="checkbox">Confirm</label>
						</div>
						<div className="col-3 col-mr-auto">
							<input className="form-check-input"
								type="checkbox"
								name="checkbox"
								isChecked={this.state.checkbox}
								onChange={this.handleCheck}
							/>
						</div>
					</div>

					<div className="form-group ">
						<div className="col-7"></div>
						<button
							className="btn btn-primary col-1 col-mr-auto"
							onClick={this.handleSubmit}
							type="submit"
						>Sign up</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Signup
