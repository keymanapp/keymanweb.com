<?php
  session_start();
  require_once('servervars.php');

  use Keyman\Site\com\keyman\web\WebKeymanComSentry;
  use \Keyman\Site\Common\KeymanHosts;

  $kmw_tiers = array('alpha', 'beta', 'stable');
  $kmw_builds = get_keymanweb_versions();
  $kmw_builds_major_versions = array(
    'alpha' => get_major_version($kmw_builds['alpha']),
    'beta' => get_major_version($kmw_builds['beta']),
    'stable' => get_major_version($kmw_builds['stable']),
  );
  $hasBeta = version_compare($kmw_builds['stable'], $kmw_builds['beta']) < 0;

  if(isset($_REQUEST['version']) && preg_match('/^(\d+)\.(\d+)\.(\d+)$/', $_REQUEST['version'])) {
    $kmwbuild = $_REQUEST['version'];

    $version = get_major_version($kmwbuild);

    // ignore tier as passed in, compare to the major version of each tier
    if($version == $kmw_builds_major_versions['alpha']) $tier = 'alpha';
    else if($version == $kmw_builds_major_versions['stable']) $tier = 'stable';
    else if($version == $kmw_builds_major_versions['beta']) $tier = 'beta';
    else $tier = 'stable';
  } else {
    // Used to enable the release-tier selection code below.
    // For general usage, we recommend `get_keymanweb_version($tier)` instead.
    if(isset($_REQUEST['tier']) && in_array($_REQUEST['tier'], $kmw_tiers, TRUE)) {
      $tier = $_REQUEST['tier'];
    } else {
      // Selects the 'stable' version unless we're in a beta cycle.
      //
      // Note:  if API calls fail to retrieve proper version data,
      //        the return will be 0 due to equal fallback versions.
      //        Net result: selection of the 'stable' tier.
      $tier = $hasBeta ? 'beta' :'stable';
    }

    $kmwbuild = $kmw_builds[$tier];
    $version = get_major_version($kmwbuild);
  }

  $VersionWithTag = $kmwbuild . ($tier == 'stable' ? '' : "-$tier");
?>
<!DOCTYPE html>
<html lang="en">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, user-scalable=no" />
<meta name="format-detection" content="telephone=no" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" >

<title>KeymanWeb.com <?php if($tier != 'stable') echo "($tier)"; ?></title>

<?= WebKeymanComSentry::GetBrowserHTML($kmwbuild) ?>

<link rel='shortcut icon' href="<?php echo cdn("img/keymanweb-icon-16.png"); ?>">
<link rel="stylesheet" type="text/css" href="<?php echo cdn("css/kmw.css"); ?>" />
<link rel="stylesheet" type="text/css" href="<?php echo "$url_keymanweb_res/code/bookmarklet_ui.css"; ?>" />
<link rel="stylesheet" type="text/css" href="<?php echo cdn("keys/keys.css"); ?>" />
<link href='https://fonts.googleapis.com/css?family=Cabin:400,400italic,500,600,700,700italic|Source+Sans+Pro:400,700,900,600,300|Noto+Serif:400' rel='stylesheet' type='text/css'>

