export const LOG_COLOR = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  CYAN: '\x1b[36m',
  WHITE: '\x1b[37m',
  BRIGHT_RED: '\x1b[91m',
  BRIGHT_GREEN: '\x1b[92m',
  RBRIGHT_YELLOW: '\x1b[93m',
  RBRIGHT_BLUE: '\x1b[94m',
  RBRIGHT_MAGENTA: '\x1b[95m',
};

const DEFAULT = {
  TAG: 'TAG',
};

const conLog = (color: string, tag: string, target: unknown) => {
  const customTag = `【${tag}】`;

  const customTarget = JSON.stringify(target, (key, value) => {
    if (typeof value === 'function') {
      return 'function';
    }
    return value;
  });
  console.log(color + customTag + customTarget);
};
/**
 * デバック関連のユーティリティ
 */
const DebugUtils = {
  /**
   * 通常のログ出力（白）
   * @param target 出力対象
   */
  log: (target: unknown, tag: string = DEFAULT.TAG) => {
    conLog(LOG_COLOR.WHITE, tag, target);
  },
  /**
   * 通常のログ出力（赤）
   * @param target 出力対象
   */
  red: (target: unknown, tag: string = DEFAULT.TAG) => {
    conLog(LOG_COLOR.RED, tag, target);
  },
  /**
   * 通常のログ出力（緑）
   * @param target 出力対象
   */
  green: (target: unknown, tag: string = DEFAULT.TAG) => {
    conLog(LOG_COLOR.GREEN, tag, target);
  },
  /**
   * 通常のログ出力（青）
   * @param target 出力対象
   */
  blue: (target: unknown, tag: string = DEFAULT.TAG) => {
    conLog(LOG_COLOR.BLUE, tag, target);
  },
  /**
   * 通常のログ出力（マジェンタ）
   * @param target 出力対象
   */
  magenta: (target: unknown, tag: string = DEFAULT.TAG) => {
    conLog(LOG_COLOR.MAGENTA, tag, target);
  },
  /**
   * 通常のログ出力（シアン）
   * @param target 出力対象
   */
  cyan: (target: unknown, tag: string = DEFAULT.TAG) => {
    conLog(LOG_COLOR.CYAN, tag, target);
  },
};

export default DebugUtils;
