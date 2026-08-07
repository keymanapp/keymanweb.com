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
          <input type="search" class="form-control form-input" id="searchInput" dir="ltr" data-bs-auto-close="outside" placeholder="Search for a keyboard..." maxlength="30">
          <span id="searchIcons">
            <i class="fa-solid fa-magnifying-glass" id="magnifyingGlassIcon"></i>
            <i id="clearSearchIcon">&times;</i>
          </span>
          <div class="dropdown-menu" id="searchDropdownMenu">
            <div class="top-row top-row-search">
              <div></div>
            </div>
            <div class="middle-row middle-row-search" >
             <div class="middle-row middle-row-search">
              <div class="search-result-heading">
                <hr>
                <p class="keyboard-title"></p>
                <hr>
              </div>
              <div id="kbSearchCardUI">
                <!-- Search cards injected here -->
              </div>
            </div>
            </div>
            <div class="bottom-row bottom-row-search" id="paginationControls">
              <!-- kmwHeader.js --> 
              <p class="hidden" id="resultCount"></p>
              <button class="btn" id="prevPage" disabled><</button>
              <span id="pageInfo">1</span>
              <button class="btn" id="nextPage" disabled>></button>
            </div>
          </div>
          <div id="KeymanWebControl" class="hidden"></div>
        </div>
        <!-- Keyboard Container Dropdown menu -->
          <div class="keyboard-container-dropdown-menu" id="keyboardContainerMenu">
            <div class="default-us-kb">
              <div class="kb-item-keyboard" data-id="basic_kbdus">
                <span class="kb-chip-name">US Basic</span>
              </div>
            </div>
            <!-- Visible Keyboard Container -->
            <div class="keyboard-container-visible" id="keyboardContainerVisible">
            
            </div>
            <!-- Overflow Keyboard Container -->
             <div class="dropdown keyboard-container-overflow">
              <button type="button" class="btn" id="keyboardOverflowBtn" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                <i class="fa-solid fa-caret-down"></i>
              </button>
              <div id="keyboardOverflowSelection" class="dropdown-menu keyboard-overflow-selection">

              </div>
            </div>
          </div>
      </div>
      <div class='right-header'>
        <!-- Tools: Font side slider + Hide/Show keyboard -->
        <div class="tool-container">
          <!-- Tools -->
           <div class="large-icon-tools">
              <div class="font-size-container item">
                <span class="font-small item">A</span>
                <input id="fontSizeRange" type="range" name="fontSizeIndicator" value="16" min="12" max="132" step="2"></input>
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
        </div>
        <!-- Dropdown Menu -->
        <div class="dropdown" id="burgerMenu">
          <button class="btn burger-trigger" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            <i class="fa-solid fa-bars"></i>
          </button>
          <div class="dropdown-menu" id="burgerDropDownMenu">
            <div class="menu-wrapper">
              <!-- Instruction -->
              <section class="menu-section" id="getStartedBtn">
                <div class="menu-card primary-card"> 
                  <div class="menu-card-icon">
                    <i class="fa-solid fa-circle-info"></i>
                  </div>
                  <div class="menu-card-content">
                    <h4>Get Started</h4>
                  </div>
                  <div class="menu-card-arrow">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  </div>
                </div>
              </section>
              <!-- Keyboard Usage: Download, Bookmarklet, KeymanWeb.com development -->
              <section class="menu-section">
                <p class="menu-section-title" id="adsGuide">More ways to use the keyboard</p>
                <div class="menu-card-group">
                  <a href="https://keyman.com/" target="_blank" id="downloadKb" class="menu-card">
                    <div class="menu-card-icon">
                      <i class="fa-solid fa-mobile-screen"></i>
                    </div>
                    <div class="menu-card-content">
                      <h4>Use on current device</h4>
                      <p id="getKbGuide">Get this keyboard for your device. Keyman is completely free to use on all devices!</p>
                    </div>
                    <div class="menu-card-arrow">
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <a href="https://keyman.com/bookmarklet/" target="_blank"class="menu-card">
                    <div class="menu-card-icon">
                      <i class="fa-solid fa-globe"></i>
                    </div>
                    <div class="menu-card-content">
                      <h4>Use in browser</h4>
                      <p>The KeymanWeb bookmarklet allows you to use a KeymanWeb keyboard on nearly any web page.</p>
                    </div>
                    <div class="menu-card-arrow">
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <a href="https://keyman.com/developer/keymanweb/" target="_blank" class="menu-card">
                    <div class="menu-card-icon">
                      <i class="fa-solid fa-code"></i>
                    </div>
                    <div class="menu-card-content">
                      <h4>Integrate into website</h4>
                      <p>KeymanWeb can be added to your website with just a few lines of code.</p>
                    </div>
                    <div class="menu-card-arrow">
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </div>
              </section>
              <!-- Documentation: Help.Keyman, Keyboard help -->
              <section class="menu-section">
                <p class="menu-section-title">Documentation</p>
                <div class="menu-card-group">
                  <a href="https://help.keyman.com/" target="_blank" class="menu-card">
                    <div class="menu-card-icon menu-card-icon-keyman">
                      <img src="<?php echo cdn('img/keymanweb-mini-logo-88.png') ?>" alt="Keyman">
                    </div>
                    <div class="menu-card-content">
                      <h4>Keyman help</h4>
                      <p>Get help on Keyman Products, all keyboard documentation, and development area.</p>
                    </div>
                    <div class="menu-card-arrow">
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                  <a href="https://help.keyman.com/keyboard/" target="_blank" id="kbHelpdocLink" class="menu-card">
                    <div class="menu-card-icon">
                      <i class="fa-solid fa-question"></i>
                    </div>

                    <div class="menu-card-content">
                      <h4 id="kbHelpGuide">The Keyboard help</h4>
                      <p>Access the keyboard help documentation for keystrokes, descriptions, and information of <span id="kbHelpDocSpan">the selected keyboard</span>.</p>
                    </div>
                    <div class="menu-card-arrow">
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </div>
              </section>
              <!-- Footer: Social platforms, SIL Logo, KeymanWeb.com Version, Privacy Policy -->
              <footer class="menu-footer">
                <div class="menu-socials">
                  <a href="https://facebook.com/KeymanApp" target="_blank" data-toggle="tooltip">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com/keyman" target="_blank" data-toggle="tooltip">
                    <i class="fa-brands fa-x-twitter"></i>
                  </a>
                  <a href="https://typo.social/@keyman" target="_blank" data-toggle="tooltip">
                    <i class="fa-brands fa-mastodon"></i>
                  </a>
                  <a href="https://www.youtube.com/@KeymanApp" target="_blank" data-toggle="tooltip">
                    <i class="fa-brands fa-youtube"></i>
                  </a>
                  <a href="https://blog.keyman.com/" target="_blank" data-toggle="tooltip">
                    <i class="fa-solid fa-rss"></i>
                  </a>
                  <a href="https://github.com/keymanapp" target="_blank" data-toggle="tooltip">
                    <i class="fa-brands fa-github"></i>
                  </a>
                  <a href="https://community.software.sil.org/c/keyman" target="_blank" data-toggle="tooltip">
                    <i class="fa-solid fa-comments"></i>
                  </a>
                </div>
                <div class="menu-sil">
                  <a href="https://software.sil.org/">
                    <img id="sil-logo" src="<?php echo ImageRandomizer::randomizer(); ?>" alt="SIL Logo">
                    <p>Created by SIL Global</p>
                  </a>
                </div>
                <div class="menu-version">
                  <p>KeymanWeb version <?= $VersionWithTag ?></p>
                  <span>|</span>
                  <a href="https://software.sil.org/language-software-privacy-policy/" target="_blank">Privacy & Policy</a>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Bar below the header -->
    <div class="header-bar">
      <img src="<?php echo cdn('img/headerbar.png') ?>" alt="headerBar" />
    </div>
  </header>

  <section class="container-flex" id="textAndKeyboardSection">
    <!-- Text area section -->
    <div class="textarea-container">
      <textarea class="text-area" id="textArea" dir="auto" style="unicode-bidi:plaintext" placeholder="Search and select a keyboard to start typing..."></textarea>
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

  <div class="instruction-modal-overlay hidden" id="instructionModalOverlay">
    <div class="instruction-modal" id="instructionModal">
      <!-- Header -->
      <div class="instruction-modal-header">
        <h2 class="instruction-modal-title">
          Instruction
        </h2>
      </div>

      <!-- Body -->
      <div class="instruction-modal-body">

        <!-- Card 1 -->
        <div class="instruction-card instruction-card-search">

          <div class="instruction-card-heading">
            <h3>Search a keyboard</h3>
          </div>

          <div class="instruction-card-graphic">
            <img 
              src="<?php echo cdn('img/instruction/instruction_card_1.png') ?>"
              alt="Pick Keyboard"
            >
          </div>
          <div class="instruction-card-divider">
          </div>
          <div class="instruction-card-description">
            <p>
              Type the language, keyboard name.
            </p>
          </div>

        </div>

        <!-- Card 2 -->
        <div class="instruction-card instruction-card-pick">

          <div class="instruction-card-heading">
            <h3>Pick a keyboard</h3>
          </div>

          <div class="instruction-card-graphic">
            <img 
              src="<?php echo cdn('img/instruction/instruction_card_2.png') ?>"
              alt="Pick Keyboard"
            >
          </div>

          <div class="instruction-card-divider"></div>

          <div class="instruction-card-description">
            <p>
              Click on the name of the keyboard to enable and store it in the keyboard selection menu
            </p>
          </div>

        </div>

        <!-- Card 3 -->
        <div class="instruction-card instruction-card-type">

          <div class="instruction-card-heading">
            <h3>Start typing</h3>
          </div>

          <div class="instruction-card-graphic">
            <img 
              src="<?php echo cdn('img/instruction/instruction_card_3.png') ?>" 
              alt="Start Typing"
            >
          </div>

          <div class="instruction-card-divider"></div>

          <div class="instruction-card-description">
            <p>
              Type with the enabled keyboard.
            </p>
          </div>

        </div>

      </div>
      <!-- Footer -->
      <div class="instruction-modal-footer">
        <button class="instruction-modal-btn" id="instructionModalCloseBtn">Close</button>
        <a href="https://help.keyman.com/" target="_blank" class="instruction-modal-btn" id="instructionModalHelpBtn">More help</a>
      </div>
    </div>
</div>
