# helper-client

Life is unpredictable, schedules change, tasks take longer than expected, and priorities shift. Effectively adapting throughout the day is an important skill; however, it’s one I struggle with. I built Helper to help me re-prioritize, adapt, and make decisions throughout the day. Helper is a React-Native app that integrates with a PostgreSQL database via an Express API.

Helper organizes a user’s day into containers: morning, day, night and recover. Users input blocks (activities/tasks) into these containers, and assigns each block a priority, status, and expected duration. Users may add, edit, or delete blocks at any time. Helper continually updates the database with these changes

Throughout the day, when a user encounters a block of unscheduled time, she can run Helper to manage that time effectively. The user inputs how much time she has, and Helper fetches the relevant blocks, sorts them by priority, and serves them up via a queue to the app interface. The user views one block at a time, either skipping it or starting it. When the user finishes a block, Helper sets the block’s status to ‘paused’ in the database. In future queries, that block will be ignored by Helper until the user resets the status to ‘active’. 

I’m currently adding features to Helper that track mood, actual block duration, and perceived difficulty. My objective is to improve Helper’s decision making algorithms to include these parameters. 
