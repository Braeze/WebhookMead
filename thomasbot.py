#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import os
import requests

import discord
from dotenv import load_dotenv
from discord.ext import tasks
from datetime import date
from datetime import datetime


load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

client = discord.Client()
discord_webhook_url = 'https://discordapp.com/api/webhooks/902518248367607828/y4bWuA3UDEX8T3CvEew33Z__H-zFRdj06RsXWpj3IwHza80KIUld2GT4vSN_IrK5IuBg'
discord_webhook_url2 = 'https://discordapp.com/api/webhooks/905045171840892928/_APdNBqGXs-QYu9hw-XvT5Bt6QzoFfcEI7NFBNMMYGrJQ2v-isSShj0cFW2rLFmJNztM'
@tasks.loop(minutes=60)
async def test():
    channel = client.get_channel(755341502099619886)
    #await channel.send("test")
    d0 = date(2021,6,25)
    today = date.today()
    #d1 = datetime.strptime(d0, "%Y-%m-%d")
    #d2 = datetime.strptime(today, "%Y-%m-%d")
    dageSiden = today-d0
    print(d0)
    print(today)
    print(dageSiden)
    age = dageSiden.days

    #await channel.send("Dage siden Thomas skulle havde givet os mjød: %s" % dageSiden)
    thomasid = '<@177774908586196992>'
    #await channel.send('%s DU SKYLDER MJØD ' % thomasid)
    Message = {
        "content": ("Dage siden <@177774908586196992> skulle havde givet os mjød: %s" % dageSiden.days)
    }
    requests.post(discord_webhook_url, data=Message)
    requests.post(discord_webhook_url2, data=Message)




@client.event
async def on_ready():
    test.start()

client.run("indsæt token fordi discord ikke acceptere den ligger på git")


# In[ ]:
