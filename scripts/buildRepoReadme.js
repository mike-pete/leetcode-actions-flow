import fs from 'fs'
import { getChallengeData } from './utils.js'

// languages supported: C++, Java, Python, Python3, C, C#, JavaScript, Ruby, Swift, Go, Scala, Kotlin, Rust, PHP, TypeScript, Racket, Erlang, Elixir, Dart
const fileExtensions = {
	cpp: 'C++',
	java: 'Java',
	py: 'Python',
	py3: 'Python3',
	c: 'C',
	cs: 'C#',
	js: 'JavaScript',
	rb: 'Ruby',
	swift: 'Swift',
	go: 'Go',
	sc: 'Scala',
	kt: 'Kotlin',
	rs: 'Rust',
	php: 'PHP',
	ts: 'TypeScript',
	rkt: 'Racket',
	erl: 'Erlang',
	exs: 'Elixir',
	dart: 'Dart',
	md: 'Markdown',
}

const saveRepoReadme = (fileContents) => {
	fs.writeFile(`./README2.md`, fileContents, (err) => {
		if (err) {
			console.error(err)
		}
	})
}

const buildRepoReadme = () => {
	const { readmeSummary, challengesCompleted } = getChallengeData()

	let readme = ''

	let table = `\
| LC # | Challenge Overview | Difficulty | Solutions | Category |
| - | --------- | ---------- | --------- | -------- |`

	Object.values(challengesCompleted)
		.sort((a, b) => a.questionId - b.questionId)
		.forEach(
			({ title, difficulty, categoryTitle, questionId, challengeName }) => {
				const files = fs.readdirSync(`solutions/${challengeName}`) || []

				const challengeId = `[${questionId}](https://leetcode.com/problems/${challengeName}/)`

				const challenge = `[${title}](solutions/${challengeName})`

				const solutions = files.map((file) => {
					const splitAtDots = file.split('.')
					const extension = splitAtDots[splitAtDots.length - 1]
					let language = fileExtensions[extension]

					if (
						splitAtDots.length === 2 &&
						splitAtDots[0].toLowerCase() === 'test'
					) {
						return
					}
					if (language === 'Markdown') {
						return
					}
					if (language === undefined) {
						language = `Unknown Language (.${extension})`
					}

					return `[${language}](solutions/${challengeName}/${file})`
				})

				table += `\n| ${challengeId} | ${challenge} | ${difficulty} | ${solutions
					.filter((value) => value)
					.join(', ')} | ${categoryTitle} |`
			}
		)

	Object.entries(readmeSummary).map(([i, section]) => {
		readme += `\n\n${section}`
		if (i === '0') {
			readme += `\n\n## Solutions\n${table}`
		}
	})

	saveRepoReadme(readme)
}

buildRepoReadme()
