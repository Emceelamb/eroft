---
layout: post
course: rituals
full-name: Electronic Rituals, Oracles, Fortune Telling
---

[github](https://github.com/emceelamb/eroft/random-news "github repository") 

This week's assignment was a thought experiment on generation of random numbers. I wanted to dive again into the network level of random numbers and I thought that exploring the speed of a ping could yield a random number. I considered the application of the program, and again was interested in news as an output. 

I collected the host names of the [20 top news sources](https://sources.mediacloud.org/#/collections/9139458 "URLS to news websites"), and placed them in a text file. I used the fping program to probe the list with an '-e' flag which returns the elapsed time for the packet's round trip. Fping is a program that is similar to ping, but with expanded capabilities to ping multiple hosts. I write the output of fping into a text file.

Next I wrote a python script to parse the results. I go through pingback file and take the hostname, and pingback times and place it into a two-dimensional array, which I sort by pingback time. I then do a subprocess call via python to open up the website that has the fastest return time. I hoped that the fastest website would change often and be a comment about how network speed would impact how one receives news.

When I started the project I thought that the speed of travel would have a lot more variance with the expectation that traffic to the different hosts would have more of an effect on pingback times. As it turned out, the return time was pretty consistent. While the the time for ping backs would fluctuate it would be applied pretty consistently across the board. E.g. the fastest websites and slowest websites would stay in the same order, likewise the slowest websites would consistently stay in the bottom. There was some change for the middle websites.

From this experiment I believe pingback time from regular conditions  is simply a result of server locations, and not a result of network traffic. Perhaps if there was a high volume of traffic to a host then there would be more change, or depending on the clients distance to the server there would be more change. But from NYU campus and my home, I saw that cnn.com was constantly had the fast time of flight.

To solve this I am considering using a math based algorithm with the pingback time as a seed value, but I didn't get a chance to explore this further.

**list of news hosts**:
``` 
www.cnn.com
bbc.com
nytimes.com
msnbc.com
wsj.com
foxnews.com
huffingtonpost.com
washingtonpost.com
www.latimes.com
www.reuters.com
abcnews.go.com
usatoday.com
bloomberg.com
www.nbcnews.com
dailymail.co.uk
theguardian.com
timesofindia.indiatimes.com
news.com.au
news.yahoo.com
news.google.com
```

**fetch_news.py**:

``` 
def fetchNews():
    subprocess.run(["echo", "fetching news"]);
    fetchnews = "fping -e < news-sources.txt > pingback.txt"
    subprocess.Popen(fetchnews,shell=True)
    subprocess.run(["echo", "fetched"]);
```

**parse_pingback.py":
```  
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

def openNews():
    openNews = "firefox " + ordered_pingbacks[0][0]
    subprocess.Popen(openNews, shell=True)
```