<script type="text/javascript">
  var resourceDomain="<?php echo $url_keymanweb_res; ?>";
  var site_keyman_com="<?php echo KeymanHosts::Instance()->keyman_com ?>";

  // Load (only) the appropriate CSS for the device form factor

  var mapBCP47_ISO6393={}, mapISO6393_BCP47={};
  (function(d,e) {
    d.aar='aa';d.abk='ab';d.afr='af';d.aka='ak';d.amh='am';d.ara='ar';d.arg='an';d.asm='as';d.ava='av';d.ave='ae';d.aym='ay';d.aze='az';d.bak='ba';
    d.bam='bm';d.bel='be';d.ben='bn';d.bis='bi';d.bod='bo';d.bos='bs';d.bre='br';d.bul='bg';d.cat='ca';d.ces='cs';d.cha='ch';d.che='ce';d.chu='cu';
    d.chv='cv';d.cor='kw';d.cos='co';d.cre='cr';d.cym='cy';d.dan='da';d.deu='de';d.div='dv';d.dzo='dz';d.ell='el';d.eng='en';d.epo='eo';d.est='et';
    d.eus='eu';d.ewe='ee';d.fao='fo';d.fas='fa';d.fij='fj';d.fin='fi';d.fra='fr';d.fry='fy';d.ful='ff';d.gla='gd';d.gle='ga';d.glg='gl';d.glv='gv';
    d.grn='gn';d.guj='gu';d.hat='ht';d.hau='ha';d.hbs='sh';d.heb='he';d.her='hz';d.hin='hi';d.hmo='ho';d.hrv='hr';d.hun='hu';d.hye='hy';d.ibo='ig';
    d.ido='io';d.iii='ii';d.iku='iu';d.ile='ie';d.ina='ia';d.ind='id';d.ipk='ik';d.isl='is';d.ita='it';d.jav='jv';d.jpn='ja';d.kal='kl';d.kan='kn';
    d.kas='ks';d.kat='ka';d.kau='kr';d.kaz='kk';d.khm='km';d.kik='ki';d.kin='rw';d.kir='ky';d.kom='kv';d.kon='kg';d.kor='ko';d.kua='kj';d.kur='ku';
    d.lao='lo';d.lat='la';d.lav='lv';d.lim='li';d.lin='ln';d.lit='lt';d.ltz='lb';d.lub='lu';d.lug='lg';d.mah='mh';d.mal='ml';d.mar='mr';d.mkd='mk';
    d.mlg='mg';d.mlt='mt';d.mon='mn';d.mri='mi';d.msa='ms';d.mya='my';d.nau='na';d.nav='nv';d.nbl='nr';d.nde='nd';d.ndo='ng';d.nep='ne';d.nld='nl';
    d.nno='nn';d.nob='nb';d.nor='no';d.nya='ny';d.oci='oc';d.oji='oj';d.ori='or';d.orm='om';d.oss='os';d.pan='pa';d.pli='pi';d.pol='pl';d.por='pt';
    d.pus='ps';d.que='qu';d.roh='rm';d.ron='ro';d.run='rn';d.rus='ru';d.sag='sg';d.san='sa';d.sin='si';d.slk='sk';d.slv='sl';d.sme='se';d.smo='sm';
    d.sna='sn';d.snd='sd';d.som='so';d.sot='st';d.spa='es';d.sqi='sq';d.srd='sc';d.srp='sr';d.ssw='ss';d.sun='su';d.swa='sw';d.swe='sv';d.tah='ty';
    d.tam='ta';d.tat='tt';d.tel='te';d.tgk='tg';d.tgl='tl';d.tha='th';d.tir='ti';d.ton='to';d.tsn='tn';d.tso='ts';d.tuk='tk';d.tur='tr';d.twi='tw';
    d.uig='ug';d.ukr='uk';d.urd='ur';d.uzb='uz';d.ven='ve';d.vie='vi';d.vol='vo';d.wln='wa';d.wol='wo';d.xho='xh';d.yid='yi';d.yor='yo';d.zha='za';
    d.zho='zh';d.zul='zu';
    e.aa='aar';e.ab='abk';e.af='afr';e.ak='aka';e.am='amh';e.ar='ara';e.an='arg';e.as='asm';e.av='ava';e.ae='ave';e.ay='aym';e.az='aze';e.ba='bak';
    e.bm='bam';e.be='bel';e.bn='ben';e.bi='bis';e.bo='bod';e.bs='bos';e.br='bre';e.bg='bul';e.ca='cat';e.cs='ces';e.ch='cha';e.ce='che';e.cu='chu';
    e.cv='chv';e.kw='cor';e.co='cos';e.cr='cre';e.cy='cym';e.da='dan';e.de='deu';e.dv='div';e.dz='dzo';e.el='ell';e.en='eng';e.eo='epo';e.et='est';
    e.eu='eus';e.ee='ewe';e.fo='fao';e.fa='fas';e.fj='fij';e.fi='fin';e.fr='fra';e.fy='fry';e.ff='ful';e.gd='gla';e.ga='gle';e.gl='glg';e.gv='glv';
    e.gn='grn';e.gu='guj';e.ht='hat';e.ha='hau';e.sh='hbs';e.he='heb';e.hz='her';e.hi='hin';e.ho='hmo';e.hr='hrv';e.hu='hun';e.hy='hye';e.ig='ibo';
    e.io='ido';e.ii='iii';e.iu='iku';e.ie='ile';e.ia='ina';e.id='ind';e.ik='ipk';e.is='isl';e.it='ita';e.jv='jav';e.ja='jpn';e.kl='kal';e.kn='kan';
    e.ks='kas';e.ka='kat';e.kr='kau';e.kk='kaz';e.km='khm';e.ki='kik';e.rw='kin';e.ky='kir';e.kv='kom';e.kg='kon';e.ko='kor';e.kj='kua';e.ku='kur';
    e.lo='lao';e.la='lat';e.lv='lav';e.li='lim';e.ln='lin';e.lt='lit';e.lb='ltz';e.lu='lub';e.lg='lug';e.mh='mah';e.ml='mal';e.mr='mar';e.mk='mkd';
    e.mg='mlg';e.mt='mlt';e.mn='mon';e.mi='mri';e.ms='msa';e.my='mya';e.na='nau';e.nv='nav';e.nr='nbl';e.nd='nde';e.ng='ndo';e.ne='nep';e.nl='nld';
    e.nn='nno';e.nb='nob';e.no='nor';e.ny='nya';e.oc='oci';e.oj='oji';e.or='ori';e.om='orm';e.os='oss';e.pa='pan';e.pi='pli';e.pl='pol';e.pt='por';
    e.ps='pus';e.qu='que';e.rm='roh';e.ro='ron';e.rn='run';e.ru='rus';e.sg='sag';e.sa='san';e.si='sin';e.sk='slk';e.sl='slv';e.se='sme';e.sm='smo';
    e.sn='sna';e.sd='snd';e.so='som';e.st='sot';e.es='spa';e.sq='sqi';e.sc='srd';e.sr='srp';e.ss='ssw';e.su='sun';e.sw='swa';e.sv='swe';e.ty='tah';
    e.ta='tam';e.tt='tat';e.te='tel';e.tg='tgk';e.tl='tgl';e.th='tha';e.ti='tir';e.to='ton';e.tn='tsn';e.ts='tso';e.tk='tuk';e.tr='tur';e.tw='twi';
    e.ug='uig';e.uk='ukr';e.ur='urd';e.uz='uzb';e.ve='ven';e.vi='vie';e.vo='vol';e.wa='wln';e.wo='wol';e.xh='xho';e.yi='yid';e.yo='yor';e.za='zha';
    e.zh='zho';e.zu='zul';
  })(mapISO6393_BCP47, mapBCP47_ISO6393);

  function iso6393ToBCP47(iso) {
    var bcp=mapISO6393_BCP47[iso];
    return bcp?bcp:iso;
  }
  function bcp47ToISO6393(bcp) {
    var iso=mapBCP47_ISO6393[bcp];
    return iso?iso:bcp;
  }

  var localKeyboard, localLanguage;

  function loadKeyboardFromHash() {
    var locationHash = location.hash.match(/^#(.+),(Keyboard_.+)$/i);
    if(locationHash) {
      localKeyboard = locationHash[2];
      localLanguage = locationHash[1];

      // Translate the language ID if necessary from ISO639-3 to BCP 47
      localLanguage = iso6393ToBCP47(localLanguage);

      document.cookie = 'KeymanWeb_Keyboard=current%3D'+localKeyboard+'%3A'+localLanguage+'%3B; path=/';
      document.cookie = 'KeymanWeb_Toolbar=recent0='+localLanguage+'%2C'+localKeyboard+'%3B; path=/';
    } else if(location.hash == '#') {
      document.cookie = 'KeymanWeb_Keyboard=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      document.cookie = 'KeymanWeb_Toolbar=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    } else {
      var cookie = keyman.util.loadCookie('KeymanWeb_Keyboard');
      if(cookie['current']) {
        var cookieMatch = cookie['current'].match(/^(Keyboard_.+):(.+)$/);
        if(cookieMatch) {
          localKeyboard = cookieMatch[1];
          localLanguage = iso6393ToBCP47(cookieMatch[2]);
        }
      }
    }
  }
</script>

<link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
<script src="<?php echo cdn("js/jquery1-11-1.min.js"); ?>"></script>
<script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.4/clipboard.js"></script>
<script src="<?php echo "$url_keymanweb_res" ?>/code/bookmarklet_builder.js"></script>

<script crossorigin="anonymous" src="<?= $staticDomainRoot ?>/kmw/engine/<?php echo $kmwbuild; ?>/keymanweb.js"></script>
<script crossorigin="anonymous" src="<?= $staticDomainRoot ?>/kmw/engine/<?php echo $kmwbuild; ?>/kmwuitoolbar.js"></script>

<script src="<?= cdn("js/kmwlive.js"); ?>"></script>
<script src="/prog/keyboards.php?tier=<?=$tier?>&amp;version=<?=$version?>"></script>

<script>
  loadKeyboardFromHash();
  var pageLoading = true;

  // We finally made it properly boolean in 17.0 as part of https://github.com/keymanapp/keyman/pull/8560.
  var setActiveOnRegister = Number.parseFloat(keyman.version) >= 17.0 ? false : 'false';

  keyman.init({
    attachType:'auto',
    setActiveOnRegister: setActiveOnRegister
  }).then(async function() {
    if(typeof afterInit == 'function') {
      afterInit();
    }
    if(typeof addKeyboards == 'function') {
      addKeyboards();
    } <?php if (KeymanHosts::Instance()->Tier() == KeymanHosts::TIER_DEVELOPMENT || KeymanHosts::Instance()->Tier() == KeymanHosts::TIER_TEST) {
      echo 'else {
      console.warn("-- Fallback:  not using the server\'s cached keyboard set! --");
      // Server caching may not be active in local dev instances of the server.
      await keyman.addKeyboards();
    }';
    } ?>
    if(localKeyboard && localLanguage) {
      keyman.setActiveKeyboard(localKeyboard, localLanguage);
    }
    document.getElementById('message').focus();
  });

  pageLoading = false;

  (function() {
    var css = {
      "desktop" : "<?php echo cdn("css/kmw-desktop.css"); ?>",
      "tablet" : "<?php echo cdn("css/kmw-tablet.css"); ?>",
      "mobile" : "<?php echo cdn("css/kmw-mobile.css"); ?>"
    };

    var ff='desktop',s,k,
    tablets=['iPad','Tablet PC'],
    phones=['iPhone','Opera Mobi','OPR/'];

    //if('ontouchstart' in window || navigator.msMaxTouchPoints)
    if(keyman.util.isTouchDevice()) {  // Rely on KeymanWeb's touch detection.
      // General rule to distinguish between phones and tablets
      ff=(Math.min(screen.width,screen.height) > 720) ? 'tablet' : 'mobile';

      // Force correct CSS selection for identified devices
      for(k=0; k<tablets.length; k++) {
          if(navigator.userAgent.indexOf(tablets[k]) >= 0) {
              ff='tablet';
          }
      }
      for(k=0; k<phones.length;  k++) {
          if(navigator.userAgent.indexOf(phones[k]) >= 0) {
              ff='mobile';
          }
      }
    }

    //Expose the form factor for other use
    window.deviceFormFactor=ff;

    // Append the selected stylesheet to the document
    var lk=document.createElement('LINK'), file=css[ff];
    lk.rel='stylesheet';
    lk.href=file;
    lk.type='text/css';
    document.getElementsByTagName('head')[0].appendChild(lk);
  })();
</script>

</head>
