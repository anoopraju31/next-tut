import Link from 'next/link'
import { useSession } from 'next-auth/client'
import classes from './main-navigation.module.css'

function MainNavigation() {
	const [session, loading] = useSession()
	console.log(session)
	return (
		<header className={classes.header}>
			<Link href='/'>
				<a>
					<div className={classes.logo}>Next Auth</div>
				</a>
			</Link>
			<nav>
				<ul>
					<li>
						<Link href='/auth'>Login</Link>
					</li>
					{session && (
						<li>
							<Link href='/profile'>Profile</Link>
						</li>
					)}
					{session && (
						<li>
							<button>Logout</button>
						</li>
					)}

					<li> {JSON.stringify(session)}</li>
				</ul>
			</nav>
		</header>
	)
}

export default MainNavigation
