![](https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/0/7/9/079f2967c6063a0052eb4809633b1d1e498a345a.png)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/grayzcale/simplepath/docs.yml?branch=main&label=docs&style=plastic)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Zeref-Z/rblx-simplepath?sort=semver&style=plastic)
![GitHub](https://img.shields.io/github/license/Zeref-Z/rblx-simplepath?style=plastic)

A typed version of SimplePath, an open-source pathfinding module that gives you the ability to quickly create a pathfinding script for humanoids and non-humanoids with just a few lines of code. Pathfinding is done using [Roblox's PathfindingService](https://developer.roblox.com/en-us/api-reference/class/PathfindingService).

<br>

## Installation

(This can be replaced with any package manager!)
```sh
$ npm i @rbxts/simplepath
```

### Example

```ts
import SimplePath from "@rbxts/simplepath"
import {Workspace} from "@rbxts/services"

const Path = new SimplePath(Workspace.WaitForChild("Dummy"))

Path.Run(Workspace.WaitForChild("Goal"))

```

<br>

## Other Links

- <a href=https://grayzcale.github.io/simplepath/ target=_blank>Documentation/Examples</a>
- <a href=https://devforum.roblox.com/t/1196762 target=_blank>DevForum</a>
- <a href=https://www.roblox.com/library/6744337775/SimplePath-Pathfinding-Module target=_blank>Roblox</a>