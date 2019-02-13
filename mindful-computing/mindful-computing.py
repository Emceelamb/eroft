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
# sleep(2)
print(t.cyan_bold("How are you feeling today?"))
# os.system("say \"How are you feeling today?\"")
say("How are you feeling today?")

feel = input()
print(t.cyan_bold("I am glad you are feeling "+feel+"."))
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
