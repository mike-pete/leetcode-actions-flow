import fetch from "node-fetch"
import fs from "fs"

const getChallengeDataFromFile = () => {
  const data = fs.readFileSync("challengeSummary.json")
  return JSON.parse(data)
}

const getChallengeDataFromGraphQL = async (challengeName) => {
  const query = `
    query allQuestions($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
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
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: graphql,
    redirect: "follow",
  }

  const response = await fetch("https://leetcode.com/graphql", requestOptions).catch((error) => {
    console.error("error fetching data", error)
    return null
  })
  const responseJSON = await response.json()

  const { errors } = responseJSON

  if (errors) {
    console.error("error fetching data", errors)
    return null
  } else {
    return responseJSON
  }
}

const writeChallengeDataToFile = (challengeData) => {
  fs.writeFileSync("challengeSummary.json", JSON.stringify(challengeData))
}

const saveChallengeData = async (challengeName) => {
  const graphQLData = await getChallengeDataFromGraphQL(challengeName)

  if (graphQLData) {
    const { question } = graphQLData.data

    const savedChallengeData = getChallengeDataFromFile()
    let updatedChallengeData = { ...savedChallengeData }
    const key = challengeName.toLowerCase()
    updatedChallengeData.challengesCompleted[key] = question

    writeChallengeDataToFile(updatedChallengeData)
  }
}

saveChallengeData(process.argv[2])
