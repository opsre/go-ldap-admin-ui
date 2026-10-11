<template>
  <div v-show="value" class="vue-image-crop-upload">
    <div class="vicp-wrap">
      <div class="vicp-close" @click="off">
        <i class="vicp-icon4" />
      </div>

      <div v-show="step == 1" class="vicp-step1">
        <div
          class="vicp-drop-area"
          @dragleave="preventDefault"
          @dragover="preventDefault"
          @dragenter="preventDefault"
          @click="handleClick"
          @drop="handleChange"
        >
          <i v-show="loading != 1" class="vicp-icon1">
            <i class="vicp-icon1-arrow" />
            <i class="vicp-icon1-body" />
            <i class="vicp-icon1-bottom" />
          </i>
          <span v-show="loading !== 1" class="vicp-hint">{{ lang.hint }}</span>
          <span v-show="!isSupported" class="vicp-no-supported-hint">{{ lang.noSupported }}</span>
          <input v-show="false" v-if="step == 1" ref="fileinput" type="file" @change="handleChange">
        </div>
        <div v-show="hasError" class="vicp-error">
          <i class="vicp-icon2" />
          {{ errorMsg }}
        </div>
        <div class="vicp-operate">
          <a @click="off" @mousedown="ripple">{{ lang.btn.off }}</a>
        </div>
      </div>

      <div v-if="step == 2" class="vicp-step2">
        <div class="vicp-crop">
          <div v-show="true" class="vicp-crop-left">
            <div class="vicp-img-container">
              <img
                ref="img"
                :src="sourceImgUrl"
                :style="sourceImgStyle"
                class="vicp-img"
                draggable="false"
                @drag="preventDefault"
                @dragstart="preventDefault"
                @dragend="preventDefault"
                @dragleave="preventDefault"
                @dragover="preventDefault"
                @dragenter="preventDefault"
                @drop="preventDefault"
                @touchstart="imgStartMove"
                @touchmove="imgMove"
                @touchend="createImg"
                @touchcancel="createImg"
                @mousedown="imgStartMove"
                @mousemove="imgMove"
                @mouseup="createImg"
                @mouseout="createImg"
              >
              <div :style="sourceImgShadeStyle" class="vicp-img-shade vicp-img-shade-1" />
              <div :style="sourceImgShadeStyle" class="vicp-img-shade vicp-img-shade-2" />
            </div>

            <div class="vicp-range">
              <input
                :value="scale.range"
                type="range"
                step="1"
                min="0"
                max="100"
                @input="zoomChange"
              >
              <i
                class="vicp-icon5"
                @mousedown="startZoomSub"
                @mouseout="endZoomSub"
                @mouseup="endZoomSub"
              />
              <i
                class="vicp-icon6"
                @mousedown="startZoomAdd"
                @mouseout="endZoomAdd"
                @mouseup="endZoomAdd"
              />
            </div>

            <div v-if="!noRotate" class="vicp-rotate">
              <i @mousedown="startRotateLeft" @mouseout="endRotate" @mouseup="endRotate">↺</i>
              <i @mousedown="startRotateRight" @mouseout="endRotate" @mouseup="endRotate">↻</i>
            </div>
          </div>
          <div v-show="true" class="vicp-crop-right">
            <div class="vicp-preview">
              <div v-if="!noSquare" class="vicp-preview-item">
                <img :src="createImgUrl" :style="previewStyle">
                <span>{{ lang.preview }}</span>
              </div>
              <div v-if="!noCircle" class="vicp-preview-item vicp-preview-item-circle">
                <img :src="createImgUrl" :style="previewStyle">
                <span>{{ lang.preview }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="vicp-operate">
          <a @click="setStep(1)" @mousedown="ripple">{{ lang.btn.back }}</a>
          <a class="vicp-operate-btn" @click="prepareUpload" @mousedown="ripple">{{ lang.btn.save }}</a>
        </div>
      </div>

      <div v-if="step == 3" class="vicp-step3">
        <div class="vicp-upload">
          <span v-show="loading === 1" class="vicp-loading">{{ lang.loading }}</span>
          <div class="vicp-progress-wrap">
            <span v-show="loading === 1" :style="progressStyle" class="vicp-progress" />
          </div>
          <div v-show="hasError" class="vicp-error">
            <i class="vicp-icon2" />
            {{ errorMsg }}
          </div>
          <div v-show="loading === 2" class="vicp-success">
            <i class="vicp-icon3" />
            {{ lang.success }}
          </div>
        </div>
        <div class="vicp-operate">
          <a @click="setStep(2)" @mousedown="ripple">{{ lang.btn.back }}</a>
          <a @click="off" @mousedown="ripple">{{ lang.btn.close }}</a>
        </div>
      </div>
      <canvas v-show="false" ref="canvas" :width="width" :height="height" />
    </div>
  </div>
</template>

<script>
'use strict'
import request from '@/utils/request'
import language from './utils/language.js'
import mimes from './utils/mimes.js'
import data2blob from './utils/data2blob.js'
import effectRipple from './utils/effectRipple.js'
import { getLocale } from '@/lang'

const cropperLocaleMap = {
  'zh-CN': 'zh',
  'en-US': 'en',
  'ja-JP': 'ja',
  'es-ES': 'es-MX',
  'ko-KR': 'en'
}

export default {
  props: {
    // Domain and uploaded file name, included with the triggered event (use these to distinguish multiple image upload controls on one page)
    field: {
      type: String,
      default: 'avatar'
    },
    // Original name key, similar to an ID, included with the triggered event (use it to distinguish multiple image upload controls on one page)
    ki: {
      type: Number,
      default: 0
    },
    // Whether to display this control
    value: {
      type: Boolean,
      default: true
    },
    // Upload URL
    url: {
      type: String,
      default: ''
    },
    // Additional data to upload with the file, as an object
    params: {
      type: Object,
      default: null
    },
    // Add custom headers
    headers: {
      type: Object,
      default: null
    },
    // Width of the cropped image
    width: {
      type: Number,
      default: 200
    },
    // Height of the cropped image
    height: {
      type: Number,
      default: 200
    },
    // Hide the rotation controls
    noRotate: {
      type: Boolean,
      default: true
    },
    // Do not preview a circular image
    noCircle: {
      type: Boolean,
      default: false
    },
    // Do not preview a square image
    noSquare: {
      type: Boolean,
      default: false
    },
    // Single-file size limit
    maxSize: {
      type: Number,
      default: 10240
    },
    // Language type
    langType: {
      type: String,
      default: ''
    },
    // Language pack
    langExt: {
      type: Object,
      default: null
    },
    // Image upload format
    imgFormat: {
      type: String,
      default: 'png'
    },
    // Whether cross-origin requests are supported
    withCredentials: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const { imgFormat, langType, langExt, width, height } = this
    let isSupported = true
    const allowImgFormat = ['jpg', 'png']
    const tempImgFormat =
      allowImgFormat.indexOf(imgFormat) === -1 ? 'jpg' : imgFormat
    const normalizedLangType = langType || cropperLocaleMap[getLocale()] || 'en'
    const lang = language[normalizedLangType] ? language[normalizedLangType] : language['en']
    const mime = mimes[tempImgFormat]
    // Normalize the image format
    this.imgFormat = tempImgFormat
    if (langExt) {
      Object.assign(lang, langExt)
    }
    if (typeof FormData !== 'function') {
      isSupported = false
    }
    return {
      // Image MIME type
      mime,
      // Language pack
      lang,
      // Whether the browser supports this control
      isSupported,
      // Whether the browser supports touch events
      // eslint-disable-next-line no-prototype-builtins
      isSupportTouch: document.hasOwnProperty('ontouchstart'),
      // Step
      step: 1, // 1 select file, 2 crop, 3 upload
      // Upload status and progress
      loading: 0, // 0 not started, 1 in progress, 2 succeeded, 3 failed
      progress: 0,
      // Whether there is an error and its message
      hasError: false,
      errorMsg: '',
      // Target image aspect ratio
      ratio: width / height,
      // Original image URL and generated image URL
      sourceImg: null,
      sourceImgUrl: '',
      createImgUrl: '',
      // Initial values for the original image drag event
      sourceImgMouseDown: {
        on: false,
        mX: 0, // Coordinates where the mouse was pressed
        mY: 0,
        x: 0, // Original image coordinates in scale
        y: 0
      },
      // Generated image preview container size
      previewContainer: {
        width: 100,
        height: 100
      },
      // Original image container width and height
      sourceImgContainer: {
        // sic
        width: 240,
        height: 184 // If the generated image has this aspect ratio, a bug occurs. Use a special value for now.
      },
      // Original image display properties
      scale: {
        zoomAddOn: false, // Button zoom event enabled
        zoomSubOn: false, // Button zoom event enabled
        range: 1, // Maximum 100
        rotateLeft: false, // Button rotate-left event enabled
        rotateRight: false, // Button rotate-right event enabled
        degree: 0, // Rotation angle
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        maxWidth: 0,
        maxHeight: 0,
        minWidth: 0, // Maximum width
        minHeight: 0,
        naturalWidth: 0, // Original width
        naturalHeight: 0
      }
    }
  },
  computed: {
    // Progress bar styles
    progressStyle() {
      const { progress } = this
      return {
        width: progress + '%'
      }
    },
    // Original image styles
    sourceImgStyle() {
      const { scale, sourceImgMasking } = this
      const top = scale.y + sourceImgMasking.y + 'px'
      const left = scale.x + sourceImgMasking.x + 'px'
      return {
        top,
        left,
        width: scale.width + 'px',
        height: scale.height + 'px',
        transform: 'rotate(' + scale.degree + 'deg)', // Style for rotating the original image on the left
        '-ms-transform': 'rotate(' + scale.degree + 'deg)', // IE9 compatibility
        '-moz-transform': 'rotate(' + scale.degree + 'deg)', // Firefox compatibility
        '-webkit-transform': 'rotate(' + scale.degree + 'deg)', // Safari and Chrome compatibility
        '-o-transform': 'rotate(' + scale.degree + 'deg)' // Opera compatibility
      }
    },
    // Original image mask properties
    sourceImgMasking() {
      const { width, height, ratio, sourceImgContainer } = this
      const sic = sourceImgContainer
      const sicRatio = sic.width / sic.height // Original image container aspect ratio
      let x = 0
      let y = 0
      let w = sic.width
      let h = sic.height
      let scale = 1
      if (ratio < sicRatio) {
        scale = sic.height / height
        w = sic.height * ratio
        x = (sic.width - w) / 2
      }
      if (ratio > sicRatio) {
        scale = sic.width / width
        h = sic.width / ratio
        y = (sic.height - h) / 2
      }
      return {
        scale, // Mask scaling relative to the target dimensions
        x,
        y,
        width: w,
        height: h
      }
    },
    // Original image overlay styles
    sourceImgShadeStyle() {
      const { sourceImgMasking, sourceImgContainer } = this
      const sic = sourceImgContainer
      const sim = sourceImgMasking
      const w =
        sim.width === sic.width ? sim.width : (sic.width - sim.width) / 2
      const h =
        sim.height === sic.height ? sim.height : (sic.height - sim.height) / 2
      return {
        width: w + 'px',
        height: h + 'px'
      }
    },
    previewStyle() {
      const { ratio, previewContainer } = this
      const pc = previewContainer
      let w = pc.width
      let h = pc.height
      const pcRatio = w / h
      if (ratio < pcRatio) {
        w = pc.height * ratio
      }
      if (ratio > pcRatio) {
        h = pc.width / ratio
      }
      return {
        width: w + 'px',
        height: h + 'px'
      }
    }
  },
  watch: {
    value(newValue) {
      if (newValue && this.loading !== 1) {
        this.reset()
      }
    }
  },
  created() {
    // Bind the Esc key to hide this plugin
    document.addEventListener('keyup', this.closeHandler)
  },
  destroyed() {
    document.removeEventListener('keyup', this.closeHandler)
  },
  methods: {
    // Click ripple effect
    ripple(e) {
      effectRipple(e)
    },
    // Close the control
    off() {
      setTimeout(() => {
        this.$emit('input', false)
        this.$emit('close')
        if (this.step === 3 && this.loading === 2) {
          this.setStep(1)
        }
      }, 200)
    },
    // Set the step
    setStep(no) {
      // The delay allows the animation to appear.
      setTimeout(() => {
        this.step = no
      }, 200)
    },
    /* Bind functions for the image selection area
     ---------------------------------------------------------------*/
    preventDefault(e) {
      e.preventDefault()
      return false
    },
    handleClick(e) {
      if (this.loading !== 1) {
        if (e.target !== this.$refs.fileinput) {
          e.preventDefault()
          if (document.activeElement !== this.$refs) {
            this.$refs.fileinput.click()
          }
        }
      }
    },
    handleChange(e) {
      e.preventDefault()
      if (this.loading !== 1) {
        const files = e.target.files || e.dataTransfer.files
        this.reset()
        if (this.checkFile(files[0])) {
          this.setSourceImg(files[0])
        }
      }
    },
    /* ---------------------------------------------------------------*/
    // Check whether the selected file is suitable
    checkFile(file) {
      const { lang, maxSize } = this
      // Images only
      if (file.type.indexOf('image') === -1) {
        this.hasError = true
        this.errorMsg = lang.error.onlyImg
        return false
      }
      // Exceeds the size limit
      if (file.size / 1024 > maxSize) {
        this.hasError = true
        this.errorMsg = lang.error.outOfSize + maxSize + 'kb'
        return false
      }
      return true
    },
    // Reset the control
    reset() {
      this.loading = 0
      this.hasError = false
      this.errorMsg = ''
      this.progress = 0
    },
    // Set the image source
    setSourceImg(file) {
      const fr = new FileReader()
      fr.onload = e => {
        this.sourceImgUrl = fr.result
        this.startCrop()
      }
      fr.readAsDataURL(file)
    },
    // Prepare before cropping
    startCrop() {
      const {
        width,
        height,
        ratio,
        scale,
        sourceImgUrl,
        sourceImgMasking,
        lang
      } = this
      const sim = sourceImgMasking
      const img = new Image()
      img.src = sourceImgUrl
      img.onload = () => {
        const nWidth = img.naturalWidth
        const nHeight = img.naturalHeight
        const nRatio = nWidth / nHeight
        let w = sim.width
        let h = sim.height
        let x = 0
        let y = 0
        // Image dimensions are below the minimum
        if (nWidth < width || nHeight < height) {
          this.hasError = true
          this.errorMsg = lang.error.lowestPx + width + '*' + height
          return false
        }
        if (ratio > nRatio) {
          h = w / nRatio
          y = (sim.height - h) / 2
        }
        if (ratio < nRatio) {
          w = h * nRatio
          x = (sim.width - w) / 2
        }
        scale.range = 0
        scale.x = x
        scale.y = y
        scale.width = w
        scale.height = h
        scale.degree = 0
        scale.minWidth = w
        scale.minHeight = h
        scale.maxWidth = nWidth * sim.scale
        scale.maxHeight = nHeight * sim.scale
        scale.naturalWidth = nWidth
        scale.naturalHeight = nHeight
        this.sourceImg = img
        this.createImg()
        this.setStep(2)
      }
    },
    // Press the mouse on the image to prepare to move it
    imgStartMove(e) {
      e.preventDefault()
      // When touch events are supported, mouse events are disabled
      if (this.isSupportTouch && !e.targetTouches) {
        return false
      }
      const et = e.targetTouches ? e.targetTouches[0] : e
      const { sourceImgMouseDown, scale } = this
      const simd = sourceImgMouseDown
      simd.mX = et.screenX
      simd.mY = et.screenY
      simd.x = scale.x
      simd.y = scale.y
      simd.on = true
    },
    // Move the image while the mouse button is held down
    imgMove(e) {
      e.preventDefault()
      // When touch events are supported, mouse events are disabled
      if (this.isSupportTouch && !e.targetTouches) {
        return false
      }
      const et = e.targetTouches ? e.targetTouches[0] : e
      const {
        sourceImgMouseDown: { on, mX, mY, x, y },
        scale,
        sourceImgMasking
      } = this
      const sim = sourceImgMasking
      const nX = et.screenX
      const nY = et.screenY
      const dX = nX - mX
      const dY = nY - mY
      let rX = x + dX
      let rY = y + dY
      if (!on) return
      if (rX > 0) {
        rX = 0
      }
      if (rY > 0) {
        rY = 0
      }
      if (rX < sim.width - scale.width) {
        rX = sim.width - scale.width
      }
      if (rY < sim.height - scale.height) {
        rY = sim.height - scale.height
      }
      scale.x = rX
      scale.y = rY
    },
    // Start rotating right when the button is pressed
    startRotateRight(e) {
      const { scale } = this
      scale.rotateRight = true
      const rotate = () => {
        if (scale.rotateRight) {
          const degree = ++scale.degree
          this.createImg(degree)
          setTimeout(function() {
            rotate()
          }, 60)
        }
      }
      rotate()
    },
    // Start rotating left when the button is pressed
    startRotateLeft(e) {
      const { scale } = this
      scale.rotateLeft = true
      const rotate = () => {
        if (scale.rotateLeft) {
          const degree = --scale.degree
          this.createImg(degree)
          setTimeout(function() {
            rotate()
          }, 60)
        }
      }
      rotate()
    },
    // Stop rotating
    endRotate() {
      const { scale } = this
      scale.rotateLeft = false
      scale.rotateRight = false
    },
    // Start zooming in when the button is pressed
    startZoomAdd(e) {
      const { scale } = this
      scale.zoomAddOn = true
      const zoom = () => {
        if (scale.zoomAddOn) {
          const range = scale.range >= 100 ? 100 : ++scale.range
          this.zoomImg(range)
          setTimeout(function() {
            zoom()
          }, 60)
        }
      }
      zoom()
    },
    // Stop zooming in when the button is released or moved away
    endZoomAdd(e) {
      this.scale.zoomAddOn = false
    },
    // Start zooming out when the button is pressed
    startZoomSub(e) {
      const { scale } = this
      scale.zoomSubOn = true
      const zoom = () => {
        if (scale.zoomSubOn) {
          const range = scale.range <= 0 ? 0 : --scale.range
          this.zoomImg(range)
          setTimeout(function() {
            zoom()
          }, 60)
        }
      }
      zoom()
    },
    // Stop zooming out when the button is released or moved away
    endZoomSub(e) {
      const { scale } = this
      scale.zoomSubOn = false
    },
    zoomChange(e) {
      this.zoomImg(e.target.value)
    },
    // Scale the original image
    zoomImg(newRange) {
      const { sourceImgMasking, scale } = this
      const {
        maxWidth,
        maxHeight,
        minWidth,
        minHeight,
        width,
        height,
        x,
        y
      } = scale
      const sim = sourceImgMasking
      // Mask width and height
      const sWidth = sim.width
      const sHeight = sim.height
      // New width and height
      const nWidth = minWidth + ((maxWidth - minWidth) * newRange) / 100
      const nHeight = minHeight + ((maxHeight - minHeight) * newRange) / 100
      // New coordinates (scaled around the mask center)
      let nX = sWidth / 2 - (nWidth / width) * (sWidth / 2 - x)
      let nY = sHeight / 2 - (nHeight / height) * (sHeight / 2 - y)
      // Check whether the new coordinates exceed the mask bounds
      if (nX > 0) {
        nX = 0
      }
      if (nY > 0) {
        nY = 0
      }
      if (nX < sWidth - nWidth) {
        nX = sWidth - nWidth
      }
      if (nY < sHeight - nHeight) {
        nY = sHeight - nHeight
      }
      // Assign the values
      scale.x = nX
      scale.y = nY
      scale.width = nWidth
      scale.height = nHeight
      scale.range = newRange
      setTimeout(() => {
        if (scale.range === newRange) {
          this.createImg()
        }
      }, 300)
    },
    // Generate the target image
    createImg(e) {
      const {
        mime,
        sourceImg,
        scale: { x, y, width, height, degree },
        sourceImgMasking: { scale }
      } = this
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      if (e) {
        // Clear the mouse-down move state
        this.sourceImgMouseDown.on = false
      }
      canvas.width = this.width
      canvas.height = this.height
      ctx.clearRect(0, 0, this.width, this.height)
      // Set transparent areas to a white background
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, this.width, this.height)
      ctx.translate(this.width * 0.5, this.height * 0.5)
      ctx.rotate((Math.PI * degree) / 180)
      ctx.translate(-this.width * 0.5, -this.height * 0.5)
      ctx.drawImage(
        sourceImg,
        x / scale,
        y / scale,
        width / scale,
        height / scale
      )
      this.createImgUrl = canvas.toDataURL(mime)
    },
    prepareUpload() {
      const { url, createImgUrl, field, ki } = this
      this.$emit('crop-success', createImgUrl, field, ki)
      if (typeof url === 'string' && url) {
        this.upload()
      } else {
        this.off()
      }
    },
    // Upload the image
    upload() {
      const {
        lang,
        imgFormat,
        mime,
        url,
        params,
        field,
        ki,
        createImgUrl
      } = this
      const fmData = new FormData()
      fmData.append(
        field,
        data2blob(createImgUrl, mime),
        field + '.' + imgFormat
      )
      // Add other parameters
      if (typeof params === 'object' && params) {
        Object.keys(params).forEach(k => {
          fmData.append(k, params[k])
        })
      }
      // Listen to the progress callback
      // const uploadProgress = (event) => {
      //   if (event.lengthComputable) {
      //     this.progress = 100 * Math.round(event.loaded) / event.total
      //   }
      // }
      // Upload file
      this.reset()
      this.loading = 1
      this.setStep(3)
      request({
        url,
        method: 'post',
        data: fmData
      })
        .then(resData => {
          this.loading = 2
          this.$emit('crop-upload-success', resData.data)
        })
        .catch(err => {
          if (this.value) {
            this.loading = 3
            this.hasError = true
            this.errorMsg = lang.fail
            this.$emit('crop-upload-fail', err, field, ki)
          }
        })
    },
    closeHandler(e) {
      if (this.value && (e.key === 'Escape' || e.keyCode === 27)) {
        this.off()
      }
    }
  }
}
</script>

