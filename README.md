Hello! this bot has an extra function that activates when you reach google translate limit quota, and avoids it by restarting the bot with another twitch account (you need to put 2 twitch accounts(i'll fix that in the future)).
If the automatic restart doesn't work, you can use the "-fix" command (only mods) to restart the bot.

to fix:
- changing accounts doesn't avoid google limit quota, I need to look for another way (after testing for a little bit i got "Undetermined" every time the bot tried to translate, probably google limit

requisites: 
- Node.js

where to install it? (download LTS)
- https://nodejs.org/en/

configuration:
- follow these instructions after installing Node.js!
- go into the "Bot" folder
- go into configs.json, right click and edit
- replace the "xxx" with the data you need:
    - Channel : the channel where the bot will operate
    - User : the username of the account the bot will use
    - Auth: the auth password the bot account will use which you can get going in here: https://twitchapps.com/tmi/ while being logged into the twitch account
- modify the languages (instructions):
    - First language: the language which all the other languages will translate into (except itself)
    - Second language: the language which the first language will get translated into
- save the JSON file!
- run the install files .bat! (don't worry it won't break your pc (you can check the .bat file right clicking it and pressing on edit))
- Done! :)

how to run it
- follow the instructions in "how to open the bot.txt"

if you have any questions add me on discord! Sannen#7581 and ask!
