import { compare, hash } from 'bcryptjs'

export const hashFunction = async (password) => {
	const hashedPassword = await hash(password, 12)
	return hashedPassword
}

export const verifyPassword = async (password, hashedPassword) => {
	const isValidPassword = await compare(password, hashedPassword)
	return isValidPassword
}
