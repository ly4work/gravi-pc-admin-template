import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography } from 'antd';
import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, withRouter } from 'umi';
import styles from './index.less';
import mockList from './mock';
import CreateCard from './components/CreateCard/CreateCardView';
import { observer, inject } from 'mobx-react';
import { DB } from '@/utils/DB';

const { Paragraph } = Typography;

@withRouter
@observer
class CardList extends Component {
  componentDidMount() {}

  handleCreateProject = () => {};
  handleToTaskPage = (item) => {
    const { currentRoute, routeCaches } = this.props.globalMenuStore.state;
    const nextRoutePath = `/daily/task#taskId=${item.id}`;
    const addRoute = {
      parentId: 'menu.daily',
      route: nextRoutePath,
      title: item.title,
      id: 'menu.daily.task',
    };
    //  1. 更新store currentRoute
    this.props.globalMenuStore.updateStore({
      currentRoute: addRoute,
      routeCaches: [...routeCaches, addRoute],
    });
    DB.set('routeCaches', [...routeCaches, addRoute], 'session');
    DB.set('currentRoute', addRoute, 'session');

    this.props.history.push(nextRoutePath);
  };
  render() {
    const {
      // listAndcardList: { list },
      loading,
    } = this.props;
    let list = mockList;
    // const content = (
    //   <div className={styles.pageHeaderContent}>
    //     <p>Butterfly 数字化运营中心后台设计开发体系，跨越设计与开发的体验解决方案。</p>
    //     <div className={styles.contentLink}>
    //       <a>
    //         <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
    //         体验一致
    //       </a>
    //       <a>
    //         <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
    //         组件化
    //       </a>
    //       <a>
    //         <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
    //         配置化
    //       </a>
    //     </div>
    //   </div>
    // );
    // const extraContent = (
    //   <div className={styles.extraImg}>
    //     <img
    //       alt="这是一个标题"
    //       src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
    //     />
    //   </div>
    // );
    const nullData = {};
    return (
      <PageContainer style={{ minHeight: '100vh' }} content={null} extraContent={null}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={[...list, nullData]}
            renderItem={(item) => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[<a key="option1">编辑</a>, <a key="option2">删除</a>]}
                      onClick={() => this.handleToTaskPage(item)}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a>{item.title}</a>}
                        description={
                          <Paragraph
                            className={styles.item}
                            ellipsis={{
                              rows: 3,
                            }}
                          >
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }

              return (
                <List.Item>
                  {/* <Button
                    type="dashed"
                    className={styles.newButton}
                    onClick={this.handleCreateProject}
                  >
                    <PlusOutlined /> 新建项目
                  </Button> */}
                  <CreateCard />
                </List.Item>
              );
            }}
          />
        </div>
      </PageContainer>
    );
  }
}

export default CardList;
// export default connect(({ listAndcardList, loading }) => ({
//   listAndcardList,
//   loading: loading.models.listAndcardList,
// }))(CardList);
