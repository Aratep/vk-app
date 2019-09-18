import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import AudioPlayer from '../../react-h5-audio-player';
// eslint-disable-next-line
// eslint-disable-next-line
import { Group, List, Cell } from '@vkontakte/vkui';
import './ListCards.css'

class ListCards extends React.Component {

    constructor(props) {
        super(props)
        this.props = props

        // console.log(props)
        this.arr = []
        this.currentPlay = null

        this.getCards(4)
    }

    cutText = (text) => {
      let shortText;
      if(text.length > 14) {
        shortText = text.substring(0, 17) + '...'
      }
      return shortText;
    }


    render() {
      const {cards} = this.props.state.cards
      if(cards && cards.length <= 0) return null

        this.arr = []


        for (let card of cards) {
            const audio_link = `https://s.voicecards.ru/c/${card.id}.mp3`
            
            this.arr.push(
                <Group key={card.id + Date.now() + ""} className="list-group" >
                    <List>
                      <Cell expandable>
                        <div data-id={card.id} >
                          <div className="song-name" onClick={this.props.go} data-id={card.id} data-to="card">
                            {this.cutText(card.name)}
                          </div>
                          <div className='card-title' data-id={card.id} onClick={this.props.go} data-to="card">Новый год</div>
                        </div>
                        <AudioPlayer preload='metadata' title={card.name} src={audio_link}  audioId={card.id} />
                      </Cell>
                    </List>
                </Group>)
        }



        return this.arr
    }

    async getCards(category_id) {
        let res = await axios.get(`https://social.voicecards.ru/api/social/?data={"action":"content","data":{"params":{"id":"69","type":"category","limit":"20","offset":"0"},"appname":"vc_vk_serv"}}`);
        // console.log(res)
        this.props.setListCards(res.data.content)
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
            }
        }),
    )(ListCards)
