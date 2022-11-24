import fs from 'fs'

export const getChallengeData = () => {
	const data = fs.readFileSync('./scripts/challengeSummary.json')
	return JSON.parse(data)
}

export const writeChallengeDataToFile = (challengeData) => {
	fs.writeFileSync(
		'./scripts/challengeSummary.json',
		JSON.stringify(challengeData)
	)
}