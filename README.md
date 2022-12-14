# Gravity Info Trading

## Architecture of the service

*Picture summing up the created architecture while developing the project.*
![WhatsApp Image 2022-11-06 at 03 19 03](https://user-images.githubusercontent.com/61798173/200159734-55d1d61a-276a-493d-a9fe-d401d2acd3c2.jpeg)

## Project Description
The challenge that we are focused on is "Crypto Trading Helper" from Gravity Team.
For this challenge, it has been decided to implement a service which provides quick access to news and data with its respective "sentiment" which will indicate whether a given piece of information is considered positive, negative or neutral in order to help turn knowledge into action. 

Our service is composed by two main parts, firstly, the backend which uses the NestJs core to manage the petitions to the different data sources, taking care of not overflowing them with requests every 3 minutes (Scheduler CRON). Then we check wheras the data is alerady located in our PostgresSQL database and, if not, it's added. Afterwards we get the data through our AI to determine its sentiment, whom can have 3 different values: Positive, Neutral or Negative. This outcome is taken into account in our moving window of the most recent news to determine what the current global sentiment is.
Taking a deeper look into the AI, we decided that we wanted to use the BERT model, that is based on Transformers algorithm that we  knew are good in text processing. 

Once the data is processed, the previously mentioned NestJs core sends a message, containing the data, through the already established websocket connection with our frontend page. This UI (User Interface)  it's formed with different sections, whom the main part consists of a chart showing the recent time price of the selected crypto. On the left side we can find the latest news including a header with its corresponding sentiment, represented with an emoji. Finally on the top of the page there is a bar where we can see the general sentiment of the news. All this is ment to help us visualize easily the current sentiment of a crypto and to predict comfortably the currency could increase or decrease its value.

This project is designed to be applied both for the present and for the future, as it is fully scalable and some examples of that could be: new sources of information, cryptocurrency filters or adding new types of currency.  Concerning to the new sources, we already developed a way, using different workers and a general configuration file, to add them.

## App visulitzation
![WhatsApp Image 2022-11-06 at 10 03 08](https://user-images.githubusercontent.com/61798173/200160504-f468b286-bc74-48a1-ba81-4940f6bd0cfc.jpeg)
