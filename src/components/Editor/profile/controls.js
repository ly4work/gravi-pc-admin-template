/**
 * controls属性 定义 https://www.yuque.com/braft-editor/be/gz44tn#bo49ph
 */

export default [
  'undo',
  'redo',
  'remove-styles',
  'separator',
  'headings',
  'font-size',
  // 'line-height',
  // 'letter-spacing',
  // 'separator',
  'text-color',
  'bold',
  'italic',
  'underline',
  'strike-through',
  'separator',
  // 'superscript',
  // 'subscript',
  // 'emoji',
  'separator',
  // 'text-indent',
  'text-align',
  'separator',
  'list-ul',
  'list-ol',
  // 'blockquote',
  // 'code',
  'separator',
  'link',
  // 'separator',
  // 'hr',
  'separator',
  'table',
  // 'separator',
  // 'media',
  // 'separator',
  // 'clear',
];

export const excludeControlsConfig = ['undo', 'redo', 'separator', 'emoji', 'clear'];
// 媒体控件配置
export const mediaConfig = {
  accepts: {
    video: false,
    audio: false,
  },
};

// 表格控件配置
export const tableConfig = {
  defaultColumns: 3, // 默认列数
  defaultRows: 3, // 默认行数
  withDropdown: false, // 插入表格前是否弹出下拉菜单
  columnResizable: false, // 是否允许拖动调整列宽，默认false
  exportAttrString: '', // 指定输出HTML时附加到table标签上的属性字符串
  // includeEditors: ['editor-id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  // excludeEditors: ['editor-id-2'], // 指定该模块对哪些BraftEditor无效
};
