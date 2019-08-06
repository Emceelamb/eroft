---
layout: post
course: rituals
full-name: Electronic Rituals, Oracles, Fortune Telling
---

This week's meditation  was to create an electronic ritual. After a lot of soul searching about what is a ritual, I concluded that a ritual must at the minimum have a sense of repeatability and (for me) be an act of mindfulness. For the meditation I decided to ritualize the act of computing.

I meditated on the concept of mindfulness throughout the week. "Mindfulness is the psychological process of bringing one's attention to experiences occurring in the present moment"([wikipedia](https://en.wikipedia.org/wiki/Mindfulness "link to wikipedia")). I believe that the act of being mindful can ritualize any activity. During my research for this meditation I came across a term called [mindful computing](https://spectrum.ieee.org/computing/networks/mindful-computing "link to IEEE article").

There are some prevailing approaches to mindful computing. The first are disconnectionists who advocate time away from online activity. While I value my time doing activities away from the computer, I do not have any reservations with using technology. I don't think technology is inherently evil so I don't necessarily agree with approach of mindfulness.

The second approach to mindful computing is [contemplative computing](http://www.deliberate.rest/?p=1755 "link to article about contemplative computing"). Contemplative computing is being conscious of what you are doing with technology and being in the moment. This approach of mindfulness in computational habits really struck a chord with me, and I thought about how I can ritualize the act of computing and bring an element of mindfulness.

Early iterations of my ritual considered setting up my work station before computing. Those who know my computing habits know that I have an elaborate computing setup and these is my preflight checklist.
    1. Plugin power cord
    2. Plug in Hard Drive (My operating system lives on an external)
    3. Plug in Keyboard
    4. Power on computer
    5. run apt update
    6. run apt upgrade
    7. Connect mouse
    8. Compute

While this is my ritual for preparing my work station, I thought about how I might push it further while learning something new.For my meditation I ended up writing a shell script that executes each time I open a shell.

#### Why the shell? 
Ever since I switched to \*buntu as my daily OS, I spend probably 80% of my time computing in ~the shell~ (when I'm not in a browser). I use the shell to open up programs, navigate directories, etc. I enjoy the minimalism of a text based interface which I think goes well with mindful computing. 

## The program 
I decided that each time I open the shell I should be conscious about what I am doing. It should be simple and not feel like a burden, but a gentle reminder to practice mindfulness. 

The essentials to remember are:
1. What are you doing?
2. Why are you doing it?
3. Is it a good reason?

Eventually I wrote a  python script that executes via bash. By including it in my `.bashrc` file it will execute when a shell opens.

#### Interesting notes about the program
- I used `python blessings` to color the text with a soothing cyan while the machine talks 
- I used `gnustep-runtime-gui` to give voice to the computer
- Wrote add'l scripts to clear the terminal and return to my home directory
- Added a time-based greeting for a sense of familiarity
- Asks how you are doing so you reflect on your personal state
- Dependencies include: gnustep-runtime-gui

mindful-computing.py:
```python
from blessings import Terminal
import datetime
from time import sleep
import os

t = Terminal()

def tod():
    currentTime = datetime.datetime.now()
    if currentTime.hour < 12:
        return "morning"
    elif currentTime.hour < 18:
        return "afternoon"
    else: 
        return "evening"

def say(msg):
    return os.system("say '"+ msg + "'")

print(t.cyan_bold("Good "+ tod() +"."))
say("Good "+tod())
print(t.cyan_bold("How are you feeling today?"))
# os.system("say \"How are you feeling today?\"")
say("How are you feeling today?")

feel = input()
print(t.cyan_bold("I am glad you are feeling "+feel))
say("I am glad that you are feeling "+ feel)

print(t.cyan_bold("What will you do on this machine?"))
say("What will you do on this machine?")

task = input()
print(t.cyan_bold("Why will you "+ task +"?"))
say("Why will you "+task)

reason = input()
print(t.cyan_bold("Will "+reason+" bring you joy?"))
say("Will "+reason+" bring you joy?")

input()
print(t.cyan_bold("Please compute mindfully."))
say("Please compute mindfully.")
sleep(3)
```

<video style="max-width:100%" controls>
    <source src="https://markofthelam.com/img/mindful-computing.mp4" type="video/mp4">
</video>
