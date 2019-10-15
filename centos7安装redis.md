# Redis 

1. 安装VMwave
2. 选择网络适配器 - 桥接模式Wi-Fi
3. 命令行输入ip addr查看ip
4. 使用Mac终端链接虚拟机：ssh root@ip
5. yum upgrade -y
6. yum install net-tools
7. yum install vim -y
8. yum install wget -y

# 新建用户
1. useradd jwucong
2. passwd jwucong  # 修改密码
3. 设置root权限：sudo vim /etc/sudoers  查找root, 复制一行，root改为jwucong

# 安装node

1. cd /usr/local/
2. wget https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x64.tar.xz
3. sudo tar -zxvf node-v8.12.0-linux-x64
4. sudo mv -f node-v8.12.0-linux-x64 node8.12.0
5. cd node8.12.0/bin
6. ./node -v
7. ln -s /usr/local/node8.12.0/bin/node /usr/bin/node
8. ln -s /usr/local/node8.12.0/bin/npm /usr/bin/npm
9. ln -s /usr/local/node8.12.0/bin/npx /usr/bin/npx
10. node -v   npm -v   npx -v


# 安装mongodb
1. see https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/

# 安装redis

0. cd /usr/local/
1. sudo wget http://download.redis.io/releases/redis-5.0.5.tar.gz
2. sudo tar -zxvf redis-5.0.5.tar.gz
3. sudo mv -f redis-5.0.5 redis5.0.5
4. yum install gcc -y
5. cd redis5.0.5
6. sudo make MALLOC=libc
7. cd src
8. sudo make install
9. ./redis-server  # 测试是否已经成功安装
10. ps -A | grep redis
11. kill -9 id
12. cd redis5.0.5
13. sudo vim redis.conf  搜索daemonize no改为yes 保存退出
14. cd src
15. ./redis-server redis.conf文件的路径
16. 设置开机自启动
  1. cd /etc
  2. sudo mkdir redis
  3. sudo cp path/to/redis5.0.5/redis.conf /etc/redis/6379.conf
  4. sudo cp path/to/redis5.0.5/utils/redis_init_script /etc/init.d/redisd
  5. chkconfig redisd on

17. 启动redis:  service redisd start
18. 停止redis: service redisd stop

VMwave11 隔空投送在手机page文稿中