<style lang="scss">
@charset "UTF-8";
@-webkit-keyframes vicp_progress {
  0% {
    background-position-y: 0;
  }
  100% {
    background-position-y: 40px;
  }
}
@keyframes vicp_progress {
  0% {
    background-position-y: 0;
  }
  100% {
    background-position-y: 40px;
  }
}
@-webkit-keyframes vicp {
  0% {
    opacity: 0;
    -webkit-transform: scale(0) translatey(-60px);
    transform: scale(0) translatey(-60px);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1) translatey(0);
    transform: scale(1) translatey(0);
  }
}
@keyframes vicp {
  0% {
    opacity: 0;
    -webkit-transform: scale(0) translatey(-60px);
    transform: scale(0) translatey(-60px);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1) translatey(0);
    transform: scale(1) translatey(0);
  }
}
.vue-image-crop-upload {
  position: fixed;
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  -webkit-tap-highlight-color: transparent;
  -moz-tap-highlight-color: transparent;
}
.vue-image-crop-upload .vicp-wrap {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  position: fixed;
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 600px;
  height: 330px;
  padding: 25px;
  background-color: #fff;
  border-radius: 2px;
  -webkit-animation: vicp 0.12s ease-in;
  animation: vicp 0.12s ease-in;
}
.vue-image-crop-upload .vicp-wrap .vicp-close {
  position: absolute;
  right: -30px;
  top: -30px;
}
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4 {
  position: relative;
  display: block;
  width: 30px;
  height: 30px;
  cursor: pointer;
  -webkit-transition: -webkit-transform 0.18s;
  transition: -webkit-transform 0.18s;
  transition: transform 0.18s;
  transition: transform 0.18s, -webkit-transform 0.18s;
  -webkit-transform: rotate(0);
  -ms-transform: rotate(0);
  transform: rotate(0);
}
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::after,
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::before {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  content: "";
  position: absolute;
  top: 12px;
  left: 4px;
  width: 20px;
  height: 3px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  background-color: #fff;
}
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::after {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4:hover {
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 35px;
  height: 170px;
  background-color: rgba(0, 0, 0, 0.03);
  text-align: center;
  border: 1px dashed rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 {
  display: block;
  margin: 0 auto 6px;
  width: 42px;
  height: 42px;
  overflow: hidden;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step1
  .vicp-drop-area
  .vicp-icon1
  .vicp-icon1-arrow {
  display: block;
  margin: 0 auto;
  width: 0;
  height: 0;
  border-bottom: 14.7px solid rgba(0, 0, 0, 0.3);
  border-left: 14.7px solid transparent;
  border-right: 14.7px solid transparent;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step1
  .vicp-drop-area
  .vicp-icon1
  .vicp-icon1-body {
  display: block;
  width: 12.6px;
  height: 14.7px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.3);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step1
  .vicp-drop-area
  .vicp-icon1
  .vicp-icon1-bottom {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  height: 12.6px;
  border: 6px solid rgba(0, 0, 0, 0.3);
  border-top: none;
}
.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-hint {
  display: block;
  padding: 15px;
  font-size: 14px;
  color: #666;
  line-height: 30px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step1
  .vicp-drop-area
  .vicp-no-supported-hint {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px;
  width: 100%;
  height: 60px;
  line-height: 30px;
  background-color: #eee;
  text-align: center;
  color: #666;
  font-size: 14px;
}
.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area:hover {
  cursor: pointer;
  border-color: rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.05);
}
.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop {
  overflow: hidden;
}
.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left {
  float: left;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container {
  position: relative;
  display: block;
  width: 240px;
  height: 180px;
  background-color: #e5e5e0;
  overflow: hidden;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container
  .vicp-img {
  position: absolute;
  display: block;
  cursor: move;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container
  .vicp-img-shade {
  -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
  position: absolute;
  background-color: rgba(241, 242, 243, 0.8);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container
  .vicp-img-shade.vicp-img-shade-1 {
  top: 0;
  left: 0;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-img-container
  .vicp-img-shade.vicp-img-shade-2 {
  bottom: 0;
  right: 0;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-rotate {
  position: relative;
  width: 240px;
  height: 18px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-rotate
  i {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  line-height: 18px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.08);
  color: #fff;
  overflow: hidden;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-rotate
  i:hover {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.14);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-rotate
  i:first-child {
  float: left;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-rotate
  i:last-child {
  float: right;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range {
  position: relative;
  margin: 30px 0 10px 0;
  width: 240px;
  height: 18px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon5,
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon6 {
  position: absolute;
  top: 0;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.08);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon5:hover,
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon6:hover {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.14);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon5 {
  left: 0;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon5::before {
  position: absolute;
  content: "";
  display: block;
  left: 3px;
  top: 8px;
  width: 12px;
  height: 2px;
  background-color: #fff;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon6 {
  right: 0;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon6::before {
  position: absolute;
  content: "";
  display: block;
  left: 3px;
  top: 8px;
  width: 12px;
  height: 2px;
  background-color: #fff;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  .vicp-icon6::after {
  position: absolute;
  content: "";
  display: block;
  top: 3px;
  left: 8px;
  width: 2px;
  height: 12px;
  background-color: #fff;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"] {
  display: block;
  padding-top: 5px;
  margin: 0 auto;
  width: 180px;
  height: 8px;
  vertical-align: top;
  background: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  /* Slider
               ---------------------------------------------------------------*/
  /* Track
               ---------------------------------------------------------------*/
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:focus {
  outline: none;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-webkit-slider-thumb {
  -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
  -webkit-appearance: none;
  appearance: none;
  margin-top: -3px;
  width: 12px;
  height: 12px;
  background-color: #61c091;
  border-radius: 100%;
  border: none;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-moz-range-thumb {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
  -moz-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background-color: #61c091;
  border-radius: 100%;
  border: none;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-ms-thumb {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
  appearance: none;
  width: 12px;
  height: 12px;
  background-color: #61c091;
  border: none;
  border-radius: 100%;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:active::-moz-range-thumb {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  width: 14px;
  height: 14px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:active::-ms-thumb {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  width: 14px;
  height: 14px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:active::-webkit-slider-thumb {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  margin-top: -4px;
  width: 14px;
  height: 14px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-webkit-slider-runnable-track {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 6px;
  cursor: pointer;
  border-radius: 2px;
  border: none;
  background-color: rgba(68, 170, 119, 0.3);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-moz-range-track {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 6px;
  cursor: pointer;
  border-radius: 2px;
  border: none;
  background-color: rgba(68, 170, 119, 0.3);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-ms-track {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  width: 100%;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
  height: 6px;
  border-radius: 2px;
  border: none;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-ms-fill-lower {
  background-color: rgba(68, 170, 119, 0.3);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]::-ms-fill-upper {
  background-color: rgba(68, 170, 119, 0.15);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:focus::-webkit-slider-runnable-track {
  background-color: rgba(68, 170, 119, 0.5);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:focus::-moz-range-track {
  background-color: rgba(68, 170, 119, 0.5);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:focus::-ms-fill-lower {
  background-color: rgba(68, 170, 119, 0.45);
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-left
  .vicp-range
  input[type="range"]:focus::-ms-fill-upper {
  background-color: rgba(68, 170, 119, 0.25);
}
.vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right {
  float: right;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-right
  .vicp-preview {
  height: 150px;
  overflow: hidden;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-right
  .vicp-preview
  .vicp-preview-item {
  position: relative;
  padding: 5px;
  width: 100px;
  height: 100px;
  float: left;
  margin-right: 16px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-right
  .vicp-preview
  .vicp-preview-item
  span {
  position: absolute;
  bottom: -30px;
  width: 100%;
  font-size: 14px;
  color: #bbb;
  display: block;
  text-align: center;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-right
  .vicp-preview
  .vicp-preview-item
  img {
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 3px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-right
  .vicp-preview
  .vicp-preview-item.vicp-preview-item-circle {
  margin-right: 0;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step2
  .vicp-crop
  .vicp-crop-right
  .vicp-preview
  .vicp-preview-item.vicp-preview-item-circle
  img {
  border-radius: 100%;
}
.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 35px;
  height: 170px;
  background-color: rgba(0, 0, 0, 0.03);
  text-align: center;
  border: 1px dashed #ddd;
}
.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-loading {
  display: block;
  padding: 15px;
  font-size: 16px;
  color: #999;
  line-height: 30px;
}
.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap {
  margin-top: 12px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 3px;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step3
  .vicp-upload
  .vicp-progress-wrap
  .vicp-progress {
  position: relative;
  display: block;
  height: 5px;
  border-radius: 3px;
  background-color: #4a7;
  -webkit-box-shadow: 0 2px 6px 0 rgba(68, 170, 119, 0.3);
  box-shadow: 0 2px 6px 0 rgba(68, 170, 119, 0.3);
  -webkit-transition: width 0.15s linear;
  transition: width 0.15s linear;
  background-image: -webkit-linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-image: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 40px 40px;
  -webkit-animation: vicp_progress 0.5s linear infinite;
  animation: vicp_progress 0.5s linear infinite;
}
.vue-image-crop-upload
  .vicp-wrap
  .vicp-step3
  .vicp-upload
  .vicp-progress-wrap
  .vicp-progress::after {
  content: "";
  position: absolute;
  display: block;
  top: -3px;
  right: -3px;
  width: 9px;
  height: 9px;
  border: 1px solid rgba(245, 246, 247, 0.7);
  -webkit-box-shadow: 0 1px 4px 0 rgba(68, 170, 119, 0.7);
  box-shadow: 0 1px 4px 0 rgba(68, 170, 119, 0.7);
  border-radius: 100%;
  background-color: #4a7;
}
.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-error,
.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-success {
  height: 100px;
  line-height: 100px;
}
.vue-image-crop-upload .vicp-wrap .vicp-operate {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
.vue-image-crop-upload .vicp-wrap .vicp-operate a {
  position: relative;
  float: left;
  display: block;
  margin-left: 10px;
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  color: #4a7;
  border-radius: 2px;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.vue-image-crop-upload .vicp-wrap .vicp-operate a:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
.vue-image-crop-upload .vicp-wrap .vicp-error,
.vue-image-crop-upload .vicp-wrap .vicp-success {
  display: block;
  font-size: 14px;
  line-height: 24px;
  height: 24px;
  color: #d10;
  text-align: center;
  vertical-align: top;
}
.vue-image-crop-upload .vicp-wrap .vicp-success {
  color: #4a7;
}
.vue-image-crop-upload .vicp-wrap .vicp-icon3 {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  top: 4px;
}
.vue-image-crop-upload .vicp-wrap .vicp-icon3::after {
  position: absolute;
  top: 3px;
  left: 6px;
  width: 6px;
  height: 10px;
  border-width: 0 2px 2px 0;
  border-color: #4a7;
  border-style: solid;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  content: "";
}
.vue-image-crop-upload .vicp-wrap .vicp-icon2 {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  top: 4px;
}
.vue-image-crop-upload .vicp-wrap .vicp-icon2::after,
.vue-image-crop-upload .vicp-wrap .vicp-icon2::before {
  content: "";
  position: absolute;
  top: 9px;
  left: 4px;
  width: 13px;
  height: 2px;
  background-color: #d10;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.vue-image-crop-upload .vicp-wrap .vicp-icon2::after {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.e-ripple {
  position: absolute;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  background-clip: padding-box;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
  opacity: 1;
}
.e-ripple.z-active {
  opacity: 0;
  -webkit-transform: scale(2);
  -ms-transform: scale(2);
  transform: scale(2);
  -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;
  transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;
  transition: opacity 1.2s ease-out, transform 0.6s ease-out;
  transition: opacity 1.2s ease-out, transform 0.6s ease-out,
    -webkit-transform 0.6s ease-out;
}
</style>
