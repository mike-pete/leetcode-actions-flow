import { load } from 'cheerio'
import fs from 'fs'

const getChallengeDataFromFile = (challengeName) => {
	const data = fs.readFileSync('./scripts/challengeSummary.json')
	const { challengesCompleted } = JSON.parse(data || {})
	return challengesCompleted[challengeName.toLowerCase()]
}

const saveChallengeReadme = (fileName, fileContents) => {
	fs.writeFile(`solutions/${fileName}/README.md`, fileContents, (err) => {
		if (err) {
			console.error(err)
		}
	})
}

const tagReplacer = (match) => {
	const tagStart = match.substring(0, 2) === '</' ? '</' : '<'
	const tagContent = match.substring(tagStart.length, match.length - 1)

	const tagReplacements = {
		strong: '**',
		code: '`',
	}

	if (tagContent in tagReplacements) {
		return tagReplacements[tagContent]
	}

	for (const tag of Object.keys(tagReplacements)) {
		if (tagContent.startsWith(tag)) {
			return tagReplacements[tag]
		}
	}

	return match
}

const convertElementToMD = (tag, html) => {
	const prefixes = { p: '\n', pre: '>\n> ', li: '\n- ' }
	const prefix = prefixes[tag]

	const lines = html.split(/\r?\n/)
	const formattedLines = []

	lines.forEach((line) => {
		if (line === '&nbsp;' || line === '') {
			return
		}
		const formattedLine = line.replace(/<[^>]*>/g, tagReplacer)
		formattedLines.push(prefix + formattedLine.trim())
	})

	return formattedLines.filter((value) => value).join('\n')
}

const buildChallengeReadme = (challengeName) => {
	const { title, content } = getChallengeDataFromFile(challengeName)
	const $ = load(content, null, false)

	let markdown = `# ${title}\n`

	$('p, pre, li').each((_, el) => {
		const tag = el.name
		const html = $(el).html()
		const mdElement = convertElementToMD(tag, html)
		markdown += mdElement + '\n'
	})

	saveChallengeReadme(challengeName, markdown)
}

buildChallengeReadme(process.argv[2])
