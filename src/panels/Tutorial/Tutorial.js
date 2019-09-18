import React from 'react';
import { connect } from 'react-redux'
import vkconnect from '@vkontakte/vkui-connect';
import { Panel, Button, Gallery, PanelHeader } from '@vkontakte/vkui';
import './Tutorial.css';
import tutorial_step1_img from '../../img/tutorial/tutorial_step1_img.png'
import tutorial_step2_img from '../../img/tutorial/tutorial_step2_img.png'
import logo from '../../img/logo.png'

class Tutorial  extends React.Component{

    // eslint-disable-next-line
    constructor(props){
        super(props)

        this.props = props


        this.state = {
            slideIndex: 0,
            user: {}
          }
    }

    componentDidMount() {

		vkconnect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ user: e.detail.data });

					break;
				default:
					console.log(e.detail.type);
			}
		});

		vkconnect.send('VKWebAppGetUserInfo', {});
	}

    render(){
        let userName  = this.props.state.responseObj.responseObj.user ? this.props.state.responseObj.responseObj.user.name : ''

        return (
            <Panel id="tutorial" >
                <PanelHeader><img className="tutorial-header-img" src={logo} alt="Persik The Cat"/></PanelHeader>
                <Gallery
                    slideWidth="100%"
                    align="center"
                    style={{ height: 'calc(100vh - 56px)', backgroundColor:'#83b7e0' }}
                    bullets="light"
                    slideIndex={this.state.slideIndex}
                    onChange={slideIndex => this.setState({slideIndex})}
                >
                    <div className="tutorial-slide">
                        <div className="tutorial-img-wrapper">
                          <img className='tutorial-img' src={tutorial_step1_img} alt="Persik The Cat"/>
                        </div>
                        <h1 className='tutorial-h1'>{userName}, добро пожаловать!</h1>
                        <p className='tutorial-p'>Голосовые открытки — аудио поздравления в виде телефонного звонка. Они помогут оригинально поздравить ваших друзей и близких.</p>

                        <div className="tutorial-btn" >
                          <Button size="xl" level="primary" onClick={() => this.setState({slideIndex: this.state.slideIndex === 2 ? 0 : this.state.slideIndex + 1 })}>Далее</Button>
                        </div>
                    </div>
                    <div className="tutorial-slide">
                        <div className="tutorial-img-wrapper">
                          <img className='tutorial-img' src={tutorial_step2_img} alt="Persik The Cat"/>
                        </div>
                        <h1 className='tutorial-h1'>Как отправить открытку</h1>
                        <p className='tutorial-p'>Выберите понравившееся поздравление, укажите телефон получателя,  дату доставки. Открытку можно заказать заранее.    </p>
                        <div className="tutorial-btn">
                          <Button size="xl" level="primary" data-to="catalog" onClick={this.props.go}>Выбрать открытку</Button>
                        </div>
                    </div>
                </Gallery>

            </Panel>)
    }


}

export default connect(
    state => ({ state })
)(Tutorial)

