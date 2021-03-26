import React from 'react';
// import { _richTextJSONStringtoHTML } from '@/components/Editor/EditorView';
import styles from './index.less';
const RichTextView = (props) => {
  const { value } = props;
  return (
    <div className={styles.gkRichText}>
      <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </div>
  );
};

export default RichTextView;
