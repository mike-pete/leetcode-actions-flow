import { load } from "cheerio"
import fs from "fs"

const getChallengeDataFromFile = (challengeName) => {
  const data = fs.readFileSync("challengeSummary.json")
  const { challengesCompleted } = JSON.parse(data)
  return challengesCompleted[challengeName.toLowerCase()]
}

const saveChallengeReadme = (fileName, fileContents) => {
  fs.writeFile(`../../../solutions/${fileName}/README.md`, fileContents, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

const formatText = (type, text) => {
  switch (type) {
    case "code":
      return `\`${text}\``
    case "strong":
      return `**${text}**`
  }
}

const formatChildText = ($, text) => {
  let formattedText = text
  $("p, code, strong, pre, ul, li").map((_, el) => {
    const childText = $(el).text()
    const childTag = el.name
    const formattedString = formatText(childTag, childText)
    formattedText = formattedText.replace(childText, formattedString)
  })
  return formattedText
}

const addPrefixesToChildText = (formattedText, tag) => {
  const prefixes = { p: "", pre: "> " }
  const prefix = prefixes[tag]
  return "\n\n" + prefix + formattedText.split("\n").join(`\n${prefix}\n${prefix}`)
}

const formatChildElements = ($, text, parentTagType) => {
  const formattedText = formatChildText($, text)
  return addPrefixesToChildText(formattedText, parentTagType)
}

const formatPrimaryElement = (tag, element) => {
  const text = element.text()
  const nbsp = String.fromCharCode(160)
  const isNewSection = text === nbsp && tag === "p"

  if (isNewSection) {
    return null
  } else {
    const children = load(element.html())
    return formatChildElements(children, text, tag)
  }
}

const buildChallengeReadme = (challengeName) => {
  const { title, content } = getChallengeDataFromFile(challengeName)
  const $ = load(content)
  const primaryElements = $("p, pre")

  let readmeText = `# ${title}`

  let currentSection = 0
  const numberOfSectionToHandle = 2
  let currentPrimaryElementIndex = 0

  const notAllSectionsHandled = () => currentSection < numberOfSectionToHandle
  const notAllPrimaryElementsHandled = () => currentPrimaryElementIndex < primaryElements.length

  while (notAllSectionsHandled() && notAllPrimaryElementsHandled()) {
    const el = primaryElements[currentPrimaryElementIndex]
    const tag = el.name

    const formattedString = formatPrimaryElement(tag, $(el))
    if (formattedString) {
      readmeText += `\n${formattedString}`
    } else {
      currentSection++
    }

    currentPrimaryElementIndex++
  }

  saveChallengeReadme(challengeName, readmeText)
}

buildChallengeReadme(process.argv[2])
