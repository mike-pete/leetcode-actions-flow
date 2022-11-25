# states that GH actions push would see

## challenge added

- add it to the JSON

  1. fetch from the API
  2. parse HTML
  3. add it to the JSON

- build the challenge readme from JSON

- rebuild the main readme from JSON

---

## challenge removed

### directory with no solutions

1. remove challenge from JSON
2. remove all files from directory
3. remove directory
4. rebuild the main README

### directory with solutions

1. do nothing

---

## no changes

1. do nothing

---

# States that the dirs can be in:

- have other files
- no other files
- readme
- no readme

## Add readme if

- have other files and no readme

## Remove dir if

- only has readme

# First step

1. get list of challenges from dirs/files
2. get list of challenges from JSON
3. compare the two lists (determine what readmes to add and what dirs to remove)

---

Jobs:

1. get list of challenges from dirs/files

> for each challenge dir
>
> - if challenge dir does not have README:
>   - build README (includes fetch/parse/save to JSON)
> - if there are no solutions (only a README):
>   - delete dir and remove from json

2. get list of challenges from json

> for each challenge
>
> - if no directory exists, remove from json

3. build global readme (needs [1,2]) (only run if 1 or 2 ran)
