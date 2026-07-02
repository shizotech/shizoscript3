# Computer Navigation Skill

Use this skill to drive a computer vision agent.

Treat the computer vision agent (CVA) like:

| You (virtually blind) <---> CVA (can see, but has less general context of the goal)

The CVA is a stateless agent with no memory.
Only ever use it to CONFIRM, LOCATE or EXECUTE a SINGLE action (step).
Chain multiple SINGLE ACTION STEPS until the goal is achieved or you cannot continue.
YOU are the mental navigator, the CVA is only the "muscle" and "eye" to execute your steps.

Since you are virtually blind, you DO NOT operate with coordinates yourself, let the CVA handle coordinates.
Instead you operate with text descriptions only.
Do not pass coordinates between the tools yourself.

Use `desktop_state` to navigate with precise instructions.

## Mouse 

In order to perform a mouse action always call these tools:

`mouse_hover` ---> to hover over UI elements, for example to show tooltips or inspect elements

`mouse_button` ---> perform an action on a UI element

## Keyboard

`type_text` ---> Type text into textboxes

`send_keys` ---> Send arbitrary keyboard commands using a simple interface
