import { observer } from 'mobx-react';
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import style from './home.css';
import Common from '../../stores/Common';

@observer
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.cstore = new Common();
    Object.assign(this, this.props);
  }

  render() {
    const data = this.cstore.datas;
    // eslint-disable-next-line no-console
    console.log('data ==> ', data);
    return (
      <div className={style.home}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => {
              // eslint-disable-next-line no-console
              console.log('d.name', d.name);
              return <Row key={i} data={{ d }} />;
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const Row = props => {
  // eslint-disable-next-line no-console
  console.log(props.data);
  return (
    <tr>
      <td>{props.data.d.name}</td>
      <td>{props.data.d.age}</td>
      <td>{props.data.d.sex}</td>
    </tr>
  );
};

export default Home;
