;(function (window, document) {

  var is = function (value, type) {
    var c = Object.prototype.toString.call(value).slice(8, -1)
    var s = typeof type === 'string' ? type.trim() : null
    return s ? s.toLowerCase() === c.toLowerCase() : c
  }

  var hasKey = function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
  }

  var random = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  var merge = function () {
    var args = [].slice.call(arguments).filter(function (item) {
      return is(item, 'Object')
    })
    if (args.length < 2) {
      return args.length ? args[0] : {}
    }
    var target = args.splice(0, 1)[0]
    args.forEach(function (item) {
      for (var key in item) {
        if (hasKey(item, key)) {
          target[key] = item[key]
        }
      }
    })
    return target
  }

  var kebabCase = function (str) {
    var reg = /[A-Z]/g;
    return str.replace(reg, function (m, i) {
      return (i > 0 ? '-' + m : m).toLowerCase();
    });
  }

  var insertBefore = function (el, container) {
    var first = container.firstChild
    if (first) {
      container.insertBefore(el, first)
    } else {
      container.appendChild(el)
    }
  }

  var exec = function(fn) {
    if(typeof fn !== 'function') {
      return
    }
    var args = [].slice.call(arguments, 1)
    fn.apply(this, args)
  }

  var setProgress = function (progressBar, progressVal, progress) {
    progress = progress < 0 ? 0 : (progress > 100 ? 100 : progress)
    progressBar.style.width = progress + '%'
    progressVal.innerText = parseInt(progress) + ' %'
  }

  var getStyle = function(element, attr) {
    var style = window.getComputedStyle(element, null)
    return style[attr]
  }

  var setStyle = function (element, style) {
    var css = [], key = ''
    for (key in style) {
      if (hasKey(style, key)) {
        css.push(kebabCase(key) + ':' + style[key])
      }
    }
    element.style.cssText = css.join(';')
  }

  var createElement = function (classList, style, html) {
    var list = [].concat(classList)
    var el = document.createElement('div')
    el.className = list.join(' ')
    is(style, 'Object') && setStyle(el, style)
    if (html) {
      el.innerHTML = html
    }
    return el
  }

  var animation = function(autoStop) {
    var autoCancel = arguments.length ? autoStop : true
    var prev = 0
    var start = null
    var animationFrameId = null
    var cancel = false
    var stop = function() {
      window.cancelAnimationFrame(animationFrameId)
      cancel = true
    }
    return function(duration, next, end) {
      var run = function (timestamp) {
        if(!start) {
          start = timestamp
        }
        var delta = timestamp - start
        var data = {
          current: timestamp,
          previous: prev,
          start: start,
          delta: delta,
          durationEnd: delta >= duration
        }
        if(autoCancel && data.durationEnd) {
          window.cancelAnimationFrame(animationFrameId)
          return exec(end, data, stop)
        }
        exec(next, data, stop)
        if(!cancel) {
          prev = timestamp
          animationFrameId = window.requestAnimationFrame(run)
        }
      }
      cancel = false
      animationFrameId = window.requestAnimationFrame(run)
    }
  }

  var bodyReady = function (callback, ctx) {
    if (typeof callback !== 'function') {
      return ctx
    }
    if (document.body) {
      return callback.call(ctx)
    }
    var timerId = setInterval(function () {
      if (document.body) {
        clearInterval(timerId)
        callback.call(ctx)
      }
    }, 10)
  }

  var Loading = function (options) {
    var defaultConf = {
      template: null,
      container: null,
      wrapperStyle: null,
      lineStyle: null,
      progressStyle: null,
      classPrefix: 'jwc',
      inlineStyle: true,
      duration: 1500,
      stop: '99%',
      onInited: null,
      onStart: null,
      onProgress: null,
      onEnd: null
    }
    this.options = merge({}, defaultConf, options)
    this.container = null
    this.wrapperNode = null
    this.lineNode = null
    this.progressNode = null
    this.waker = null
    this.progress = 0
    this.ended = false
    this.ready = Boolean(document.body)
    this.queue = []
    this.starting = false
    // this.lineWidth = 0
    if (!this.ready) {
      bodyReady(function () {
        this.ready = true
        this.queue.forEach(function (item) {
          item.fn.apply(this, item.args)
        }, this)
        this.queue = []
      }, this)
    }
    this.init()
  }


  Loading.prototype.init = function () {
    var conf = this.options
    if(conf.container === false) {
      exec.call(this, conf.onInited)
      return this
    }
    var classList = function(classList) {
      var list = [].concat(classList)
      return list.map(function(item) {
        return conf.classPrefix + '-' + item
      })
    }
    var container = conf.container || document.body
    var html = conf.template
    this.container = container
    if(is(html, 'String') && html.trim() !== '') {
      var div = createElement('div', null, html)
      var wrapperNode = div.firstChild
      wrapperNode.classList.add(classList('loading').join(''))
      this.wrapperNode = wrapperNode
      insertBefore(this.wrapperNode, this.container)
      exec.call(this, conf.onInited)
      return this
    }
    var css = function() {
      return conf.inlineStyle ? merge.apply(null, [].slice.call(arguments)) : null
    }
    var loading = createElement(classList('loading'), css({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 999,
      backgroundColor: '#fff',
      opacity: 1,
    }, conf.wrapperStyle))

    var line = createElement(classList('loading-line'), css({
      position: 'absolute',
      top: '49%',
      left: 0,
      width: 0,
      height: 0,
      borderTop: '1px solid #000',
      transform: 'scaleY(0.5)'
    }, conf.lineStyle))

    var progress = createElement(classList('loading-progress'), css({
      position: 'absolute',
      bottom: '35px',
      left: 0,
      width: '100%',
      textAlign: 'center',
      fontSize: '12px',
      color: '#999'
    }, conf.progressStyle), '0%')

    loading.appendChild(line)
    loading.appendChild(progress)
    insertBefore(loading, container)
    this.wrapperNode = loading
    this.lineNode = line
    this.progressNode = progress
    exec.call(this, conf.onInited)
    return this
  }

  Loading.prototype.setProgress = function (progress) {
    progress = progress < 0 ? 0 : (progress > 100 ? 100 : progress)
    var p1 = parseInt(this.progress, 10)
    var p2 = parseInt(progress, 10)
    if (this.lineNode) {
      this.lineNode.style.width = progress + '%'
    }
    if(this.progressNode && (p2 - p1 >= 1)) {
      this.progressNode.innerText = p2 + ' %'
    }
    this.progress = progress
    exec.call(this, this.options.onProgress, progress)
  }

  Loading.prototype.start = function (duration) {
    if(this.starting) {
      return this
    }
    this.intervalId && clearInterval(this.intervalId)
    var that = this
    var conf = this.options
    var stopAt = parseFloat(conf.stop) || 99
    var time = parseInt(duration || conf.duration, 10) || 1500
    var prevProgress = 0
    var p1 = random(5, 20)
    var p2 = random(85, 96)
    var ra = random(24, 30) / 10
    var t1 = Math.floor(p1 * ra / 100 * time)
    var t2 = time - t1
    var intervalId = null
    var transiton = function(info, stop) {
      var progress = that.progress
      if(!that.ended && progress >= p2) {
        var step = 0.015
        stop()
        intervalId = setInterval(function () {
          if (progress >= stopAt) {
            return clearInterval(intervalId)
          }
          progress += step
          var flag = random(4, 10) / 100
          if (progress - prevProgress >= flag) {
            that.setProgress(progress)
            prevProgress = that.progress
          } else if (stopAt - progress <= step) {
            that.setProgress(stopAt)
          }
        }, 100)
        return
      }
      var first = info.current - info.start === 0
      var delta = info.current - info.previous
      if(progress < p1) {
        progress += (p1 / t1 * (first ? 17 : delta))
        progress = progress > p1 ? p1 : progress
      } else if (progress < p2) {
        progress += (p2 / t2 * (first ? 17 : delta))
        progress = progress > p2 ? p2 : progress
      } else {
        progress += that.ended ? 1.5 : (p1 / t1 * (first ? 17 : delta))
      }
      that.setProgress(progress)
      if(that.progress >= 100) {
        stop()
        that.starting =  false
        that.waker = null
        exec.call(that, conf.onEnd)
      }
    }
    var runer = animation(false)
    this.waker = function() {
      this.starting =  true
      runer(time, transiton)
    }
    this.waker()
    exec.call(that, conf.onStart)
    return this
  }

  Loading.prototype.end = function () {
    this.ended = true
    exec.call(this, this.waker)
    this.waker = null
    return this
  }

  Loading.prototype.show = function () {
    if(!this.wrapperNode) {
      return this
    }
    this.wrapperNode.style.opacity = 1
    this.wrapperNode.style.display = 'block'
    return this
  }

  Loading.prototype.hide = function () {
    if(!this.wrapperNode) {
      return this
    }
    this.wrapperNode.style.opacity = 0
    this.wrapperNode.style.display = 'none'
    return this
  }

  Loading.prototype.fadeIn = function (duration, callback) {
    var el = this.wrapperNode
    if(!el || el.style.display !== 'none') {
      return this
    }
    el.style.opacity = 0
    el.style.display = 'block'
    var that = this
    var time = parseInt(duration, 10) || 750
    var opacity = 0
    var setOpacity = function(value) {
      value = value < 0 ? 0 : value > 1 ? 1 : value
      el.style.opacity = value
    }
    var transition = function(info) {
      var first = info.current - info.start === 0
      var delta = info.current - info.previous
      opacity += (1 / time * (first ? 17 : delta))
      setOpacity(opacity)
    }
    var end = function() {
      opacity < 1 && setOpacity(1)
      exec.call(that, callback)
    }
    var runer = animation()
    runer(time, transition, end)
    return this
  }

  Loading.prototype.fadeOut = function (duration, callback) {
    var el = this.wrapperNode
    if(!el || el.style.display === 'none') {
      return this
    }
    el.style.opacity = 1
    el.style.display = 'block'
    var that = this
    var time = parseInt(duration, 10) || 750
    var opacity = 1
    var setOpacity = function(value) {
      value = value < 0 ? 0 : value > 1 ? 1 : value
      el.style.opacity = value
    }
    var transition = function(info) {
      var first = info.current - info.start === 0
      var delta = info.current - info.previous
      opacity -= (1 / time * (first ? 17 : delta))
      setOpacity(opacity)
    }
    var end = function() {
      opacity > 0 && setOpacity(0)
      el.style.display = 'none'
      exec.call(that, callback)
    }
    var runer = animation()
    runer(time, transition, end)
    return this
  }

  Loading.prototype.remove = function () {
    if(this.wrapperNode) {
      this.wrapperNode.parentNode.removeChild(this.wrapperNode)
    }
    this.wrapperNode = null
    this.lineNode = null
    this.progressNode = null
    return this
  }

  Loading.prototype.destroy = function() {
    this.progress = 0
    this.ended = false
    this.queue = []
    return this.remove()
  }

  var rewrite = function (api) {
    return function () {
      var args = [].slice.call(arguments)
      if (this.ready) {
        return api.apply(this, args)
      }
      this.queue.push({fn: api, args: args})
      return this
    }
  }

  for (var key in Loading.prototype) {
    if (hasKey(Loading.prototype, key) && is(Loading.prototype[key], 'Function')) {
      if (key !== 'constructor') {
        Loading.prototype[key] = rewrite(Loading.prototype[key])
      }
    }
  }

  window.JwcLoading = Loading


})(window, document);
