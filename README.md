# Your Application Name
Fifo web app

## Running the Application
To run the application, use the following command:
- npm run start

Enjoy your time! :)

## Context
- You can add a user when clic on "Sign up", then you will be redirect on login page.
- After submit login, you are redirect on "Queue page" ('/action'). You can see your credits and your queue. 
- When you are login you cannot anymore access to login page.
- When you first loggin your queue is empty (you can see it on /action page). 
- Its a first in first out queue.
- You need to add actions to the queue and you can see them deleted each 2 minuts.
- If you have not anymore credits A and the next action is "A", you need to wait 24hours to recalculate all of your credits.

## Technos

- I use cron socket to communicate with back-end.

## Why not using BullMQ ?!
- I discovered bullMQ library but after writing all my back code so it was too late to refacto all of my code with this lib.

