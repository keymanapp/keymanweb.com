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
        <!-- Language Dropdown Search -->
        <div class="form" id="searchBar">
          <input type="text" class="form-control form-input" id="searchInput" dir="ltr" data-bs-auto-close="outside" placeholder="Search for a keyboard..." maxlength="30">
          <span id="searchIcons">
            <i class="fa-solid fa-magnifying-glass" id="magnifyingGlassIcon"></i>
            <i id="clearSearchIcon">&times;</i>
          </span>
          <ul class="dropdown-menu" id="searchDropdownMenu">
            <div class="top-row top-row-search">
              <div id="worldMap">
                <span><i class="fa fa-map"></i> World Map</span>
              </div>
              <div class="search-instruction">
                <hr id="hrForInstruction">
                <div class="instruction-title">
                  <p>Instruction</p>
                </div>
                <div class="search-instruction-list">
                  <ol>
                    <li>Search for any Keyman keyboard</li>
                    <li>Click on "+" to enable and store it in the keyboard selection menu</li>
                    <li>Switch between keyboards and start typing.</li>
                  </ol>
                </div>
              </div>
            </div>
            <div class="middle-row middle-row-search" >
              <hr id="hrForKeyboard">
              <p class="keyboard-title"></p>
              <div id="kbSearchCardUI">
                <!-- kmwHeader.js --> 
              </div>
            </div>
            <div class="bottom-row bottom-row-search" id="paginationControls">
              <!-- kmwHeader.js --> 
              <p class="hidden" id="resultCount"></p>
              <button class="btn" id="prevPage" disabled><</button>
              <span id="pageInfo">1</span>
              <button class="btn" id="nextPage" disabled>></button>
            </div>
          <div id="KeymanWebControl" class="hidden"></div>
          </ul>
        </div>
        <!-- Keyboard Dropdown selection -->
        <button type="button" class="btn btn-secondary" id="keyboardSelectionButton">
          <i class="fa-solid fa-caret-right fa-xs" id="kbCount"></i>
        </button>
          <div class="scroll-wrapper-keyboard-tab">
            <div class="keyboard-tab" id="keyboardSelection">
              <div class="kb-item-header">Keyboard Selection menu</div>
              <div class="kb-item">
                <p>Open Search to get your keyboard</p>
              </div>
              <div class="kb-item-footer">US Basic Keyboard</div>
              <!-- kmwHeader.js -->
            </div>
        </div>
      </div>
      <div class='right-header'>
        <!-- Tools: Font side slider + Hide/Show keyboard -->
        <div class="tool-container">
          <div class="font-size-container item">
            <span class="font-small item">A</span>
            <input id="fontSizeRange" type="range" name="" value="16" min="12" max="132" step="2"></input>
            <span class="font-large item">A</span>
          </div>
          <div class="hide-keyboard">
            <i class="fa-solid fa-keyboard" id="hideKeyboard"></i>
          </div>
        </div>
        <!-- Dropdown Menu -->
        <div class="dropdown" id="burgerMenu">
          <button class="btn" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            <i class="fa-solid fa-bars"></i>
          </button>
            <ul class="dropdown-menu">
              <div class="dropdown-grid-container">
                <li class="dropdown-item">
                  <a href="" target="_blank" id="kbHelpdocLink">
                    <i class="fa-solid fa-question"></i>Keyboard Help
                    <p>Access the keyboard help documentation for key strokes, description, and information of <span id="kbSpan">the selected keyboard</span>.</p>
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
                    <a href="https://facebook.com/KeymanApp" target="_blank" data-icon="">Facebook</a>
                    <a href="https://twitter.com/keyman" target="_blank" data-icon="">X (formerly Twitter)</a>
                    <a href="https://community.software.sil.org/c/keyman" target="_blank" data-icon=" ">Keyman Community</a>
                    <a href="https://typo.social/@keyman" target="_blank" data-icon="">Mastodon</a>
                    <a href="https://www.youtube.com/@KeymanApp" target="_blank" data-icon="">YouTube</a>
                    <a href="https://blog.keyman.com/" target="_blank" data-icon="">Keyman Blog</a>
                    <a href="https://github.com/keymanapp" target="_blank" data-icon="">GitHub</a>
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
    <!-- Bar below the header -->
    <div class="header-bar">
      <img src="<?php echo cdn('img/headerbar.png') ?>" alt="" />
    </div>
  </header>

  <section class="container-flex" id="textAndKeyboardSection">
    <!-- Text area section -->
    <div class="textarea-container">
      <textarea class="text-area" id="textArea" dir="auto" style="unicode-bidi:plaintext" placeholder="Search and select a keyboard to start typing..."></textarea>
      <i class="fa-solid fa-copy fa-xl" id="copyTool"></i>
    </div>
    <div class="divider-container" id="Divider" draggable="true">
      <!-- Resizer -->
      <div class="middle-divider">
        <i class="fa-solid fa-grip-lines" id="resizeGrip"></i>
      </div>
    </div>
      <!-- Keyboard section -->
      <div class="keyboard-container item">
        <div class="example-box" id="exampleBox">
          <p id="example">No example is available for this keyboard.</p>
        </div>
        <div class="keyboard-area" id="keymanKeyboardCtrl">
        </div>
      </div>
    </div>
  </section>

  <script src="<?php echo cdn('js/kmwHeader.js') ?>"></script>
  <script src="<?php echo cdn('js/kmwElements.js') ?>"></script>
  </body>
</html>

