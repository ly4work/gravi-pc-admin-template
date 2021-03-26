/**
 * 周日报管理系统model
 * @author liyang
 * 2021/02/27
 */
import { DB } from '@/utils/DB';
import { history } from 'umi';
const DailyModel = {
  namespace: 'daily',
  state: {
    teamList: [], //  周日报组织成员
  },
  effects: {},
  reducers: {
    updateTeamList(state, { payload }) {
      return {
        ...state,
        teamList: payload.teamList,
      };
    },
  },
};
export default DailyModel;
