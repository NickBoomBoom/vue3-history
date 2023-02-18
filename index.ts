import type { Vue3HistoryOption, History } from "./interface"
import { reactive } from 'vue'
export default {
  install: (app: any, { router, onRouteChange, onQuit, debug }: Vue3HistoryOption) => {
    const log = function (...args: any) {
      debug && console.warn.apply(window, args)
    }

    const history = reactive(new Proxy({
      current: -1,
      stack: []
    } as History, {
      set(target: History, prop: 'current' | 'stack', value) {
        log('set', target, prop, value)
        if (prop = 'current') {
          // 阻止 window.history.go forward 调用的时候 不会做history 是否有记录的判断,在这里阻止下 
          if (value > target.stack.length) {
            return true
          }
          if (value === -1) {
            onQuit?.()
            return true
          }
        }
        target[prop] = value
        if (prop === 'current') {
          onRouteChange?.(target.stack[target.current])
        }
        return true
      }
    }))

    log(router, app)
    // 初始化
    history.stack.push(router.currentRoute.value)
    history.current += 1
    app.config.globalProperties.$history = history
    router.push = new Proxy(router.push, {
      apply(target, obj, args) {
        return (Reflect.apply(target, obj, args) as Promise<any>).then((err: Error) => {
          log('push ===> ', obj, args,)
          if (err) {
            return console.error(err)
          }
          const { currentRoute } = obj
          history.stack.push(currentRoute.value)
          history.current += 1
        })
      }
    })
    // replace
    router.replace = new Proxy(router.replace, {
      apply(target, obj, args) {
        return (Reflect.apply(target, obj, args) as Promise<any>).then((err: any) => {
          log('replace ===> ', obj, args,)
          if (err) {
            return console.error(err)
          }
          const { currentRoute } = obj
          history.stack.splice(history.current, 1, currentRoute.value)
        })
      }
    })

    window.history.back = new Proxy(window.history.back, {
      apply(target, obj, args) {
        log('window history back', args)
        history.current -= 1
        return Reflect.apply(target, obj, args)
      }
    })
    window.history.forward = new Proxy(window.history.forward, {
      apply(target, obj, args) {
        log('window history forward', obj, args)
        history.current += 1
        return Reflect.apply(target, obj, args)
      }
    })
    window.history.go = new Proxy(window.history.go, {
      apply(target, obj, args) {
        log('window history go', obj, args)
        history.current += args[0]
        return Reflect.apply(target, obj, args)
      }
    })
  }
}