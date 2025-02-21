<?php

require_once('inc/head.php');

?>
<body>

<header>
  <div id='headerBackground'>
    <div id="headerLeft">
    <!-- Logo -->
      <img src="<?php echo cdn('img/keymanweb-mini-logo-88.png') ?>" alt='KeymanWeb.com' title="KeymanWeb version <?= $VersionWithTag ?>"/>
      <!-- Language Search -->
      <div class="form">
        <input type="text" class="form-control form-input dropdown-toggle" data-bs-toggle="dropdown" placeholder="Search language, keyboard..." onclick="languageSearch()">
        <span class="search-icon-span" id="searchIcon"><i class="fa fa-search"></i></span>
        <ul class="dropdown-menu" style="width:100%" id="languageSearchDropdown">
          <div class="top-row">
            <div class="setting">
              <span>Most Download <i class="fa-solid fa-filter"></i></span>
              <span><i class="fa fa-map"></i> Map</span>
            </div>
          </div>
          <hr>
          <div class="middle-row" id="languageSearchList">
            <!-- kmwHeader.js -->   
          </div>
          <hr>
          <div class="last-row">
            <button class="btn btn-primary">Prev</button>
            <button class="btn btn-primary">Next</button>
          </div> 
        </ul>
      </div>
      <!-- Keyboard selection -->
      <div class="dropdown">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" id="keyboardSelectionButton"></button>
        <ul class="dropdown-menu" style="width:100%" id="keyboardSelectionDropdown">
          <div class="top-row">
            <!-- kmwHeader.js --> 
             <p>0/5 languages</p>
          </div>
          <hr>
          <div class="middle-row" id="keyboardSelectionList">
            <!-- kmwHeader.js --> 
            Open Search to get your keyboard
          </div> 
          <hr>
          <div class="last-row">
            <button class="btn btn-primary">Prev</button>
            <button class="btn btn-primary">Next</button>
          </div>
        </ul>
      </div>
    </div>
    <div id='headerRight'>
      <!-- Tools -->
      <div class="tools">
        <!-- <input type="range" min="12" max="132" value="0" step="2" /> -->
      </div>
      <!-- Menu -->
      <div class="dropdown menu">
        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-bars fa-xl" style="color: #FC7200;"></i>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" target="_blank">Keyboard Help</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="https://keyman.com/developer/keymanweb/" target="_blank">Website Plugin</a></li>
          <li><a class="dropdown-item" href="https://keyman.com/bookmarklet/" target="_blank">Bookmarklet</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="https://keyman.com/" target="_blank">keyman.com</a></li>
          <li><a class="dropdown-item" href="https://help.keyman.com/" target="_blank">help.keyman.com</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div id="headerBar">
    <img src="<?php echo cdn('img/headerbar.png') ?>" alt="" />
  </div>
</header>

<section class="container-flex">
  <div class="item textarea-container">
    <textarea class="textarea" id="textArea" rows="3" placeholder="Search the language then select a keyboard to type..."></textarea>
    <i class="fa-regular fa-copy fa-xl" id="copyTool"></i>
    <div class="hidden show-keyboard-box">
      <i class="show-keyboard fa-solid fa-keyboard fa-xl"></i>
    </div>
    <!-- <i class="fa-solid fa-up-right-and-down-left-from-center" id="fullscreenTool"></i> -->
  </div>
  <div class="item divider-container" id="Divider">
    <i class="fa-solid fa-keyboard fa-xl" id="hideKeyboard"></i>
    <i class="fa-solid fa-bars fa-xl"></i>
    <i class="fa-solid fa-download fa-xl" id="keyboardDownload">
      <a id="keyman-desktop-download" href="https://keyman.com/keyboards/kreative_superipa"></a>
    </i>
  </div>
  <div class="item keyboard-and-download">
    <div class="item spacing-purpose" style="width: 15%"></div>
    <div class="item keyboard-container">
      <div class="example-box" id="exampleBox">
        <i class="close-example fa-solid fa-minus"></i>
        <p id="example">No example is available for this keyboard.</p>
      </div>
      <div class="keyboard-area">
        <img class="desktop-keyboard" src="<?php echo cdn('img/desktop-keyboard.png') ?>" alt="">
        <img class="phone-keyboard" src="<?php echo cdn('img/phone-keyboard.png') ?>" alt="">
      </div>
    </div>
    <div class="keyboard-download-box" id="\">
      <p>
        <span id="desktop-title">Use Undetermined Keyboard in any Windows app!</span>
        <a id="keyman-desktop-download" href="https://keyman.com/keyboards/kreative_superipa">
        <img src="/cdn/dev/img/small_download.png" alt="Download" title="Download free and open source Keyman Desktop with this keyboard bundled"></a>
        <span id="free-open-source">Free and open source!</span>
      </p>
    </div>
  </div>
</section>

<script src="<?php echo cdn('src/bootstrap.bundle.min.js') ?>" crossorigin="anonymous"></script>
<script src="<?php echo cdn('js/kmwBody.js') ?>"></script>
<script src="<?php echo cdn('js/kmwHeader.js') ?>"></script>
</body>
</html>

