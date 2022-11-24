export const getChallengeData = () => {
	const data = fs.readFileSync('./scripts/challengeSummary.json')
	return JSON.parse(data)
}
