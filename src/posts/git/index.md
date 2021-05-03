---
title: "GIT"
date: "2021-05-03"
updated: "2021-05-03"
author: Villager Liao
keywords:
  - git
---

# GIT

- Modify commit message

```bash
git commit --amend -m "new message"
```

- Add files to last commit

```bash
git add <file_name>
git commit --amend HEAD~1
```

- Undo commits

```bash
# undo the last commit but keep the changes
git reset --soft HEAD~1
# undo both commit and changes
git reset --hard HEAD~1
# undo all your local changes
git reset --hard origin/<branch_name>
# undoes a commit by creating a new commit
git revert HEAD
```

```bash
# undo a merge commit that has already pushed to the remote branch
git revert -m 1 <commit_id>
```

You can also undo any number of commits. E.g:

git reset HEAD~3 (going back three commits before HEAD).
git reset --hard <commit_id> (going back to a specific commit).
Use git reset if the commit is not pushed yet and you don't want to introduce a bad commit to the remote branch.

Use git revert to revert a merge commit that has already pushed to the remote branch.

Use git log to review the commit history.

If you prefer, you can also create a new commit with the fix.

## Reference

- [OhShitGit](https://ohshitgit.com/)
