<?php

require_once('inc/head.php');

?>
<body>

<header>
  <div class='background-header'>
    <div class="left-header">
      <!-- Logo -->
      <img src="<?php echo cdn('img/keymanweb-mini-logo-88.png') ?>" alt='KeymanWeb.com' title="KeymanWeb version <?= $VersionWithTag ?>"/>
      <!-- Language Search -->
      <div class="form">
        <input type="text" class="form-control form-input dropdown-toggle" data-bs-toggle="dropdown" placeholder="Search" onclick="languageSearch()">
        <span class="search-icon-span" id="searchIcon"><i class="fa fa-search"></i></span>
        <ul class="dropdown-menu" style="width:100%" id="languageSearchDropdown">
          <div class="top-row top-row-search">
            <div class="setting">
              <span>Most Download <i class="fa-solid fa-filter"></i></span>
              <span><i class="fa fa-map"></i> Map</span>
            </div>
          </div>
          <hr>
          <div class="middle-row middle-row-search" id="languageSearchList">
            <!-- kmwHeader.js --> 
          </div>
        </ul>
      </div>
      <!-- Keyboard selection -->
      <div class="dropdown">
        <button type="button" class="btn btn-secondary abc dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown" id="keyboardSelectionButton"></button>
        <ul class="dropdown-menu" style="width:100%" id="keyboardSelectionDropdown">
          <!-- <div class="top-row top-row-selection"> -->
            <!-- kmwHeader.js --> 
             <!-- <p>0/5 languages</p>
          </div> -->
          <div class="middle-row middle-row-selection" id="keyboardSelectionList">
            <!-- kmwHeader.js --> 
            <p>Open Search to get your keyboard</p>
          </div> 
          <hr>
          <div class="last-row last-row-selection" id="keyboardTab">
            <!-- kmwHeader.js --> 
          </div>
        </ul>
      </div>
    </div>
    <div class='right-header'>
      <!-- Menu -->
      <div class="dropdown menu" id="burgerMenu">
        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-bars fa-xl" style="color: #FC7200;"></i>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" target="_blank">Keyboard Help</a></li>
          <li><a class="dropdown-item" href="https://keyman.com/developer/keymanweb/" target="_blank">Website Plugin</a></li>
          <li><a class="dropdown-item" href="https://keyman.com/bookmarklet/" target="_blank">Bookmarklet</a></li>
          <li><a class="dropdown-item" href="https://keyman.com/" target="_blank">keyman.com</a></li>
          <li><a class="dropdown-item" href="https://help.keyman.com/" target="_blank">help.keyman.com</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="header-bar">
    <img src="<?php echo cdn('img/headerbar.png') ?>" alt="" />
  </div>
</header>

<section class="container-flex">
  <div class="textarea-container section-items">
    <textarea class="text-area" id="textArea" placeholder="Search the language then select a keyboard to type..."></textarea>
    <i class="fa-regular fa-copy fa-xl" id="copyTool"></i>
    <div class="hidden" id="showKeyboardBox">
      <i class="fa-solid fa-keyboard fa-xl" id="showKeyboard"></i>
    </div>
  </div>
  <div class="divider-container" id="Divider">
    <div class="left-divider">
      <div class="font-size-desktop">
        <span class="font-small item">A</span>
        <div id="slider item" aria-disabled="false">
          <input type="range" min="0" max="100" value="50" step="12.5" />
        </div>
        <span class="font-large item">A</span>
      </div>
      <div class="font-size-mobile">
        <button class="font-large mx-1" id="decreaseFontSize">-</button>
        <span class="font-large item">A</span>
        <button class="font-large mx-1" id="increaseFontSize" href="#">+</button>
      </div>
    </div>
    <div class="middle-divider">
      <i class="fa-solid fa-bars fa-xl"></i>
    </div>
    <div class="right-divider">
      <div class="hide-keyboard">
        <i class="fa-solid fa-keyboard fa-xl" id="hideKeyboard"></i>
      </div>
      <i class="fa-solid fa-w fa-xl hidden" id="openExample"></i>
      <i class="hidden fa-solid fa-download fa-xl" id="mobileDownloadIcon">
        <a id="mobileDownloadButton" href="https://keyman.com/keyboards/kreative_superipa"></a>
      </i>
    </div>
  </div>
  <div class="keyboard-and-download">
    <div class="spacing-purpose item" style="width: 15%"></div>
    <div class="keyboard-container item">
      <div class="example-box">
        <i class="fa-solid fa-minus" id="closeExample"></i>
        <p id="exampleText">No example is available for this keyboard.</p>
      </div>
      <div class="keyboard-area">
        <img class="desktop-keyboard" src="<?php echo cdn('img/desktop-keyboard.png') ?>" alt="">
        <img class="phone-keyboard" src="<?php echo cdn('img/phone-keyboard.png') ?>" alt="">
      </div>
    </div>
    <div class="keyboard-download-box">
      <p>
        <span id="desktopDownloadTitle">Use Undetermined Keyboard in any Windows app!</span>
        <a id="desktopDownloadButton" href="https://keyman.com/keyboards/kreative_superipa">
        <img src="/cdn/dev/img/small_download.png" alt="Download" title="Download free and open source Keyman Desktop with this keyboard bundled"></a>
        <span>Free and open source!</span>
      </p>
    </div>
  </div>
</section>

<script src="<?php echo cdn('src/bootstrap.bundle.min.js') ?>" crossorigin="anonymous"></script>
<script src="<?php echo cdn('js/kmwBody.js') ?>"></script>
<script src="<?php echo cdn('js/kmwHeader.js') ?>"></script>
</body>
</html>

