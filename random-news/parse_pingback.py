# This script parses pingback times and places them into arrays
import subprocess

# Opens pingbacks to read
pingbacks = open("pingback.txt").read().split()

# Create empty list 
ordered_pingbacks = []

# Parses thru pingback.txt and gets host and pingback time and append to list
def parseNews():
    for index, ping in enumerate(pingbacks):
        if(index%5==0):
            newsSite = [pingbacks[index]]
            newsPingTime =  pingbacks[index+3]
            newsSite.append(float(newsPingTime[1:]))
            ordered_pingbacks.append(newsSite)

# Sort the list
def Sort(ord_list):
    ord_list.sort(key = lambda x: x[1])
    return ord_list

# print(Sort(ordered_pingbacks))
# print(ordered_pingbacks[0][0])


def openNews():
    openNews = "firefox " + ordered_pingbacks[0][0]
    subprocess.Popen(openNews, shell=True)
