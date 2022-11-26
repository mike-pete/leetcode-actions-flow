import fs from 'fs'
import { getChallengeData, saveFile } from './utils.js'

const fileExtensions = {
	cpp: 'C++',
	java: 'Java',
	py: 'Python',
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

const buildTableHeader = (columnLabels) => {
	let header = '|'
	let divider = '|'
	columnLabels.forEach((label) => {
		header += ` ${label} |`
		divider += ` ${'-'.repeat(label.length)} |`
	})
	return `${header}\n${divider}`
}

const generateLinksToSolutionFiles = (challengeName, files) => {
	let solutions = ''

	files.forEach((file) => {
		const splitAtDots = file.split('.')
		const extension = splitAtDots[splitAtDots.length - 1].toLowerCase()

		if (splitAtDots.length === 2 && splitAtDots[0].toLowerCase() === 'test') {
			return
		}
		if (extension === 'md') {
			return
		}

		const language =
			extension in fileExtensions
				? fileExtensions[extension]
				: `Unknown Language (.${extension})`

		solutions += `[${language}](solutions/${challengeName}/${file}), `
	})

	return solutions
}

const buildTable = (challengesCompleted) => {
	const tableHeader = buildTableHeader([
		'LC #',
		'Challenge Overview',
		'Difficulty',
		'Solutions',
		'Category',
	])

	let table = tableHeader
	Object.values(challengesCompleted)
		.sort((a, b) => a.questionId - b.questionId)
		.forEach(
			({ title, difficulty, categoryTitle, questionId, challengeName }) => {
				const files = fs.readdirSync(`solutions/${challengeName}`) || []
				const challengeId = `[${questionId}](https://leetcode.com/problems/${challengeName}/)`
				const challenge = `[${title}](solutions/${challengeName})`
				const solutionLinks = generateLinksToSolutionFiles(challengeName, files)
				table += `\n| ${challengeId} | ${challenge} | ${difficulty} | ${solutionLinks} | ${categoryTitle} |`
			}
		)

	return table
}

const buildRepoReadme = () => {
	const { readmeSummary, challengesCompleted } = getChallengeData()
	const sections = readmeSummary
	const table = buildTable(challengesCompleted)
	sections.splice(1, 0, `## Solutions\n${table}`)
	const readme = sections.join('\n\n')
	saveFile('.', 'README.md', readme)
}

buildRepoReadme()
