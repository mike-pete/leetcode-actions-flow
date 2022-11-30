# LeetCode Solution Readme Generation
As solutions to LeetCode challenges are added to the solutions folder, a Github Action runs the name of each challenge through these scripts to generate Readmes from their descriptions on LeetCode.com
LeetCode challenge descriptions and examples are queried from LeetCode's GraphQL servers and stored locally. Using that data, a Readme is generated in that challenge's directory and the challenge solution is added to the main repository's table of completed challenges.

### saveChallengeData
Given the name of a LeetCode challenge, queries LeetCode's GraphQL database for the challenge's description and stores the result in a local json.
### buildChallengeReadme
Given the name of a LeetCode challenge, builds a Readme in that challenge's directory using the information in the locally stored json.
### buildRepoReadme
Rebuilds the main repository's Readme table of completed challenges using entries in the locally stored json.