

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Cookie", "csrftoken=VeFK8LAE4uOGWNV0AUeJYU6G3jlJA50lN5DteVMBs045k6Be5BGRDNcWLRYOou8M");

// var graphql = JSON.stringify({
//   query: "query questionData($titleSlug: String!) {\r\n  question(titleSlug: $titleSlug) {\r\n    questionId\r\n    questionFrontendId\r\n    boundTopicId\r\n    title\r\n    titleSlug\r\n    content\r\n    difficulty\r\n    categoryTitle\r\n  }\r\n}\r\n  ",
//   variables: {"titleSlug":"3sum"}
// })
// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: graphql,
//   redirect: 'follow'
// };

// fetch("https://leetcode.com/graphql", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));