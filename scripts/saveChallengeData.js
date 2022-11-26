import fetch from 'node-fetch'
import { getChallengeData, writeChallengeDataToFile } from './utils.js'

const getChallengeDataFromGraphQL = async (challengeName) => {
	const query = `
		query allQuestions($titleSlug: String!) {
			question(titleSlug: $titleSlug) {
				questionId
				title
				content
				difficulty
				categoryTitle
			}
		}
  	`

	const graphql = JSON.stringify({
		query,
		variables: { titleSlug: challengeName.toLowerCase() },
	})

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: graphql,
		redirect: 'follow',
	}

	const response = await fetch('https://leetcode.com/graphql', requestOptions)
	const responseJSON = (await response?.json()) ?? null
	return responseJSON
}

const saveChallengeData = async (challengeName) => {
	const graphQLData = await getChallengeDataFromGraphQL(challengeName)

	if (graphQLData?.data?.question) {
		const { question } = graphQLData.data
		question.challengeName = challengeName
		let updatedChallengeData = getChallengeData()
		const key = challengeName.toLowerCase()
		updatedChallengeData.challengesCompleted[key] = question

		writeChallengeDataToFile(updatedChallengeData)
	} else if (graphQLData?.errors) {
		console.error(
			'Problem with GraphQL query, double check your challenge name!'
		)
		console.error(graphQLData.errors)
	}
}

saveChallengeData(process.argv[2])
