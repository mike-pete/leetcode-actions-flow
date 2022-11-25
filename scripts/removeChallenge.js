import { getChallengeData, writeChallengeDataToFile } from './utils.js'

export const removeChallenge = (challengeName) => {
	const challengeData = getChallengeData()
	delete challengeData.challengesCompleted?.[challengeName]
	writeChallengeDataToFile(challengeData)
}

removeChallenge(process.argv[2])
