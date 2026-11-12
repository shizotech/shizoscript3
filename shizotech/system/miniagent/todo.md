
The last agent run did this:

'''
### C. The context warning could interrupt a generation repeatedly

`on_usage` injected the "your context is about to run out" prompt every time the streamed usage
crossed the threshold. That could stop a generation, re-run it, stop it again, and produce
multiple answer fragments. Fix: inject at most once per task (`compaction_requested`), and only if
no prompt is already injected.

The warning generation itself is also marked internal (`_injected_internal=true`), so its draft
text is not shown as a user answer; the final `done` report carries the real outcome.
'''

And this is bad, compaction should always be possible (not just once) to allow for long, open ended tasks.

Furthermore, there are already proposed tasks for github issue and maintainance.
I want another proposed task "Read TODO.md every day and implement all todo's between 6:00 and 10:00 and also remove them from the to do list afterwards"

Then I need a way to initialize workspace directories from command line directly (which then also show in the webui)
e.g. something like 'shz miniagent --init' which adds the working directory as workspace and initializes it.
maybe also make it a standard that a new workspace always has a "AGENTS.md" if it doesnt exist already.

Also there seems to be a bug, when I delete a workspace from the webui, its not in the webui anymore but still seems to be initialized when the node itself starts.

Then there is a more complex task:
I need some kind of isolated telegram client for friends.
Basically something like 'shz miniagent.telegram_client --bot-token xxx --workspace_dir <dir>'
Which is like the telegram_router, but isolated and limited to a single workspace (should create workspace in that dir if doesnt exist).
It has no shizonet connectivity and a receptionist and worker agent.
I need a way to configure in which time window the worker is allowed to work.
So my friends can send them instructions and the receptionist takes them (24/7) and the worker agent then takes care of them during its configured working hours.
Without interferring with my private workspaces and other nodes.
It should be able to accept incoming work and answer questions over the telegram bot I provide the token for.
Oh and my friends should obv also receive when one of their tasks was actually done.

And finally when you are done with all that, work on the look of the webui.
It should have a hazard-warning industrial unique rough look (keywords rusty metals, rough textures)

Im also not sure if sending files from workers all the way down to the telegram chat actually works.

After all is done, do one more sweep over the code and fix potential bugs if you can find any.
Then, commit and push the changes to github.