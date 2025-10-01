---
name: write-a-blog
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git checkout:*)
description: Write a blog using my writing agent.
argument-hint: [topic context]
---

Before writing a blog, we need to gather context. Assuming $ARGUMENTS was provided, let's ask the prompter questions, one at a time (with indicators of how many questions left), until we have enough context to write the blog post and come up with a title.

Use @agent-my-voice to come up with a blog title. Short, catchy, and relevant.

Once we have enough context, we'll create a new branch with git using the post name and dashes (i.e. "AI Is Cool" -> `post/ai-is-cool`).

Now that we're on a new branch, utilize the @agent-my-voice to write the actual blog post.

Once the post is written, search Unsplash for free images that are relevant to the post by searching via keywords from our blog post. Download the image into the @src/assets folder to reference in the hero image.

Now that we've written the blog post, perform the following:
- !`git add -A`
- !`git commit -m "Wrote a blog about [BLOG TITLE]"`
- !`git push`

Then, using the GitHub CLI, create a PR for the current branch.