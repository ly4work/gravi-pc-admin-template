/**
 * CreateCommentForm 评论弹出框，包含创建评论，及评论展示列表
 * @author liyang
 * 2021/02/26
 */

import React, { useEffect, useState } from 'react';
import { Modal, Mentions, Comment, Tooltip, List } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect, withRouter } from 'umi';
import moment from 'moment';
import styles from './index.less';
import Api from '@/pages/daily/report/service';
import { DB } from '@/utils/DB';

const { Option } = Mentions;

const formatCommentList = (list) => {
  return list.map((item) => {
    return {
      ...item,
      author: item.createUserName,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      datetime: (
        <Tooltip title={moment(item.createDate).subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    };
  });
};

const CreateCommentForm = (props) => {
  const {
    modalVisible,
    dispatch,
    onCancel,
    onSubmit,
    formVals,
    form,
    dataSource = [],
    teamList,
  } = props;
  const [mentionValue, setMentionValue] = useState('');
  const [sendList, setSendList] = useState([]);
  const data = dataSource.map((item) => {});

  //  获取用户列表
  const handleGetUserList = async () => {
    const res = await Api.getUserList();
    const { dispatch } = props;
    const list = res.data;
    dispatch({
      type: 'daily/updateTeamList',
      payload: {
        teamList: list.filter((item) => item.name !== DB.get('userInfo')?.userName),
      },
    });
  };

  useEffect(() => {
    handleGetUserList();
  }, []);

  // const handleChange = (value) => {
  //   console.log(value);
  //   setMentionValue(value);
  // };
  const handleSelect = (event) => {
    // console.log(event);
    const list = _.cloneDeep(sendList);
    //  如果已经存在了，则不加入抄送列表
    if (!list.find((item) => event.key === item.ddUnionId)) {
      list.push({
        ddUnionId: event.key,
        name: event.value,
      });
    }
    setSendList(list);
  };
  const handleSubmit = (fileds) => {
    //  需要筛选出待发送人的列表，通过sendList数组与content正则匹配
    const atUserList = sendList
      .filter((item) => {
        console.log(new RegExp(`@${item.name}`, 'g'), fileds.content);
        console.log(new RegExp(`@${item.name}`, 'g').test(fileds.content));
        return new RegExp(`@${item.name}`, 'g').test(fileds.content);
      })
      .map((item) => {
        return item.ddUnionId;
      });
    onSubmit({ ...fileds, atUserList });
  };
  const columns = [
    {
      title: '',
      dataIndex: 'content',
      // hideInForm: true,
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: false,
            message: '必须输入内容才能评论哈',
          },
        ],
      },
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        return (
          <Mentions
            placeholder="输入@选择发送人"
            // value={mentionValue}
            onSelect={handleSelect}
            // onChange={handleChange}
          >
            {teamList.map((user) => {
              return (
                <Option key={user.ddUnionId} value={user.name}>
                  {user.name}
                </Option>
              );
            })}
          </Mentions>
        );
      },
    },
  ];

  return (
    <Modal
      destroyOnClose
      title="评论列表"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      // width={300}
    >
      <List
        className={styles.gkCommentList}
        header={`共 ${data.length} 条评论`}
        itemLayout="horizontal"
        dataSource={formatCommentList(dataSource)}
        renderItem={(item) => (
          <li key={item.id}>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />
      <ProTable
        className={styles.gkCommentForm}
        onSubmit={async (value) => {
          handleSubmit(value);
        }}
        rowKey="key"
        type="form"
        columns={columns}
        form={form}
      />
    </Modal>
  );
};

// export default CreateCommentForm;

export default connect(({ daily }) => ({
  teamList: daily.teamList,
}))(CreateCommentForm);
