import React, { Component, useState, useEffect } from 'react';
import {
  Badge,
  Card,
  Descriptions,
  Divider,
  Table,
  Typography,
  Button,
  message,
  Anchor,
} from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import { connect, withRouter } from 'umi';
import styles from './style.less';
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';
import Api from '@/pages/daily/report/service';
import { getQueryString } from '@/utils/utils';
import { Logger } from '@/utils/logger';
import CreateCommentForm from './components/CreateCommentForm';
import ReportBlock from './components/ReportBlock';
import AnchorFrame from './components/AnchorFrame';
import { EnumTypec } from '@/pages/daily/report/config/enum';
import { calcWeekDuration } from '@/pages/daily/report/ReportView';
export const handleAdd = async (fields, { taskId }) => {
  const hide = message.loading('正在添加');
  try {
    await Api.createComment({ ...fields, taskId });
    hide();
    message.success(`操作成功`);
    return true;
  } catch (error) {
    hide();
    message.error(error);
    return false;
  }
};

const ReportDetailView = () => {
  const [info, setInfo] = useState({});
  const [commnetMap, setComment] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [typec, setTypec] = useState(Number(getQueryString('typec')));
  const [dur, setDur] = useState(getQueryString('dur'));
  const reportId = getQueryString('reportId');
  //  汇报类型
  //  周报所在周次区间
  // const dur = getQueryString('dur');

  //  获取日报详情
  const getReportDetail = async (id) => {
    const res = await Api.getTaskList({ id });
    const info = res.data?.list[0] || {};
    setInfo(info);
    setTypec(info.typec);
    try {
      const durObj = calcWeekDuration(info.createDate);
      setDur(`${durObj.start}-${durObj.end}`);
    } catch (error) {
      // alert(error);
    }
    Logger('日报详情', res.data?.list[0]);
  };
  //  获取评论详情
  const getReportCommentList = async (idList) => {
    const res = await Api.getCommentList({ taskIdList: idList });
    // setInfo(res.data[0]);
    Logger('评论列表', res.data);
    setComment({ [reportId]: res.data });
  };

  useEffect(() => {
    getReportDetail(reportId);
    getReportCommentList([reportId]);
  }, [reportId]);

  const AnchorConfigList = [
    { title: `${typec === EnumTypec.Day ? '今日' : '本周'}工作内容`, id: 'todaySchedule' },
    { title: `${typec === EnumTypec.Day ? '明日' : '下周'}工作计划`, id: 'tomorrowSchedule' },
    { title: '阻塞项', id: 'blockingPoint' },
    { title: '备注', id: 'note' },
  ];
  //  渲染文档头标题
  const renderHeader = ({ typec, dur, createDate }) => {
    if (typec === EnumTypec.Day) {
      return (
        <span>
          {info.createUserName}
          &nbsp;
          {new Date(info.createDate).toLocaleDateString()}
          日报
        </span>
      );
    } else {
      return (
        <span>
          {info.createUserName}
          &nbsp;
          {dur} 周报
        </span>
      );
    }
  };
  return (
    <PageContainer>
      <Card bordered={false}>
        <h1 className={styles.title}>
          {renderHeader({ typec, dur, createDate: info.createDate })}
          <div className="btnGroup">
            <Button
              onClick={() => setModalVisible(true)}
              style={{ marginLeft: '10px' }}
              type="primary"
              size="middle"
              icon={<HighlightOutlined />}
            >
              评论
            </Button>
          </div>
        </h1>
        <Divider
          style={{
            marginBottom: 10,
          }}
        />
        <section className={styles.gkArticle}>
          <section className={styles.gkWordContent}>
            {AnchorConfigList.map((item, index) => {
              return (
                <ReportBlock
                  key={item.id + '_' + index}
                  value={info[item.id]}
                  label={item.title}
                  AnchorConfigList={AnchorConfigList}
                  id={item.id}
                />
              );
            })}
          </section>
          <AnchorFrame list={AnchorConfigList} />
        </section>
      </Card>
      <CreateCommentForm
        onCancel={() => setModalVisible(false)}
        onSubmit={async (fiels) => {
          let res = await handleAdd(fiels, { taskId: reportId });
          if (res) {
            setModalVisible(false);
            getReportCommentList([reportId]);
          }
        }}
        dataSource={
          commnetMap[reportId] && commnetMap[reportId].length > 0 ? commnetMap[reportId] : []
        }
        modalVisible={modalVisible}
        // columns={columns}
        form={{
          initialValues: {
            createDate: new Date(),
          },
        }}
      />
    </PageContainer>
  );
};

export default connect(({ menu }) => ({
  // currentRoute: menu.currentRoute,
  // routeCaches: menu.routeCaches,
  // reportDetailMap: menu.reportDetailMap,
}))(withRouter(ReportDetailView));
