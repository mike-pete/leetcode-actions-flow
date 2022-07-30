import fetch from "node-fetch"

const getChallengeData = async () => {
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
    variables: { titleSlug: "3sum" },
  })

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: graphql,
    redirect: "follow",
  }

  const response = fetch("https://leetcode.com/graphql", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error))

  return await response
}

