import createHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import { InputGroup, Input, Card, CardText, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import NewsSourcesStore from '../stores/NewsSourcesStore';
import NewsActions from '../actions/NewsActions';
import '../../public/style.scss';
import user from '../model/user';


const history = createHistory({
  forceRefresh: true,
});

class NewsSourcesView extends Component {
  constructor() {
    super();
    this.state = {
      sources: [],
      search: '',
    };

    this.getItemsState = this.getItemsState.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  componentWillMount() {
    if (!user.isLogin) {
      history.push('/login');
    }
  }
// Method to retrieve state from Stores
  getItemsState() {
    return {
      sources: NewsSourcesStore.getAll(),
    };
  }

// Get initial state from stores
  getInitialState() {
    return getItemsState();
  }

  _onChange() {
    const itemState = this.getItemsState();
    this.setState({
      sources: itemState.sources || [],
    });
  }

  componentDidMount() {
    NewsSourcesStore.addChangeListener(this._onChange);
    NewsActions.getSources();
    console.log('user',user);
  }

  componentWillUnMount() {
    NewsSourcesStore.removeChangeListener(this._onChange);
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  handleQueryValue(href) {
    console.log(href);
    history.push(href);
  }

  render() {
    const filteredSources = this.state.sources.filter(source => source.title.toLowerCase()
    .indexOf(this.state.search.toLowerCase()) !== -1);

    return (
      <div>
        <div className="searchBar">
          <InputGroup>
            <Input
              className="input" placeholder="Search based on news source"
              value={this.state.search} onChange={this.updateSearch.bind(this)}
            />
          </InputGroup>
        </div>

        <Row>
          {filteredSources.map(source => (
            <Col xs="6" sm="6" className="tile">
              <Card block key={source.id}
                className="bl" inverse color="info"
                onClick={this.handleQueryValue.bind(this, `${source.href}&${source.sortBysAvailable}`)}
              >
                <CardTitle>{source.title}</CardTitle>
                <CardSubtitle>Category: {source.category}</CardSubtitle>
                <CardText>{source.description}</CardText>
              </Card>
            </Col>
          ))}
        </Row>

      </div>
    );
  }
}


export default NewsSourcesView;
