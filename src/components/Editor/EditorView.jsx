/**
 * 富文本编辑器组件，基于braftEditor
 * @author liyang
 * 2021/02/24
 */

import React, { useState, useEffect } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-extensions/dist/table.css';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/mention.css';

import Table from 'braft-extensions/dist/table';
import styles from './index.less';
//  解决限高后content区域高度遮挡文档后续元素问题
import './profile/def.css';
import defaultControls, {
  mediaConfig,
  tableConfig,
  // excludeControlsConfig,
} from './profile/controls';

// import Mention, { defaultSuggestionsFilter } from 'braft-extensions/dist/mention';
// import ReEditor from 're-editor';

// 取出Mention扩展和Mention列表组件
// const [mentionExtension, MentionSuggestions] = Mention({
//   mentionTrigger: '@',
// });
// 使用mention
// BraftEditor.use(mentionExtension);
//  使用table 控件

// BraftEditor.use(Table(tableConfig));

// /**
//  * 基于braft-eidtor的富文本编辑器
//  */
// const EditorView = (props) => {
//   const [editorState, setEditorState] = useState('');
//   const [mentions, setMentions] = useState([
//     {
//       id: 'Matthew Russell',
//       name: 'Matthew Russell',
//       link: 'https://twitter.com/mrussell247',
//     },
//     {
//       id: 'Julian Krispel-Samsel',
//       name: 'Julian Krispel-Samsel',
//       link: 'https://twitter.com/juliandoesstuff',
//     },
//   ]);
//   const [mentionKeyword, setMentionKeyword] = useState('');
//   const { onChange, controls = [], value } = props;

//   // console.log('value', value);

//   // 定义mention列表的搜索处理函数
//   const handleMentionFilter = ({ value: mentionKeyword }) => {
//     setMentionKeyword(mentionKeyword);
//   };

//   const triggerChange = (e) => {
//     //  1. 空值校验，editor的光标会产生一个空p标签
//     if (e.isEmpty()) {
//       onChange && onChange('');
//       return;
//     }
//     //  这里要将 editor 的imutalbe数据转换为html或者raw
//     const _html = e.toRAW();
//     console.log('_html', _html);
//     setEditorState(e);
//     // onChange && onChange(_html);
//   };
//   return (
//     <div className={styles.editorView}>
//       <BraftEditor
//         media={mediaConfig}
//         controls={[...defaultControls, ...controls]}
//         // excludeControls={excludeControlsConfig}
//         value={editorState}
//         onChange={triggerChange}
//       />
//       {/**MentionSuggestions组件需要单独渲染，并传入正确的属性**/}
//       {/* <MentionSuggestions
//         onSearchChange={handleMentionFilter}
//         suggestions={defaultSuggestionsFilter(mentionKeyword, mentions)}
//       /> */}
//     </div>
//   );
// };
// export default EditorView;

// // const EditorView2 = (props) => {
// //   const [editorState, setEditorState] = useState({});
// //   const [mentions, setMentions] = useState([
// //     {
// //       id: 'Matthew Russell',
// //       name: 'Matthew Russell',
// //       link: 'https://twitter.com/mrussell247',
// //     },
// //     {
// //       id: 'Julian Krispel-Samsel',
// //       name: 'Julian Krispel-Samsel',
// //       link: 'https://twitter.com/juliandoesstuff',
// //     },
// //   ]);
// //   const [mentionKeyword, setMentionKeyword] = useState('');
// //   const { onChange, controls = [], value } = props;

// //   // console.log('value', value);

// //   // 定义mention列表的搜索处理函数
// //   const handleMentionFilter = ({ value: mentionKeyword }) => {
// //     setMentionKeyword(mentionKeyword);
// //   };

// //   const triggerChange = (e) => {
// //     //  1. 空值校验，editor的光标会产生一个空p标签
// //     if (e.isEmpty()) {
// //       onChange && onChange('');
// //       return;
// //     }
// //     //  这里要将 editor 的imutalbe数据转换为html或者raw
// //     const _html = e.toRAW();
// //     console.log('_html', _html);
// //     setEditorState(e);
// //     onChange && onChange(_html);
// //   };
// //   const handleChange = (value) => {
// //     localStorage.setItem('re-editor-value', JSON.stringify(value.toJS()));
// //   };
// //   return (
// //     <div className={styles.editorView}>
// //       <ReEditor
// //         value={editorState}
// //         onChange={handleChange}
// //         placeholder="请输入内容"
// //         tools={[
// //           ['bold', 'italic', 'underline', 'strikethrough'],
// //           ['orderedlist', 'unorderedlist'],
// //           ['heading'],
// //           ['align'],
// //           ['image', 'table', 'code'],
// //           ['undo', 'redo'],
// //           ['fullscreen'],
// //         ]}
// //       />
// //     </div>
// //   );
// // };
// // export default EditorView2;

// /**
//  * 富文本json string 转html
//  * @param {string} value
//  * @author liyang
//  * 2021/02/25
//  */
// export const _richTextJSONStringtoHTML = (value) => {
//   if (typeof value === 'string') {
//     return BraftEditor.createEditorState(JSON.parse(value)).toHTML();
//   }
//   return null;
// };

//  ========

// import 'braft-editor/dist/index.css'
// import React from 'react'
// import BraftEditor from 'braft-editor'

export default class BasicDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
    outputHTML: '<p></p>',
  };

  componentDidMount() {
    this.isLivinig = true;
    // 3秒后更改编辑器内容
    // setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount() {
    this.isLivinig = false;
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML(),
    });
  };

  setEditorContentAsync = () => {
    this.isLivinig &&
      this.setState({
        editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>'),
      });
  };
  // 定义mention列表的搜索处理函数
  handleMentionFilter = ({ value: mentionKeyword }) => {
    setMentionKeyword(mentionKeyword);
  };
  render() {
    const { editorState, outputHTML, mentionKeyword, mentions } = this.state;
    const { controls = [] } = this.props;
    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            media={mediaConfig}
            controls={[...defaultControls, ...controls]}
            value={editorState}
            onChange={this.handleChange}
          />
        </div>
        <h5>输出内容</h5>
        <div className="output-content">{outputHTML}</div>
      </div>
    );
  }
}
