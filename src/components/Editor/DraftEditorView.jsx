import 'braft-editor/dist/index.css';
import React from 'react';
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
BraftEditor.use(Table(tableConfig));

export default class BasicDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(''), // 设置编辑器初始内容
    outputHTML: '<p></p>',
  };

  componentDidMount() {
    if (this.props.value) {
      this.setState({
        editorState: BraftEditor.createEditorState(this.props.value),
      });
    }
    // 3秒后更改编辑器内容
    // setTimeout(this.setEditorContentAsync, 3000)
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML(),
    });
    this.props.onChange(editorState.toHTML());
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    const oldProps = this.props;
    // console.log('\n', nextProps.importEditorState, '::::\n', oldProps.importEditorState, ':::\n');
    // console.log(
    //   nextProps.importEditorState !== oldProps.importEditorState,
    //   !!nextProps.importEditorState,
    //   !oldProps.importEditorState,
    // );
    if (
      nextProps.importEditorState !== oldProps.importEditorState &&
      !!nextProps.importEditorState &&
      !oldProps.importEditorState &&
      this.state.editorState !== BraftEditor.createEditorState(nextProps.importEditorState)
    ) {
      // console.log('setState');
      let _editorState = BraftEditor.createEditorState(nextProps.importEditorState);

      this.setState({
        editorState: _editorState,
      });
    } else {
      // console.log('setState');
    }
    return nextProps;
  }
  render() {
    const { editorState, outputHTML } = this.state;
    const { controls = [] } = this.props;
    return (
      <div className={styles.editorView}>
        <BraftEditor
          media={mediaConfig}
          controls={[...defaultControls, ...controls]}
          value={editorState}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
