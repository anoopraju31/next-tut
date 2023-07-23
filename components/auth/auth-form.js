import { useRef, useState } from 'react'
import { signIn } from 'next-auth/client'
import classes from './auth-form.module.css'

async function createUser(email, password) {
	const response = await fetch('api/auth/signup', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const data = response.json()

	if (!response.ok) {
		// console.log(data)
		// throw new Error(data.message || 'Something went wrong!')
	}

	return data
}

function AuthForm() {
	const [isLogin, setIsLogin] = useState(true)
	const emailRef = useRef()
	const passwordRef = useRef()

	function switchAuthModeHandler() {
		setIsLogin((prevState) => !prevState)
	}

	async function submitHandler(e) {
		e.preventDefault()
		const email = emailRef.current.value
		const password = passwordRef.current.value

		// validation:

		if (isLogin) {
			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
			})
			console.log(result)
		} else {
			try {
				const result = createUser(email, password)
			} catch (err) {
				console.log(err)
			}
		}

		emailRef.current.value = ''
		passwordRef.current.value = ''
	}

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input type='email' ref={emailRef} id='email' required />
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input type='password' ref={passwordRef} id='password' required />
				</div>
				<div className={classes.actions}>
					<button>{isLogin ? 'Login' : 'Create Account'}</button>
					<button
						type='button'
						className={classes.toggle}
						onClick={switchAuthModeHandler}>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	)
}

export default AuthForm
