const CORE = CORE || {};

const userAgent = navigator.userAgent.toLowerCase();

CORE.variables = CORE.variables || {}; // 공통 변수
CORE.variables.BROWSER = null; // 브라우저 종류
CORE.variables.VIEWPORT_WIDTH = null; // view port width
CORE.variables.VIEWPORT_HEIGHT = null; // view port height
//CORE.variables.IS_HAND_DEVICE = false; // hand device 여부
//CORE.variables.IS_MOBILE = false; // 모바일 여부
//CORE.variables.IS_TABLET = false; // 태블릿 여부
CORE.variables.MAXMOBILE = 768; // 반응형시 MOBILE 최대값
CORE.variables.MAXTABLET = 1025; // 반응형시 TABLET 최대값
CORE.variables.IS_APP = userAgent.indexOf("cherrymoa") !== -1; // 앱에서 접속 여부
CORE.variables.IS_ANDROID =
  CORE.variables.IS_APP && userAgent.indexOf("android") !== -1; // 안드로이드 여부
CORE.variables.IS_IOS =
  CORE.variables.IS_APP && userAgentindexOf("iphone") !== -1; // ios 여부

export default CORE;
