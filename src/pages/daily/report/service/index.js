import http from '@/http';

export default class Api {
  // 获取日报列表
  static GET_TASK_LIST_URL = '/daily-man/task/list';
  static getTaskList(params) {
    return http.post(Api.GET_TASK_LIST_URL, params);
  }

  //  创建日报
  static CREATE_TASK_URL = '/daily-man/task/insert';
  static createTask(params) {
    return http.post(Api.CREATE_TASK_URL, params);
  }

  //  更新日报
  static UPDATE_TASK_URL = '/daily-man/task/update';
  static updateTask(params) {
    return http.post(Api.UPDATE_TASK_URL, params);
  }

  //  删除日报
  static DELETE_TASK_URL = '/daily-man/task/delete';
  static delTask(params) {
    return http.post(Api.DELETE_TASK_URL, {}, { params });
  }

  //  获取评论接口
  static GET_COMMENT_LIST_URL = '/daily-man/comment/query';
  static getCommentList(params) {
    return http.post(Api.GET_COMMENT_LIST_URL, params);
  }

  //  发送评论
  static CREATE_COMMENT_URL = '/daily-man/comment/publish';
  static createComment(params) {
    return http.post(Api.CREATE_COMMENT_URL, params);
  }

  //  获取用户列表
  static GET_USER_LIST_URL = '/daily-man/user/list';
  static getUserList(params = {}) {
    return http.post(Api.GET_USER_LIST_URL, params);
  }

  //  查询未提交日周报的用户
  static GET_NOT_REPORT_USER_LIST_URL = '/daily-man/task/notFillUserList';
  static getNotReportUserList(params) {
    return http.post(Api.GET_NOT_REPORT_USER_LIST_URL, params);
  }

  //  查询登录用户当周 所有日报
  static GET_CURRENT_WEEK_DAILY_LIST = '/daily-man/task/weekTaskList';
  static getCurrentWeekDailyList() {
    return http.post(Api.GET_CURRENT_WEEK_DAILY_LIST);
  }
}
