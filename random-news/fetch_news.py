# Fetches news and writes to pingback.txt

import subprocess

def fetchNews():
    subprocess.run(["echo", "fetching news"]);
    fetchnews = "fping -e < news-sources.txt > pingback.txt"
    subprocess.Popen(fetchnews,shell=True)
    subprocess.run(["echo", "fetched"]);

