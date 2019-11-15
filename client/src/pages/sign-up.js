import React, { Component } from 'react'
import axios from 'axios'
import './pages.css';

class Signup extends Component {
	state = {
		inputFields: {},
		errors: {},
		// username: '',
		// password: '',
		// email: '',
		isChecked: false,
	}

	handleChange = event => {
		// console.log(event.target)
		let inputFields = this.state.inputFields;
		inputFields[event.target.name] = event.target.value;
		this.setState({
			inputFields
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

	handleValidateForm = event => {
		event.preventDefault()

		let inputFields = this.state.inputFields;
		let errors = {};
		let formValid = false;
		console.log("validating");

		if (!inputFields["username"]) {
			console.log("check user")
			formValid = false;
			errors["username"] = "*Username is required.";
			this.setState({
				errors
			})
		}
		if (!inputFields["email"]) {
			console.log("check email")
			formValid = false;
			errors["email"] = "*Email is required.";
			this.setState({
				errors
			})
		}
		if (!inputFields["password"]) {
			console.log("check pass")
			formValid = false;
			errors["password"] = "*Password is required.";
			this.setState({
				errors
			})
		} else {
			this.setState({
				errors
			});
			this.submitUser();
		}
	}

	submitUser = () => {
		// console.log('sign-up handleSubmit, username: ')
		// console.log(this.state.username)
			console.log("creating account")
			//request to server to add a new username/password
			console.log(this.state.inputFields.username)
			axios.post('/api/user', {
				username: this.state.inputFields.username,
				password: this.state.inputFields.password,
				email: this.state.inputFields.email
			}).then(response => {
				if (response.data.errors) {
					// console.log(response.data.errors);
				}
				if (!response.data.errors) {
					// console.log('successful signup')
					axios.post('/api/user/login', {
						username: this.state.inputFields.username,
						password: this.state.inputFields.password,
					}).then(response => {
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
				}
			})
	}


	// else {
	// 				// console.log(response.data.errors)
	// 				if (response.data.errors.email) {
	// 					console.log("Email is required")
	// 					this.setState({
	// 						email: '',
	// 						// redirectTo: '/signup'
	// 					})
	// 				}
	// 				if (response.data.errors.password) {
	// 					console.log("Password is required")
	// 				}
	// 			}
	// 		}).catch(error => {
	// 			console.log('signup error: ')
	// 			console.log(error)
	// 		})
	// }

	render() {
		return (
			<div className="SignupForm" >

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
								value={this.state.inputFields.username}
								onChange={this.handleChange}
							/>
							<div className="errorMessage">{this.state.errors.username}</div>
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
								value={this.state.inputFields.email}
								onChange={this.handleChange}
							/>
							<div className="errorMessage">{this.state.errors.email}</div>

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
								value={this.state.inputFields.password}
								onChange={this.handleChange}
							/>
							<div className="errorMessage">{this.state.errors.password}</div>

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
							onClick={this.handleValidateForm}
							type="submit"
						>Sign up</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Signup
