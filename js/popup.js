// 聆聽DOM事件
document.addEventListener('DOMContentLoaded', function (dcle) {
  // 設定localStorage用於紀錄彈出視窗狀態
  var simulationMove = window.localStorage.simulationMove || 'false'
  var simulationClick = window.localStorage.simulationClick || 'false'

  // 按鈕功能開關事件
  chrome.tabs.onActivated.addListener(function () {
    console.log('change')
    if (simulationMove === 'true') {
      chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
        // 取得當前tab
        // 向tab發送請求
        chrome.tabs.sendMessage(tab[0].id, {
          type: 'simulationMove',
          action: true
        })
      })
    }
    if (simulationClick === 'true') {
      chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
        // 取得當前tab
        // 向tab發送請求
        chrome.tabs.sendMessage(tab[0].id, {
          type: 'simulationClick',
          action: true
        })
      })
    }
  })

  // 確定初始按鈕狀態
  if (simulationMove === 'true') {
    window.localStorage.simulationMove = 'true'
    $('#simulatioMove').addClass('active')
  }else {
    window.localStorage.simulationMove = 'false'
    $('#simulatioMove').removeClass('active')
    chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
      // 取得當前tab, 向tab發送請求
      chrome.tabs.sendMessage(tab[0].id, {
        type: 'simulationMove',
        action: false
      })
    })
  }
  if (simulationClick === 'true') {
    window.localStorage.simulationClick = 'true'
    $('#simulationClick').addClass('active')
  }else {
    window.localStorage.simulationClick = 'false'
    $('#simulationClick').removeClass('active')
    chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
      // 取得當前tab, 向tab發送請求
      chrome.tabs.sendMessage(tab[0].id, {
        type: 'simulationClick',
        action: false
      })
    })
  }

  $('#simulatioMove').click(function () {
    var btnStatus = $(this).attr('aria-pressed') !== 'true'
    console.log(btnStatus)
    if (btnStatus) {
      window.localStorage.simulationMove = 'false'
    }else {
      window.localStorage.simulationMove = 'true'
    }
    chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
      // 取得當前tab
      // 向tab發送請求
      chrome.tabs.sendMessage(tab[0].id, {
        type: 'simulationMove',
        action: btnStatus
      })
    })
  })

  $('#simulationClick').click(function () {
    var btnStatus = $(this).attr('aria-pressed') !== 'true'
    console.log(btnStatus)
    if (btnStatus) {
      window.localStorage.simulationClick = 'false'
    }else {
      window.localStorage.simulationClick = 'true'
    }
    chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
      // 取得當前tab
      // 向tab發送請求
      chrome.tabs.sendMessage(tab[0].id, {
        type: 'simulationClick',
        action: btnStatus
      })
    })
  })
})
