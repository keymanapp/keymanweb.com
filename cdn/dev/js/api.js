export function getKeymanWeb() {
    if(window.tavultesoft) {
      return window.tavultesoft.keymanweb;
    }
    return window.keyman;
}