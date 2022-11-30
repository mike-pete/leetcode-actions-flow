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

export const saveFile = (path, fileName, contents) => {
	fs.writeFile(`${path}/${fileName}`, contents, (err) => {
		if (err) {
			console.error(err)
		}
	})
}