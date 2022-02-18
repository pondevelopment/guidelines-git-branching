# Pon guideines for git branching

## Branching, merging and tagging

### Main branch

The main branch contains tested prodcution ready code, releases are tagged on main.

### Sprints

Each sprint has its own branch

### Features

Eeach feature (and bugfix) has its own branch.

### Branching

Branching is done from the main branch to the sprint branches, after coding and testing sprint branch
is merged to main.

### Distinguish between "small" and "large" projects

If you are the only developer it is oke to setup one sprint branch to work on sequentially, there is no need to
setup separate feature branches

## General

### Branches

Branch names clearly communicate purpose and should contain a reference to issue tracking system if relevant

### Squashing or merging

Merging is preferred (merging "unless" policy)

### Forced commits

These guidelines should not impede the handling of emergencies. Forced commits are allowed by exception only
and branch(es) must be fixed at the firs available opportunity.

