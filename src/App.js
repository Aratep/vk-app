import React from 'react';
import vkconnect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios';
import { connect } from 'react-redux'

import Tutorial from './panels/Tutorial/Tutorial'
import Catalog from './panels/Catalog/Catalog'
import Card from './panels/Card/Card'
import AboutUs from './panels/AboutUs/AboutUs'
import FormData from 'form-data'


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			popoup: null, 
			activePanel: 'tutorial',
			fetchedUser: null,
			cardsListLength: 0
		};
	}

	componentDidMount() {

		vkconnect.subscribe(async (e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					const user = e.detail.data
					this.setState({ fetchedUser: user });
					let res = await this.auth(user.uid, user.first_name, user.last_name, user.sex)
					this.props.setResponseObject(res)

					break;
				default:
					console.log(e.detail.type);
			}
		});

		vkconnect.send("VKWebAppInit", {});
		vkconnect.send('VKWebAppGetUserInfo', {});
		
		
		
		// this.auth('2332', 'vadim', 'osyukov', 1).then((res)=>{
		// 	this.props.setResponseObject(res)
		// })
	}


	go = (e) => {
		const id = e.currentTarget.dataset.id
		this.setState({ activePanel: e.currentTarget.dataset.to })

		if(e.currentTarget.dataset.to === 'card'){
			this.onSetCurrentCard(id)
		}
	};

	onSetCurrentCard = (id) => {
		const {cards} = this.props.state.cards;

		const currentCard = cards.filter(card => card.id === id);
		this.props.setCurrentCard(currentCard)
		
		// this.props.go()
	}


	async auth(uid, name, surname, sex){
		try{

			
			let data = new FormData()

			data.append('data', '{"action":"auth", "data": {"uid": "123", "name": "vadim", "surname": "osyukov", "sex": 1, "appname": "vc_vk_serv"}}')


			let res = await axios.post('https://social.voicecards.ru/api/social/', data)
		
			console.log("0")
			console.log(res.data)
			return res.data
			
			
		}
		catch(err){
			console.log(err)
		}


	}

	render() {
		// console.log(this.state.activePanel);
		return (
				<View popout={this.state.popout} activePanel={this.state.activePanel}>
					<Catalog id="catalog" go={this.go}  />
					<Tutorial id="tutorial" go={this.go}/>
					<Card id="card" go={this.go}/>
					<AboutUs id="about_us" go={this.go}/>
				</View>
		);
	}
}

export default connect(
        state => ({
            state
        }),
        dispatch => ({
            setListCards: (value) => {
                dispatch({ type: "SET_LIST_CARDS", value });
            },
			setCurrentCard: (value) => {
                dispatch({ type: "SET_CURRENT_CARD", value });
			},
			setResponseObject: (value) => {
                dispatch({ type: "SET_RESPONSE_OBJ", value });
            },
        }),
    )(App)
