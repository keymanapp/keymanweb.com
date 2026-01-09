const tabletToolElements = `
            <div class="tool-menu dropdown">
            <button class="dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside">Tools</button>
            <div class="dropdown-menu">
              <div class="font-size-container dropdown-item">
                <div class="font-size-container item">
                  <span class="font-small item">A</span>
                  <input id="fontSizeRange" type="range" name="" value="16" min="12" max="132" step="2"></input>
                  <span class="font-large item">A</span>
              </div>
              </div>
              <div class="expand-container dropdown-item">
                <span id="expandTool">
                    <i class="fa-solid fa-expand"></i>
                    <p>Expand</p>
                </span>
              </div>
              <div class="copy-container dropdown-item">
                <span id="copyTool">
                  <i class="fa-solid fa-copy fa-xl"></i>
                  <p>Copy</p>
                </span>
              </div>
              <div class="eraser-container dropdown-item">
                <span  id="eraseTool">
                  <i class="fa-solid fa-eraser fa-xl"></i>
                  <p>Eraser</p>
                </span>
              </div>
            </div>
          </div>
        `

const desktopToolElements = `
            <div class="large-icon-tools">
              <div class="font-size-container item">
                <span class="font-small item">A</span>
                <input id="fontSizeRange" type="range" name="" value="16" min="12" max="132" step="2"></input>
                <span class="font-large item">A</span>
              </div>
            </div>
            <div class="small-icon-tools">
              <div class="hide-keyboard">
                <i class="fa-solid fa-keyboard" id="hideKeyboard"></i>
              </div>
              <div id="copyTool">
                <i class="fa-solid fa-copy"></i>
              </div>
              <div id="eraseTool">
                <i class="fa-solid fa-eraser"></i>
              </div>
            </div>
          `

const phoneToolElements = ` <div class="left-divider">
        <span  id="eraseTool">
          <i class="fa-solid fa-eraser fa-xl"></i>
        </span>
        <span id="copyTool">
          <i class="fa-solid fa-copy fa-xl"></i>
        </span>
      </div>
      <div class="middle-divider">
        <i class="fa-solid fa-grip-lines" id="resizeGrip"></i>
      </div>
      <div class="right-divider">
        <div class="font-size-container item">
          <span class="font-small item">A</span>
          <input id="fontSizeRange" type="range" name="" value="16" min="12" max="132" step="2"></input>
          <span class="font-large item">A</span>
        </div>
      </div>`

const phoneExpandElement = `<span id="expandTool">
                              <i class="fa-solid fa-expand fa-xl"></i>
                            </span>`

const calcScreenSize = Math.min(screen.width, screen.height)

const toolContainer = document.querySelector('.tool-container')
const divider = document.querySelector('.divider-container')
const resizeGrip = document.querySelector('#resizeGrip')

export function renderToolsTray() {
  if (calcScreenSize < 900 && calcScreenSize >= 720) { // Tablet
    toolContainer.innerHTML = tabletToolElements
    divider.style.display = 'none'
  } else if (calcScreenSize < 720) { // Phone
    divider.innerHTML = phoneToolElements
    toolContainer.innerHTML = phoneExpandElement
    resizeGrip.style.display = 'none'
  } else { // Desktop
    toolContainer.innerHTML = desktopToolElements
  }
}
