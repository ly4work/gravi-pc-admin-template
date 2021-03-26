/**
 * UserBlock 日志汇总，单人展示单元区块
 * @author liyang
 * 2021/02/26
 */
import React from 'react';
import { Divider, Button } from 'antd';
import styles from './index.less';
import RichText from '@/components/RichText/RichTextView';
const UserBlock = ({ onShowModal, info = {}, anchorId, isRichText = true, content }) => {
  return (
    <section className={styles.block}>
      <div className={styles.user} id={anchorId}>
        {info.createUserName}
      </div>
      <div className={styles.richText}>
        <RichText value={content} />
      </div>
      <div className={styles.btnGroup}>
        <Button
          className={styles.btn}
          onClick={() => {
            onShowModal && onShowModal();
          }}
        >
          评论
        </Button>
        {/* <Button className={styles.btn}>详情</Button> */}
      </div>
    </section>
  );
};
export default UserBlock;
