import { DB } from '@/utils/DB';

/**
 * HistoryStack 联动选项卡，浏览器路由，路由缓存db
 * @author liyang
 * 2021.02.07
 */
export class HistoryStack {
  static push({ nextRoutePath, nextTitle, nextId, nextParentId }) {
    const { globalMenuStore, history } = window.app;
    const { routeCaches } = globalMenuStore.state;
    // const nextRoutePath = `/daily/report-detail?reportId=${record.id}`;
    const addRoute = {
      parentId: nextParentId,
      route: nextRoutePath,
      title: nextTitle,
      id: nextId,
    };
    globalMenuStore.updateStore({
      currentRoute: addRoute,
    });
    //  2. 更新store routeCaches
    //  先查询routeCaches是否包含变更后的route
    if (
      !routeCaches.find((item) => {
        return item.route === addRoute.route;
      })
    ) {
      globalMenuStore.updateStore({
        routeCaches: [...routeCaches, addRoute],
      });
      DB.set('routeCaches', [...routeCaches, addRoute]);
      DB.set('currentRoute', addRoute);

      history.push(nextRoutePath);
    }
  }
}
