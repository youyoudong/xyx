import { playButton } from '../sprites/clover'

let plbFlag = false

let funcs = {
  ctxRender () {
    this.clover.drawClover()
  },

  listenEvent () {
    if (!dataBus.touchStartPoint) { return false }

    if (this.clover.playButton.isCollideWith(
      dataBus.touchStartPoint.pageX || 0,
      dataBus.touchStartPoint.pageY - screenHeight || 0)) { dataBus.gameStatus = 'playing' }

    if (this.clover.rankingButton.isCollideWith(
      dataBus.touchStartPoint.pageX || 0,
      dataBus.touchStartPoint.pageY - screenHeight || 0)) { dataBus.gameStatus = 'show_rank' }

    dataBus.touchStartPoint = {}
  }
}

export default function () {
  funcs.ctxRender.call(this)

  funcs.listenEvent.call(this)

  if (!plbFlag) {
    let button = wx.createUserInfoButton({
      type: 'text',
      text: '',
      style: {
          left: playButton.x,
          top: playButton.y + screenHeight,
          width: playButton.width,
          height: playButton.height,
      }
    })
    plbFlag = true

    button.onTap((res) => {
      dataBus.userInfo = res.userInfo
      button.hide()
      dataBus.gameStatus = 'playing'
    })
  }
}
