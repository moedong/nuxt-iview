let util = {}

util.inOf = function(arr, targetArr) {
  let res = true
  arr.forEach(item => {
    if (targetArr.indexOf(item) < 0) {
      res = false
    }
  })
  return res
}

util.oneOf = function(ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true
  } else {
    return false
  }
}

util.showThisRoute = function(itAccess, currentAccess) {
  if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
    return util.oneOf(currentAccess, itAccess)
  } else {
    return itAccess === currentAccess
  }
}

util.getRouterObjByName = function(routers, name) {
  if (!name || !routers || !routers.length) {
    return null
  }
  // debugger;
  let routerObj = null
  for (let item of routers) {
    if (item.name === name) {
      return item
    }
    routerObj = util.getRouterObjByName(item.children, name)
    if (routerObj) {
      return routerObj
    }
  }
  return null
}

util.handleTitle = function(vm, item) {
  return item.title
  /* if (typeof item.title === 'object') {
    return vm.$t(item.title.i18n)
  } else {
    return item.title
  } */
}

util.setCurrentPath = function(vm, name) {
  // console.log('-----setCurrentPath-----', name)
  let title = ''
  let isOtherRouter = false
  vm.$store.state.app.routers.forEach(item => {
    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        title = util.handleTitle(vm, item)
        if (item.name === 'otherRouter') {
          isOtherRouter = true
        }
      }
    } else {
      item.children.forEach(child => {
        if (child.name === name) {
          title = util.handleTitle(vm, child)
          if (item.name === 'otherRouter') {
            isOtherRouter = true
          }
        }
      })
    }
  })
  let currentPathArr = []
  if (name === 'home_index') {
    currentPathArr = [
      {
        title: util.handleTitle(
          vm,
          util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')
        ),
        path: '',
        name: 'home_index'
      }
    ]
  } else if (
    (name.indexOf('_index') >= 0 || isOtherRouter) &&
    name !== 'home_index'
  ) {
    currentPathArr = [
      // {
      //   title: util.handleTitle(
      //     vm,
      //     util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')
      //   ),
      //   path: '/home',
      //   name: 'home_index'
      // },
      {
        title: title,
        path: '',
        name: name
      }
    ]
  } else {
    let currentPathObj = vm.$store.state.app.routers.filter(item => {
      if (item.children.length <= 1) {
        // console.log('item.children[0].name', name)
        return item.children[0].name === name
      } else {
        let i = 0
        let childArr = item.children
        let len = childArr.length
        while (i < len) {
          if (childArr[i].name === name) {
            return true
          }
          i++
        }
        return false
      }
    })[0]

    if (currentPathObj.name === 'home' && currentPathObj.children.length <= 1) {
      currentPathArr = [
        {
          title: '首页',
          path: '',
          name: 'home_index'
        }
      ]
    } else if (
      currentPathObj.children.length <= 1 &&
      currentPathObj.name !== 'home'
    ) {
      currentPathArr = [
        // {
        //   title: '首页',
        //   path: '/home',
        //   name: 'home_index'
        // },
        {
          title: currentPathObj.title,
          path: '',
          name: name
        }
      ]
    } else {
      let childObj = currentPathObj.children.filter(child => {
        return child.name === name
      })[0]
      currentPathArr = [
        // {
        //   title: '首页',
        //   path: '/home',
        //   name: 'home_index'
        // },
        {
          title: currentPathObj.title,
          path: '',
          name: currentPathObj.name
        },
        {
          title: childObj.title,
          path: currentPathObj.path + '/' + childObj.path,
          name: name
        }
      ]
    }
  }
  vm.$store.commit('setCurrentPath', currentPathArr)

  return currentPathArr
}

util.openNewPage = function(vm, name, argu, query) {
  let pageOpenedList = vm.$store.state.app.pageOpenedList
  let openedPageLen = pageOpenedList.length
  let i = 0
  let tagHasOpened = false
  // console.log('openedPageLen-------', openedPageLen)
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) {
      // 页面已经打开
      vm.$store.commit('pageOpenedList', {
        index: i,
        argu: argu,
        query: query
      })
      tagHasOpened = true
      break
    }
    i++
  }
  // console.log('tagHasOpened-------------', !tagHasOpened)
  if (!tagHasOpened) {
    let childrenIndex = 0
    let tag = vm.$store.state.app.tagsList.filter(item => {
      // console.log('tagHasOpened222222-------------', item.name)
      if (item.children) {
        let i = 0
        while (i < item.children.length) {
          // console.log(i)
          // console.log(item.children[i].name, name)
          if (item.children[i].name === name) {
            childrenIndex = i
            return true
          }
          i++
        }
        return false
      } else {
        return name === item.name
      }
    })
    tag = tag[0]
    // console.log('tag--------------', tag)
    // console.log('i--------------', childrenIndex)
    // console.log('tag.children--------------', tag.children[0])

    if (tag) {
      tag = tag.children ? tag.children[childrenIndex] : tag
      // console.log('tag--------------', tag)
      if (argu) {
        tag.argu = argu
      }
      if (query) {
        tag.query = query
      }
      vm.$store.commit('increateTag', tag)
    }
  }
  vm.$store.commit('setCurrentPageName', name)
}

util.toDefaultPage = function(routers, name, route, next) {
  let len = routers.length
  let i = 0
  let notHandle = true
  while (i < len) {
    if (
      routers[i].name === name &&
      routers[i].children &&
      routers[i].redirect === undefined
    ) {
      route.replace({
        name: routers[i].children[0].name
      })
      notHandle = false
      next()
      break
    }
    i++
  }
  if (notHandle) {
    next()
  }
}

util.fullscreenEvent = function(vm) {
  vm.$store.commit('initCachepage')
  // 权限菜单过滤相关
  vm.$store.commit('updateMenulist')
  // 全屏相关
}

export default util
