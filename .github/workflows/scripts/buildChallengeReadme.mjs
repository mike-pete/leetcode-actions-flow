import { load } from "cheerio"
import fs from "fs"

const getChallengeDataFromFile = (challengeName) => {
  return {
    title: "3Sum",
    content:
      "<p>Given an integer array nums, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>\n\n<p>Notice that the solution set must not contain duplicate triplets.</p>\n\n<p>&nbsp;</p>\n<p><strong>Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [-1,0,1,2,-1,-4]\n<strong>Output:</strong> [[-1,-1,2],[-1,0,1]]\n<strong>Explanation:</strong> \nnums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2].\nNotice that the order of the output and the order of the triplets does not matter.\n</pre>\n\n<p><strong>Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,1,1]\n<strong>Output:</strong> []\n<strong>Explanation:</strong> The only possible triplet does not sum up to 0.\n</pre>\n\n<p><strong>Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [0,0,0]\n<strong>Output:</strong> [[0,0,0]]\n<strong>Explanation:</strong> The only possible triplet sums up to 0.\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>3 &lt;= nums.length &lt;= 3000</code></li>\n\t<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>\n",
    difficulty: "Medium",
    categoryTitle: "Algorithms",
  }
}

const saveChallengeReadme = (fileName, fileContents) => {
  fs.writeFile(`../../../${fileName}/README.md`, fileContents, (err) => {
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

  saveChallengeReadme(title, readmeText)
}

buildChallengeReadme("3Sum")
