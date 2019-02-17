<?php
  function redirect_home($module, $result, $error = '', $data = '')
  {
    assert(urlencode($module) == $module);
    assert(urlencode($result) == $result);
        
    header("Location: /?module=$module&result=$result".($result == "error" ? "&error=".urlencode($error) : "")
      .($data != "" ? "&data=".urlencode($data) : ""));
    exit;
  }
  function util_verifyinteger(&$v, $allownull = false)
  {
    if($allownull && is_null($v)) // empty($v))
    {
      $v = 'NULL';
      return true;
    }
    
    if(is_numeric($v) && $v <= 0x7FFFFFFF) return true;
    
    if(!preg_match('/forums|caleb|/', $_SERVER['PHP_SELF']))  // spamming bots 'caleb'
    {
      if(!isset($_SERVER['HTTP_USER_AGENT']) || strpos($_SERVER['HTTP_USER_AGENT'], 'http://www.scanalert.com/') === FALSE)
      {
        $err = format_err(1, "Invalid input: $v", 'util.php', 110, null, $errid);
        if(isset($_SERVER['REQUEST_URI'])) $url = $_SERVER['REQUEST_URI'];
        else $url = $_SERVER['PHP_SELF'] . '?InvalidInput='.$v;
        if(isset($_SERVER['REMOTE_ADDR'])) $ip = $_SERVER['REMOTE_ADDR'];
        else $ip = 'unknown';
        error_log($err, 1, 'siteadmin@tavultesoft.com', "Subject: Parameter Error: [$ip: $url]\nFrom: php@tavultesoft.com");
        exit('Invalid parameter logged');
      }
    }
    global $TestServer;
    if(isset($TestServer) && $TestServer) { echo "<pre>"; debug_print_backtrace();echo "</pre>"; }
    exit('Invalid parameter');
  }

?>
