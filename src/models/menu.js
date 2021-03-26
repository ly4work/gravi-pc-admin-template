import { DB } from '@/utils/DB';
import { history } from 'umi';
const MenuModel = {
  namespace: 'menu',
  state: {
    currentRoute: DB.get('currentRoute', 'session') || {}, //  当前路由
    routeCaches: DB.get('routeCaches', 'session') || [], //  路由缓存
    reportDetailMap: {}, //  日报页签数据map
    collapsed: false, //  菜单折叠状态，默认false
  },
  effects: {
    *asyncUpdateRouteController({ payload }, { put, select }) {
      const routeCaches = yield select((state) => state.menu.routeCaches);
      //  当dispatch更新 currentRoute
      if (payload.currentRoute) {
        yield put({
          type: 'updateCurrentRoute',
          payload: {
            currentRoute: payload.currentRoute,
          },
        });
        DB.set('currentRoute', payload.currentRoute, DB.type.session);

        //  当路由进行切换
        //  切换路由为新增路由，则需要更新routeCache
        // console.log(
        //   'adfadfdsa',
        //   routeCaches.find((item) => {
        //     return item.route === payload.currentRoute.route;
        //   }),
        // );
        if (
          !routeCaches.find((item) => {
            return item.route === payload.currentRoute.route;
          })
        ) {
          yield put({
            type: 'updateRouteCaches',
            payload: {
              routeCaches: [...routeCaches, payload.currentRoute],
            },
          });
          DB.set('routeCaches', [...routeCaches, payload.currentRoute], 'session');
        }
      }
      history.push(payload.currentRoute.route);

      //  如果有routeCaches，说明强制操作了routeCaches, 则再单独更新一次 DB
      if (payload.routeCaches) {
        // yield put({
        //   type: 'updateRouteCaches',
        //   payload: {
        //     routeCaches: payload.routeCaches,
        //   },
        // });
        DB.set('routeCaches', [...routeCaches], 'session');
      }
    },
    *asyncReportDetailMap({ payload }, { put, select }) {
      yield put({
        type: 'updateReportDetailMap',
        payload,
      });
    },
  },
  reducers: {
    updateCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload.collapsed,
      };
    },
    updateCurrentRoute(state, { payload }) {
      return {
        ...state,
        currentRoute: payload.currentRoute,
      };
    },
    updateRouteCaches(state, { payload }) {
      return {
        ...state,
        routeCaches: payload.routeCaches,
      };
    },
    updateReportDetailMap(state, { payload }) {
      if (payload.id) {
        DB.set(
          'reportDetailMap',
          {
            ...state.reportDetailMap,
            [payload.id]: payload,
          },
          'session',
        );
      }
      return {
        ...state,
        reportDetailMap: {
          ...state.reportDetailMap,
          [payload.id]: payload,
        },
      };
    },
  },
};
export default MenuModel;
