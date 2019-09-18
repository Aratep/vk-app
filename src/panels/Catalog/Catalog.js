import React from 'react';
import { connect } from 'react-redux'

import { Panel, Spinner, Button, Div, FixedLayout, PanelHeader } from '@vkontakte/vkui';
import ListCards from './../../components/ListCards/ListCards';
import './Catalog.css';
import logo from '../../img/logo.png'
import bannerNy from '../../img/banners/bannerNy.jpg'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import { HeaderButton } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { IOS, platform } from '@vkontakte/vkui';

const osname = platform();

class Catalog extends React.Component {


  constructor(props) {
    super(props)
    this.props = props

    this.state = {
			isLoadCards: false,
			activePanel: 'tutorial',
      fetchedUser: null,
      isLoading: true
		};

  }

  render() {
    const cardsLength = this.props.state.cards.cards.length
    const isLoading = cardsLength <= 0 ? true : false
    
    return (
      <div className="catalog">
          <Panel id="catalog">
            <PanelHeader left={<HeaderButton onClick={this.props.go} data-to="tutorial">
                {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
              </HeaderButton>}><img className="header-img" src={logo} alt="Persik The Cat" />
            </PanelHeader>  

            <FixedLayout vertical="top">
              <img className='catalog-banner-img' src={bannerNy} alt="Persik The Cat" />
            </FixedLayout>
            
           {
              isLoading && <div style={{ height: 100, marginTop: 170 }}>
                <Spinner />
              </div>
           }
            <Div className='catalog-list'>
              <ListCards go={this.props.go} />
            </Div>

            <FixedLayout vertical="bottom">
              <Div style={{ display: 'flex' }}>
                <Button
                  className="catalog-btns"
                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                  size="m" stretched onClick={this.props.go}
                  data-to="about_us">
                  О нас
            </Button>
                <Button
                  className="catalog-btns"
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  size="m" component="a"
                  href="mailto:support@voicecards.ru?subject=VoiceCards::VK Apps&body=Добрый день! У меня вопрос по заказу на номер телефона:" stretched>
                  Служба поддержки
                </Button>
              </Div>
            </FixedLayout>
          </Panel> 
      </div>
    )
       
  }

}

export default connect(
  state => ({ state })
)(Catalog)

