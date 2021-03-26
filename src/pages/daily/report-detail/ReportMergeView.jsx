import React, { Component, useState, useEffect } from 'react';
import { Badge, Card, Descriptions, Divider, Button, Table, Typography, Popover } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, withRouter } from 'umi';
import styles from './style.less';
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';
import Api from '@/pages/daily/report/service';
import { getQueryString } from '@/utils/utils';
import { Logger } from '@/utils/logger';
import CreateCommentForm from './components/CreateCommentForm';
import { handleAdd, formatSchedualList } from './ReportDetailView';
import UserBlock from './components/UserBlock';
import AnchorFrame from './components/AnchorFrame';
import { EnumTypec } from '@/pages/daily/report/config/enum';

const ReportDetailView = () => {
  //  创建日期
  const createDate = getQueryString('createDate');
  //  汇报类型
  const typec = Number(getQueryString('typec'));
  //  周报所在周次区间
  const dur = getQueryString('dur');

  //  当前评论的日志id
  const [currentOpeId, setCurrentOpeId] = useState({});
  //  汇总 日志列表
  const [reportList, setReportList] = useState([]);
  //  评论 map
  const [commentMap, setComment] = useState({});
  //  评论表单弹窗的控制器
  const [modalVisible, setModalVisible] = useState(false);
  //  当前查看的日志对应的评论列表
  const [currentCommentList, setCurrentCommentList] = useState([]);
  //  未汇报的用户列表
  const [notReportUserList, setNotReportUserList] = useState([]);

  //  大纲目录锚点List
  const initAnchorConfigList = [
    {
      title: `${typec === EnumTypec.Day ? '今日' : '本周'}工作内容`,
      id: 'todaySchedule',
      children: [],
    },
    {
      title: `${typec === EnumTypec.Day ? '明日' : '下周'}工作计划`,
      id: 'tomorrowSchedule',
      children: [],
    },
  ];

  // 目录锚点列表
  const [anchorConfigList, setAnchorConfigList] = useState(initAnchorConfigList);

  //  获取日志汇总列表
  const getReportDetail = async (createDate) => {
    //  先清空
    let _anchorConfigList = _.cloneDeep(initAnchorConfigList);
    const res = await Api.getTaskList({ createDate, typec });
    const list = res.data.list;

    //  锚点数据填充
    list.forEach((item, index) => {
      _anchorConfigList.forEach((anc) => {
        const anchorId = `${anc.id}-${item.id}-${item.createUserName}`;
        anc.children.push({
          id: anchorId,
          title: item.createUserName,
        });
      });
    });
    //  list与anchorConfigList等长
    setReportList(list);
    setAnchorConfigList(_anchorConfigList);
    const commentTaskIdList = res.data.list.map((item) => item.id);
    await getReportCommentList(commentTaskIdList);
    await getNotReportUserList({ typec, createDate });
  };

  //  获取评论详情
  const getReportCommentList = async (idList) => {
    const res = await Api.getCommentList({ taskIdList: idList });
    // setInfo(res.data[0]);
    Logger('评论列表', res.data);
    let _commentMap = {};
    res.data.forEach((item) => {
      //  填充评论Map
      if (item.taskId in _commentMap) {
        _commentMap[item.taskId].push(item);
      } else {
        _commentMap[item.taskId] = [item];
      }
    });
    setComment(_commentMap);
  };

  //  获取未完成日志的用户列表
  const getNotReportUserList = async ({ typec, createDate }) => {
    //  TODO，目前没有接入组织中心，所以需要将领导的id和已离职的同事排除
    //  4: 杨总
    // 10: 濮总
    // 3: 毛俊钦（离职）
    const filterIdList = ['4', '10', '3'];

    const res = await Api.getNotReportUserList({ typec, createDate });
    const _list = res.data.filter((item) => {
      return !filterIdList.includes(item.id);
    });
    console.log(_list);
    setNotReportUserList(_list);
  };
  //  渲染文档头标题
  const renderHeader = ({ typec, dur, createDate }) => {
    let PageHeaderText = null;
    if (typec === EnumTypec.Day) {
      PageHeaderText = <span>{createDate} 日报汇总</span>;
    } else {
      PageHeaderText = <span>{dur} 周报汇总</span>;
    }
    const _List = (
      <div className={styles.notReportList}>
        {notReportUserList.map((item) => {
          return <div>{item.name}</div>;
        })}
      </div>
    );
    return (
      <h1 className={styles.title}>
        {PageHeaderText}
        <span className={styles.notReportListLabel}>
          未填写成员：
          <Popover placement="bottomLeft" content={_List}>
            <span className={styles.num}>{notReportUserList.length}</span>
          </Popover>
        </span>
      </h1>
    );
  };
  useEffect(() => {
    getReportDetail(createDate);
  }, [createDate, typec]);

  return (
    <PageContainer>
      <Card bordered={false}>
        {renderHeader({ typec, dur, createDate })}
        <Divider
          style={{
            marginBottom: 32,
          }}
        />
        <section className={styles.gkArticle}>
          <section className={styles.gkWordContent}>
            {anchorConfigList.map((anc) => {
              return (
                <>
                  <div className={styles.wrap}>
                    <h1 className={styles.title} id={anc.id}>
                      {anc.title}
                    </h1>

                    {anc.children.map((r, index) => {
                      return (
                        <UserBlock
                          info={reportList[index]}
                          content={reportList[index] && reportList[index][anc.id]}
                          anchorId={r.id}
                          onShowModal={async () => {
                            const taskId = reportList[index].id;
                            //  设置当前评论窗
                            await setCurrentOpeId(taskId);
                            await setCurrentCommentList(commentMap[reportList[index].id]);
                            await setModalVisible(true);
                          }}
                        />
                      );
                    })}
                  </div>
                  <Divider />
                </>
              );
            })}
          </section>
          <AnchorFrame list={anchorConfigList} />
        </section>
      </Card>
      <CreateCommentForm
        onCancel={() => setModalVisible(false)}
        onSubmit={async (fields) => {
          let res = await handleAdd(fields, { taskId: currentOpeId });
          if (res) {
            setModalVisible(false);
            getReportDetail(createDate);
            // if (actionRef.current) {
            //   actionRef.current.reload();
            // }
          }
        }}
        dataSource={currentCommentList || []}
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
  currentRoute: menu.currentRoute,
  routeCaches: menu.routeCaches,
  reportDetailMap: menu.reportDetailMap,
}))(withRouter(ReportDetailView));
