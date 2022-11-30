import { load } from 'cheerio'
import { getChallengeData, saveFile } from './utils.js'

const tagReplacer = (tag) => {
	const tagStart = tag.substring(0, 2) === '</' ? '</' : '<'
	const tagContent = tag.substring(tagStart.length, tag.length - 1)

	const tagReplacements = {
		strong: '**',
		em: '*',
	}

	if (tagContent in tagReplacements) {
		return tagReplacements[tagContent]
	}

	for (const tagType of Object.keys(tagReplacements)) {
		if (tagContent.startsWith(tagType)) {
			return tagReplacements[tagType]
		}
	}

	return tag
}

const convertElementToMD = (tag, html) => {
	const prefixes = { p: '\n', pre: '>\n> ', li: '\n- ' }
	const prefix = prefixes[tag]
	const lines = html.split(/\r?\n/)
	const formattedLines = []

	lines.forEach((line) => {
		if (!line || line === '&nbsp;' || line === '') {
			return
		}
		const formattedLine = line.replace(/<[^>]*>/g, tagReplacer)
		formattedLines.push(prefix + formattedLine.trim())
	})

	return formattedLines.join('\n')
}

const buildChallengeReadme = (challengeName) => {
	const { challengesCompleted } = getChallengeData()
	const { title, content } = challengesCompleted?.[challengeName.toLowerCase()]
	const $ = load(content, null, false)
	let markdown = `# ${title}\n`

	$('p, pre, li').each((_, el) => {
		const tag = el.name
		const html = $(el).html()
		const mdElement = convertElementToMD(tag, html)
		markdown += mdElement + '\n'
	})

	saveFile(`solutions/${challengeName}`, 'README.md', markdown)
}

buildChallengeReadme(process.argv[2])
