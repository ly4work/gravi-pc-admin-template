import React from 'react';
import { Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect, withRouter } from 'umi';
import moment from 'moment';
import { EnumTypec } from '@/pages/daily/report/config/enum';
import { calcWeekDuration } from '@/pages/daily/report/ReportView';

/**
 * 跳转至报告详情页
 */
const handleToReportMergePage = ({ dispatch, createDate, typec = EnumTypec.Day, onCancel }) => {
  const dur = calcWeekDuration(createDate);
  let title = '';
  if (typec === EnumTypec.Day) {
    title = `${new Date(createDate).toLocaleDateString()} 日报汇总`;
  } else {
    title = `${dur.start}~${dur.end} 周报汇总`;
  }
  const nextRoute = {
    parentId: 'menu.daily',
    route: `/daily/report-merge?createDate=${createDate}&typec=${typec}&dur=${dur.start}-${dur.end}`,
    title: title,
    id: 'menu.daily.report-merge',
  };
  // onCancel && onCancel();
  dispatch({
    type: 'menu/asyncUpdateRouteController',
    payload: { currentRoute: nextRoute },
  });
};

const DailyMergeForm = (props) => {
  const { modalVisible, onCancel, onSubmit, formVals, form } = props;
  const columns = [
    {
      title: '汇报类型',
      key: 'typec',
      dataIndex: 'typec',
      valueType: 'radio',
      initialValue: String(EnumTypec.Day),
      valueEnum: {
        [EnumTypec.Day]: {
          text: '日报',
          status: 'Success',
        },
        [EnumTypec.Week]: {
          text: '周报',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      // hideInForm: true,
      valueType: 'date',
    },
  ];
  return (
    <Modal
      destroyOnClose
      title="选择查询汇总日期及类型"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={300}
    >
      {/* {props.children} */}
      <ProTable
        onSubmit={async (fileds) => {
          handleToReportMergePage({
            dispatch: props.dispatch,
            createDate: moment(fileds.createDate).format('YYYY-MM-DD'),
            typec: Number(fileds.typec),
            onCancel,
          });
        }}
        rowKey="key"
        type="form"
        columns={columns}
        form={form}
      />
    </Modal>
  );
};

// export default DailyMergeForm;

export default connect(({ menu }) => ({
  currentRoute: menu.currentRoute,
  routeCaches: menu.routeCaches,
  reportDetailMap: menu.reportDetailMap,
}))(withRouter(DailyMergeForm));
