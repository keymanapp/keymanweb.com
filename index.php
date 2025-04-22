<?php

require_once('inc/head.php');
use Keyman\Site\Common\ImageRandomizer;
?>
<body>

<header>
  <div class='main-header'>
    <div class="left-header">
      <!-- Logo -->
      <img src="<?php echo cdn('img/keymanweb-mini-logo-88.png') ?>" alt='KeymanWeb.com' title="KeymanWeb version <?= $VersionWithTag ?>"/>
      <!-- Language Search -->
      <div class="form">
        <input type="text" class="form-control form-input" data-bs-auto-close="outside" data-bs-toggle="dropdown" placeholder="Search..." id="mainSearchBtn" maxlength="30">
        <span class="info-icon-span" id="infoIcon">
          <i class="fa-solid fa-question"></i>
          <div class="bubble">
            <div class="bubble-text">
              <div class="bubble-text-title">
                <div class="col">
                  <h4>Ways to search</h4>
                </div>
              </div>
              <div class="bubble-text-header">
                <div class="col">Parameters</div>
                <div class="col">Examples</div>
                <div class="col">Description</div>
              </div>
                <div class="bubble-text-content">
                  <div class="col">No parameter</div>
                  <div class="col">English<br>புதிய தட்டெழுதி</div>
                  <div class="col">A normal search, search all of the containing word</div>
                </div>
                <div class="bubble-text-content">
                  <div class="col">k:</div>
                  <div class="col">k:amharic</div>
                  <div class="col">Search only in keyboard names, identifiers and descriptions</div>
                </div>
                <div class="bubble-text-content">
                  <div class="col">id:</div>
                  <div class="col">id:sil_ipa</div>
                  <div class="col">Search only in keyboard identifiers</div>
                </div>
                <div class="bubble-text-content">
                  <div class="col">l:</div>
                  <div class="col">l:khmer</div>
                  <div class="col">Search only for language names (including dialect and alternate names)</div>
                </div>
                <div class="bubble-text-content">
                  <div class="col">c:</div>
                  <div class="col">c:germany<br>c:australia</div>
                  <div class="col">Search only for country names</div>
                </div>
            </div>
          </div>
        </span>
        <ul class="dropdown-menu" id="languageSearchDropdown">
          <div class="top-row top-row-search">
            <div class="setting">
              <span><i class="fa fa-map"></i> Map</span>
              <span id="mostDownload">Most Download <i class="fa-solid fa-filter"></i></span>
            </div>
          </div>
          <hr>
          <div class="middle-row middle-row-search" id="languageSearchList">
            <!-- kmwHeader.js --> 
          </div>
          <div class="bottom-row bottom-row-search" id="paginationControls">
            <!-- kmwHeader.js --> 
            <p class="hidden" id="resultCount"></p>
            <button class="btn" id="prevPage" disabled><</button>
            <span id="pageInfo">1</span>
            <button class="btn" id="nextPage" disabled>></button>
          </div>
        </ul>
      </div>
      <!-- Keyboard selection -->
      <div class="dropdown">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown" id="keyboardSelectionButton"></button>
        <ul class="dropdown-menu" id="keyboardSelectionDropdown">
          <!-- <div class="top-row top-row-selection">
             <p>0/5 languages</p>
          </div> -->
          <div class="middle-row middle-row-selection" id="keyboardSelectionList">
            <!-- kmwHeader.js --> 
            <p>Open Search to get your keyboard</p>
          </div> 
          <div class="last-row last-row-selection" id="keyboardTab">
            <!-- kmwHeader.js --> 
          </div>
        </ul>
      </div>
    </div>
    <div class="middle-header">
      <!-- <div class="font-size-desktop">
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
        </div> -->
    </div>
    <div class='right-header'>
      <div class="tool-container">
        <div class="font-size-container dropdown">
          <i class="fa-solid fa-sliders" id="fontSizeSlider"></i>
          <div class="dropdown-content">
            <div class="font-size-indicator font-min-size">
              <span class="font-small item">A</span>
              <span class="smallest item">12 px</span>
            </div>
            <div class="font-size-slider">
              <input type="range" name="" value="16" id="fontSizeRange" min="12" max="132" step="2"></input>
              <span id="fontSizeIndicator">16px</span>
            </div>
            <div class="font-size-indicator font-max-size">
              <span class="font-large item">A</span>
              <span class="smallest item">132 px</span>
            </div>
          </div>
        </div>
        <div class="hide-keyboard">
            <i class="fa-solid fa-keyboard" id="hideKeyboard"></i>
          </div>
      </div>
      <div class="download-keyboard">
        <i class="fa-solid fa-download" id="kbDownloadPage"></i>
      </div>
      <!-- Menu -->
      <div class="dropdown" id="burgerMenu">
        <button class="btn" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
          <i class="fa-solid fa-bars"></i>
        </button>
          <ul class="dropdown-menu">
            <div class="dropdown-grid-container">
              <li class="dropdown-item">
                <a href="#" target="_blank">
                  <i class="fa-solid fa-question"></i>Keyboard Help
                  <p>Access the keyboard help documentation for key strokes, description, and information of <i>this keyboard</i>.</p>
                </a>
              </li>
              <li class="dropdown-item">
                <a href="https://keyman.com/developer/keymanweb/" target="_blank">
                  <i class="fa-solid fa-code"></i>Website Plugin
                  <p>KeymanWeb can be added to your website with just a few lines of code.</p>
                </a>
              </li>
              <li class="dropdown-item" >
                <a href="https://keyman.com/" target="_blank">
                  <img src="<?php echo cdn('img/keymanweb-mini-logo-88.png') ?>"></img>Keyman
                  <p>Visit Keyman . Keyman is completely free to use on all devices!</p>
                </a>
              </li>
              <li class="dropdown-item" >
                <a href="https://help.keyman.com/" target="_blank">
                  <img src="<?php echo cdn('img/keymanweb-mini-logo-88.png') ?>"></img>KeymanHelp
                  <p>Get help on Keyman Products, all keyboard documentation and development area.</p>
                </a>
              </li>
              <li class="dropdown-item" >
                <a href="https://keyman.com/bookmarklet/" target="_blank">
                  <i class="fa-solid fa-book-bookmark"></i>Bookmarklet
                  <p>The KeymanWeb bookmarklet allows you to use a KeymanWeb keyboard on nearly any web page just by clicking the KeymanWeb bookmark.</p>
                </a>
              </li>
              <li class="dropdown-item" >
                <a href="https://software.sil.org/language-software-privacy-policy/" target="_blank">
                <i class="fa-solid fa-shield-halved"></i>Privacy policy
                <p>Summer Institute of Linguistics, Inc. (dba SIL International) produces and publishes apps in many languages of the world.</p>
                </a>
              </li>
            </div>
              <div class="kmw-socials">
                <h5>Keep in touch</h5>
                <div class="kmw-socials-icons">
                  <a href="https://facebook.com/KeymanApp" data-icon="">Facebook</a>
                  <a href="https://twitter.com/keyman" data-icon="">X (formerly Twitter)</a>
                  <a href="https://community.software.sil.org/c/keyman" data-icon=" ">Keyman Community</a>
                  <a href="https://typo.social/@keyman" data-icon=" ">mastodon</a>
                  <a href="https://www.youtube.com/@KeymanApp" data-icon=" ">YouTube</a>
                  <a href="https://blog.keyman.com/" data-icon="">Keyman Blog</a>
                  <a href="https://github.com/keymanapp" data-icon="">GitHub</a>
                </div>
              </div>
              <div class="sil-logo">
                <img id="sil-logo" src="<?php echo ImageRandomizer::randomizer(); ?>" width="30%" alt='SIL'/>
                <p>Created by SIL Global</p>
              </div>
              <div class="kmw-version">
                <p>KeymanWeb version <?= $VersionWithTag ?></p>
              </div>
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
    <textarea class="text-area" id="textArea" placeholder="Search and select a keyboard to start typing..."></textarea>
    <i class="fa-solid fa-copy fa-xl" id="copyTool"></i>
    <div class="hidden" id="showKeyboardBox">
      <i class="fa-solid fa-keyboard fa-xl" id="showKeyboard"></i>
    </div>
  </div>
  <div class="divider-container" id="Divider">
    <div class="left-divider">
      
    </div>
    <div class="middle-divider">
      <i class="fa-solid fa-arrows-up-down"></i>
    </div>
    <div class="right-divider">
      <i class="fa-solid fa-w fa-xl hidden" id="openExample"></i>
    </div>
  </div>
  <div class="keyboard-and-download">
    <!-- <div class="spacing-purpose item" style="width: 15%"></div> -->
    <div class="keyboard-container item">
      <div class="example-box" id="exampleBox">
        <!-- <i class="fa-solid fa-minus" id="closeExample"></i> -->
        <p id="example">No example is available for this keyboard.</p>
      </div>
      <div class="keyboard-area">
        <img class="desktop-keyboard" src="<?php echo cdn('img/desktop-keyboard.png') ?>" alt="">
        <img class="phone-keyboard" src="<?php echo cdn('img/phone-keyboard.png') ?>" alt="">
      </div>
    </div>
    <!-- <div class="keyboard-download-box">
      <p>
        <span id="desktopDownloadTitle">Use Undetermined Keyboard in any Windows app!</span>
        <a id="desktopDownloadButton" href="https://keyman.com/keyboards/kreative_superipa">
        <img src="/cdn/dev/img/small_download.png" alt="Download" title="Download free and open source Keyman Desktop with this keyboard bundled"></a>
        <span>Free and open source!</span>
      </p>
    </div> -->
  </div>
</section>

<script src="<?php echo cdn('src/bootstrap.bundle.min.js') ?>" crossorigin="anonymous"></script>
<script src="<?php echo cdn('js/kmwBody.js') ?>"></script>
<script src="<?php echo cdn('js/kmwHeader.js') ?>"></script>
<script src="<?php echo cdn('keys/keyrenderer.js') ?>"></script>
</body>
</html>

