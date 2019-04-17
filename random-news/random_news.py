import subprocess
import fetch_news
import parse_pingback

fetch_news.fetchNews()
parse_pingback.parseNews()
parse_pingback.openNews()
