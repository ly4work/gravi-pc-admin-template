/**
 * ReportBlock 日志展示单元区块
 * @author liyang
 * 2021/02/26
 */
import React from 'react';
import { Divider } from 'antd';
import styles from './index.less';
import RichText from '@/components/RichText/RichTextView';
const ReportBlock = ({ value, label, isRichText = true, showDivider = true, id }) => {
  return (
    <>
      <div className={styles.songti}>
        <h3 className={styles.subTitle} id={id}>
          {label}
        </h3>
        <RichText value={value} />
      </div>
      {showDivider && (
        <Divider
          style={{
            margin: '10px 0',
          }}
        />
      )}
    </>
  );
};
export default ReportBlock;
