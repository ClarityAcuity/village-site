---
title: "EVENT LOOP"
date: "2021-04-10"
updated: "2021-04-10"
author: Villager Liao
featured: ./images/event-loop.png
keywords:
  - javascript
  - event loop
---

# [EVENT LOOP](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)

## [Processing model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

Go to [HTML Living Standard](https://html.spec.whatwg.org/multipage/webappapis.html) for the newest version of spec

An event loop must continually run through the following steps for as long as it exists:

1. Select the oldest task on one of the event loop's task queues, if any, ignoring, in the case of a browsing context event loop, tasks whose associated Documents are not fully active. The user agent may pick any task queue. If there is no task to select, then jump to the microtasks step below.

2. Set the event loop's currently running task to the task selected in the previous step.

3. Run: Run the selected task.

4. Set the event loop's currently running task back to null.

5. Remove the task that was run in the run step above from its task queue.

6. Microtasks: [Perform a microtask checkpoint](https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint).

7. Update the rendering: If this event loop is a browsing context event loop (as opposed to a worker event loop), then run the following substeps.
  
    - 7.1. Let now be the value that would be returned by the Performance object's now() method.
    - 7.2 Let docs be the list of Document objects associated with the event loop in question, sorted arbitrarily except that the following conditions must be met:
    - 7.3 If there are top-level browsing contexts B that the user agent believes would not benefit from having their rendering updated at this time, then remove from docs all Document objects whose browsing context's top-level browsing context is in B.
    - 7.4 If there are a nested browsing contexts B that the user agent believes would not benefit from having their rendering updated at this time, then remove from docs all Document objects whose browsing context is in B.
    - 7.5 For each fully active Document in docs, run the resize steps for that Document, passing in now as the timestamp. [CSSOMVIEW]
    - 7.6 For each fully active Document in docs, run the scroll steps for that Document, passing in now as the timestamp. [CSSOMVIEW]
    - 7.7 For each fully active Document in docs, evaluate media queries and report changes for that Document, passing in now as the timestamp. [CSSOMVIEW]
    - 7.8 For each fully active Document in docs, run CSS animations and send events for that Document, passing in now as the timestamp. [CSSANIMATIONS]
    - 7.9 For each fully active Document in docs, run the fullscreen rendering steps for that Document, passing in now as the timestamp. [FULLSCREEN]
    - 7.10 For each fully active Document in docs, run the animation frame callbacks for that Document, passing in now as the timestamp.
    - 7.11 For each fully active Document in docs, run the update intersection observations steps for that Document, passing in now as the timestamp. [INTERSECTIONOBSERVER]
    - 7.12 For each fully active Document in docs, update the rendering or user interface of that Document and its browsing context to reflect the current state.

8. If this is a worker event loop (i.e. one running for a WorkerGlobalScope), but there are no tasks in the event loop's task queues and the WorkerGlobalScope object's closing flag is true, then destroy the event loop, aborting these steps, resuming the run a worker steps described in the Web workers section below.

9. Return to the first step of the event loop.

Event Loop Overview:

![event loop][fig]

[fig]: event-loop/images/event-loop.png "Event Loop Overview"

## Tasks vs microtasks

- When executing tasks from the task queue, the runtime executes each task that is in the queue at the moment a new iteration of the event loop begins. Tasks added to the queue after the iteration begins will not run until the next iteration.
- Each time a task exits, and the execution context stack is empty, each microtask in the microtask queue is executed, one after another. The difference is that execution of microtasks continues until the queue is empty—even if new ones are scheduled in the interim.

## queueMicrotask()
