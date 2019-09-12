
# git 常用命令简单说明

### command list
  - [git clone](#git-clone)
  - [git config](#git-config)
  - [git pull](#git-pull)
  - [git status](#git-status)
  - [git add](#git-add)
  - [git commit](#git-commit)
  - [git push](#git-push)
  - [git tag](#git-tag)
  - [git branch](#git-branch)
  - [git checkout](#git-checkout)
  - [git merge](#git-merge)
  - [git log](#git-log)
  - [git cherry-pick](#git-cherry-pick)
  - [git reset](#git-reset)
  - [git revert](#git-revert)
  - [git stash](#git-stash)
  

### git clone
   > 从git远端仓库克隆代码到本地  
   
   **语法:** git clone [url]  
   克隆完成后在本地会生成一个名为"jwucong.github.io"的文件夹
   
   ```bash
   git clone git@github.com:jwucong/jwucong.github.io.git
   ```
   [↑ BackToCommandList](#command-list)

### git config
   > 设置/查看git配置信息  
   
   **查看语法:** git config [key]  
   **设置语法:** git config [key] [value]
   
   ```bash
   # 查看git用户名
   git config user.name
   
   # 查看git用户邮箱
   git config user.email
   
   # 设置git用户名
   git config user.name jwucong
   
   # 设置git用户邮箱
   git config user.email jwucong@gmail.com
   ```
   [↑ BackToCommandList](#command-list)
   

### git pull
   > 将远端仓库代码同步到本地
   
   **语法:** git pull [origin] [branch]  
   
   ```bash
   # 使用git remote获取远端仓库的名字
   # 使用git branch -a 查看所有分支列表
   # 同步远端名为origin的仓库下的dev分支
   git pull origin dev
   ```
   [↑ BackToCommandList](#command-list)


### git status
   > 查看本地仓库当前分支的文件修改状态
   
   **语法:** git status
   
   如果有文件被修改过但是没有commit，则显示发生修改过的文件列表；  
   如果没有任何文件修改过，则显示"nothing to commit, working tree clean"
   
   ```bash
   git status
   ```
   [↑ BackToCommandList](#command-list)
   

### git add
   > 将文件变动添加到暂存区
   
   **语法:** git add [files]
   
   ```bash
   # 一次添加一个文件
   git add README.md
   
   # 一次添加多个文件
   git add README.md index.html src/notes/git/git.md
   
   # 一次添加所有变动文件
   git add .
   ```
   [↑ BackToCommandList](#command-list)  
   
  
### git commit 
   > 把修改记录添加到版本库
   
   **语法:** git commit -m [message]

   ```bash
   git commit -m "提交原因"
   ```
   [↑ BackToCommandList](#command-list)  
   

### git push
   > 将本地仓库推送(同步)到远端仓库
   
   **语法:** git push [origin] [branch]
   
   ```bash
   # 使用git remote获取远端仓库名
   # 使用git branch -a查看所有分支列表
   git push origin dev
   ```
   [↑ BackToCommandList](#command-list)  
   
   
### git tag
   > 给某个版本打标签
   
   **语法:** git tag [tagName]
   
   当版本更新需要发布到生产环境时，通常会给此次版本打一个标签，标签名可取版本号
   
   ```bash
   # tagName为v1.0.0
   git tag v1.0.0
   
   # 把该标签版本推送到远端仓库
   git push origin v1.0.0
   ```
   [↑ BackToCommandList](#command-list) 
   
   
### git branch
   > 创建、查看、重命名、删除分支
   
   **创建语法:** git branch [branchName]  
   **查看语法:** git branch  
   **重命名语法:** git branch -m [oldBranchName] [newBranchName]  
   **删除语法:** git branch -d [branchName]
   
   ```bash
   # 新建test分支
   git branch test
   
   # 查看本地分支列表
   git branch
   
   # 查看所有分支列表
   git branch -a
   
   # 重命名分支
   git branch -m test test1
   
   # 删除分支
   git branch -d test1
   ```
   [↑ BackToCommandList](#command-list) 
   
   
### git checkout
   > 这个命令功能较为复杂，此处仅用于切换分支
   
   **语法:** git checkout [branch]  
   
   ```bash
   # 切换到dev分支
   git checkout dev
   ```
   [↑ BackToCommandList](#command-list)   
   
   
### git merge
   > 合并分支
   
   **语法:** git merge [branch]  
   
   合并分支时，git会自动进行文件对比自动处理文件冲突;  
   如果git自动处理文件冲突失败，则需要手动处理冲突
   
   ```bash
   # 切换到test分支
   git checkout test
   
   # 把dev分支合并到test分支
   git merge dev
   
   # 把dev分支合并到test分支并记录dev的commit节点
   git merge dev --no-off
   
   # 使用git status查看冲突文件
   ```
   [↑ BackToCommandList](#command-list) 
   
   
### git log
   > 查看commit提交记录
   
   **语法:** git log [file]  
   
   ```bash
   # 查看src/notes/git/git.md这个文件的commit记录
   git log src/notes/git/git.md
   ```
   [↑ BackToCommandList](#command-list)
   
   
### git cherry-pick
   > 从某个分支上挑选某些commit合并到某个分支
   
  **语法:** git cherry-pick [commitId]  
  
  此命令可以把某次commit的修改单独挑出来合并到另外一个分支；  
  如开发分支有很多次commit，但是master分支需要紧急上线dev其中一个功能，使用此命令很有效
  
  ```bash
  # 先切换到需要合并到的分支
  git checkout master
  
  # 挑出dev中新开发的功能合并到master
  # 使用git log查看需要合并的那次commit的commitId
  # pick前需要pull抱持本地分支是最新的代码
  git cherry-pick 4a289b2
  ```
   [↑ BackToCommandList](#command-list)


### git reset
   > 版本回退到某个commit节点，会使得版本记录节点和内容同时回退
   
   **语法:** git reset [--mode] [commitId]
   
   **mode:** 默认为--mixed
   1. --soft: 保留工作区的修改并撤销暂存区
   2. --mixed: 保留工作区的修改并保留暂存区
   3. --hard: 删除所有修改，得到一个干净的工作区
   4. --merge: 尝试自动合并修改
      
   **reset**和**revert**的区别：
   - reset会使得版本记录节点和内容同时回退，commit记录节点是后退的，
   需要-f强制推送到远端公共分支，常用于本地分支的回退  
   - revert会使得版本记录节点前进，版本内容回退，commit记录节点是前进的，
   不需要-f强制推送，常用于远端分支的回退

     
   ```bash
   # 切换到dev分支
   git checkout dev
   
   # 回退到commitId为9bf9446的节点
   git reset --soft 9bf9446
   
   # 需要重新加入暂存区
   git add .
   git commit -m "新提交备注"
   
   # 如果远端分支有超前分支，则需要-f强制推送
   git push origin dev -f
   ```
   [↑ BackToCommandList](#command-list)


### git revert
   > 版本回退到某个commit节点，会使得版本记录节点前进，版本内容回退
   
   **语法:** git revert [commitId]
   
   **tips:**  
   1. 此处的commitId是你需要回退到的那个节点的更新一次节点的commitId，如节点历史记录为：  
   A -> B -> C -> D -> E  
   此时最新的节点为E，你要从E回退到B，那么commitId应该用C的commitId
   
   2. git revert指令会使得git自动进入vim模式，允许修改此次revert需要提交的message  
   按i进入编辑模式，按:wq保存并退出
   
   **reset**和**revert**的区别：
   - git revert会添加一次新的提交来回退到需要回退的commit节点，
   所以最新节点和回退到的节点之前的记录都还在，不会被删除，
   类似于今年是2019年，我们在举办FIBA篮球世界杯比赛，
   git revert之后，时间变成了2020年，但是我们却在举办2008年奥运会，
   时间节点往前推，但是我们活在过去的状态，就是这种意思，**常用于回退远端分支**
   - git reset是如果要回退到2008年，那时间就倒流回到2008年，我们同样举办奥运会，
   2008年到2019年这段时间在你脑海里被删除了，你没有关于这段时间的记忆了，真正的回到2008年了，
   **常用于回退本地分支**
   
   ```bash
   # 执行此命令后自动进入vim模式
   git revert 9bf9446
   
   # 上面使用vim模式编辑完提交备注之后推送
   git push origin master
   ```
   [↑ BackToCommandList](#command-list)
   
   
### git stash
   > git本地记录栈，用于保存本地修改
   
   例如你正在开发一个新功能，突然发现忘记切换分支了，你直接在master上开发了，
   这时候就可以先把此次修改保存在stash中，然后切换到dev分支，再从stash中恢复修改
   
   ```bash  
   # 先把本地修改添加到暂存区
   git add .
   
   # 把暂存区中的修改推入栈中
   git stash push -m "message"
   
   # 查看本地stash栈中的记录列表
   git stash list
   
   # 将本地stash栈中的某条记录应用到当前分支
   git stash apply stash@{1}
   
   # 应用栈顶记录并删除
   git stash pop
   
   # 删除栈中的某条记录
   git stash drop stash@{1}
   
   # 清除栈中的所有记录
   git stash clear
   ```
   [↑ BackToCommandList](#command-list)
