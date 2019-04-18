---
layout: post
course: rituals
full-name: Electronic Rituals, Oracles, and Fortune Telling
---

This weeks assignment was to make a digital medium. While not expressly related to spirit reading, I thought about the recent revelations in US politics. I've been on and off following Mueller's investigation in Russian influence in the 2016 US presidential  election. Last week there was big news on that front where Mueller submitted his report to the United States Attorney General. Barr stated that the White House will get to review the report and make redactions before the report is released to the public. 

The online public was up in arms with this revelation and many claimed this as evidence that the separation of powers has been compromised and that each branch only serves as a mouthpiece for President Donald Trump. News media has faced similar charges and Fox News has received similar charges of repeating the White House talking points.

With this in mind, I wanted to make a project that reflects these points. I used this [website](https://allthatsinteresting.com/donald-trump-quotes "donald trump quotes") to create a JSON file of Donald Trump quotes. 

Next I set up a proxy server to foxnews.com. The proxy injects a few snippets of code. It loads jQuery, my json file and a script. My script uses jQuery to search the html of fox news and splits the text of the page and I query the first letter of each word against each letter of the randomly selected donald trump quote and add a css class to a matched word. I use a css selector to color the first letter of the word. So when the first letters are put together it will read as the donald trump quote. 

Problems: At this time because of the  asynchronous way the page is loaded, jquery doesn't always select letters in order, so it sometimes reads like a anagrams.

<img src="https://sandbox.markofthelam.com/img/eroft/etrump.png" width="100%"> 
<img src="https://sandbox.markofthelam.com/img/eroft/etrump1.png" width="100%"> 
<img src="https://sandbox.markofthelam.com/img/eroft/etrump2.png" width="100%"> 
<img src="https://sandbox.markofthelam.com/img/eroft/etrump3.png" width="100%"> 
<img src="https://sandbox.markofthelam.com/img/eroft/etrump4.png" width="100%"> 

