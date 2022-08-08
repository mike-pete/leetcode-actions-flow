#LeetCode Solution Readme Generation
As solutions to LeetCode challenges are added to the solutions folder, a Github Action runs the name of each solution through these scripts to generate Readmes from their descriptions on LeetCode.com
LeetCode challenge descriptions and examples are queried from LeetCode's GraphQL servers and stored locally. Using that data, a Readme is generated in that solution's directory and the solution is added to the main repository's table of completed challenges.

###saveChallengeData
Given the name of a LeetCode challenge, queries LeetCode's GraphQL database for the challenge's description and stores the result in a local json.
###buildChallengeReadme
Given the name of a LeetCode challenge, builds a Readme in that challenge's directory using the information in the locally stored json.
###buildRepoReadme
Rebuilds the main repository's Readme table of completed challenges using entries in the locally stored json.
##Usage
These scripts are run automatically every time changes are pushed to the solutions folder using Github Actions.
First, a Github Actions job checks if there are any solution directories that do not have a Readme (either it's a new solution or the Readme has been deleted). Those directories are passed to a second job that uses them one at a time as command line arguments running the above scripts.
If a directory is added to the solutions folder that doesn't match the name of a valid LeetCode challenge, it is removed. The job then pushes the created Readmes to the repository.