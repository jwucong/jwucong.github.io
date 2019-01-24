# gitbook的配置文件说明

### book.json

```json
{
  // 标题
  "title": "Notes",
  // 作者
  "author": "jwucong",
  // 描述
  "description": "",
  // gitbook版本
  "gitbook": "3.2.3",
  // 外链
  "links": {
    "sidebar": {
      "github": "https://github.com/jwucong"
    }
  },
  // 插件
  "plugins": [
    "toggle-chapters",
    "-sharing",
    "github",
    "github-buttons",
    "sharing-plus"
  ],
  // 插件配置
  "pluginsConfig": {
    // github插件
    "github": {
      "url": "https://github.com/jwucong/notes"
    },
    // github-buttons插件
    "github-buttons": {
      "buttons": [{
        "user": "jwucong",
        "repo": "note",
        "type": "star",
        "size": "small",
        "count": true
      }]
    },
    // 分享插件
    "sharing": {
      "douban": false,
      "facebook": false,
      "google": false,
      "hatenaBookmark": false,
      "instapaper": false,
      "line": false,
      "linkedin": false,
      "messenger": false,
      "pocket": false,
      "qq": false,
      "qzone": false,
      "stumbleupon": false,
      "twitter": false,
      "viber": false,
      "vk": false,
      "weibo": false,
      "whatsapp": false,
      "all": ["google", "facebook", "weibo", "twitter", "qq", "qzone", "linkedin", "pocket"]
    }
  }
}

```