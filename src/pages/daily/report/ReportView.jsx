import { PlusOutlined, CarryOutOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  message,
  Input,
  Tooltip,
  Drawer,
  Typography,
  Popconfirm,
  Modal,
} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import DailyMergeForm from './components/DailyMergeForm';
import { Logger } from '@/utils/logger';
import { connect, withRouter, KeepAlive } from 'umi';
import styles from './index.less';
import Api from './service';
import { DB } from '@/utils/DB';
import { replaceHTMLTag, replaceBase64 } from '@/utils/utils';
const { Text, Link } = Typography;
import { EnumTypec } from '@/pages/daily/report/config/enum';
import keepAlive from '@/hoc/keepAlive';
/**
 * 添加节点
 * @param fields
 */

export const handleAdd = async (fields, { formType, id }) => {
  const hide = message.loading('正在添加');
  Logger('表单数据', fields, formType, id);
  fields.todaySchedule = replaceBase64(fields.todaySchedule);
  fields.tomorrowSchedule = replaceBase64(fields.tomorrowSchedule);
  try {
    if (formType === 'add') {
      await Api.createTask({ ...fields });
    } else {
      await Api.updateTask({ ...fields, id });
    }
    hide();
    message.success(`添加成功`);
    return true;
  } catch (error) {
    hide();
    // message.error(error);
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

export const handleRemove = async ({ record, actionRef }) => {
  const hide = message.loading('正在删除');
  if (!record) return true;

  try {
    await Api.delTask({
      id: record.id,
    });
    hide();
    if (actionRef.current) {
      actionRef.current.reload();
    }
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

//  根据日期反算当周区间
export function calcWeekDuration(date) {
  if (!date) {
    return {
      start: '',
      end: '',
    };
  }
  const DUR = [1, 7];
  const M_SECOND_PER_DAY = 24 * 60 * 60 * 1000;
  let _d = date || new Date();
  //  西方周次日历算法，需要 对星期天额外处理
  let day = new Date(_d).getDay();
  if (day === 0) day = 7;
  const dayMSecond = +new Date(date);
  const start = new Date(dayMSecond - (day - DUR[0]) * M_SECOND_PER_DAY).toLocaleDateString();
  const end = new Date(dayMSecond + (DUR[1] - day) * M_SECOND_PER_DAY).toLocaleDateString();
  return {
    start,
    end,
  };
}

/**
 * 跳转至报告详情页
 */
export const handleToReportDetailPage = ({ dispatch, record }) => {
  const dur = calcWeekDuration(record.createDate);
  let title = '';
  if (Number(record.typec) === EnumTypec.Day) {
    title = `${record.createUserName || 'unknown'} ${new Date(
      record.createDate,
    ).toLocaleDateString()} 日报`;
  } else {
    title = `${record.createUserName || 'unknown'} ${dur.start}~${dur.end} 周报 `;
  }
  const nextRoute = {
    parentId: 'menu.daily',
    route: `/daily/report-detail?reportId=${record.id}`,
    title,
    id: 'menu.daily.report-detail',
  };
  // const nextRoute = {
  //   parentId: 'menu.daily',
  //   route: `/daily/report-detail?reportId=${record.id}&typec=${record.typec}`,
  //   title: `${record.createUserName || 'unknown'} ${new Date(
  //     record.createDate,
  //   ).toLocaleDateString()} 的报告`,
  //   id: 'menu.daily.report-detail',
  // };
  dispatch({
    type: 'menu/asyncUpdateRouteController',
    payload: { currentRoute: nextRoute },
  });
  dispatch({
    type: 'menu/asyncReportDetailMap',
    payload: record,
  });
};

const ReportView = (props) => {
  //  新建日报表单相关
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const [formType, setFormType] = useState('add');

  //  日报汇总表单相关
  const [mergeModalVisible, setMergeModalVisible] = useState(false);

  const actionRef = useRef();
  const [row, setRow] = useState();
  // Logger(`dva store`, props.dispatch);
  Logger(`编辑表单`, updateFormValues);
  const columns = [
    {
      title: '创建时间',
      dataIndex: 'createDate',
      // hideInSearch: true,
      hideInForm: true,
      valueType: 'date',
      width: 120,
    },
    {
      title: '创建用户',
      dataIndex: 'createUserName',
      valueType: 'text',
      width: 90,
      // hideInSearch: true,
      hideInForm: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入您的姓名',
          },
        ],
      },
    },
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '汇报类型',
      dataIndex: 'typec',
      // hideInSearch: true,
      width: 80,
      valueEnum: {
        1: {
          text: '日报',
          status: 'Success',
        },
        2: {
          text: '周报',
          status: 'Processing',
        },
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择汇报类型',
          },
        ],
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
      width: 200,
      // hideInTable: true,
    },
    {
      title: '今日工作内容',
      dataIndex: 'todaySchedule',
      valueType: 'textarea',
      // hideInTable: true,
      hideInSearch: true,
      ellipsis: true,
      // width: 280,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '今日工作内容必须填写',
          },
        ],
      },
      render: (_, record) => {
        return (
          <Tooltip title={replaceHTMLTag(record.todaySchedule)}>
            <span className="elli">{replaceHTMLTag(record.todaySchedule)}</span>
          </Tooltip>
        );
      },
    },

    {
      title: '明日工作计划',
      dataIndex: 'tomorrowSchedule',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '明日工作计划必须填写',
          },
        ],
      },
    },
    // {
    //   title: '更新时间',
    //   dataIndex: 'updateDate',
    //   hideInSearch: true,
    //   hideInForm: true,
    //   hideInTable: true,
    //   valueType: 'date',
    // },
    {
      title: '周次',
      dataIndex: 'finishTime',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const isNotCurrentUser = record.createUserName !== DB.get('userInfo')?.userName;
        return (
          <>
            <a
              onClick={() => {
                handleToReportDetailPage({ dispatch: props.dispatch, record });
              }}
            >
              查看
            </a>
            <Divider type="vertical" />
            <Button
              type="link"
              className={styles.gkBtn}
              disabled={isNotCurrentUser}
              onClick={() => {
                setCreateModalVisible(true);
                setFormType('edit');
                setUpdateFormValues({ ...record, typec: String(record.typec) });
              }}
            >
              编辑
            </Button>
            <Divider type="vertical" />

            <Popconfirm
              placement="topLeft"
              title={'是否删除？'}
              onConfirm={() => {
                handleRemove({ record, actionRef });
              }}
              okText="是的"
              cancelText="取消"
            >
              <Button
                type="link"
                danger
                // onClick={() => {
                //   handleRemove({ record, actionRef });
                // }}
                disabled={isNotCurrentUser}
              >
                删除
              </Button>{' '}
            </Popconfirm>
          </>
        );
      },
    },
  ];
  return (
    <PageContainer className={styles.gkAntdProLayout}>
      <ProTable
        headerTitle="周日报列表"
        actionRef={actionRef}
        rowKey="key"
        // search={false}
        search={
          {
            // filterType: 'light',
            // collapsed: false,
          }
        }
        pagination={{
          pageSize: 20,
          showSizeChanger: false,
        }}
        toolBarRender={() => [
          <Button
            type="plain"
            onClick={() => {
              setMergeModalVisible(true);
            }}
          >
            <CarryOutOutlined />
            查看汇总
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              setFormType('add');
              setUpdateFormValues({ typec: String(EnumTypec.Day) });
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建汇报
          </Button>,
        ]}
        // postData={(data) => data.list}
        request={async (params, sorter, filter) => {
          Logger(`params`, params);
          let _params = _.cloneDeep(params);
          _params.pageIndex = params.current;
          delete _params.current;
          if (!_params.createUserName) delete _params.createUserName;
          if (!_params.createDate) delete _params.createDate;
          const res = await Api.getTaskList({ ..._params });
          return {
            data: res.data.list,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res.data.total,
          };
          // return Api.getTaskList({ ...params });
        }}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        // }}
      />
      {createModalVisible && (
        <CreateForm
          onCancel={() => {
            Modal.confirm({
              title: '还未提交，关闭后已填写的内容会丢失，确认关闭吗',
              cancelText: '取消',
              okText: '确定',
              onCancel: () => {},
              onOk: () => {
                setCreateModalVisible(false);
                setUpdateFormValues({});
              },
            });
          }}
          onSubmit={async (value) => {
            let res = await handleAdd(value, { formType, id: updateFormValues.id });
            if (res) {
              setCreateModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          modalVisible={createModalVisible}
          formType={formType}
          columns={columns}
          form={{
            initialValues: updateFormValues,
            values: updateFormValues,
          }}
        ></CreateForm>
      )}
      <DailyMergeForm
        onCancel={() => setMergeModalVisible(false)}
        onSubmit={async (value) => {
          let res = await handleAdd(value, { formType, id: updateFormValues.id });
          if (res) {
            setMergeModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        modalVisible={mergeModalVisible}
        // columns={columns}
        form={{
          initialValues: {
            createDate: new Date(),
          },
        }}
      ></DailyMergeForm>
    </PageContainer>
  );
};

export default connect(({ menu }) => ({
  // currentRoute: menu.currentRoute,
  // routeCaches: menu.routeCaches,
  // reportDetailMap: menu.reportDetailMap,
  // }))(withRouter(keepAlive(ReportView)));
}))(withRouter(ReportView));
