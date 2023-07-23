import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDatabase } from '../../../helpers/db'
import { verifyPassword } from '../../../helpers/auth'

export default NextAuth({
	session: {
		jwt: true,
		// maxAge: 30d
	},
	providers: [
		Providers.Credentials({
			authorize: async (credentials) => {
				const client = await connectToDatabase()
				const users = client.db().collection('users')
				const user = await users.findOne({ email: credentials.email })

				// console.log(user)
				if (!user) {
					client.close()
					throw new Error('User Not Found!')
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password,
				)
				console.log(isValid)
				if (!isValid) {
					client.close()
					throw new Error('Incorrect password!')
				}

				client.close()

				return {
					email: user.email,
				}
			},
		}),
	],
})
