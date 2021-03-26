import React, { useState } from 'react';
import {
  Modal,
  Drawer,
  Form,
  Input,
  Button,
  Radio,
  Mentions,
  Select,
  Tooltip,
  Popconfirm,
} from 'antd';
import { CloseOutlined, CheckSquareOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Editor from '@/components/Editor/DraftEditorView';
import { DB } from '@/utils/DB';
import styles from './CreateForm.less';
import Api from '../service';
import { connect } from 'umi';
import { EnumTypec } from '@/pages/daily/report/config/enum';
class CreateForm extends React.Component {
  state = {
    fields: {},
    importTodaySchedule: '', //  用来传递导入的模板数据
    importTomorrowSchedule: '', //  用来传递导入的模板数据
  };
  formRef = React.createRef();

  componentDidMount() {
    this.handleGetUserList();
    this.setState({
      fields: {
        ...this.state.fields,
        ...this.props.form.initialValues,
      },
    });
  }

  //  获取用户列表
  handleGetUserList = async () => {
    const res = await Api.getUserList();
    const { dispatch } = this.props;
    const list = res.data;
    dispatch({
      type: 'daily/updateTeamList',
      payload: {
        teamList: list.filter((item) => item.name !== DB.get('userInfo')?.userName),
      },
    });
  };
  handleChange = (changedFields, allFields) => {
    // console.log(changedFields, allFields);
    if (changedFields[0].name.includes('typec')) {
      this.setState({
        fields: {
          ...this.state.fields,
          typec: Number(changedFields[0].value),
        },
      });
    }
  };
  handleSubmit = (values) => {
    const { onSubmit, formType, teamList } = this.props;
    //  临时逻辑，默认添加杨总钉钉通知消息
    const teamLeaderUser = teamList.find((item) => item.name === '刘自杰');
    console.log(teamLeaderUser);
    if (formType === 'add') {
      if (values.sendUserList) {
        if (!values.sendUserList.find((item) => item === teamLeaderUser.ddUnionId)) {
          values.sendUserList.push(teamLeaderUser.ddUnionId);
        }
      }
    }
    console.log('values:', values);

    onSubmit(values);
  };

  handleImportCurWeekDailyList = async () => {
    const res = await Api.getCurrentWeekDailyList();
    let todaySchedule = '';
    let tomorrowSchedule = '';
    res.data.forEach((item) => {
      todaySchedule += item.todaySchedule;
      tomorrowSchedule += item.tomorrowSchedule;
    });
    // console.log('todaySchedule 合并：', todaySchedule);
    // console.log('tomorrowSchedule 合并：', tomorrowSchedule);
    this.formRef.current.setFieldsValue({
      todaySchedule,
      tomorrowSchedule,
    });
    this.setState({
      importTodaySchedule: todaySchedule,
      importTomorrowSchedule: tomorrowSchedule,
    });
  };
  render() {
    const { onCancel, modalVisible, form, teamList, formType } = this.props;
    const { fields, importTodaySchedule, importTomorrowSchedule } = this.state;
    console.log('form => ', fields);

    const config = {
      title: '新建工作汇报',
      width: '80%',
      bodyStyle: { paddingBottom: 80 },
    };
    return (
      <Drawer
        title={config.title}
        width={config.width}
        onClose={() => {
          onCancel();
        }}
        visible={modalVisible}
        bodyStyle={config.bodyStyle}
        keyboard={false}
      >
        <div className="cf-container">
          <Form
            className={styles.gkTable}
            ref={this.formRef}
            name="customized_form_controls"
            layout="inline"
            onFinish={this.handleSubmit}
            onFieldsChange={this.handleChange}
            initialValues={form.initialValues}
            // values={form.values}
            key={form.initialValues.id}
          >
            {Number(fields.typec || form.initialValues.typec) === EnumTypec.Week && (
              <div className={styles.weekTemp}>
                <Popconfirm
                  title="导入当周所有日报后会覆盖当前填写内容，是否导入？"
                  onConfirm={this.handleImportCurWeekDailyList}
                  okText="确认"
                  cancelText="取消"
                  placement="bottom"
                >
                  <Button className={styles.wktBtn} icon={<CheckSquareOutlined />}>
                    一键导入
                  </Button>
                </Popconfirm>
                <Tooltip
                  className={styles.wktTips}
                  placement="bottomLeft"
                  title={'将当周每日日报内容一键导入到周报中'}
                >
                  <ExclamationCircleOutlined />
                </Tooltip>
              </div>
            )}
            <Form.Item className={styles.gkFormItemColumn} name="typec" label="汇报类型">
              <Radio.Group disabled={formType === 'edit'}>
                <Radio value="1">日报</Radio>
                <Radio value="2">周报</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              className={styles.gkFormItemColumn}
              name="todaySchedule"
              label={
                Number(fields.typec || form.initialValues.typec) === EnumTypec.Day
                  ? `今日工作内容`
                  : '本周工作内容'
              }
              rules={[{ required: true, message: '工作内容必须填写' }]}
            >
              {/* <DInput /> */}
              <Editor importEditorState={importTodaySchedule}></Editor>
            </Form.Item>

            <Form.Item
              className={styles.gkFormItemColumn}
              name="tomorrowSchedule"
              label={
                Number(fields.typec || form.initialValues.typec) === EnumTypec.Day
                  ? `明日工作计划`
                  : '下周工作计划'
              }
              rules={[{ required: true, message: '工作计划必须填写' }]}
            >
              <Editor importEditorState={importTomorrowSchedule}></Editor>
            </Form.Item>
            <Form.Item
              className={styles.gkFormItemColumn}
              name="blockingPoint"
              label="阻塞项(选填)"
            >
              <Input.TextArea placeholder="输入阻塞项" />
            </Form.Item>
            <Form.Item className={styles.gkFormItemColumn} name="note" label="备注(选填)">
              <Input.TextArea placeholder="输入备注" />
            </Form.Item>
            <Form.Item name="sendUserList" label="发送人(选填)" className={styles.gkFormItemColumn}>
              {/* <Mentions placeholder="输入@选择发送人">
                <Option value="ly" children={<span>李洋</span>}></Option>
                <Option value="lzj">刘自杰</Option>
                <Option value="zzg">周祖国</Option>
              </Mentions> */}
              <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="选择发送人">
                {teamList.map((o) => {
                  return (
                    <Select.Option key={o.ddUnionId} value={o.ddUnionId}>
                      {o.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ padding: '0 50px', margin: '20px auto 0', display: 'block' }}
                type="primary"
                htmlType="submit"
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    );
  }
}

export default connect(({ daily }) => ({
  teamList: daily.teamList,
}))(CreateForm);
// export default CreateForm;
