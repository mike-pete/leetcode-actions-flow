import fetch from 'node-fetch'
import fs from 'fs'
import { getChallengeData } from './utils.js'

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

	const response = await fetch(
		'https://leetcode.com/graphql',
		requestOptions
	).catch((error) => console.log('error', error))

	const responseJSON = (await response?.json()) ?? null

	return responseJSON
}

const writeChallengeDataToFile = (challengeData) => {
	fs.writeFileSync(
		'./scripts/challengeSummary.json',
		JSON.stringify(challengeData)
	)
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
	}
}

saveChallengeData(process.argv[2])
